import { PublicNav } from "@/components/marketing/PublicNav";
import { PublicFooter } from "@/components/marketing/PublicFooter";
import { Hero } from "@/components/marketing/sections/Hero";
import { FeatureGrid } from "@/components/marketing/sections/FeatureGrid";
import { IntegrationsBand } from "@/components/marketing/sections/IntegrationsBand";
import { DashboardPreview } from "@/components/marketing/sections/DashboardPreview";
import { PricingPreview } from "@/components/marketing/sections/PricingPreview";
import { Testimonials } from "@/components/marketing/sections/Testimonials";
import { FAQ } from "@/components/marketing/sections/FAQ";
import { CTASection } from "@/components/marketing/sections/CTASection";

export default function LandingPage() {
  return (
    <main className="bg-bg-light text-ink-light overflow-hidden" data-testid="landing-page">
      <PublicNav />
      <Hero />
      <IntegrationsBand />
      <FeatureGrid />
      <DashboardPreview />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
      <PublicFooter />
    </main>
  );
}
