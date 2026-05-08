"use client";

import { motion } from "framer-motion";
import { Maximize2, ExternalLink, CircleDot } from "lucide-react";

/**
 * HeroVideo: real KYA Mission Lab in motion.
 *
 * Replaces the previous simulated "agent passport / trust meter" dashboard.
 * Why: the simulation looked like every other AI dashboard; it didn't
 * differentiate. The real lab footage shows our actual product running
 * live API calls + emitting cryptographically signed receipts.
 *
 * Performance:
 *   - <video> with WebM (1.2 MB) preferred + MP4 (1.4 MB) fallback
 *   - poster (100 KB JPG) paints instantly while video loads
 *   - autoplay muted loop playsinline (mobile-safe)
 *   - preload="metadata" so we don't fetch full bytes until the user
 *     scrolls to it (saves bandwidth for bouncers)
 *
 * Mobile:
 *   - Full-width on small screens with the same aspect ratio (16:9-ish)
 *   - Lab UI text in the video is small at <400px viewport, so we add
 *     a one-line summary overlay below the video on every breakpoint
 */

const LAB_URL = "https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/";

export default function HeroVideo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="relative w-full"
    >
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] opacity-70 blur-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,168,67,0.22), transparent 35%, rgba(45,212,191,0.18))",
        }}
      />

      {/* Browser-chrome frame so the video reads as "this IS the live product" */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-900/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-slate-400 truncate">
              kya-mission-lab.run.app/console/
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-green" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-mono">
              LIVE · running now
            </span>
          </div>
        </div>

        {/* Video itself.
            aspect-[16/9] keeps it the same shape on every device.
            Source order matters: first match wins; WebM is smaller so put
            it first for browsers that support it. */}
        <div className="relative aspect-[16/9] w-full bg-slate-950">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/kya-process-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="KYA Mission Lab walkthrough: scenario selection, real RFC 9421 signed requests, live event log, signed mission receipt with offline verification"
          >
            <source src="/kya-process.webm" type="video/webm" />
            <source src="/kya-process.mp4" type="video/mp4" />
            {/* If neither plays (very old browsers), fall back to poster. */}
            <img
              src="/kya-process-poster.jpg"
              alt="KYA Mission Lab interface"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Click-to-fullscreen / open-lab overlay */}
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium text-white bg-black/60 backdrop-blur-md border border-white/15 hover:bg-black/80 hover:border-gold/40 transition"
          >
            <ExternalLink className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Try it yourself
          </a>
        </div>

        {/* Caption bar — explains what the viewer is watching, in one line */}
        <div className="border-t border-white/5 bg-slate-900/60 px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <CircleDot className="h-3 w-3 text-gold" />
            <span className="font-mono">scenario picker</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <CircleDot className="h-3 w-3 text-teal" />
            <span className="font-mono">live event log</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <CircleDot className="h-3 w-3 text-signal-blue" />
            <span className="font-mono">signed mission receipt</span>
          </span>
          <span className="ml-auto text-slate-500 hidden sm:inline">
            real RFC 9421 + Ed25519 · offline-verifiable
          </span>
        </div>
      </div>

      {/* Mobile-only summary line below the frame — text in the video is
          tiny on phones, so we restate the value in plain copy. */}
      <p className="mt-4 text-center text-[12.5px] text-slate-400 sm:hidden">
        <Maximize2 className="inline h-3 w-3 mr-1 align-text-bottom" />
        Tap "Try it yourself" to open the full lab. Real signed requests, real
        Ed25519 receipts, offline-verifiable.
      </p>
    </motion.div>
  );
}
