"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  IdCard,
  KeySquare,
  Radar,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: UserCheck,
    title: "Verify owner",
    body: "Bind a human and a business to the agent. KYC/KYB-ready, your data stays in your DB.",
    accent: "gold",
  },
  {
    n: "02",
    icon: IdCard,
    title: "Register agent",
    body: "Mint a root passport. Ed25519 keys. Spawn child birth certificates with subset scopes.",
    accent: "teal",
  },
  {
    n: "03",
    icon: KeySquare,
    title: "Assign permissions",
    body: "Per-mission scopes, multi-dimension budget, expiry ceiling, deny-on-out-of-scope policy gate.",
    accent: "gold",
  },
  {
    n: "04",
    icon: Radar,
    title: "Monitor actions",
    body: "Stuck-state detector. Real-time risk score. One-line human checkpoint for irreversible moves.",
    accent: "teal",
  },
  {
    n: "05",
    icon: FileCheck2,
    title: "Export audit proof",
    body: "Merkle-rooted, signed mission receipt. Optional Base anchor. Verifiable forever, by anyone.",
    accent: "gold",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
            <Radar className="h-3.5 w-3.5" />
            How it works
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            The mission lifecycle, in five steps.
          </h2>
        </motion.div>

        <div className="mt-14 relative">
          {/* connector line on desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-[68px] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,168,67,0.4) 10%, rgba(45,212,191,0.4) 50%, rgba(212,168,67,0.4) 90%, transparent)",
            }}
          />

          <ol className="grid gap-4 lg:grid-cols-5">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full blur-xl ${
                        s.accent === "gold"
                          ? "bg-gold/30"
                          : "bg-teal/30"
                      }`}
                    />
                    <div
                      className={`relative h-[68px] w-[68px] rounded-full border-2 ${
                        s.accent === "gold"
                          ? "border-gold/50 bg-slate-950"
                          : "border-teal/50 bg-slate-950"
                      } flex items-center justify-center`}
                    >
                      <s.icon
                        className={`h-5 w-5 ${
                          s.accent === "gold" ? "text-gold" : "text-teal"
                        }`}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                    Step {s.n}
                  </div>
                  <h3 className="mt-2 text-white font-medium">{s.title}</h3>
                  <p className="mt-2 text-[13px] text-slate-400 leading-relaxed max-w-[220px]">
                    {s.body}
                  </p>
                </div>

                {/* arrow on desktop */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-[60px] -right-3 z-10 items-center"
                    aria-hidden
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* SDK preview block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid lg:grid-cols-12 gap-6 items-start"
        >
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-gold">
              Ship in 5 lines
            </div>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl text-white">
              Wraps any LangChain, Anthropic Tools, OpenAI Assistants, or custom
              agent.
            </h3>
            <p className="mt-4 text-slate-400 leading-relaxed">
              The SDK is intentionally tiny. You pass an intent and a budget;
              KYA mints the passport, spawns child certs, routes across
              surfaces, escalates to a human if needed, and hands you a signed
              receipt at the end.
            </p>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="rounded-xl border border-white/8 bg-slate-950/80 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/40" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/40" />
                    <span className="h-2 w-2 rounded-full bg-green-400/40" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    procurement.ts
                  </span>
                </div>
                <div className="text-[10px] font-mono text-teal uppercase tracking-[0.2em]">
                  TypeScript
                </div>
              </div>
              <pre className="p-5 text-[12.5px] leading-[1.7] font-mono text-slate-300 overflow-x-auto">
{`import { KYA } from "@kya/sdk";

const kya = new KYA({ apiKey: process.env.KYA_API_KEY });

const mission = await kya.missions.start({
  intent: "Renew top 5 SaaS subs, $25K total, decline auto-renew over 8%",
  budget: { dollars: 25_000, time_s: 600, surfaces: 5 },
  scopes: ["procurement.renew", "procurement.compare"],
});

const receipt = await mission.complete();
//  signed, verifiable, optionally anchored on Base`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
