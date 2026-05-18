"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Get a feel for the cockpit.",
    cta: "Start Free",
    href: "/auth/signup?plan=free",
    features: ["3 channels", "10 scheduled posts", "Basic analytics", "1 user"],
    highlight: false,
  },
  {
    name: "Essentials",
    price: "$15",
    period: "/ mo",
    desc: "For solo creators ready to scale.",
    cta: "Start Free Trial",
    href: "/auth/signup?plan=essentials",
    features: ["8 channels", "Unlimited posts", "Calendar + queue", "Full analytics"],
    highlight: false,
  },
  {
    name: "Team",
    price: "$65",
    period: "/ mo",
    desc: "Run a tight in-house team.",
    cta: "Start Free Trial",
    href: "/auth/signup?plan=team",
    features: ["25 channels", "3 team members", "Draft approvals", "Audit logs", "Priority support"],
    highlight: true,
  },
  {
    name: "Agency",
    price: "$199",
    period: "/ mo",
    desc: "Operate multiple brands at scale.",
    cta: "Contact Sales",
    href: "/contact?plan=agency",
    features: ["Unlimited channels", "10 workspaces", "Unlimited users", "Custom reports", "SSO + SLA"],
    highlight: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 md:py-32" data-testid="pricing-preview">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Cabin Class
          </span>
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl text-[#0F2D52] mt-3">
            Simple, predictable pricing.
          </h2>
          <p className="mt-5 text-lg text-[#0F2D52]/70">
            Start free. Upgrade when your routes get busier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all hover:-translate-y-1 ${
                p.highlight
                  ? "bg-[#0F2D52] text-[#DDEBFF] border-[#0F2D52] shadow-2xl"
                  : "bg-white border-[#0F2D52]/10 text-[#0F2D52]"
              }`}
              data-testid={`plan-card-${p.name.toLowerCase()}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#FF7A1A] text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                  Most popular
                </span>
              )}
              <h3 className="font-sora text-lg font-bold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-sora text-4xl font-black">{p.price}</span>
                <span className={p.highlight ? "text-[#DDEBFF]/60" : "text-[#0F2D52]/60"}>
                  {p.period}
                </span>
              </div>
              <p className={`mt-3 text-sm ${p.highlight ? "text-[#DDEBFF]/75" : "text-[#0F2D52]/70"}`}>
                {p.desc}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        p.highlight ? "text-[#FF7A1A]" : "text-[#FF7A1A]"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="mt-6 block">
                <Button
                  className="w-full"
                  variant={p.highlight ? "default" : "outline"}
                  data-testid={`plan-cta-${p.name.toLowerCase()}`}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
