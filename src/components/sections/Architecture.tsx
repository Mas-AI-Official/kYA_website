"use client";

import { motion } from "framer-motion";
import {
  User,
  Building2,
  Bot,
  ShieldCheck,
  Wrench,
  CreditCard,
  Globe,
  ScrollText,
  ArrowDown,
} from "lucide-react";

function NodeBox({
  icon: Icon,
  label,
  sub,
  accent = "gold",
  small = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
  accent?: "gold" | "teal" | "blue";
  small?: boolean;
}) {
  const accentMap = {
    gold: "border-gold/30 text-gold",
    teal: "border-teal/30 text-teal",
    blue: "border-signal-blue/30 text-signal-blue",
  };
  return (
    <div
      className={`relative ${
        small ? "min-w-[120px]" : "min-w-[180px]"
      } rounded-xl border ${
        accentMap[accent]
      } bg-slate-950/80 backdrop-blur px-4 py-3.5 text-center group transition hover:scale-[1.02]`}
    >
      <div
        className={`absolute -inset-px rounded-xl pointer-events-none opacity-40 group-hover:opacity-80 transition`}
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${
            accent === "gold"
              ? "rgba(212,168,67,0.18)"
              : accent === "teal"
              ? "rgba(45,212,191,0.18)"
              : "rgba(96,165,250,0.18)"
          }, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center justify-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-white text-[13px] font-medium">{label}</span>
      </div>
      {sub && (
        <div className="relative mt-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          {sub}
        </div>
      )}
    </div>
  );
}

function ArrowDownLine() {
  return (
    <div className="flex flex-col items-center -my-1">
      <div
        className="h-8 w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(212,168,67,0.05), rgba(212,168,67,0.5), rgba(45,212,191,0.5), rgba(45,212,191,0.05))",
        }}
      />
      <ArrowDown className="h-3 w-3 text-slate-600 -mt-1" />
    </div>
  );
}

export default function Architecture() {
  return (
    <section
      id="architecture"
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
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Architecture preview
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            From human owner to{" "}
            <span className="text-gradient-teal">audit ledger</span>, in one
            mission.
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            KYA sits above the runtime. It doesn&apos;t replace your MCP gateway,
            your wallet, or your API client — it wraps them in a single mission
            envelope that travels with the agent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-14 relative rounded-2xl border border-white/8 bg-slate-950/40 backdrop-blur p-8 sm:p-12 overflow-hidden"
        >
          {/* gradient backdrop */}
          <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none mask-radial" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gold/10 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-teal/10 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-2">
            {/* Owner row */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <NodeBox icon={User} label="Human Owner" sub="KYC verified" accent="gold" />
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-gold/50 to-teal/50" />
              <NodeBox icon={Building2} label="Business Entity" sub="KYB verified" accent="gold" />
            </div>

            <ArrowDownLine />

            {/* Agent */}
            <NodeBox icon={Bot} label="Registered Agent" sub="ed25519 passport" accent="teal" />

            <ArrowDownLine />

            {/* Policy engine */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gold/5 blur-xl" />
              <NodeBox
                icon={ShieldCheck}
                label="Mission Policy Engine"
                sub="12-state · scope-subset · budget hard-stop"
                accent="gold"
              />
            </div>

            <ArrowDownLine />

            {/* Surfaces row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
              <NodeBox icon={Wrench} label="MCP Tools" accent="teal" small />
              <NodeBox icon={Globe} label="Browser" accent="teal" small />
              <NodeBox icon={CreditCard} label="Wallets / x402" accent="teal" small />
              <NodeBox icon={Globe} label="APIs" accent="teal" small />
            </div>

            <ArrowDownLine />

            {/* Audit ledger */}
            <NodeBox
              icon={ScrollText}
              label="Signed Audit Ledger"
              sub="merkle root · optional Base anchor"
              accent="blue"
            />

            <div className="mt-8 grid sm:grid-cols-3 gap-3 w-full">
              <div className="rounded-lg border border-white/8 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-teal">
                  No PII on-chain
                </div>
                <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
                  All KYC, intent, and deliverable contents stay in your
                  Postgres. Only Merkle roots can be anchored.
                </p>
              </div>
              <div className="rounded-lg border border-white/8 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold">
                  Default-off crypto
                </div>
                <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
                  Receipts are Ed25519-signed JSON by default. The on-chain
                  anchor is one toggle for crypto-native customers.
                </p>
              </div>
              <div className="rounded-lg border border-white/8 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-teal">
                  Cross-vendor by design
                </div>
                <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
                  Same mission produces identical receipts whether the reasoner
                  is Claude, GPT, Gemini, or Llama. No model lock-in.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
