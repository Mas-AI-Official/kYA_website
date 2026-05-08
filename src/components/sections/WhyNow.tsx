"use client";

import { motion } from "framer-motion";
import { Zap, Megaphone, Flame } from "lucide-react";

const columns = [
  {
    icon: Zap,
    accent: "gold",
    eyebrow: "Standards rush",
    items: [
      ["RFC 9421", "HTTP Message Signatures · IESG, April 2026"],
      ["ERC-8004", "Live Jan 29, 2026 · 45K+ agents registered"],
      ["AP2 + Verifiable Intent", "FIDO consortium · 60+ orgs"],
    ],
  },
  {
    icon: Megaphone,
    accent: "teal",
    eyebrow: "Distribution moment",
    items: [
      ["a16z Speedrun SR007", "Agent-native infra wave"],
      ["a16z crypto", "Adopting Know Your Agent framing"],
      ["Voice + browser agents", "Going full lifecycle in prod"],
    ],
  },
  {
    icon: Flame,
    accent: "red",
    eyebrow: "Production pain",
    items: [
      ["Enterprise pilots", "Demanding audit trails as gating"],
      ["Munich Re · Lloyd's", "Underwriting AI agent liability"],
      ["ChatGPT Agent · Devin", "Burning real $ with no receipt"],
    ],
  },
];

export default function WhyNow() {
  return (
    <section id="why-now" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
            <Flame className="h-3.5 w-3.5" />
            Why now
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            The agent economy needs an{" "}
            <span className="text-gradient-gold">identity layer</span>.
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Three forces are converging in 2026. The wire-level standards are
            settling fast. The application-layer noun, the Mission, is still
            missing.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-3 lg:grid-cols-3">
          {columns.map((col, i) => (
            <motion.div
              key={col.eyebrow}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl border border-white/8 bg-slate-900/40 p-6"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-9 w-9 rounded-lg border border-white/10 bg-slate-950 flex items-center justify-center ${
                    col.accent === "gold"
                      ? "text-gold"
                      : col.accent === "teal"
                      ? "text-teal"
                      : "text-signal-red"
                  }`}
                >
                  <col.icon className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
                  {col.eyebrow}
                </div>
              </div>

              <ul className="mt-5 space-y-4">
                {col.items.map(([t, sub]) => (
                  <li key={t}>
                    <div className="text-white text-[14px] font-medium">{t}</div>
                    <div className="text-[12.5px] text-slate-500 mt-0.5">
                      {sub}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 text-center font-display text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto"
        >
          We ship the mission noun{" "}
          <span className="text-gold">before AWS or Cloudflare</span> extends
          their stack to it.
        </motion.p>
      </div>
    </section>
  );
}
