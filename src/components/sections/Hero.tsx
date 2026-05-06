"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import MissionDashboard from "../MissionDashboard";

const trustChips = [
  "Apache 2.0 open protocol",
  "Cross-runtime: Claude · GPT · Gemini · Llama",
  "Ed25519-signed receipts",
  "No vendor lock-in",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
              </span>
              Agent Mission Infrastructure · Open Protocol
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-white"
            >
              Trust infrastructure for{" "}
              <span className="text-gradient-gold">autonomous AI agents</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-[17px] leading-relaxed text-slate-400 max-w-xl"
            >
              KYA Mission Control verifies who owns an agent, what it is allowed
              to do, and creates an auditable record before it acts, spends,
              transacts, or represents a business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#join-beta"
                className="group inline-flex items-center gap-2 h-12 px-5 rounded-md bg-gold text-ink font-medium hover:bg-gold-300 shadow-glow-gold transition"
              >
                Join private beta
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-md border border-teal/30 bg-teal/5 text-slate-100 hover:border-teal/50 hover:bg-teal/10 transition"
              >
                <PlayCircle className="h-4 w-4 text-teal" />
                Open the live Mission Lab
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 grid grid-cols-2 gap-y-2 gap-x-4 text-[12px] text-slate-500"
            >
              {trustChips.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-teal" />
                  {c}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: dashboard */}
          <div className="lg:col-span-7">
            <MissionDashboard />
          </div>
        </div>

        {/* Killer line strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 sm:mt-32 relative"
        >
          <div className="absolute -inset-6 bg-radial-gold opacity-50 blur-2xl pointer-events-none" />
          <p className="relative font-display text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight text-white text-center max-w-4xl mx-auto">
            Other tools control a tool call.{" "}
            <span className="text-gradient-gold">
              We control the whole mission lifecycle.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
