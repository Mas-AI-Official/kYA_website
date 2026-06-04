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
  title: "KYA Mission Control · Trust infrastructure for autonomous AI agents",
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
    title: "KYA Mission Control · Trust infrastructure for autonomous AI agents",
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
        alt: "KYA Mission Control · Identity · Governance · Access · Powered by MAS-AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYA Mission Control",
    description:
      "Trust infrastructure for autonomous AI agents. Identity, permissions, and audit before they act. Live demo on Cloud Run.",
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
// product Daena — cross-property entity linking raises AI citation probability.
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
      applicationSubCategory: "AI agent identity, governance, and audit",
      operatingSystem: "Cloud (Google Cloud Run), self-hostable",
      url: "https://kya.mas-ai.co",
      image: "https://kya.mas-ai.co/kya-logo.png",
      description:
        "KYA Mission Control verifies who owns an AI agent, what it is allowed to do, and creates an auditable, offline-verifiable record before the agent acts, spends, transacts, or represents a business. Birth certificate to signed receipt across MCP, APIs, browsers, and payment rails.",
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
