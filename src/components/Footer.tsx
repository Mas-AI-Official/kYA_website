import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

type Link = readonly [string, string];

const product: Link[] = [
  ["Live Mission Lab", "https://kya-mission-lab-szw3mq5rma-nn.a.run.app/console/"],
  ["API docs", "https://kya-mission-lab-szw3mq5rma-nn.a.run.app/docs"],
  ["GitHub repo", "https://github.com/Mas-AI-Official/KYA_Mission_Control"],
  ["Receipt spec", "https://github.com/Mas-AI-Official/KYA_Mission_Control/blob/main/spec/kya-mission-receipt-spec.md"],
];

const company: Link[] = [
  ["MAS-AI", "https://mas-ai.co"],
  ["Daena", "https://mas-ai.co/daena"],
  ["Founder", "#founder"],
  ["Press kit", "#"],
];

const legal: Link[] = [
  ["License: Apache 2.0", "#"],
  ["Security", "mailto:security@mas-ai.co"],
  ["Privacy", "#"],
  ["Terms", "#"],
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 mt-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gold/30 bg-slate-950 shrink-0">
                <Image
                  src="/kya-logo.png"
                  alt="KYA Mission Control"
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div>
                <div className="text-white font-display text-[15px]">
                  KYA Mission Control
                </div>
                <div className="text-[11px] text-slate-500">
                  by MAS-AI Technologies Inc.
                </div>
              </div>
            </div>
            <p className="mt-5 text-[13px] text-slate-500 max-w-sm leading-relaxed">
              The trust and execution layer for AI agent missions. Birth
              certificate to signed receipt across MCP, APIs, browsers, and
              payment rails.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/Mas-AI-Official/KYA_Mission_Control"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-9 w-9 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/masoud-masoori"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@mas-ai.co"
                aria-label="Email"
                className="h-9 w-9 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol title="Product" items={product} />
          <FooterCol title="Company" items={company} />
          <FooterCol title="Legal & security" items={legal} />
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-slate-500">
          <div>
            © 2026 MAS-AI Technologies Inc. · Toronto, ON, Canada · Built with
            care, in Canada.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">v0.1.0 · Apache-2.0</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-teal/20 bg-teal/5 text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
              Private beta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly Link[];
}) {
  return (
    <div className="md:col-span-2">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13.5px] text-slate-300 hover:text-white transition"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
