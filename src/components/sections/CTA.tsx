"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Sparkles } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function CTA() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      use_case: String(data.get("use_case") || "").trim(),
      website: String(data.get("website") || ""), // honeypot
    };

    if (!payload.name || !payload.email) {
      setErrorMsg("Name and email are required.");
      setState("error");
      return;
    }

    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json().catch(() => ({}));

      if (r.status === 429) {
        setErrorMsg("You just sent a request — please wait a minute before trying again.");
        setState("error");
        return;
      }
      if (!r.ok || !json.ok) {
        setErrorMsg(
          json.error === "invalid_email"
            ? "That email address looks invalid."
            : "Could not save your request. Try again or email hello@mas-ai.co.",
        );
        setState("error");
        return;
      }

      // Defensive backup so the user doesn't lose data if delivery channels are down.
      try {
        const existing = JSON.parse(localStorage.getItem("kya_waitlist") || "[]");
        existing.push({ ...payload, ts: new Date().toISOString() });
        localStorage.setItem("kya_waitlist", JSON.stringify(existing));
      } catch {
        /* private mode etc. — fine, server has it. */
      }

      setState("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Try again, or email hello@mas-ai.co directly.");
      setState("error");
    }
  }

  return (
    <section
      id="join-beta"
      className="relative py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-8 sm:p-12 overflow-hidden"
        >
          {/* glows */}
          <div
            className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(212,168,67,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(45,212,191,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-fine opacity-30 mask-radial pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                Private beta · 2026
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white">
                Building agent products?{" "}
                <span className="text-gradient-gold">Join the private beta.</span>
              </h2>
              <p className="mt-5 text-slate-400 leading-relaxed">
                Onboarding 10 design partners. SDKs, mission console, and
                receipt verifier. We&apos;ll reply within 48 hours with a calendar
                link if you&apos;re a fit.
              </p>

              <ul className="mt-8 space-y-3 text-[13px]">
                {[
                  "Free for design partners through Q3 2026",
                  "Direct Slack channel with the founder",
                  "Influence the open mission-receipt spec",
                  "Audit-friendly, governance-first by default",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="relative">
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-teal/30 bg-teal/[0.04] p-8 text-center"
                >
                  <div className="mx-auto h-12 w-12 rounded-full border border-teal/30 bg-teal/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="mt-4 text-white font-display text-xl">
                    You&apos;re on the list.
                  </h3>
                  <p className="mt-2 text-slate-400 text-[13.5px]">
                    We&apos;ll reach out from{" "}
                    <span className="text-white">hello@mas-ai.co</span> within 48
                    hours. Expect a short reply with the next step.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 text-[12px] text-slate-400 hover:text-white transition"
                  >
                    Submit another →
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 sm:p-7 space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field name="name" label="Name" required placeholder="Jane Doe" />
                    <Field
                      name="email"
                      label="Work email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                    />
                  </div>
                  <Field name="company" label="Company" placeholder="ACME Agents Inc." />
                  {/* Honeypot — hidden from humans, bots fill it. */}
                  <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden>
                    <label>
                      Website (do not fill)
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-2">
                      Use case
                    </label>
                    <textarea
                      name="use_case"
                      rows={4}
                      placeholder="e.g. Procurement agent that handles SaaS renewals — need audit trail before our enterprise pilot."
                      className="w-full rounded-lg bg-slate-900/60 border border-white/10 focus:border-gold/40 focus:bg-slate-900 outline-none px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 transition"
                    />
                  </div>

                  {state === "error" && (
                    <div className="text-[12.5px] text-signal-red border border-signal-red/30 bg-signal-red/5 rounded-md px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="group w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-gold text-ink font-medium hover:bg-gold-300 shadow-glow-gold transition disabled:opacity-60"
                  >
                    {state === "submitting" ? "Submitting…" : "Request early access"}
                    {state !== "submitting" && (
                      <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                    By submitting you agree to be contacted about the KYA private
                    beta. No marketing list. Unsubscribe in one click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg bg-slate-900/60 border border-white/10 focus:border-gold/40 focus:bg-slate-900 outline-none px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 transition"
      />
    </div>
  );
}
