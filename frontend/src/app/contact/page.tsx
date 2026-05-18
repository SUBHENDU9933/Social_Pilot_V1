import { PublicNav } from "@/components/marketing/PublicNav";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-bg-light text-ink-light" data-testid="contact-page">
      <PublicNav />
      <section className="pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">Hello</p>
            <h1 className="font-sora font-black tracking-tighter text-4xl md:text-5xl text-[#0F2D52] mt-3">
              Let's get you in the cockpit.
            </h1>
            <p className="mt-5 text-[#0F2D52]/70">
              Book a demo, ask about Agency plans, or just say hi. We typically respond in under 4 hours.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { Icon: Mail, label: "Email", value: "hello@postpilot.ai" },
                { Icon: MessageSquare, label: "Live chat", value: "Mon–Fri · 9am–6pm CET" },
                { Icon: MapPin, label: "HQ", value: "Berlin · Remote-first" },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#EAF4FF] grid place-items-center text-[#0F2D52]">
                    <row.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#4DA8FF] font-semibold">{row.label}</p>
                    <p className="text-[#0F2D52] font-medium">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
