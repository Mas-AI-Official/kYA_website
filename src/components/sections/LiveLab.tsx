"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldX,
  ShieldOff,
  GitBranch,
  Coins,
  AlertTriangle,
  Hand,
  RotateCcw,
  FileCheck2,
  ArrowUpRight,
  Beaker,
  PlayCircle,
} from "lucide-react";

const LAB_BASE = "https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/";

type Outcome = "admit" | "block" | "checkpoint" | "verify";

const outcomeStyles: Record<
  Outcome,
  { label: string; chip: string; ring: string; tint: string }
> = {
  admit: {
    label: "Admit",
    chip: "text-signal-green border-signal-green/30 bg-signal-green/5",
    ring: "border-signal-green/20 hover:border-signal-green/40",
    tint: "from-signal-green/10",
  },
  block: {
    label: "Block",
    chip: "text-signal-red border-signal-red/30 bg-signal-red/5",
    ring: "border-signal-red/20 hover:border-signal-red/40",
    tint: "from-signal-red/10",
  },
  checkpoint: {
    label: "Checkpoint",
    chip: "text-signal-amber border-signal-amber/30 bg-signal-amber/5",
    ring: "border-signal-amber/20 hover:border-signal-amber/40",
    tint: "from-signal-amber/10",
  },
  verify: {
    label: "Verify",
    chip: "text-teal border-teal/30 bg-teal/5",
    ring: "border-teal/20 hover:border-teal/40",
    tint: "from-teal/10",
  },
};

type Scenario = {
  id: string;
  title: string;
  question: string;
  body: string;
  outcome: Outcome;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
};

const scenarios: Scenario[] = [
  {
    id: "verified-success",
    title: "Verified mission",
    question: "What does a green-light mission look like?",
    body:
      "Passport ✓ · scope ⊆ mission ✓ · 3 dispatches under budget · MCP routing · signed receipt issued.",
    outcome: "admit",
    icon: ShieldCheck,
  },
  {
    id: "no-passport",
    title: "No passport",
    question: "Which agent is this — and who owns it?",
    body:
      "Rogue agent shows up without an Ed25519-signed credential. Identity check fails on the first hop. Mission never starts.",
    outcome: "block",
    icon: ShieldX,
  },
  {
    id: "revoked-passport",
    title: "Revoked passport",
    question: "How do I kill a key after it leaks?",
    body:
      "Issue passport, revoke it, then try to use it. Signature is valid; status is revoked. Door slammed before the mission boots.",
    outcome: "block",
    icon: ShieldOff,
  },
  {
    id: "child-escalation",
    title: "Child scope escalation",
    question: "What authority can a child claim?",
    body:
      "Parent has procurement.read. Child requests procurement.write. Server-side scope-subset invariant rejects the child birth certificate.",
    outcome: "block",
    icon: GitBranch,
  },
  {
    id: "budget-exceeded",
    title: "Budget exceeded",
    question: "How much has it spent on what?",
    body:
      "$500 budget. Two dispatches: $300 admitted, $750 trips the hard-stop. State transitions to CHECKPOINT_PENDING; human decides.",
    outcome: "checkpoint",
    icon: Coins,
  },
  {
    id: "high-risk",
    title: "High-risk action",
    question: "What needs a human signature?",
    body:
      "External email send is in scope and under budget — but the risk classifier flags it irreversible. Mandatory checkpoint before dispatch.",
    outcome: "checkpoint",
    icon: AlertTriangle,
  },
  {
    id: "stuck-browser",
    title: "Stuck browser",
    question: "How do I stop a wedged agent?",
    body:
      "API 404, MCP 404, browser fallback hits a CAPTCHA-shaped DOM. Stuck-detector fires at 30 s. Mission pauses; human takes over.",
    outcome: "checkpoint",
    icon: Hand,
  },
  {
    id: "replay-blocked",
    title: "Replay blocked",
    question: "Can a captured request be reused?",
    body:
      "Same nonce, same counter, replayed seconds later. RFC 9421-compliant verifier rejects on the second attempt. No double-spend.",
    outcome: "block",
    icon: RotateCcw,
  },
  {
    id: "verify-receipt",
    title: "Verify a receipt offline",
    question: "Can I prove this tomorrow without your servers?",
    body:
      "Load receipt JSON. Reconstruct 9 Merkle leaves. Recompute root. Ed25519.verify(sig, root, issuer_pub). Anyone, anywhere.",
    outcome: "verify",
    icon: FileCheck2,
  },
];

export default function LiveLab() {
  return (
    <section id="live-lab" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
            </span>
            Live Mission Lab · Cloud Run · running now
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            Nine scenarios.{" "}
            <span className="text-gradient-teal">
              Real cryptography. No video.
            </span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Click any scenario to open the live border-checkpoint console. Each
            click runs against real RFC 9421 signed requests, real Ed25519 keys,
            and a real 12-state mission engine. The receipts are downloadable,
            offline-verifiable, and bit-identical to what an enterprise auditor
            would receive.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s, i) => {
            const o = outcomeStyles[s.outcome];
            const href = `${LAB_BASE}?scenario=${s.id}`;
            const Icon = s.icon;
            return (
              <motion.a
                key={s.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className={`group relative rounded-xl border ${o.ring} bg-slate-900/40 hover:bg-slate-900/70 transition overflow-hidden p-5 flex flex-col`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br ${o.tint} to-transparent`}
                />
                <div className="relative flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg border border-white/10 bg-slate-950 flex items-center justify-center text-white/80 group-hover:text-white transition">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded border ${o.chip}`}
                  >
                    {o.label}
                  </span>
                </div>

                <div className="relative mt-5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                    {s.question}
                  </div>
                  <h3 className="mt-2 text-white font-medium leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
                    {s.body}
                  </p>
                </div>

                <div className="relative mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    /console/?scenario={s.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-slate-300 group-hover:text-white transition">
                    Run
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Lab CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 relative rounded-2xl border border-teal/20 bg-gradient-to-br from-slate-950/80 to-slate-900/60 backdrop-blur p-6 sm:p-8 overflow-hidden"
        >
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(45,212,191,0.6), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl border border-teal/30 bg-slate-950 flex items-center justify-center text-teal shrink-0">
                <Beaker className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">
                  Skip the video. Run the policy gate yourself.
                </h3>
                <p className="mt-2 text-slate-400 text-[14px] leading-relaxed max-w-2xl">
                  The lab is a real FastAPI service on Cloud Run, signing real
                  Ed25519 receipts, with the full mission state machine running
                  in front of you. Replay-protected, signed, deterministic.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={LAB_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-11 px-5 rounded-md bg-teal text-ink font-medium hover:bg-teal-300 transition"
              >
                <PlayCircle className="h-4 w-4" />
                Open the Mission Lab
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`${LAB_BASE}gate/?auto=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-white/10 bg-white/[0.02] text-slate-200 hover:border-white/20 hover:bg-white/[0.05] transition"
              >
                4-agent parallel showcase
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
