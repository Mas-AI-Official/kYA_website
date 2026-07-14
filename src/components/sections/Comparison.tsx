"use client";

import { motion } from "framer-motion";
import { Check, Minus, X, Compass } from "lucide-react";

type Cell = "yes" | "partial" | "no";

const headers = [
  { name: "KYA Mission Control", highlight: true },
  { name: "AWS AgentCore", highlight: false },
  { name: "Cloudflare WBA", highlight: false },
  { name: "ERC-8004", highlight: false },
];

const rows: { capability: string; cells: [Cell, Cell, Cell, Cell]; note?: string }[] = [
  {
    capability: "Operator presence proof at authorization",
    cells: ["yes", "partial", "no", "no"],
    note: "Fresh FIDO2 passkey step-up per mission. AgentCore binds a user id but delegates presence to the IdP",
  },
  {
    capability: "Cross-runtime portable identity",
    cells: ["yes", "no", "yes", "yes"],
    note: "AWS-locked / wire-only / on-chain only",
  },
  {
    capability: "Per-mission delegation tree",
    cells: ["yes", "no", "no", "no"],
    note: "Child birth certificates with subset enforcement",
  },
  {
    capability: "Cross-surface budget hard-stop",
    cells: ["yes", "partial", "no", "no"],
    note: "Multi-dimension: tokens, dollars, time, surfaces, calls",
  },
  {
    capability: "Mission state machine + signed receipt",
    cells: ["yes", "partial", "no", "partial"],
    note: "Merkle-rooted, Ed25519-signed, optionally anchored",
  },
  {
    capability: "Human-checkpoint primitive (one line)",
    cells: ["yes", "partial", "no", "no"],
  },
  {
    capability: "Optional on-chain anchor",
    cells: ["yes", "no", "no", "yes"],
  },
  {
    capability: "Open spec + commercial implementation",
    cells: ["yes", "no", "yes", "yes"],
  },
];

function CellGlyph({ v }: { v: Cell }) {
  if (v === "yes") return <Check className="h-4 w-4 text-signal-green" />;
  if (v === "partial") return <Minus className="h-4 w-4 text-signal-amber" />;
  return <X className="h-4 w-4 text-slate-700" />;
}

export default function Comparison() {
  return (
    <section id="compare" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
            <Compass className="h-3.5 w-3.5" />
            Differentiation
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            Each incumbent owns a slice.{" "}
            <span className="text-gradient-teal">
              KYA owns the mission above all of them.
            </span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            We adopt RFC 9421. We integrate with ERC-8004. We wrap AgentPort,
            AgentGateway, AgentCore Gateway. The mission lives above the wire.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-14 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 sticky left-0 bg-slate-950/60 backdrop-blur">
                    Capability
                  </th>
                  {headers.map((h) => (
                    <th
                      key={h.name}
                      className={`px-5 py-4 text-center text-[12px] font-medium ${
                        h.highlight
                          ? "text-white bg-gold/5 border-x border-gold/15"
                          : "text-slate-400"
                      }`}
                    >
                      {h.highlight ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                          {h.name}
                        </span>
                      ) : (
                        h.name
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={`border-b border-white/5 ${
                      i % 2 === 0 ? "bg-slate-900/20" : ""
                    } hover:bg-white/[0.02] transition`}
                  >
                    <td className="px-5 py-4 sticky left-0 bg-slate-950/60 backdrop-blur">
                      <div className="text-white text-[13.5px] font-medium leading-tight">
                        {row.capability}
                      </div>
                      {row.note && (
                        <div className="text-[11.5px] text-slate-500 mt-1">
                          {row.note}
                        </div>
                      )}
                    </td>
                    {row.cells.map((v, j) => (
                      <td
                        key={j}
                        className={`px-5 py-4 text-center ${
                          j === 0
                            ? "bg-gold/[0.04] border-x border-gold/15"
                            : ""
                        }`}
                      >
                        <span className="inline-flex">
                          <CellGlyph v={v} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-white/8 bg-slate-900/20 text-[11.5px] text-slate-500 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-signal-green" /> Native
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Minus className="h-3.5 w-3.5 text-signal-amber" /> Partial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <X className="h-3.5 w-3.5 text-slate-600" /> Not supported
            </span>
            <span className="ml-auto text-slate-600">
              Sources: vendor docs · Q2 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
