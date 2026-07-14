import AnimatedBackground from "@/components/AnimatedBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Problem from "@/components/sections/Problem";
import Product from "@/components/sections/Product";
import HowItWorks from "@/components/sections/HowItWorks";
import Architecture from "@/components/sections/Architecture";
import Identity from "@/components/sections/Identity";
import LiveLab from "@/components/sections/LiveLab";
import UseCases from "@/components/sections/UseCases";
import WhyNow from "@/components/sections/WhyNow";
import Comparison from "@/components/sections/Comparison";
import Founder from "@/components/sections/Founder";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-200 overflow-x-clip">
      <AnimatedBackground />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <TrustStrip />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <Product />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <Architecture />
        <SectionDivider />
        <Identity />
        <SectionDivider />
        <LiveLab />
        <SectionDivider />
        <UseCases />
        <SectionDivider />
        <WhyNow />
        <SectionDivider />
        <Comparison />
        <SectionDivider />
        <Founder />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto max-w-7xl px-6 sm:px-10"
    >
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
        }}
      />
    </div>
  );
}
