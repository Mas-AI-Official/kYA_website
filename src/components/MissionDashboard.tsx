"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  Coins,
  Fingerprint,
  Network,
  ShieldCheck,
  AlertTriangle,
  CircleDot,
} from "lucide-react";

function StatusDot({ color = "bg-signal-green" }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75 animate-ping`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

function TrustMeter({ score = 94 }: { score?: number }) {
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="relative w-[110px] h-[110px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#trust-grad)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          strokeDasharray={circ}
        />
        <defs>
          <linearGradient id="trust-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-white tabular-nums">{score}</div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-1">
          Trust
        </div>
      </div>
    </div>
  );
}

function BudgetBar({
  label,
  used,
  total,
  unit,
  color,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min(100, (used / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300 tabular-nums">
          {used}
          {unit} / {total}
          {unit}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

const auditEvents = [
  { t: "00:00", e: "INTENT received", c: "text-gold" },
  { t: "00:01", e: "Root passport minted", c: "text-teal" },
  { t: "00:03", e: "5 child certificates issued", c: "text-teal" },
  { t: "00:18", e: "Surface route → MCP[notion]", c: "text-slate-300" },
  { t: "00:22", e: "Policy gate: PASS", c: "text-signal-green" },
  { t: "00:26", e: "Vendor returned +12%, flag", c: "text-signal-amber" },
  { t: "00:30", e: "CHECKPOINT_PENDING → human", c: "text-signal-blue" },
  { t: "00:35", e: "Human signed: counter @ 8%", c: "text-signal-green" },
  { t: "00:55", e: "Receipt issued · Ed25519 ✓", c: "text-gold" },
];

export default function MissionDashboard() {
  return (
    <div className="relative w-full">
      {/* outer glow */}
      <div
        className="absolute -inset-6 rounded-[28px] opacity-70 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,168,67,0.22), transparent 35%, rgba(45,212,191,0.18))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative rounded-2xl border border-white/8 bg-slate-950/80 backdrop-blur-xl shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 bg-gradient-to-r from-slate-900 to-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-slate-400">
              kya://mission/0xA7C4…F901
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StatusDot />
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-mono">
              LIVE · MISSION-RUNNING
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4 sm:p-5">
          {/* Agent passport card */}
          <div className="col-span-12 lg:col-span-5 rounded-xl border border-white/8 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-4 relative overflow-hidden">
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, rgba(212,168,67,0.5), transparent 70%)" }}
            />
            <div className="flex items-center justify-between relative">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                <Fingerprint className="h-3 w-3" />
                Agent Passport
              </span>
              <span className="text-[10px] font-mono text-slate-500">v1.4.2</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <TrustMeter score={94} />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Identity
                </div>
                <div className="text-sm text-white font-medium leading-tight">
                  procurement-agent · child-3
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  ed25519:0x8FD2…A047
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-teal/10 border border-teal/20 text-teal">
                    OWNER · HUMAN
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-gold/10 border border-gold/20 text-gold">
                    ORG · MAS-AI
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
              <div className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-2">
                <div className="text-slate-500 uppercase tracking-wider">Scopes</div>
                <div className="text-white font-mono mt-0.5">7 / 12</div>
              </div>
              <div className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-2">
                <div className="text-slate-500 uppercase tracking-wider">Lineage</div>
                <div className="text-white font-mono mt-0.5">root → 3</div>
              </div>
              <div className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-2">
                <div className="text-slate-500 uppercase tracking-wider">Expires</div>
                <div className="text-white font-mono mt-0.5">9m 12s</div>
              </div>
            </div>
          </div>

          {/* Budget + permissions */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-teal mb-3">
                <Coins className="h-3 w-3" />
                Budget · multi-dim
              </div>
              <div className="space-y-3">
                <BudgetBar label="USD" used={18.4} total={25} unit="K" color="bg-gradient-to-r from-gold to-gold-300" />
                <BudgetBar label="Tokens" used={742} total={1000} unit="K" color="bg-gradient-to-r from-teal to-teal-300" />
                <BudgetBar label="Time" used={420} total={600} unit="s" color="bg-gradient-to-r from-signal-blue to-teal" />
                <BudgetBar label="Surfaces" used={3} total={5} unit="" color="bg-gradient-to-r from-signal-amber to-gold" />
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
                <ShieldCheck className="h-3 w-3" />
                Permissions
              </div>
              <ul className="space-y-1.5 text-[11px]">
                {[
                  ["procurement.renew", true],
                  ["procurement.compare", true],
                  ["wallet.usdc.transfer ≤ $500", true],
                  ["mcp.notion.read", true],
                  ["mcp.notion.write", false],
                  ["browser.fallback", true],
                ].map(([p, ok]) => (
                  <li key={String(p)} className="flex items-center justify-between">
                    <span className="font-mono text-slate-300">{p as string}</span>
                    {ok ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-signal-green" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-signal-amber" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lineage tree */}
          <div className="col-span-12 lg:col-span-7 rounded-xl border border-white/8 bg-slate-900/40 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Network className="h-3 w-3 text-teal" />
                Mission lineage tree
              </span>
              <span className="font-mono text-slate-500">5 children · 1 grand-child</span>
            </div>

            {/* Lineage SVG */}
            <svg viewBox="0 0 380 130" className="w-full h-[150px]">
              <defs>
                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4A843" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* connecting lines */}
              {[40, 110, 180, 250, 320].map((x, i) => (
                <path
                  key={i}
                  d={`M 190 25 Q 190 60 ${x} 80`}
                  stroke="url(#line-grad)"
                  strokeWidth="1"
                  fill="none"
                  className="data-flow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
              {/* grandchild */}
              <path
                d="M 250 95 Q 250 110 290 115"
                stroke="rgba(45,212,191,0.6)"
                strokeWidth="1"
                fill="none"
                className="data-flow"
                style={{ animationDelay: "1.6s" }}
              />

              {/* root */}
              <g>
                <circle cx="190" cy="20" r="8" fill="#D4A843" />
                <circle cx="190" cy="20" r="14" fill="none" stroke="#D4A843" strokeOpacity="0.4" />
                <text x="190" y="42" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="monospace">
                  root
                </text>
              </g>

              {/* children */}
              {[
                { x: 40, label: "C1" },
                { x: 110, label: "C2" },
                { x: 180, label: "C3" },
                { x: 250, label: "C4" },
                { x: 320, label: "C5" },
              ].map((c) => (
                <g key={c.label}>
                  <circle cx={c.x} cy={85} r="6" fill="#2DD4BF" />
                  <text x={c.x} y={104} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">
                    {c.label}
                  </text>
                </g>
              ))}

              {/* grandchild */}
              <g>
                <circle cx={290} cy={120} r="4" fill="#60A5FA" />
              </g>
            </svg>
          </div>

          {/* Audit timeline */}
          <div className="col-span-12 lg:col-span-5 rounded-xl border border-white/8 bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
              <Activity className="h-3 w-3" />
              Audit trail
            </div>
            <ul className="space-y-1.5 text-[11px] font-mono max-h-[200px] overflow-y-auto pr-1">
              {auditEvents.map((ev, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-slate-500 tabular-nums w-9 shrink-0">{ev.t}</span>
                  <CircleDot className="h-2.5 w-2.5 text-slate-600 shrink-0 mt-1" />
                  <span className={`${ev.c}`}>{ev.e}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom status strip */}
          <div className="col-span-12 rounded-lg border border-teal/20 bg-teal/5 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px]">
              <Clock className="h-3.5 w-3.5 text-teal" />
              <span className="text-slate-300">Receipt anchor</span>
              <span className="font-mono text-teal">base-sepolia</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-slate-400">
                merkle 0x4f…b2c1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-signal-green/15 text-signal-green border border-signal-green/30">
                ED25519 VERIFIED
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold/15 text-gold border border-gold/30">
                APACHE-2.0
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
