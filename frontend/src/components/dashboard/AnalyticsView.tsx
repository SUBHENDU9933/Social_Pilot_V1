"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, Users, Eye, MousePointerClick, Heart } from "lucide-react";

const trend = Array.from({ length: 30 }).map((_, i) => ({
  day: `D${i + 1}`,
  reach: Math.round(3000 + Math.sin(i / 3) * 1200 + i * 60),
  engagement: Math.round(120 + Math.cos(i / 4) * 60 + i * 4),
}));

const byPlatform = [
  { name: "FB", posts: 23, engagement: 4.2, reach: 28000 },
  { name: "IG", posts: 31, engagement: 6.8, reach: 41000 },
  { name: "LI", posts: 14, engagement: 9.1, reach: 12500 },
  { name: "PT", posts: 8, engagement: 3.5, reach: 5400 },
  { name: "GBP", posts: 6, engagement: 2.4, reach: 3100 },
  { name: "YT", posts: 3, engagement: 11.2, reach: 8800 },
];

const topPosts = [
  { title: "Spring sale teaser 🌸", platform: "Instagram", reach: "12.4K", engagement: "8.9%" },
  { title: "Customer story: ACME case study", platform: "LinkedIn", reach: "8.1K", engagement: "11.2%" },
  { title: "Behind-the-scenes reel", platform: "Instagram", reach: "7.8K", engagement: "7.4%" },
  { title: "Weekly digest →", platform: "Facebook", reach: "5.2K", engagement: "4.3%" },
];

const KPIS = [
  { l: "Reach", v: "92.4K", t: "+24%", icon: Eye, color: "#4DA8FF" },
  { l: "Engagement", v: "8,412", t: "+18%", icon: Heart, color: "#FF7A1A" },
  { l: "Clicks", v: "3,184", t: "+11%", icon: MousePointerClick, color: "#DDEBFF" },
  { l: "Followers", v: "+842", t: "+6%", icon: Users, color: "#10b981" },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6" data-testid="analytics-view">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">Telemetry</p>
        <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">Analytics</h1>
        <p className="text-[#DDEBFF]/65 text-sm mt-1">Performance across every connected channel.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <div key={k.l} className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] font-bold">{k.l}</span>
              <k.icon className="w-4 h-4 text-[#DDEBFF]/40" />
            </div>
            <p className="font-sora font-black text-3xl mt-3" style={{ color: k.color }}>{k.v}</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {k.t} vs. last 30d
            </p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="trend">
        <TabsList>
          <TabsTrigger value="trend" data-testid="analytics-tab-trend">Trend</TabsTrigger>
          <TabsTrigger value="platforms" data-testid="analytics-tab-platforms">By platform</TabsTrigger>
          <TabsTrigger value="top" data-testid="analytics-tab-top">Top posts</TabsTrigger>
        </TabsList>

        <TabsContent value="trend">
          <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6">
            <h2 className="font-sora font-bold mb-4">Reach & engagement — last 30 days</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid stroke="#4DA8FF22" />
                  <XAxis dataKey="day" stroke="#4DA8FF" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#4DA8FF" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "#081826", border: "1px solid #4DA8FF44", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="reach" stroke="#FF7A1A" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="engagement" stroke="#4DA8FF" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="platforms">
          <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6">
            <h2 className="font-sora font-bold mb-4">Performance by platform</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byPlatform}>
                  <CartesianGrid stroke="#4DA8FF22" />
                  <XAxis dataKey="name" stroke="#4DA8FF" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#4DA8FF" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#081826", border: "1px solid #4DA8FF44", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="reach" fill="#FF7A1A" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="posts" fill="#4DA8FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="top">
          <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-[0.2em] text-[#4DA8FF] border-b border-[#4DA8FF]/10">
                <tr>
                  <th className="px-6 py-3">Post</th>
                  <th className="px-6 py-3">Platform</th>
                  <th className="px-6 py-3 text-right">Reach</th>
                  <th className="px-6 py-3 text-right">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4DA8FF]/10">
                {topPosts.map((p) => (
                  <tr key={p.title} className="hover:bg-[#081826] transition-colors">
                    <td className="px-6 py-4">{p.title}</td>
                    <td className="px-6 py-4 text-[#4DA8FF]">{p.platform}</td>
                    <td className="px-6 py-4 text-right font-mono">{p.reach}</td>
                    <td className="px-6 py-4 text-right font-mono text-[#FF7A1A]">{p.engagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
