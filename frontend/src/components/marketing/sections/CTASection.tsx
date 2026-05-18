import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-6 lg:px-10 py-20" data-testid="cta-section">
      <div className="max-w-7xl mx-auto bg-[#081826] text-[#DDEBFF] rounded-3xl p-12 md:p-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-faint-bg-dark opacity-50" />
        <div className="absolute -right-32 -top-32 w-[480px] h-[480px] rounded-full bg-[#FF7A1A]/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl leading-tight">
            Ready for takeoff?
          </h2>
          <p className="mt-5 text-lg text-[#DDEBFF]/75">
            Connect your first channel in 30 seconds. Start shipping content like a Fortune 500 team
            — without the headcount.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto" data-testid="cta-bottom-trial">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="darkOutline" className="w-full sm:w-auto" data-testid="cta-bottom-demo">
                Book Demo
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-xs text-[#4DA8FF] uppercase tracking-[0.25em]">
            14-day free trial · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
