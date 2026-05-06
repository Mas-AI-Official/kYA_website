# KYA Mission Control — Landing Page

The marketing site for **KYA Mission Control by MAS-AI** — trust infrastructure for autonomous AI agents.

> **Live target:** `kya.mas-ai.co`
> **Repo:** [github.com/Mas-AI-Official/kYA_website](https://github.com/Mas-AI-Official/kYA_website)
> **Live Mission Lab:** <https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMas-AI-Official%2FkYA_website&project-name=kya-mission-control&repository-name=kya_website&framework=nextjs&env=RESEND_API_KEY,WAITLIST_NOTIFY_TO,WAITLIST_FROM,SLACK_WEBHOOK_URL,WAITLIST_WEBHOOK_URL&envDescription=All%20optional%20%E2%80%94%20form%20works%20without%20any.%20See%20.env.example.&envLink=https%3A%2F%2Fgithub.com%2FMas-AI-Official%2FkYA_website%2Fblob%2Fmain%2F.env.example)

---

## Stack

- **Next.js 15** (App Router, Server Components by default)
- **React 19** (RC)
- **Tailwind CSS 3.4** with custom MAS-AI palette (slate / gold / teal)
- **Framer Motion** for scroll-reactive animations
- **Lucide React** icons
- **TypeScript 5.6**

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build & deploy

```bash
npm run build
npm run start          # production server on :3000
```

Deploy targets that work out of the box:

- **Cloudflare Pages** — `npm run cf:deploy` (after `npx wrangler login`).
- **Vercel** — `npx vercel --prod`, or click the Deploy button above.
- **Netlify** — set build command to `npm run build`, publish directory to `.next`.

---

## Project structure

```
.
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind + custom CSS (grid, glow, scanlines)
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   └── page.tsx            # Composed landing page
│   ├── components/
│   │   ├── AnimatedBackground.tsx   # Scroll-reactive background (orbs + grid + scanline)
│   │   ├── MissionDashboard.tsx     # Simulated mission-control dashboard (hero visual)
│   │   ├── Nav.tsx                  # Sticky top nav
│   │   ├── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Problem.tsx
│   │       ├── Product.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Architecture.tsx
│   │       ├── UseCases.tsx
│   │       ├── WhyNow.tsx
│   │       ├── Comparison.tsx
│   │       ├── Founder.tsx
│   │       └── CTA.tsx
│   └── lib/
│       └── cn.ts
├── public/
│   └── favicon.svg
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Design system

| Token | Value |
|---|---|
| Background | `#05080B` ink, layered radial gradients |
| Slate | `#0F1419` (panel), `#1A2129` (raised), `#252E39` (hover) |
| Gold | `#D4A843` (primary CTA, brand mark) |
| Teal | `#2DD4BF` (secondary accents, status-good) |
| Signal | `#34D399` green · `#FBBF24` amber · `#F87171` red · `#60A5FA` blue |
| Display font | Inter |
| Mono font | JetBrains Mono |

Animation language: **scroll-reactive parallax glow orbs · drifting grid · descending scanline · staggered card reveals**. All motion respects `prefers-reduced-motion`.

---

## Sections

1. **Hero** — headline + simulated mission dashboard (Agent Passport, Trust Score, Budget meter, Lineage tree, Audit trail, Anchor strip)
2. **Killer line strip** — "Other tools control a tool call. We control the whole mission lifecycle."
3. **Problem** — 5 missing primitives (the questions every CISO is about to ask)
4. **Product** — 8 features in a 4-column grid
5. **How it works** — 5-step horizontal flow + SDK code preview
6. **Architecture** — visual block diagram (Owner → Entity → Agent → Policy Engine → Surfaces → Audit Ledger)
7. **Use cases** — 6 personas (marketplaces, SaaS, fintech, enterprise, freelance platforms, insurance)
8. **Why now** — 3 columns (standards rush · distribution moment · production pain)
9. **Comparison** — KYA vs AWS AgentCore · Cloudflare WBA · ERC-8004
10. **Founder** — Masoud Masoori bio + Daena customer-zero traction
11. **CTA** — private-beta waitlist form (frontend-only; persists to localStorage with TODO marker for backend)
12. **Footer** — product / company / legal columns

---

## Waitlist backend (already wired)

The form at `#join-beta` posts to `/api/waitlist` (Edge runtime). The route:

- Validates payload (name + email required, email regex)
- Honeypot anti-spam (hidden `website` field; bots fill it, we silently 200)
- Per-IP rate limit (1 request / minute)
- Always logs structured JSON to stdout — visible in Vercel Logs
- Optionally fans out to **Resend**, **Slack**, and a **generic webhook** when env vars are set

### Light up notifications (optional)

Copy `.env.example` to `.env.local` for dev, or set in Vercel Project Settings:

```bash
RESEND_API_KEY=re_xxx
WAITLIST_NOTIFY_TO=hello@mas-ai.co
WAITLIST_FROM=KYA Waitlist <noreply@mas-ai.co>   # verified domain in Resend

SLACK_WEBHOOK_URL=https://hooks.slack.com/...    # optional

WAITLIST_WEBHOOK_URL=https://hooks.zapier.com/...  # optional
```

The form works **without any of these** — submissions land in `console.log` and surface in Vercel's Logs tab. Add keys when you're ready.

## Deploy

### Option A — Cloudflare Pages (recommended; same provider as your DNS)

```bash
npx wrangler login            # one-time, opens browser
npm run cf:deploy             # builds via @cloudflare/next-on-pages and deploys
```

The Edge `/api/waitlist` route is compiled to a Cloudflare Worker bundle and served from the same domain. After the first deploy:

1. Cloudflare Dashboard → Pages → `kya-mission-control` → Custom Domains → add `kya.mas-ai.co`
   (the CNAME is already set on the `mas-ai.co` zone — Cloudflare auto-validates and provisions SSL)
2. Settings → Environment Variables → paste any of: `RESEND_API_KEY`, `WAITLIST_NOTIFY_TO`, `WAITLIST_FROM`, `SLACK_WEBHOOK_URL`, `WAITLIST_WEBHOOK_URL`

### Option B — Vercel

```bash
npx vercel login           # one-time
npx vercel --prod
```

Or click-deploy: <https://vercel.com/new/clone?repository-url=https://github.com/Mas-AI-Official/kYA_website&project-name=kya-mission-control>

After first deploy:
1. Vercel Project Settings → Domains → add `kya.mas-ai.co`
2. Add the DNS records Vercel shows you to your `mas-ai.co` zone
3. Set env vars in Project Settings → Environment Variables (see `.env.example`)

---

## Performance budget

- Lighthouse target: **>95**
- LCP target: **<1.5s**
- Zero third-party trackers
- All fonts via `next/font` (self-hosted, swap)
- All images and icons inline SVG (no external requests)

---

## License

Apache 2.0. © 2026 MAS-AI Technologies Inc.

Founder: Masoud Masoori · `masoud.masoori@mas-ai.co` · Toronto, ON.
