"use client";

import { motion } from "framer-motion";
import {
  Store,
  Cpu,
  Wallet,
  Building,
  Handshake,
  Layers,
} from "lucide-react";

const cases = [
  {
    icon: Store,
    title: "AI agent marketplaces",
    body: "Issue every listed agent a portable identity. Verify ownership, score reputation, expose audit trail to buyers.",
    badge: "Marketplaces",
  },
  {
    icon: Cpu,
    title: "SaaS platforms adding agents",
    body: "Wrap existing AI features in 5 lines. Ship the audit and kill-switch your enterprise pilots are demanding.",
    badge: "SaaS · Series A",
  },
  {
    icon: Wallet,
    title: "Fintech and crypto wallets",
    body: "Per-mission spend caps. Signed receipts. Optional on-chain anchor. AP2 + ERC-8004 ready.",
    badge: "Fintech",
  },
  {
    icon: Building,
    title: "Enterprises deploying internal agents",
    body: "Department-scoped agents with subset delegation. Compliance teams get evidence. Engineers keep velocity.",
    badge: "Enterprise",
  },
  {
    icon: Handshake,
    title: "Customer-agent transaction platforms",
    body: "Freelance agents acting on a customer&apos;s behalf, with provable scope, receipts, and dispute trail.",
    badge: "Marketplaces",
  },
  {
    icon: Layers,
    title: "AI insurance carriers",
    body: "Actuarial-grade evidence of agent actions. Underwrite agent liability with a standardised receipt format.",
    badge: "Insurance",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
            <Layers className="h-3.5 w-3.5" />
            Who it&apos;s for
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            Built for the platforms about to{" "}
            <span className="text-gradient-gold">run agent traffic</span>.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative rounded-xl border border-white/8 bg-slate-900/40 p-6 hover:border-teal/30 transition overflow-hidden"
            >
              <div
                className="absolute -inset-px rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,212,191,0.18), transparent 50%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg border border-white/10 bg-slate-950 flex items-center justify-center text-teal">
                  <c.icon className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 px-2 py-1 rounded border border-white/10 bg-white/[0.02]">
                  {c.badge}
                </span>
              </div>
              <h3 className="relative mt-5 text-white font-medium leading-snug">
                {c.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] text-slate-400 leading-relaxed">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
