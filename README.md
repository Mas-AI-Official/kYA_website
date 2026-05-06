<div align="center">

<img src="public/kya-logo.png" alt="KYA Mission Control" width="200" />

# KYA Mission Control

### Trust infrastructure for autonomous AI agents

*Verifies who owns an agent · what it’s allowed to do · creates an auditable record before it acts, spends, transacts, or represents a business.*

[![License](https://img.shields.io/badge/License-Apache%202.0-D4A843?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-2DD4BF?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Live Lab](https://img.shields.io/badge/Live%20Lab-Cloud%20Run-2DD4BF?style=for-the-badge)](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/)

[**Live Mission Lab →**](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/) · [**Product repo →**](https://github.com/Mas-AI-Official/KYA_Mission_Control) · [**MAS-AI →**](https://mas-ai.co)

</div>

---

> **Other tools control a tool call. We control the whole mission lifecycle.**

This is the marketing site for **KYA Mission Control by MAS-AI Technologies Inc.** — the trust and execution layer for AI agent missions. Birth certificate to signed receipt across MCP, APIs, browsers, and payment rails.

The site is built to feel like the product: **dark, technical, mission-control**. No cartoon robots, no generic AI gradients, no hype. Cards, dashboards, glow, grid lines, motion — exactly enough.

---

## ✨ What you’ll see on the page

| Section | What it does |
|---|---|
| **Hero** | Simulated mission-control dashboard — agent passport · trust meter (animated SVG) · multi-dimensional budget bars · 5-child lineage tree with animated dataflow · 9-step audit timeline · Ed25519-verified anchor strip |
| **Killer line** | *“Other tools control a tool call. We control the whole mission lifecycle.”* — full-bleed strip with gold-radial glow |
| **Problem** | Five questions every CISO is about to ask, five answers no one ships |
| **Product** | Eight primitives — agent identity registry, ownership verification, permission policies, risk scoring, audit logs, compliance reports, platform API, reputation |
| **How it works** | Five-step mission lifecycle + a 5-line SDK preview that wraps any LangChain / Anthropic Tools / OpenAI Assistants agent |
| **Architecture** | Owner → Entity → Agent → Mission Policy Engine → Surfaces → Audit Ledger block diagram |
| **Live Mission Lab** | **9 scenario cards deep-linked to a running Cloud Run console** — admit / block / checkpoint / verify, on real RFC 9421 signed requests |
| **Use cases** | Marketplaces, SaaS, fintech, enterprise, freelance, AI insurance |
| **Why now** | Standards rush · distribution moment · production pain |
| **Comparison** | KYA vs AWS AgentCore vs Cloudflare WBA vs ERC-8004 |
| **Founder + Daena traction** | 10 departments × 60 capabilities × 3,086 tests · customer-zero on day one |
| **Waitlist** | `/api/waitlist` Edge route with Resend / Slack / webhook fan-out |

The whole page is **server-rendered, fully responsive, scroll-reactive** (parallax glow orbs + drifting grid + descending scanline), and respects `prefers-reduced-motion`.

---

## 🧪 Try the live demo (no signup, no install)

The hero section deep-links into our running **Mission Lab** on Cloud Run. Click any card to open it on the right scenario:

| # | Scenario | Outcome | Question it answers |
|--:|---|---|---|
| 1 | [Verified mission](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=verified-success) | ✅ Admit | What does a green-light mission look like? |
| 2 | [No passport](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=no-passport) | ❌ Block | Which agent is this — and who owns it? |
| 3 | [Revoked passport](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=revoked-passport) | ❌ Block | How do I kill a key after it leaks? |
| 4 | [Child scope escalation](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=child-escalation) | ❌ Block | What authority can a child claim? |
| 5 | [Budget exceeded](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=budget-exceeded) | ⏸️ Checkpoint | How much has it spent on what? |
| 6 | [High-risk action](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=high-risk) | ⏸️ Checkpoint | What needs a human signature? |
| 7 | [Stuck browser](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=stuck-browser) | ⏸️ Checkpoint | How do I stop a wedged agent? |
| 8 | [Replay blocked](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=replay-blocked) | ❌ Block | Can a captured request be reused? |
| 9 | [Verify offline](https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/?scenario=verify-receipt) | 🔐 Verify | Can I prove this tomorrow without your servers? |

Every click runs against a real FastAPI service, real Ed25519 keys, the real 12-state mission engine. The receipts are downloadable and offline-verifiable.

---

## 🚀 Quick start

**Prerequisites:** Node.js ≥ 18.

```bash
git clone https://github.com/Mas-AI-Official/kYA_website.git
cd kYA_website
npm install
npm run dev
```

Open <http://localhost:3000>.

The waitlist form on `#join-beta` works locally without any env vars — submissions are written to `console.log` (and to the browser’s `localStorage` as a defensive backup).

---

## 🏗️ Architecture (one glance)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         BROWSER (visitor)                            │
│         dark slate · gold · teal · framer-motion scroll FX           │
└────────────────────────────────┬─────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────┐
│                 Next.js 14 (App Router · static + Edge)              │
│ ─────────────────────────────────────────────────────────────────── │
│  /  ......... statically prerendered (SEO-friendly, LCP < 1.5s)      │
│  /api/waitlist .. Edge runtime function (V8 isolate, ~5ms cold)      │
└────────────────────────────────┬─────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
┌──────────────┐         ┌──────────────┐        ┌──────────────────┐
│   RESEND     │         │    SLACK     │        │  WEBHOOK (any)   │
│ HTML email   │         │ Channel ping │        │ Zapier / Notion  │
│  (optional)  │         │  (optional)  │        │   (optional)     │
└──────────────┘         └──────────────┘        └──────────────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │   stdout JSON log  │
                       │   (always)         │
                       └────────────────────┘
                       Vercel / Cloudflare Logs surface these
```

`/api/waitlist` validates → checks honeypot → checks rate-limit (1/IP/min, **after** validation so a typo doesn’t lock you out) → fans out to all configured providers via `Promise.all`. **Every provider is optional.** The form succeeds with zero configuration.

---

## 🎨 Design system

| Token | Value | Used for |
|---|---|---|
| Background | `#05080B` ink + layered radial gradients | Page base |
| Slate 900 | `#0F1419` | Panel surfaces |
| Slate 800 | `#1A2129` | Raised cards |
| **Gold** | **`#D4A843`** | Primary CTA, brand mark, "admit" signals |
| **Teal** | **`#2DD4BF`** | Secondary accents, "verify" signals |
| Signal green | `#34D399` | Policy PASS, success |
| Signal amber | `#FBBF24` | Checkpoint pending, warning |
| Signal red | `#F87171` | Block, deny |
| Signal blue | `#60A5FA` | Human-loop signal |
| Display | Inter | Headings, dashboard text |
| Mono | JetBrains Mono | Code, IDs, addresses |

**Animation language:** parallax glow orbs that drift with scroll · drifting grid · descending scanline · staggered card reveals · animated trust-meter SVG · audit-trail line-by-line. All motion respects `prefers-reduced-motion`.

---

## 📁 Project structure

```
.
├── public/
│   ├── kya-logo.png            # Brand mark (gold-on-black)
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts    # Edge function: validation + fan-out
│   │   ├── globals.css         # Tailwind + glow / grid / scanline
│   │   ├── layout.tsx          # Root layout, metadata, OG
│   │   └── page.tsx            # Composed landing page
│   ├── components/
│   │   ├── AnimatedBackground.tsx     # Scroll-reactive orbs + grid
│   │   ├── MissionDashboard.tsx       # Hero dashboard simulation
│   │   ├── Nav.tsx                    # Sticky nav with KYA mark
│   │   ├── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Problem.tsx
│   │       ├── Product.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Architecture.tsx
│   │       ├── LiveLab.tsx            # 9 deep-linked scenario cards
│   │       ├── UseCases.tsx
│   │       ├── WhyNow.tsx
│   │       ├── Comparison.tsx
│   │       ├── Founder.tsx
│   │       └── CTA.tsx
│   └── lib/
│       └── cn.ts
├── .env.example                # All optional providers documented
├── next.config.mjs
├── package.json
├── tailwind.config.ts          # MAS-AI palette + animations
├── tsconfig.json
├── vercel.json                 # Security headers + Edge cache
└── wrangler.toml               # Cloudflare Pages config
```

---

## 🚢 Deploy

### A · Cloudflare Pages (recommended)

Same provider as your DNS, free tier covers anything this site will see, and the Edge `/api/waitlist` runs as a Cloudflare Worker bundle for free.

```bash
npx wrangler login            # one-time, opens browser
npm run cf:deploy             # builds via @cloudflare/next-on-pages and uploads
```

After the first deploy:

1. **Cloudflare Dashboard → Pages → `kya-mission-control` → Custom Domains** — enter `kya.mas-ai.co`. The CNAME is already set on the `mas-ai.co` zone, so Cloudflare validates and issues the TLS cert in ~30 s.
2. **Settings → Environment Variables** — paste any of:

   | Var | Effect |
   |---|---|
   | `RESEND_API_KEY` + `WAITLIST_NOTIFY_TO` | Branded HTML email per signup |
   | `WAITLIST_FROM` | Override `From:` (default uses Resend onboarding) |
   | `SLACK_WEBHOOK_URL` | Instant Slack channel ping |
   | `WAITLIST_WEBHOOK_URL` | Forward raw JSON to Zapier / n8n / Notion |

   See [`.env.example`](.env.example).

### B · Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMas-AI-Official%2FkYA_website&project-name=kya-mission-control&repository-name=kya_website&framework=nextjs&env=RESEND_API_KEY,WAITLIST_NOTIFY_TO,WAITLIST_FROM,SLACK_WEBHOOK_URL,WAITLIST_WEBHOOK_URL&envDescription=All%20optional%20%E2%80%94%20form%20works%20without%20any.%20See%20.env.example.&envLink=https%3A%2F%2Fgithub.com%2FMas-AI-Official%2FkYA_website%2Fblob%2Fmain%2F.env.example)

Or via CLI:
```bash
npx vercel login
npx vercel --prod
```

After deploy: Project Settings → Domains → add `kya.mas-ai.co` → add the DNS record Vercel shows (or keep the existing CNAME; both work).

### C · Netlify / Self-hosted

```bash
npm run build && npm run start
```

Outputs `/.next` (server) — wire to any Node host, or `next export` if you don’t need the API route.

---

## 🛡️ Waitlist API contract

`POST /api/waitlist`

```json
{
  "name":     "Jane Doe",       // required
  "email":    "jane@acme.com",  // required, RFC-ish regex
  "company":  "ACME Agents",    // optional
  "use_case": "Procurement bot needs receipts",  // optional, ≤ 4000 chars
  "website":  ""                // honeypot — must be empty
}
```

**Responses:**

| Status | Meaning |
|--:|---|
| `200 {ok:true, delivered:{resend, slack, webhook}}` | Accepted; per-provider booleans show what fired |
| `200 {ok:true}` | Honeypot tripped (silent — no slot consumed) |
| `400 {error:"missing_fields"}` | name or email blank |
| `400 {error:"invalid_email"}` | email failed regex |
| `400 {error:"invalid_json"}` | body not valid JSON |
| `429 {error:"rate_limited", retry_after_s}` | > 1 request from this IP this minute |
| `405 {error:"method_not_allowed"}` | not a POST |

Validation runs **before** rate-limiting so a typo doesn’t burn your slot. Honeypot bots are silently 200’d so they don’t retry.

---

## 📈 Performance

| Metric | Target | Measured |
|---|---|---|
| First Load JS | < 200 kB | **154 kB** |
| LCP | < 1.5 s | (depends on host) |
| Lighthouse | > 95 | (run yours) |
| Third-party trackers | 0 | **0** |
| External font requests | 0 | **0** (system stack) |

---

## 🤝 Contributing

This is the marketing site. The product itself lives at **[`Mas-AI-Official/KYA_Mission_Control`](https://github.com/Mas-AI-Official/KYA_Mission_Control)** (Apache 2.0, mission state machine + receipt spec + lab demo).

If you spot a copy bug, a typo, or a layout issue here, open an issue or a PR — anything that makes the site sharper is welcome. For product feedback (the protocol, the receipt format, the lab scenarios), open issues on the product repo.

---

## 📝 License

**Apache 2.0** — see [LICENSE](LICENSE).

© 2026 MAS-AI Technologies Inc. · Toronto, Ontario, Canada

---

<div align="center">

**Built by [Masoud Masoori](https://www.linkedin.com/in/masoud-masoori) · MAS-AI Technologies Inc.**

[mas-ai.co](https://mas-ai.co) · [hello@mas-ai.co](mailto:hello@mas-ai.co) · [security@mas-ai.co](mailto:security@mas-ai.co)

*Two patents pending: Sunflower-Honeycomb Memory Architecture · Neural-Backed Memory Fabric (NBMF)*

</div>
