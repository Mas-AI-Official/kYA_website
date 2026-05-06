import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0A0E13",
          900: "#0F1419",
          850: "#141A21",
          800: "#1A2129",
          750: "#1F2731",
          700: "#252E39",
          600: "#3A4554",
          500: "#5A6678",
          400: "#7C8898",
          300: "#A4AEBC",
        },
        gold: {
          DEFAULT: "#D4A843",
          50: "#FBF5E5",
          100: "#F5E8BD",
          200: "#EDD68C",
          300: "#E3C460",
          400: "#D4A843",
          500: "#B58E2E",
          600: "#8E6E22",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          50: "#E6FBF8",
          100: "#B8F3EA",
          200: "#7EE7D6",
          300: "#4FDDC7",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0F8A7C",
        },
        ink: "#05080B",
        signal: {
          green: "#34D399",
          amber: "#FBBF24",
          red: "#F87171",
          blue: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "Menlo", "monospace"],
        display: ["var(--font-inter)", "ui-sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(212,168,67,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,168,67,0.06) 1px, transparent 1px)",
        "grid-pattern-fine":
          "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
        "radial-gold":
          "radial-gradient(circle at center, rgba(212,168,67,0.15) 0%, transparent 60%)",
        "radial-teal":
          "radial-gradient(circle at center, rgba(45,212,191,0.12) 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-gold": "0 0 40px -8px rgba(212,168,67,0.4)",
        "glow-teal": "0 0 40px -8px rgba(45,212,191,0.35)",
        "card": "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px -12px rgba(0,0,0,0.6)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 3s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite",
        "ticker": "ticker 30s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(100%)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -20px)" },
          "66%": { transform: "translate(-20px, 30px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
