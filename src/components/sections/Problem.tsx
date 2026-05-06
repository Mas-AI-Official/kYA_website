"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  GitBranch,
  Coins,
  ScrollText,
  HandCoins,
  AlertOctagon,
} from "lucide-react";

const items = [
  {
    icon: Fingerprint,
    title: "Which agent is this — and who owns it?",
    body:
      "The internet was built for humans with cookies and CAPTCHAs. Agents need a portable, verifiable passport.",
    accent: "text-gold",
  },
  {
    icon: GitBranch,
    title: "What authority did the parent give the child?",
    body:
      "When agents spawn agents, scope cascades. We track the lineage tree and enforce subset delegation.",
    accent: "text-teal",
  },
  {
    icon: Coins,
    title: "How much has it spent on what surfaces?",
    body:
      "Tokens, dollars, time, API calls — all under one mission ledger with a deterministic hard-stop.",
    accent: "text-gold",
  },
  {
    icon: ScrollText,
    title: "What did it actually do, and can I prove it tomorrow?",
    body:
      "A signed receipt. A Merkle root. An optional on-chain anchor. Auditor-grade proof, forever.",
    accent: "text-teal",
  },
  {
    icon: HandCoins,
    title: "How do I stop it when it's stuck or wrong?",
    body:
      "await checkpoint(reason, scope, signer) — a one-line escalation primitive. Five-second sign-off on phone.",
    accent: "text-gold",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
            <AlertOctagon className="h-3.5 w-3.5" />
            The problem
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            AI agents are moving from chat to action.{" "}
            <span className="text-slate-400">Trust hasn&apos;t caught up.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Agents will access tools, customer data, APIs, wallets, marketplaces,
            and business workflows. Every CISO is about to ask the same five
            questions — and existing infrastructure has no answer.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative rounded-xl border border-white/8 bg-slate-900/40 p-6 hover:border-white/15 hover:bg-slate-900/70 transition"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
                   style={{
                     background:
                       "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(212,168,67,0.06), transparent 40%)",
                   }} />
              <div className="flex items-start gap-3">
                <div className={`shrink-0 h-10 w-10 rounded-lg border border-white/10 bg-slate-950 flex items-center justify-center ${item.accent}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 pt-2">
                  Q{i + 1}
                </div>
              </div>
              <h3 className="mt-4 text-white font-medium leading-snug">{item.title}</h3>
              <p className="mt-2 text-[14px] text-slate-400 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}

          {/* Closing card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold">
                Bottom line
              </div>
              <p className="mt-3 text-[18px] leading-snug text-white">
                Existing tools control individual tool calls.{" "}
                <span className="text-gold">Nobody owns the mission.</span>
              </p>
            </div>
            <div className="mt-6 text-[12px] text-slate-400">
              Cloudflare signs the request. Stripe pays the bill. ERC-8004 lists
              the agent. None of them prove what the mission actually did.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
