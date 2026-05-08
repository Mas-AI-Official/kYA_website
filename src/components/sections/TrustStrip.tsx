"use client";

import { motion } from "framer-motion";
import { Shield, KeyRound, FileBadge, Network, CreditCard, Wrench } from "lucide-react";

/**
 * TrustStrip: a subtle band of standards / open-protocols KYA aligns with.
 * Renders below the hero killer line. Each chip is a single mark + label,
 * staggered fade-in, no clickable destinations (these are credibility,
 * not navigation).
 *
 * Why six and not three:
 * - Three feels like a polite footnote; investors blow past it.
 * - Six feels like a deliberate stack: identity (Ed25519 + RFC 9421),
 *   delegation (ERC-8004), execution (MCP), settlement (Base + x402),
 *   license (Apache 2.0). Each chip is a "we're not making this up" anchor.
 */

const standards = [
  { icon: KeyRound, label: "Ed25519", note: "Signed receipts" },
  { icon: Shield, label: "RFC 9421", note: "HTTP signatures" },
  { icon: Network, label: "ERC-8004", note: "Agent identity" },
  { icon: Wrench, label: "MCP", note: "Tool surface" },
  { icon: CreditCard, label: "Base · x402", note: "Optional anchor" },
  { icon: FileBadge, label: "Apache 2.0", note: "Open spec" },
];

export default function TrustStrip() {
  return (
    <section className="relative py-12 sm:py-16 px-6 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] uppercase tracking-[0.24em] text-slate-500 mb-6"
        >
          Built on open standards · cross-runtime by design
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {standards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-lg border border-white/8 bg-slate-900/30 hover:bg-slate-900/60 hover:border-white/15 transition px-4 py-3 flex items-center gap-3"
            >
              <span className="h-9 w-9 rounded-md border border-white/10 bg-slate-950 flex items-center justify-center text-gold/80 group-hover:text-gold transition shrink-0">
                <s.icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-white truncate">
                  {s.label}
                </div>
                <div className="text-[10.5px] text-slate-500 truncate">
                  {s.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
