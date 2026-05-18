"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Send,
  Eye,
  PenLine,
  Activity,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MOCK_KPIS = [
  { label: "Scheduled posts", value: "48", trend: "+12", icon: Calendar, color: "#4DA8FF" },
  { label: "Published this week", value: "127", trend: "+8%", icon: Send, color: "#FF7A1A" },
  { label: "Total reach", value: "92.4K", trend: "+24%", icon: Eye, color: "#DDEBFF" },
  { label: "Engagement rate", value: "5.8%", trend: "+1.2pp", icon: Activity, color: "#10b981" },
];

const MOCK_QUEUE = [
  { time: "Today · 10:00", title: "Spring sale launches today 🌸 #SS26", platforms: ["facebook", "instagram", "linkedin"] },
  { time: "Today · 14:30", title: "Behind the scenes: HQ tour", platforms: ["instagram", "youtube"] },
  { time: "Today · 17:00", title: "Customer story: ACME +312% growth", platforms: ["linkedin", "google_business"] },
  { time: "Tomorrow · 09:00", title: "Weekly product digest →", platforms: ["facebook", "linkedin"] },
];

const MOCK_CHANNELS = [
  { p: "facebook", name: "Northwind Co.", status: "connected" },
  { p: "instagram", name: "@northwind.studio", status: "connected" },
  { p: "linkedin", name: "Northwind / Company", status: "connected" },
  { p: "youtube", name: "Northwind TV", status: "needs_reconnect" },
  { p: "pinterest", name: "@northwind", status: "disconnected" },
  { p: "google_business", name: "Northwind HQ", status: "connected" },
];

const PLATFORM_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: ImageIcon,
  google_business: MapPin,
} as Record<string, React.ComponentType<{ className?: string }>>;

export function DashboardOverview() {
  return (
    <div className="space-y-6" data-testid="dashboard-overview">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Mission Control
          </p>
          <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">
            Welcome back, Captain.
          </h1>
          <p className="text-[#DDEBFF]/65 text-sm mt-1">
            Here's what's flying across your channels today.
          </p>
        </div>
        <Link
          href="/composer"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-[#FF7A1A] text-white font-semibold hover:bg-[#FF7A1A]/90 transition"
          data-testid="overview-new-post"
        >
          <PenLine className="w-4 h-4" /> Compose new post
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-5"
            data-testid={`kpi-${k.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] font-bold">
                {k.label}
              </span>
              <k.icon className="w-4 h-4 text-[#DDEBFF]/40" />
            </div>
            <p className="font-sora font-black text-3xl mt-3" style={{ color: k.color }}>
              {k.value}
            </p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {k.trend} this week
            </p>
          </motion.div>
        ))}
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Queue */}
        <div className="lg:col-span-2 rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6" data-testid="queue-widget">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] font-bold">
                Up next
              </p>
              <h2 className="font-sora text-xl font-bold mt-1">Today's queue</h2>
            </div>
            <Link href="/queue" className="text-xs text-[#4DA8FF] flex items-center gap-1 hover:underline">
              See all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_QUEUE.map((q, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg border border-dashed border-[#4DA8FF]/15 hover:border-[#FF7A1A]/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                <span className="font-mono text-xs text-[#4DA8FF] w-32 shrink-0">{q.time}</span>
                <p className="flex-1 text-sm truncate">{q.title}</p>
                <div className="flex gap-1.5">
                  {q.platforms.map((p) => {
                    const Icon = PLATFORM_ICONS[p];
                    return Icon ? (
                      <span key={p} className="w-6 h-6 rounded-md bg-[#081826] grid place-items-center">
                        <Icon className="w-3 h-3 text-[#4DA8FF]" />
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6" data-testid="channels-widget">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] font-bold">
                Connected
              </p>
              <h2 className="font-sora text-xl font-bold mt-1">Channels</h2>
            </div>
            <Link href="/channels" className="text-xs text-[#4DA8FF] flex items-center gap-1 hover:underline">
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {MOCK_CHANNELS.map((c) => {
              const Icon = PLATFORM_ICONS[c.p];
              const dot =
                c.status === "connected"
                  ? "bg-emerald-400"
                  : c.status === "needs_reconnect"
                    ? "bg-amber-400"
                    : "bg-red-400";
              return (
                <div
                  key={c.name}
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#081826] transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4 text-[#4DA8FF]" />}
                  <p className="text-sm truncate flex-1">{c.name}</p>
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance chart placeholder */}
      <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] font-bold">
              7-day performance
            </p>
            <h2 className="font-sora text-xl font-bold mt-1">Reach & engagement</h2>
          </div>
          <Link href="/analytics" className="text-xs text-[#4DA8FF] flex items-center gap-1 hover:underline">
            Open analytics <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="h-48 flex items-end gap-2">
          {[42, 58, 50, 70, 62, 88, 76].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1 flex-1 justify-end">
                <div className="rounded-t bg-[#FF7A1A]" style={{ height: `${h}%` }} />
                <div className="rounded-t bg-[#4DA8FF]/60" style={{ height: `${h * 0.55}%` }} />
              </div>
              <span className="text-[10px] text-[#DDEBFF]/40 font-mono">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 text-xs text-[#DDEBFF]/65">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#FF7A1A]" /> Reach</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#4DA8FF]/60" /> Engagement</span>
        </div>
      </div>
    </div>
  );
}
