"use client";

import { motion } from "framer-motion";
import { Calendar, ImagePlus, Send, Sparkles, Hash } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="bg-[#EAF4FF] py-24 md:py-32 relative overflow-hidden" data-testid="dashboard-preview">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Cockpit View
          </span>
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl text-[#0F2D52] mt-3">
            A dashboard that feels like a flight deck.
          </h2>
          <p className="mt-5 text-lg text-[#0F2D52]/70">
            Three panels. Zero overwhelm. Every keystroke gets you closer to publishing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl bg-[#081826] p-2 border border-[#0F2D52]/10 shadow-[0_50px_120px_-40px_rgba(15,45,82,0.45)]"
        >
          <div className="rounded-xl bg-[#081826] grid grid-cols-1 lg:grid-cols-12 gap-3 p-4 md:p-6">
            {/* Composer */}
            <div className="lg:col-span-7 rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#4DA8FF]">
                  New Post · Composer
                </p>
                <div className="flex gap-1.5">
                  {["FB", "IG", "LI", "PT", "GBP", "YT"].map((c, i) => (
                    <span
                      key={c}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        i < 3
                          ? "bg-[#FF7A1A]/15 text-[#FF7A1A] border-[#FF7A1A]/30"
                          : "border-[#4DA8FF]/20 text-[#DDEBFF]/50"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-md bg-[#081826] border border-[#4DA8FF]/10 p-4 text-[#DDEBFF] text-sm leading-relaxed">
                <p>
                  ✈️ Big news — PostPilot AI just launched its v2 calendar. Drag, drop, dispatch.
                  <br />
                  <br />
                  Replace your messy spreadsheet today and reclaim Friday afternoons.{" "}
                  <span className="text-[#4DA8FF]">#SocialMedia #Marketing #PostPilotAI</span>
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-[#DDEBFF]/60">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1.5"><ImagePlus className="w-3.5 h-3.5" /> Media</span>
                  <span className="flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" /> Tags</span>
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AI Assist</span>
                </div>
                <span className="font-mono">218 / 2200</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-9 rounded-md bg-[#FF7A1A] text-white text-sm font-semibold flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Add to queue
                </button>
                <button className="h-9 px-3 rounded-md border border-[#4DA8FF]/25 text-[#DDEBFF]/85 text-sm flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Schedule
                </button>
              </div>
            </div>

            {/* Queue + Analytics */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#4DA8FF]">
                  Upcoming queue
                </p>
                <div className="mt-3 space-y-2.5">
                  {[
                    { d: "Tue 10:00", t: "Customer story drop" },
                    { d: "Tue 14:30", t: "Behind-the-scenes reel" },
                    { d: "Wed 09:15", t: "Spring sale teaser" },
                    { d: "Wed 17:00", t: "Weekly digest →" },
                  ].map((q) => (
                    <div
                      key={q.t}
                      className="flex items-center gap-3 text-xs text-[#DDEBFF]/85 py-1.5 px-2 rounded border border-dashed border-[#4DA8FF]/10 hover:border-[#FF7A1A]/30 transition-colors"
                    >
                      <span className="text-[#4DA8FF] font-mono w-16">{q.d}</span>
                      <span className="flex-1 truncate">{q.t}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-[#4DA8FF]/10 bg-[#12283D] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#4DA8FF]">
                  7-day performance
                </p>
                <div className="mt-4 flex items-end gap-1.5 h-24">
                  {[40, 65, 50, 80, 70, 92, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[#4DA8FF]/40 to-[#FF7A1A]/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-[#DDEBFF]/40 font-mono">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
