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
  title: "KYA Mission Control · Prove what your AI agent actually did",
  description:
    "KYA Mission Control turns every autonomous agent run into a signed, verifiable Mission Receipt: what it was allowed to do, what it did, and what it spent.",
  keywords: [
    "KYA",
    "Know Your Agent",
    "Agent Mission Infrastructure",
    "AI agent accountability",
    "AI agent governance",
    "agent audit trail",
    "EU AI Act compliance",
    "MAS-AI",
    "Daena",
    "agent passport",
    "agent receipts",
  ],
  authors: [{ name: "MAS-AI Technologies Inc." }],
  openGraph: {
    title: "KYA Mission Control · Prove what your AI agent actually did",
    description:
      "Every agent run becomes a signed Mission Receipt. Cross-runtime, cross-surface, offline-verifiable. Live Mission Lab on Cloud Run with 9 interactive scenarios.",
    type: "website",
    siteName: "KYA Mission Control",
    locale: "en_US",
    images: [
      {
        url: "/kya-logo.png",
        width: 1200,
        height: 1200,
        alt: "KYA Mission Control · Identity · Governance · Access · Powered by MAS-AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYA Mission Control",
    description:
      "Prove what your AI agent actually did. A signed, offline-verifiable Mission Receipt for every run, across any runtime. Live demo on Cloud Run.",
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
  alternates: {
    canonical: "/",
  },
};

// JSON-LD entity graph for AI search (ChatGPT, Perplexity, Claude, Gemini) and
// Google rich results. Stable @id values link KYA to the shared MAS-AI
// Organization entity (https://mas-ai.co/#organization) and to its sibling
// product Daena. Cross-property entity linking raises AI citation probability.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mas-ai.co/#organization",
      name: "MAS-AI Technologies Inc.",
      alternateName: ["MAS-AI", "MAS-AI Technologies"],
      url: "https://mas-ai.co",
      sameAs: [
        "https://github.com/Mas-AI-Official",
        "https://www.linkedin.com/in/masoud-masoori",
        "https://daena.mas-ai.co",
      ],
    },
    {
      "@type": ["SoftwareApplication", "Product"],
      "@id": "https://kya.mas-ai.co/#kya",
      name: "KYA Mission Control",
      alternateName: ["KYA", "Know Your Agent"],
      applicationCategory: "SecurityApplication",
      applicationSubCategory: "AI agent accountability, governance, and audit",
      operatingSystem: "Cloud (Google Cloud Run), self-hostable",
      url: "https://kya.mas-ai.co",
      image: "https://kya.mas-ai.co/kya-logo.png",
      description:
        "KYA Mission Control turns every autonomous AI agent run into a signed, offline-verifiable Mission Receipt: what the agent was allowed to do, what it actually did, and what it spent. Portable proof across MCP, APIs, browsers, and payment rails, on any runtime.",
      slogan:
        "Other tools control a tool call. We control the whole mission lifecycle.",
      creator: { "@id": "https://mas-ai.co/#organization" },
      publisher: { "@id": "https://mas-ai.co/#organization" },
      featureList: [
        "Agent identity registry",
        "Ownership verification",
        "Permission policies",
        "Risk scoring",
        "Audit logs",
        "Compliance reports",
        "Platform API",
        "Agent reputation",
        "Ed25519-signed receipts",
        "RFC 9421 HTTP Message Signatures",
        "Offline receipt verification",
        "FIDO2 passkey operator step-up at mission authorization",
        "Separated operator and agent identity",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        description: "Live Mission Lab demo on Google Cloud Run; waitlist open.",
      },
      isRelatedTo: {
        "@type": "SoftwareApplication",
        name: "Daena",
        url: "https://daena.mas-ai.co",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://kya.mas-ai.co/#website",
      name: "KYA Mission Control",
      url: "https://kya.mas-ai.co",
      publisher: { "@id": "https://mas-ai.co/#organization" },
      about: { "@id": "https://kya.mas-ai.co/#kya" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={fontVars}>
      <body className="font-sans antialiased text-slate-300 selection:bg-gold/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
