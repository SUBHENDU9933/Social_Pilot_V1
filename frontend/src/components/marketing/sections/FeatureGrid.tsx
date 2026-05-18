"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Layers,
  BarChart3,
  Users,
  Send,
  Compass,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Multi-Channel Composer",
    desc: "Write once, tailor per platform. Hashtags, media, character limits and previews for every network — all in one cockpit.",
    accent: false,
  },
  {
    icon: Calendar,
    title: "Smart Queue & Calendar",
    desc: "Drop posts into slots, drag-and-drop the calendar, or schedule with timezone-aware precision. Buffer-grade workflows.",
    accent: true,
  },
  {
    icon: BarChart3,
    title: "Unified Analytics",
    desc: "Reach, engagement, clicks, follower growth — across Facebook, Instagram, LinkedIn, Pinterest, GBP and YouTube.",
    accent: false,
  },
  {
    icon: Users,
    title: "Team Workspaces",
    desc: "Roles, draft approvals, audit trails. Owner, Admin, Editor and Viewer permissions with workspace isolation.",
    accent: false,
  },
  {
    icon: Layers,
    title: "Per-Platform Variants",
    desc: "Custom captions, hashtags and media for every account. Tailor your YouTube title separately from your Instagram caption.",
    accent: false,
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "AES-encrypted OAuth tokens, RLS in Postgres, RBAC, audit logs. Built like a SOC 2-ready platform from day one.",
    accent: false,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 md:py-32 relative" data-testid="feature-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Pilot Console
          </span>
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl text-[#0F2D52] mt-3">
            Everything you need to fly faster than your competitors.
          </h2>
          <p className="mt-5 text-lg text-[#0F2D52]/70 max-w-xl">
            PostPilot AI replaces five disconnected tools with one calm, intelligent cockpit
            built for marketers who ship daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`group relative rounded-xl border p-7 transition-all hover:-translate-y-1 ${
                f.accent
                  ? "bg-[#0F2D52] text-[#DDEBFF] border-[#0F2D52]"
                  : "bg-white border-[#0F2D52]/10 hover:border-[#4DA8FF]/40"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-lg grid place-items-center ${
                  f.accent ? "bg-[#FF7A1A] text-white" : "bg-[#EAF4FF] text-[#0F2D52]"
                }`}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <h3
                className={`font-sora font-bold text-xl mt-5 ${
                  f.accent ? "text-[#DDEBFF]" : "text-[#0F2D52]"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`text-sm mt-3 leading-relaxed ${
                  f.accent ? "text-[#DDEBFF]/75" : "text-[#0F2D52]/70"
                }`}
              >
                {f.desc}
              </p>
              {f.accent && (
                <div className="absolute top-5 right-5 opacity-30">
                  <Compass className="w-12 h-12" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Secondary band */}
        <div className="mt-20 rounded-2xl bg-[#081826] text-[#DDEBFF] p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-faint-bg-dark opacity-50" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Sparkles className="w-6 h-6 text-[#FF7A1A] mb-4" />
              <h3 className="font-sora text-2xl md:text-4xl font-bold tracking-tight">
                Built for agencies. Loved by solo creators.
              </h3>
              <p className="mt-4 text-[#DDEBFF]/70 max-w-md">
                Manage unlimited brands inside workspace silos. Switch context faster than
                your competition can hit "Post".
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E", "Brand F"].map((b) => (
                <div
                  key={b}
                  className="aspect-square rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-4 grid place-items-center text-center hover:border-[#FF7A1A]/40 transition-colors"
                >
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#4DA8FF]/20 mx-auto mb-2" />
                    <p className="text-xs">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
