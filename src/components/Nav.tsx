"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Architecture", href: "#architecture" },
  { label: "Identity", href: "#identity" },
  { label: "Live Lab", href: "#live-lab", highlight: true },
  { label: "Compare", href: "#compare" },
  { label: "Founder", href: "#founder" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-gold/40 to-teal/30 blur-md opacity-60 group-hover:opacity-100 transition" />
            <span className="relative h-8 w-8 rounded-md overflow-hidden border border-gold/40 bg-slate-950">
              <Image
                src="/kya-logo.png"
                alt="KYA"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </span>
          </span>
          <span className="font-display text-[15px] tracking-tight text-white">
            KYA <span className="text-slate-400">Mission Control</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 text-[13px] transition rounded-md ${
                link.highlight
                  ? "text-teal hover:text-white hover:bg-teal/10 inline-flex items-center gap-1.5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.highlight && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
                </span>
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://mas-ai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-9 items-center gap-1.5 px-3 rounded-md text-[13px] text-slate-300 hover:text-white border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition"
            title="Parent company · MAS-AI Technologies Inc."
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
            mas-ai.co
          </a>
          <a
            href="https://github.com/Mas-AI-Official/kYA_website"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-9 items-center px-3 rounded-md text-[13px] text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
          >
            GitHub
          </a>
          <a
            href="#join-beta"
            className="inline-flex h-9 items-center px-4 rounded-md text-[13px] font-medium text-ink bg-gold hover:bg-gold-300 shadow-glow-gold transition"
          >
            Join private beta
          </a>
        </div>
      </div>
    </motion.header>
  );
}
