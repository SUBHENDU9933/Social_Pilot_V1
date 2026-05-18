"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Plane, Calendar, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-faint-bg opacity-70" />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#4DA8FF]/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FF7A1A]/8 blur-3xl" />

      {/* Aviation graphics: compass rings */}
      <div className="hidden lg:block absolute right-[5%] top-[20%] w-[420px] h-[420px] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-[#4DA8FF]/15" />
        <div className="absolute inset-12 rounded-full border border-[#4DA8FF]/20" />
        <div className="absolute inset-24 rounded-full border border-dashed border-[#4DA8FF]/25" />
        <div className="absolute inset-36 rounded-full border border-[#4DA8FF]/15" />
        <div className="absolute inset-0 origin-center animate-sweep">
          <div className="absolute top-1/2 left-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-[#FF7A1A]/80 via-[#FF7A1A]/40 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF7A1A] shadow-[0_0_30px_10px_rgba(255,122,26,0.4)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A1A]/10 text-[#FF7A1A] text-xs font-semibold uppercase tracking-[0.2em] border border-[#FF7A1A]/20">
            <Sparkles className="w-3.5 h-3.5" />
            New · Multi-account autopilot
          </span>

          <h1 className="mt-6 font-sora font-black tracking-tighter text-[#0F2D52] text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
            Fly your social media on{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#0F2D52]">autopilot</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#FF7A1A]/30 -z-0 rounded-sm" />
            </span>
            .
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[#0F2D52]/70 max-w-2xl leading-relaxed">
            Plan, schedule, publish, and analyze every social account from one
            intelligent cockpit. One pilot. Every platform.{" "}
            <span className="text-[#0F2D52] font-semibold">One click.</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/auth/signup" data-testid="hero-cta-trial">
              <Button size="lg" className="group w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact" data-testid="hero-cta-demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <PlayCircle className="mr-2 w-4 h-4" />
                Book Demo
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#0F2D52]/60">
            <Stat icon={Plane} label="6+ Platforms" />
            <Stat icon={Calendar} label="Smart Queue & Calendar" />
            <Stat icon={BarChart3} label="Unified Analytics" />
          </div>
        </motion.div>

        {/* Hero card preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 lg:mt-24"
        >
          <HeroDashboardCard />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-md bg-[#0F2D52]/8 grid place-items-center text-[#0F2D52]">
        <Icon className="w-3.5 h-3.5" />
      </span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function HeroDashboardCard() {
  return (
    <div className="relative rounded-2xl border border-[#0F2D52]/10 bg-[#081826] p-2 shadow-[0_30px_80px_-30px_rgba(15,45,82,0.45)]">
      <div className="rounded-xl bg-[#081826] overflow-hidden border border-[#4DA8FF]/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#4DA8FF]/10">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="text-xs text-[#DDEBFF]/50 ml-3 font-mono">
            postpilot.ai / dashboard / today
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 p-5 md:p-7">
          {/* Sidebar */}
          <div className="hidden md:flex col-span-2 flex-col gap-2">
            {["Today", "Queue", "Calendar", "Analytics", "Channels", "Team"].map((l, i) => (
              <div
                key={l}
                className={`text-xs px-3 py-2 rounded-md ${i === 0 ? "bg-[#FF7A1A]/15 text-[#FF7A1A]" : "text-[#DDEBFF]/60"}`}
              >
                {l}
              </div>
            ))}
          </div>
          {/* Main */}
          <div className="col-span-12 md:col-span-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { l: "Scheduled", v: "48", c: "#4DA8FF" },
                { l: "Published", v: "1,284", c: "#FF7A1A" },
                { l: "Engagement", v: "+24%", c: "#10b981" },
                { l: "Reach", v: "92.4K", c: "#DDEBFF" },
              ].map((m) => (
                <div key={m.l} className="rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF]">{m.l}</p>
                  <p className="font-sora font-bold text-2xl mt-1.5" style={{ color: m.c }}>
                    {m.v}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-4 md:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF]">Today's Queue</p>
                <div className="mt-4 space-y-3">
                  {[
                    { t: "Spring sale launches today 🌸 #SS26", p: "FB · IG · LI", at: "10:00 AM" },
                    { t: "Behind the scenes: our new HQ tour →", p: "IG · YT", at: "12:30 PM" },
                    { t: "Customer story: ACME +312% growth", p: "LI · GBP", at: "4:00 PM" },
                  ].map((q) => (
                    <div key={q.t} className="flex items-center gap-3 text-xs text-[#DDEBFF]/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                      <span className="flex-1 truncate">{q.t}</span>
                      <span className="text-[#4DA8FF] hidden sm:inline">{q.p}</span>
                      <span className="text-[#DDEBFF]/40 font-mono">{q.at}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF]">Channels</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["FB", "IG", "LI", "PT", "GBP", "YT"].map((c) => (
                    <div
                      key={c}
                      className="aspect-square rounded-md border border-[#4DA8FF]/15 grid place-items-center text-xs font-bold text-[#DDEBFF]/80"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
