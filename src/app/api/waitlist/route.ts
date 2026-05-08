import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Waitlist intake, provider-agnostic.
 *
 * Always:
 *   - Validates payload, basic anti-spam (honeypot + rate-limit by IP).
 *   - Writes a structured JSON line to stdout (Vercel surfaces these in
 *     the Logs tab; you can grep / forward to anywhere later).
 *
 * Optional (light up when env vars exist):
 *   - RESEND_API_KEY + WAITLIST_NOTIFY_TO + WAITLIST_FROM
 *       Sends an HTML email to your inbox per submission.
 *   - SLACK_WEBHOOK_URL
 *       Posts a formatted card to Slack.
 *   - WAITLIST_WEBHOOK_URL
 *       POSTs the raw JSON to any webhook (Zapier, n8n, Notion, your own API).
 *
 * Never:
 *   - Stores secrets in code.
 *   - Throws on missing optional providers, the form still succeeds.
 */

type Payload = {
  name: string;
  email: string;
  company?: string;
  use_case?: string;
  /** Honeypot, must be empty. Real users never fill this. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limit (best-effort across one Edge instance, fine for low volume).
const lastHit = new Map<string, number>();
const WINDOW_MS = 60_000; // 1 submission / IP / minute

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon"
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function notifyResend(p: Payload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_TO;
  const from = process.env.WAITLIST_FROM || "KYA Waitlist <onboarding@resend.dev>";
  if (!key || !to) return { sent: false, reason: "resend-not-configured" };

  const subject = `KYA waitlist · ${p.name}${p.company ? ` (${p.company})` : ""}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui;line-height:1.55;color:#0F1419">
      <h2 style="margin:0 0 12px 0;color:#B58E2E">New KYA Mission Control beta request</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#5A6678">Name</td><td><b>${escapeHtml(p.name)}</b></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5A6678">Email</td><td><a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></td></tr>
        ${p.company ? `<tr><td style="padding:4px 12px 4px 0;color:#5A6678">Company</td><td>${escapeHtml(p.company)}</td></tr>` : ""}
        ${p.use_case ? `<tr><td style="padding:4px 12px 4px 0;color:#5A6678;vertical-align:top">Use case</td><td>${escapeHtml(p.use_case).replace(/\n/g, "<br/>")}</td></tr>` : ""}
      </table>
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, reply_to: p.email }),
    });
    return { sent: r.ok, status: r.status };
  } catch (e) {
    return { sent: false, error: String(e) };
  }
}

async function notifySlack(p: Payload) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "slack-not-configured" };
  const lines = [
    `*New KYA waitlist signup*`,
    `*Name:* ${p.name}`,
    `*Email:* ${p.email}`,
    p.company ? `*Company:* ${p.company}` : "",
    p.use_case ? `*Use case:* ${p.use_case}` : "",
  ].filter(Boolean);
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });
    return { sent: r.ok, status: r.status };
  } catch (e) {
    return { sent: false, error: String(e) };
  }
}

async function notifyWebhook(p: Payload) {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "webhook-not-configured" };
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, source: "kya.mas-ai.co", ts: new Date().toISOString() }),
    });
    return { sent: r.ok, status: r.status };
  } catch (e) {
    return { sent: false, error: String(e) };
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<Payload>;
  try {
    body = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot, bots fill hidden fields. Pretend to succeed and don't burn a slot.
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (body.name || "").toString().trim().slice(0, 200);
  const email = (body.email || "").toString().trim().slice(0, 200);
  const company = (body.company || "").toString().trim().slice(0, 200);
  const use_case = (body.use_case || "").toString().trim().slice(0, 4000);

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Rate-limit only after the request looks legitimate, bad input shouldn't lock a user out.
  const ip = clientIp(req);
  const now = Date.now();
  const last = lastHit.get(ip) || 0;
  if (now - last < WINDOW_MS) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retry_after_s: Math.ceil((WINDOW_MS - (now - last)) / 1000) },
      { status: 429 },
    );
  }

  const payload: Payload = { name, email, company, use_case };
  lastHit.set(ip, now);

  // Structured log line, Vercel surfaces this in Logs.
  console.log(
    JSON.stringify({
      kind: "waitlist.signup",
      ts: new Date().toISOString(),
      ip,
      name,
      email,
      company: company || undefined,
      use_case: use_case || undefined,
      ua: req.headers.get("user-agent") || undefined,
    }),
  );

  const [resend, slack, webhook] = await Promise.all([
    notifyResend(payload),
    notifySlack(payload),
    notifyWebhook(payload),
  ]);

  return NextResponse.json({
    ok: true,
    delivered: {
      resend: resend.sent,
      slack: slack.sent,
      webhook: webhook.sent,
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed", hint: "POST JSON to this endpoint" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
