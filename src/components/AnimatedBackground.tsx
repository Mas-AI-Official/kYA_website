"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/**
 * Background system. Layers, top-to-bottom:
 *   1. Deep ink base
 *   2. Drifting grid (parallax with scroll)
 *   3. Glow orbs (parallax + opacity tied to scroll progress)
 *   4. Scanline (descends with scroll)
 *   5. Cursor-reactive spotlight (follows mouse, lazy-spring smoothed)
 *   6. Network pulse (SVG paths animating between fixed nodes)
 *   7. Vignette + film grain
 *
 * Design rule: motion telegraphs the product. KYA is about routing missions
 * across surfaces in real time, so the background quietly performs that:
 * pulses travel between nodes, the cursor draws a beam, the grid breathes.
 */
export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven values
  const goldOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 1], [0.45, 0.25, 0.1, 0.3]);
  const tealOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [0.18, 0.35, 0.5, 0.4, 0.25]);
  const blueOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0.25, 0.4, 0.15]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const orb1X = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 200, -50]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scanY = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  // Cursor spotlight, raw mouse coords smoothed with a lazy spring
  // for that premium "the page is following you" feel.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 80, mass: 0.8 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 80, mass: 0.8 });
  const spotlightX = useTransform(springX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(springY, (v) => `${v * 100}%`);

  // Pre-compute both spotlight gradient strings at the top level (hooks must
  // not be called conditionally, these are always computed, used or not).
  const spotlightGold = useTransform(
    [spotlightX, spotlightY] as never,
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(212,168,67,0.13), transparent 60%)`,
  );
  const spotlightTeal = useTransform(
    [spotlightX, spotlightY] as never,
    ([x, y]: string[]) =>
      `radial-gradient(220px circle at ${x} ${y}, rgba(45,212,191,0.10), transparent 70%)`,
  );

  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    m.addEventListener("change", onChange);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      m.removeEventListener("change", onChange);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* 1. Deep base */}
      <div className="absolute inset-0 bg-ink" />

      {/* 2. Animated dot grid that moves with scroll */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-grid-fine opacity-60"
      />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* 3. Glow orbs that drift with scroll */}
      <motion.div
        style={{ y: orb1Y, x: orb1X, opacity: goldOpacity }}
        className="glow-orb"
        animate={
          reduceMotion
            ? undefined
            : { width: ["38rem", "42rem", "38rem"], height: ["38rem", "42rem", "38rem"] }
        }
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
        style={{ y: orb2Y, opacity: tealOpacity }}
        className="glow-orb"
        animate={
          reduceMotion
            ? undefined
            : { width: ["32rem", "38rem", "32rem"], height: ["32rem", "38rem", "32rem"] }
        }
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

      <motion.div style={{ y: orb3Y, opacity: blueOpacity }} className="glow-orb">
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

      {/* 4. Scanline that descends with scroll */}
      {mounted && !reduceMotion && (
        <motion.div
          style={{ y: scanY }}
          className="absolute inset-x-0 h-[2px] pointer-events-none"
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-teal/40 to-transparent blur-[2px]" />
        </motion.div>
      )}

      {/* 5. Cursor-reactive spotlight, premium "page is alive" feel.
            On touch devices the springs settle at center (50%, 50%) and stay there. */}
      {mounted && !reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: spotlightGold }}
        />
      )}
      {mounted && !reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{ background: spotlightTeal }}
        />
      )}

      {/* 6. Network pulse, fixed-position SVG nodes with traveling pulses.
            Renders only while the user is near the top of the page (visible
            in hero/architecture viewport). */}
      {mounted && !reduceMotion && <NetworkPulse />}

      {/* 7. Vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,8,11,0.55)_70%,_rgba(5,8,11,1)_100%)]" />

      {/* 8. Subtle film grain */}
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

/**
 * Network pulse: 5 fixed nodes + animated paths between them.
 * Echoes KYA's mission-routing story: signals travel from hub to surfaces.
 */
function NetworkPulse() {
  // Anchor coordinates (% of viewport). Tuned to live in the negative space
  // around the hero dashboard without competing with foreground content.
  const nodes = [
    { id: "hub", x: 50, y: 16, label: "mission" },
    { id: "n1", x: 12, y: 30, label: "mcp" },
    { id: "n2", x: 88, y: 28, label: "api" },
    { id: "n3", x: 18, y: 78, label: "browser" },
    { id: "n4", x: 82, y: 82, label: "wallet" },
  ];
  const edges: Array<[string, string, number]> = [
    ["hub", "n1", 0],
    ["hub", "n2", 0.6],
    ["hub", "n3", 1.2],
    ["hub", "n4", 1.8],
  ];

  const lookup = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A843" stopOpacity="0" />
          <stop offset="50%" stopColor="#D4A843" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#D4A843" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* edges (faint static guide) */}
      {edges.map(([a, b, _delay], i) => (
        <line
          key={`e-${i}`}
          x1={lookup[a].x}
          y1={lookup[a].y}
          x2={lookup[b].x}
          y2={lookup[b].y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.08"
        />
      ))}

      {/* traveling pulse along each edge, staggered offsets
          create the continuous "missions are running" feel. */}
      {edges.map(([a, b, delay], i) => {
        const ax = lookup[a].x;
        const ay = lookup[a].y;
        const bx = lookup[b].x;
        const by = lookup[b].y;
        const len = Math.hypot(bx - ax, by - ay);
        return (
          <line
            key={`p-${i}`}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke="url(#pulse-grad)"
            strokeWidth="0.18"
            strokeDasharray={`${len * 0.18} ${len}`}
            strokeLinecap="round"
            style={{
              animation: `pulse-travel-${i} 4s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="1.2" fill="url(#node-glow)" opacity="0.5" />
          <circle cx={n.x} cy={n.y} r="0.4" fill="#D4A843" />
        </g>
      ))}

      {/* per-edge keyframe animations, defined once, reused.
          Length-aware dashoffset gives smooth travel regardless of edge length. */}
      <style>{`
        ${edges
          .map((_, i) => {
            const a = edges[i][0];
            const b = edges[i][1];
            const len = Math.hypot(
              lookup[b].x - lookup[a].x,
              lookup[b].y - lookup[a].y,
            ).toFixed(2);
            return `@keyframes pulse-travel-${i} {
              from { stroke-dashoffset: ${len}; }
              to   { stroke-dashoffset: -${len}; }
            }`;
          })
          .join("\n")}
      `}</style>
    </svg>
  );
}
