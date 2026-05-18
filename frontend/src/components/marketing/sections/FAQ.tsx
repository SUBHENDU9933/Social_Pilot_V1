"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Which platforms does PostPilot AI support?",
    a: "Facebook, Instagram, LinkedIn, Pinterest, Google Business Profile, YouTube, and X (Twitter). All accounts connect via OAuth — no API keys required.",
  },
  {
    q: "Do I need API keys or developer accounts?",
    a: "Never. PostPilot owns the platform integrations. You just click 'Connect' and approve access — exactly like Buffer or Hootsuite.",
  },
  {
    q: "Can I schedule different captions per platform?",
    a: "Yes. The composer supports full per-platform variants — captions, hashtags, media and Pinterest boards can all be tailored individually.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Our Free plan supports 3 channels and 10 scheduled posts — perfect to try the cockpit before you commit.",
  },
  {
    q: "How does team collaboration work?",
    a: "Invite teammates as Owner, Admin, Editor or Viewer. Editors draft, Admins approve, Owners control billing. Full audit logs for compliance.",
  },
  {
    q: "How secure are my social tokens?",
    a: "All OAuth tokens are encrypted at rest with AES-256-GCM. Database access is enforced via Postgres Row Level Security. Tokens never touch the browser.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 md:py-32" data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Pre-flight checklist
          </span>
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl text-[#0F2D52] mt-3">
            Questions before takeoff?
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger data-testid={`faq-trigger-${i}`}>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
