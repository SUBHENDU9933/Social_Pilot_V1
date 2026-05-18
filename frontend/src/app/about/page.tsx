import Image from "next/image";
import { PublicNav } from "@/components/marketing/PublicNav";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import { CTASection } from "@/components/marketing/sections/CTASection";

const PILLARS = [
  {
    title: "Calm by design",
    body:
      "Most social tools feel like a runway crash. We design PostPilot like an autopilot — quiet, dependable, beautifully calibrated.",
  },
  {
    title: "Built for operators",
    body:
      "We obsess over the rituals of busy marketing teams: Monday queue reviews, agency client switching, mid-campaign edits.",
  },
  {
    title: "Privacy & security first",
    body:
      "Encrypted tokens, RLS-locked databases, audit logs out of the box. We build like a regulated platform from day one.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-bg-light text-ink-light" data-testid="about-page">
      <PublicNav />
      <section className="pt-32 pb-20 px-6 lg:px-10 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">Our Mission</p>
        <h1 className="font-sora font-black tracking-tighter text-4xl md:text-6xl text-[#0F2D52] mt-3 max-w-3xl leading-[1.05]">
          We're building social media on autopilot — without the chaos.
        </h1>
        <p className="mt-6 text-lg text-[#0F2D52]/70 max-w-2xl">
          PostPilot AI was founded by social media operators who were tired of stitching together
          five disconnected tools. We're rebuilding the category around one calm, intelligent cockpit.
        </p>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-20">
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwzfHxjcmVhdGl2ZSUyMG1hcmtldGluZyUyMHRlYW0lMjB3b3JraW5nfGVufDB8fHx8MTc3OTEyNzgzMXww&ixlib=rb-4.1.0&q=85"
            alt="Marketing team collaborating"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[#0F2D52]/10 bg-white p-8"
              data-testid={`about-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h3 className="font-sora font-bold text-xl text-[#0F2D52]">{p.title}</h3>
              <p className="mt-3 text-sm text-[#0F2D52]/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <PublicFooter />
    </main>
  );
}
