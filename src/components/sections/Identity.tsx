"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  Bot,
  KeyRound,
  ShieldCheck,
  BadgeCheck,
  FileSignature,
  Cpu,
  ArrowDown,
} from "lucide-react";

type Accent = "gold" | "teal" | "blue" | "amber";

const accentMap: Record<Accent, string> = {
  gold: "border-gold/30 text-gold",
  teal: "border-teal/30 text-teal",
  blue: "border-signal-blue/30 text-signal-blue",
  amber: "border-signal-amber/40 text-signal-amber",
};

const glowMap: Record<Accent, string> = {
  gold: "rgba(212,168,67,0.18)",
  teal: "rgba(45,212,191,0.18)",
  blue: "rgba(96,165,250,0.18)",
  amber: "rgba(251,191,36,0.18)",
};

function NodeBox({
  icon: Icon,
  label,
  sub,
  accent = "gold",
  dashed = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
  accent?: Accent;
  dashed?: boolean;
}) {
  return (
    <div
      className={`relative min-w-[180px] rounded-xl border ${
        dashed ? "border-dashed" : ""
      } ${accentMap[accent]} bg-slate-950/80 backdrop-blur px-4 py-3.5 text-center group transition hover:scale-[1.02]`}
    >
      <div
        className="absolute -inset-px rounded-xl pointer-events-none opacity-40 group-hover:opacity-80 transition"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${glowMap[accent]}, transparent 70%)`,
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

const pillars = [
  {
    icon: Fingerprint,
    accent: "gold" as Accent,
    title: "Operator identity",
    body: "A FIDO2 passkey backed by the device secure element: TPM 2.0, Apple Secure Enclave, Android hardware Keystore, or a hardware security key. The private key is never sent to or seen by KYA servers, so operator presence is proven at mission time, not assumed from a stored token.",
  },
  {
    icon: Bot,
    accent: "teal" as Accent,
    title: "Agent identity",
    body: "Every agent carries an Ed25519 passport, signed and issued at registration, that names which agent is acting. The operator approves and the agent signs and acts, so the two identities stay distinct and separately accountable.",
  },
  {
    icon: KeyRound,
    accent: "amber" as Accent,
    title: "Mission step-up",
    body: "High-risk missions re-prompt the human for WebAuthn user verification set to required: Face ID, fingerprint, or a security key with PIN. That forces a fresh verification ceremony for the action, the same step-up pattern banks use for high-value transfers.",
  },
];

export default function Identity() {
  return (
    <section id="identity" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
            <Fingerprint className="h-3.5 w-3.5" />
            Identity model
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            Two identities,{" "}
            <span className="text-gradient-teal">one binding</span>.
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            The market authenticates the caller, the token, or the agent&apos;s
            own key. None of it binds a specific human&apos;s approval to the
            action at the moment it is authorized. KYA does.
          </p>
        </motion.div>

        {/* Binding diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-14 relative rounded-2xl border border-white/8 bg-slate-950/40 backdrop-blur p-8 sm:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none mask-radial" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gold/10 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-teal/10 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-2">
            {/* Two identities */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <NodeBox
                icon={Fingerprint}
                label="Operator"
                sub="FIDO2 passkey"
                accent="gold"
              />
              <div className="hidden sm:block text-slate-600 text-sm font-mono">
                +
              </div>
              <NodeBox
                icon={Bot}
                label="Agent"
                sub="ed25519 passport"
                accent="teal"
              />
            </div>

            <ArrowDownLine />

            {/* Conditional step-up gate */}
            <NodeBox
              icon={KeyRound}
              label="High-risk step-up"
              sub="fresh WebAuthn user verification"
              accent="amber"
              dashed
            />

            <ArrowDownLine />

            {/* Mission authorization */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gold/5 blur-xl" />
              <NodeBox
                icon={ShieldCheck}
                label="Mission authorization"
                sub="operator signature · agent signature"
                accent="gold"
              />
            </div>

            <ArrowDownLine />

            {/* KYA countersignature */}
            <NodeBox
              icon={BadgeCheck}
              label="KYA countersignature"
              sub="independent third-party seal"
              accent="blue"
            />

            <ArrowDownLine />

            {/* Signed mission record */}
            <NodeBox
              icon={FileSignature}
              label="Signed mission record"
              sub="verifiable envelope · joins the audit ledger"
              accent="teal"
            />
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-xl border border-white/8 bg-slate-900/40 p-5"
            >
              <div
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                  accentMap[p.accent]
                } bg-slate-950/60`}
              >
                <p.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-white font-medium">{p.title}</h3>
              <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Privacy principle */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 rounded-xl border border-white/8 bg-slate-950/40 p-5 flex items-start gap-3"
        >
          <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-teal/30 text-teal bg-slate-950/60">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-teal">
              Identity is rooted in keys, not hardware fingerprints
            </div>
            <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">
              KYA never uses GPU serials, MAC addresses, or per-device
              fingerprints as identity. Where attestation is enabled it confirms
              only the authenticator make and model, an identifier shared across
              many identical devices, never a per-user serial.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
