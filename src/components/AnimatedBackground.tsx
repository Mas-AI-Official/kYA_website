"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Section-driven background tints. Hero -> Problem -> Product -> Architecture -> Founder -> CTA
  const goldOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 1], [0.45, 0.25, 0.1, 0.3]);
  const tealOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [0.18, 0.35, 0.5, 0.4, 0.25]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const orb1X = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 200, -50]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scanY = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Deep base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Animated dot grid that moves with scroll */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-grid-fine opacity-60"
      />

      {/* Cross-hair grid layer */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,8,11,0.6)_70%,_rgba(5,8,11,1)_100%)]" />

      {/* Glow orbs that drift with scroll */}
      <motion.div
        style={{
          y: orb1Y,
          x: orb1X,
          opacity: goldOpacity,
        }}
        className="glow-orb"
        initial={false}
        animate={{
          width: ["38rem", "42rem", "38rem"],
          height: ["38rem", "42rem", "38rem"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.6), rgba(212,168,67,0) 70%)",
            top: "10%",
            left: "10%",
            position: "absolute",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          y: orb2Y,
          opacity: tealOpacity,
        }}
        className="glow-orb"
        initial={false}
        animate={{
          width: ["32rem", "38rem", "32rem"],
          height: ["32rem", "38rem", "32rem"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45,212,191,0.55), rgba(45,212,191,0) 70%)",
            top: "60%",
            right: "5%",
            position: "absolute",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          y: orb3Y,
          opacity: useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0.25, 0.4, 0.15]),
        }}
        className="glow-orb"
      >
        <div
          className="w-[28rem] h-[28rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.4), rgba(96,165,250,0) 70%)",
            top: "40%",
            left: "30%",
            position: "absolute",
          }}
        />
      </motion.div>

      {/* Scanline that descends with scroll */}
      {mounted && (
        <motion.div
          style={{ y: scanY }}
          className="absolute inset-x-0 h-[2px] pointer-events-none"
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-teal/40 to-transparent blur-[2px]" />
        </motion.div>
      )}

      {/* Subtle film grain */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
