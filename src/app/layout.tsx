import type { Metadata } from "next";
import "./globals.css";

// Font variables resolve to system stacks; we set them on <html> via inline style.
// We intentionally avoid next/font/google fetch so the app builds offline. To use
// Inter / JetBrains Mono, swap in `next/font/google` or self-host woff2 in /public/fonts.
const fontVars: React.CSSProperties = {
  // @ts-expect-error -- CSS custom property
  "--font-inter":
    "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  "--font-jetbrains":
    "'JetBrains Mono', ui-monospace, 'SF Mono', 'Menlo', 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kya.mas-ai.co"),
  title: "KYA Mission Control — Trust infrastructure for autonomous AI agents",
  description:
    "KYA Mission Control verifies who owns an agent, what it is allowed to do, and creates an auditable record before it acts, spends, transacts, or represents a business.",
  keywords: [
    "KYA",
    "Know Your Agent",
    "AI agent governance",
    "agent identity",
    "agent audit trail",
    "MAS-AI",
    "Daena",
    "agent passport",
    "agent receipts",
  ],
  authors: [{ name: "MAS-AI Technologies Inc." }],
  openGraph: {
    title: "KYA Mission Control — Trust infrastructure for autonomous AI agents",
    description:
      "Birth certificate to signed receipt. Cross-runtime, cross-surface. Live Mission Lab on Cloud Run with 9 interactive scenarios.",
    type: "website",
    siteName: "KYA Mission Control",
    locale: "en_US",
    images: [
      {
        url: "/kya-logo.png",
        width: 1200,
        height: 1200,
        alt: "KYA Mission Control — Identity · Governance · Access · Powered by MAS-AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYA Mission Control",
    description:
      "Trust infrastructure for autonomous AI agents. Identity, permissions, audit — before they act. Live demo on Cloud Run.",
    images: ["/kya-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/kya-logo.png", sizes: "any" },
    ],
    apple: [{ url: "/kya-logo.png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={fontVars}>
      <body className="font-sans antialiased text-slate-300 selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
