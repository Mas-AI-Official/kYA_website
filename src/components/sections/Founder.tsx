"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Award, ServerCog, FlaskConical } from "lucide-react";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
            <Award className="h-3.5 w-3.5" />
            Built by MAS-AI Technologies Inc.
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            Governance-first thinking, already shipping in production.
          </h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            MAS-AI builds governed multi-agent systems for real-world operations.
            KYA Mission Control is designed from the same governance-first
            thinking behind <span className="text-white">Daena</span>, identity,
            memory, auditability, accountable agent execution.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative rounded-2xl border border-gold/20 bg-gradient-to-br from-slate-900/80 to-slate-950 p-7 overflow-hidden"
          >
            <div
              className="absolute -top-12 -right-12 w-72 h-72 rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,168,67,0.4), transparent 70%)",
              }}
            />
            <div className="relative">
              {/* Brand mark */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-gold/30 bg-black mb-7 shadow-glow-gold">
                <Image
                  src="/kya-logo.png"
                  alt="KYA Mission Control · Identity · Governance · Access · Powered by MAS-AI"
                  fill
                  sizes="(min-width: 1024px) 280px, 60vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-gold/40 shadow-[0_0_30px_-5px_rgba(212,168,67,0.5)] shrink-0">
                  <Image
                    src="/masoud.jpg"
                    alt="Masoud Masoori, founder of MAS-AI Technologies Inc."
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <div className="text-white text-lg font-medium">Masoud Masoori</div>
                  <div className="text-slate-400 text-[13px]">
                    Founder · MAS-AI Technologies Inc.
                  </div>
                  <div className="text-slate-500 text-[12px] mt-0.5">
                    Toronto, Ontario, Canada
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[14px] text-slate-300 leading-relaxed">
                Senior AI Architect / ML Engineer. Decade of production AI for
                security-critical workloads. Inventor on{" "}
                <span className="text-white">two patents pending</span>:
                Sunflower-Honeycomb Memory Architecture, and Neural-Backed
                Memory Fabric (NBMF).
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded border border-gold/20 bg-gold/5 text-gold">
                  Patent pending · NBMF
                </span>
                <span className="px-2.5 py-1 rounded border border-gold/20 bg-gold/5 text-gold">
                  Patent pending · Sunflower-Honeycomb
                </span>
                <span className="px-2.5 py-1 rounded border border-teal/20 bg-teal/5 text-teal">
                  Production Cloud Run
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-[12.5px] text-slate-400">
                <a
                  href="mailto:masoud.masoori@mas-ai.co"
                  className="hover:text-white transition"
                >
                  masoud.masoori@mas-ai.co
                </a>
                <span className="text-slate-700">·</span>
                <a
                  href="https://mas-ai.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  mas-ai.co
                </a>
                <span className="text-slate-700">·</span>
                <a
                  href="https://www.linkedin.com/in/masoud-masoori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  linkedin
                </a>
              </div>
            </div>
          </motion.div>

          {/* Daena traction */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-2xl border border-white/8 bg-slate-900/40 p-7"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-teal">
              <ServerCog className="h-3.5 w-3.5" />
              Customer-zero · Daena (production)
            </div>
            <h3 className="mt-3 text-white text-2xl font-display leading-tight">
              Daena will be customer-zero of KYA from week one.
            </h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Daena is MAS-AI&apos;s governed multi-agent platform, 10 departments,
              60 capabilities per agent, a 10-stage governance pipeline,
              tiered NBMF memory, and production deployment on Cloud Run. Its
              10 departments will produce real KYA mission receipts on day one.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["10", "Departments"],
                ["60", "Capabilities / agent"],
                ["3,086", "Tests passing"],
                ["v3.6", "Production tag"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="rounded-lg border border-white/8 bg-slate-950/60 px-3 py-3"
                >
                  <div className="text-white font-display text-2xl tabular-nums">
                    {n}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/8 bg-slate-950/40 p-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Mythos line
                </div>
                <p className="mt-2 text-[13.5px] text-slate-300 leading-relaxed">
                  &quot;Other tools control a tool call. We control the whole
                  mission lifecycle.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-white/8 bg-slate-950/40 p-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-teal">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Adjacent traction
                </div>
                <p className="mt-2 text-[13.5px] text-slate-300 leading-relaxed">
                  WorldSignal · 30+ Claude Code skills · multiple production-LLM
                  systems for security-critical workloads.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
