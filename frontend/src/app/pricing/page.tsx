import { PublicNav } from "@/components/marketing/PublicNav";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import { PricingPreview } from "@/components/marketing/sections/PricingPreview";
import { FAQ } from "@/components/marketing/sections/FAQ";
import { CTASection } from "@/components/marketing/sections/CTASection";

export default function PricingPage() {
  return (
    <main className="bg-bg-light text-ink-light" data-testid="pricing-page">
      <PublicNav />
      <div className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">Cabin Class</p>
        <h1 className="font-sora font-black tracking-tighter text-4xl md:text-6xl text-[#0F2D52] mt-2">
          Pricing built like a flight plan.
        </h1>
        <p className="mt-4 text-lg text-[#0F2D52]/70 max-w-2xl">
          Pick the cabin that matches your altitude. Upgrade or downgrade anytime — every plan includes a 14-day free trial.
        </p>
      </div>
      <PricingPreview />
      <FAQ />
      <CTASection />
      <PublicFooter />
    </main>
  );
}
