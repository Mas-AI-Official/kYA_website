"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  Building2,
  KeyRound,
  Gauge,
  ScrollText,
  FileBadge,
  Plug,
  Stars,
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Agent Identity Registry",
    body: "Cryptographic agent passports. Issue, rotate, revoke. Ed25519 by default.",
  },
  {
    icon: Building2,
    title: "Human + Business Ownership",
    body: "Bind every agent to a human owner and an organisational entity. Verifiable provenance.",
  },
  {
    icon: KeyRound,
    title: "Permission & Spending Policies",
    body: "Per-mission delegation tree. Scope subset, expiry ceiling, no re-parenting. OAuth can&apos;t do this.",
  },
  {
    icon: Gauge,
    title: "Risk Scoring",
    body: "Real-time trust meter. Stuck-state detection. Anomaly flagging across surfaces.",
  },
  {
    icon: ScrollText,
    title: "Action Audit Logs",
    body: "Every state transition signed and chained. Indexed by mission, lineage, and surface.",
  },
  {
    icon: FileBadge,
    title: "Compliance-Ready Reports",
    body: "Export Merkle-rooted, Ed25519-signed receipts. Optional Base anchor for regulated workflows.",
  },
  {
    icon: Plug,
    title: "API for Platforms",
    body: "5-line SDK for TypeScript and Python. Wraps LangChain, Anthropic Tools, OpenAI Assistants.",
  },
  {
    icon: Stars,
    title: "Reputation & History",
    body: "Cross-runtime reputation that travels with the agent, not the platform that hosts it.",
  },
];

export default function Product() {
  return (
    <section id="product" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
            <FileBadge className="h-3.5 w-3.5" />
            The product
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            One control layer for{" "}
            <span className="text-gradient-teal">identity, permissions, and accountability</span>.
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Eight primitives. One mission lifecycle. Built to wrap any agent
            framework you already use, with zero coupling to a single model
            vendor or cloud.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative rounded-xl border border-white/8 bg-slate-900/40 p-5 hover:border-gold/30 hover:bg-slate-900/70 transition overflow-hidden"
            >
              <div
                className="absolute -top-px left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)",
                }}
              />
              <div className="h-10 w-10 rounded-lg border border-white/10 bg-slate-950 flex items-center justify-center text-gold">
                <f.icon className="h-4 w-4" strokeWidth={1.7} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium text-white leading-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
