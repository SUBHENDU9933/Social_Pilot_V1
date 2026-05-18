"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  FileText,
  PieChart,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Image as ImageIcon,
  Twitter,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const KPIS = [
  { label: "Scheduled Today", value: "12", trend: "+20%", note: "vs yesterday", icon: CalendarIcon, color: "#FF7A00", bg: "bg-brand/10" },
  { label: "Posts This Week", value: "48", trend: "+8%", note: "vs last week", icon: FileText, color: "#2563EB", bg: "bg-accent-blue/10" },
  { label: "Total Reach", value: "92.4K", trend: "+24%", note: "vs last week", icon: TrendingUp, color: "#10B981", bg: "bg-success/10" },
  { label: "Engagement Rate", value: "5.8%", trend: "+1.2pp", note: "vs last week", icon: PieChart, color: "#9333EA", bg: "bg-purple-500/10" },
];

const QUEUE_ITEMS = [
  {
    when: "Today",
    time: "10:00 AM",
    title: "Spring sale launches today 🌸",
    sub: "Get up to 30% off on all products...",
    platform: "facebook",
    thumb: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&h=120&fit=crop",
    status: "Scheduled",
  },
  {
    when: "Today",
    time: "2:30 PM",
    title: "Behind the scenes: HQ tour",
    sub: "Take a look at how we work behind...",
    platform: "instagram",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&h=120&fit=crop",
    status: "Scheduled",
  },
  {
    when: "Today",
    time: "5:00 PM",
    title: "Customer story: ACME +312% growth",
    sub: "How ACME scaled their business...",
    platform: "linkedin",
    thumb: null,
    label: "ACME",
    status: "Scheduled",
  },
  {
    when: "Tomorrow",
    time: "9:00 AM",
    title: "Weekly product digest",
    sub: "Top updates, new features and more...",
    platform: "twitter",
    thumb: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=120&h=120&fit=crop",
    status: "Scheduled",
  },
];

const CHANNELS = [
  { platform: "facebook", name: "Northwind Co.", type: "Facebook Page", status: "ok" },
  { platform: "instagram", name: "@northwind.studio", type: "Instagram Business", status: "ok" },
  { platform: "linkedin", name: "Northwind / Company", type: "LinkedIn Page", status: "ok" },
  { platform: "youtube", name: "Northwind TV", type: "YouTube Channel", status: "warn" },
  { platform: "twitter", name: "@northwind", type: "X (Twitter)", status: "err" },
  { platform: "google_business", name: "Northwind HQ", type: "Google Business", status: "ok" },
];

const PLATFORM = {
  facebook: { Icon: Facebook, color: "#1877F2", bg: "bg-[#1877F2]/10" },
  instagram: { Icon: Instagram, color: "#E4405F", bg: "bg-gradient-to-br from-pink-500/15 to-orange-500/15" },
  linkedin: { Icon: Linkedin, color: "#0A66C2", bg: "bg-[#0A66C2]/10" },
  youtube: { Icon: Youtube, color: "#FF0000", bg: "bg-red-500/10" },
  twitter: { Icon: Twitter, color: "#0F1419", bg: "bg-secondary" },
  pinterest: { Icon: ImageIcon, color: "#E60023", bg: "bg-red-500/10" },
  google_business: { Icon: MapPin, color: "#4285F4", bg: "bg-blue-500/10" },
} as Record<string, { Icon: React.ComponentType<{ className?: string }>; color: string; bg: string }>;

const WEEK_DAYS = [
  { d: "Mon", n: 12 },
  { d: "Tue", n: 13, active: true },
  { d: "Wed", n: 14 },
  { d: "Thu", n: 15 },
  { d: "Fri", n: 16 },
  { d: "Sat", n: 17 },
  { d: "Sun", n: 18 },
];

const CALENDAR_ROWS = [
  { time: "10 AM", entries: [{ platform: "facebook", title: "Spring sale launches today" }] },
  { time: "12 PM", entries: [] },
  { time: "2 PM", entries: [{ platform: "instagram", title: "Behind the scenes: HQ tour" }] },
  { time: "4 PM", entries: [] },
  { time: "6 PM", entries: [
    { platform: "linkedin", title: "Customer story: ACME +312% growth" },
    { platform: "twitter", title: "Weekly product digest" },
  ] },
];

const CHART_DATA = Array.from({ length: 7 }).map((_, i) => ({
  day: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"][i],
  reach: [62000, 51000, 82000, 64000, 79000, 67000, 60000][i],
  eng: [9200, 8400, 12500, 11200, 14000, 12800, 12100][i],
}));

const TOP_POSTS = [
  {
    title: "Dream space: Minimal living room",
    date: "May 10, 2026",
    reach: "12.4K",
    rate: "8.9%",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=120&h=120&fit=crop",
  },
  {
    title: "Spring sale is live! 🌸",
    date: "May 11, 2026",
    reach: "10.1K",
    rate: "7.2%",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&h=120&fit=crop",
  },
  {
    title: "Our new workspace tour",
    date: "May 9, 2026",
    reach: "8.7K",
    rate: "6.1%",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=120&h=120&fit=crop",
  },
];

const PUB_STATUS = [
  { name: "Facebook", ok: true },
  { name: "Instagram", ok: true },
  { name: "LinkedIn", ok: true },
  { name: "X (Twitter)", ok: true },
  { name: "YouTube", ok: true },
];

export function DashboardOverview() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-6 max-w-[1600px]" data-testid="dashboard-overview">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-sora text-3xl md:text-4xl font-extrabold tracking-tight">
            {greeting}, Pilot <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your content today.</p>
        </div>
        <button className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-medium text-foreground shadow-soft">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          May 12 – May 18, 2026
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-5 hover:shadow-lift transition-shadow"
            data-testid={`kpi-${k.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${k.bg}`}>
                <k.icon className="w-5 h-5" style={{ color: k.color }} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 font-medium">{k.label}</p>
            <p className="font-sora text-3xl font-bold mt-1 tracking-tight">{k.value}</p>
            <p className="text-xs text-success font-medium mt-2 flex items-center gap-1">
              <span>↑ {k.trend}</span>
              <span className="text-muted-foreground font-normal">{k.note}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Upcoming Queue */}
        <section
          className="lg:col-span-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
          data-testid="upcoming-queue"
        >
          <Header title="Upcoming Queue" link="/queue" linkLabel="View all" />
          <div className="mt-5 space-y-4">
            {QUEUE_ITEMS.map((q, i) => {
              const p = PLATFORM[q.platform];
              return (
                <div key={i} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-20 text-right">
                    <p className="text-xs text-muted-foreground">{q.when}</p>
                    <p className="text-xs font-mono text-foreground/80 mt-0.5">{q.time}</p>
                  </div>
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-secondary border border-border flex-shrink-0">
                    {q.thumb ? (
                      <Image src={q.thumb} alt="" fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-foreground text-white font-bold text-xs">
                        {q.label || "—"}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card border-2 border-card grid place-items-center">
                      <p.Icon className="w-3 h-3" style={{ color: p.color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-brand transition-colors">
                      {q.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{q.sub}</p>
                    <Badge variant="default" className="mt-1.5">{q.status}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calendar preview */}
        <section
          className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 shadow-soft"
          data-testid="calendar-preview"
        >
          <Header title="Calendar Preview" link="/calendar" linkLabel="View calendar" />
          <div className="mt-5">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {WEEK_DAYS.map((d) => (
                <button
                  key={d.d}
                  className={`flex flex-col items-center justify-center gap-0.5 h-14 rounded-xl text-xs font-medium transition-colors ${
                    d.active
                      ? "bg-brand text-white shadow-glow"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span className={d.active ? "" : "text-muted-foreground"}>{d.d}</span>
                  <span className={`text-sm font-bold ${d.active ? "" : "text-foreground"}`}>{d.n}</span>
                </button>
              ))}
            </div>
            <div className="space-y-3 max-h-[280px] overflow-y-auto scrollbar-thin pr-1">
              {CALENDAR_ROWS.map((row) => (
                <div key={row.time} className="flex items-start gap-3">
                  <span className="text-xs text-muted-foreground w-10 mt-2 font-mono">{row.time}</span>
                  <div className="flex-1 space-y-2 min-h-[2rem]">
                    {row.entries.length === 0 ? (
                      <div className="h-7 rounded-md border border-dashed border-border" />
                    ) : (
                      row.entries.map((e, i) => {
                        const p = PLATFORM[e.platform];
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{ background: `${p.color}15`, color: p.color }}
                          >
                            <p.Icon className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium truncate" style={{ color: p.color }}>
                              {e.title}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connected Channels + Publishing Status */}
        <section className="lg:col-span-3 space-y-4">
          <div
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            data-testid="connected-channels"
          >
            <Header title="Connected Channels" link="/channels" linkLabel="Manage" />
            <div className="mt-5 space-y-3.5">
              {CHANNELS.map((c) => {
                const p = PLATFORM[c.platform];
                const dot =
                  c.status === "ok" ? "bg-success" : c.status === "warn" ? "bg-warning" : "bg-destructive";
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl grid place-items-center ${p.bg}`}>
                      <p.Icon className="w-4 h-4" style={{ color: p.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.type}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            data-testid="publishing-status"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-sora font-semibold">Publishing Status</h3>
              <span className="text-xs text-success font-medium">All systems operational</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {PUB_STATUS.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-foreground/85">{s.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              ))}
            </div>
            <button className="text-xs text-accent-blue font-medium mt-4 hover:underline" data-testid="view-system-status">
              View system status →
            </button>
          </div>
        </section>
      </div>

      {/* Chart + Top posts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section
          className="lg:col-span-7 rounded-2xl border border-border bg-card p-5 shadow-soft"
          data-testid="chart-card"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-sora font-semibold">
              Reach &amp; Engagement <span className="text-muted-foreground font-normal">(Last 7 Days)</span>
            </h3>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-secondary">
              Last 7 days <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-5 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-blue" /> Reach</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Engagement</span>
          </div>
          <div className="h-72 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Line type="monotone" dataKey="reach" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: "#2563EB" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="eng" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section
          className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 shadow-soft"
          data-testid="top-posts"
        >
          <Header title="Top Performing Posts" link="/analytics" linkLabel="View all" />
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-[1fr_60px_60px] gap-4 text-xs text-muted-foreground uppercase tracking-wider font-semibold pb-2 border-b border-border">
              <span>Post</span>
              <span className="text-right">Reach</span>
              <span className="text-right">Eng. Rate</span>
            </div>
            {TOP_POSTS.map((p) => (
              <div key={p.title} className="grid grid-cols-[1fr_60px_60px] gap-4 items-center">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <Image src={p.img} alt="" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                </div>
                <span className="text-sm font-mono font-semibold text-right">{p.reach}</span>
                <span className="text-sm font-mono font-semibold text-success text-right">{p.rate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Header({ title, link, linkLabel }: { title: string; link: string; linkLabel: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-sora font-semibold">{title}</h3>
      <Link
        href={link}
        className="text-xs text-accent-blue font-medium flex items-center gap-0.5 hover:underline"
      >
        {linkLabel} <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
