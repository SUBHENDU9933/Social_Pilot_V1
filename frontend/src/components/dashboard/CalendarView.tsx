"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Event = { date: string; time: string; title: string; color: string };

const EVENTS: Event[] = [
  { date: new Date().toISOString().slice(0, 10), time: "10:00", title: "Spring sale launch", color: "#FF7A00" },
  { date: new Date().toISOString().slice(0, 10), time: "14:30", title: "BTS reel", color: "#2563EB" },
  { date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), time: "09:00", title: "Weekly digest", color: "#FF7A00" },
  { date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), time: "11:30", title: "Blog post share", color: "#10b981" },
  { date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10), time: "16:00", title: "Customer story", color: "#2563EB" },
  { date: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10), time: "10:00", title: "Product tip", color: "#FF7A00" },
];

export function CalendarView() {
  const today = new Date();
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const firstDay = new Date(month.y, month.m, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();

  const cells: Array<{ d: number | null; iso: string | null }> = [];
  for (let i = 0; i < startOffset; i++) cells.push({ d: null, iso: null });
  for (let i = 1; i <= daysInMonth; i++) {
    const iso = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    cells.push({ d: i, iso });
  }
  while (cells.length % 7 !== 0) cells.push({ d: null, iso: null });

  const monthName = new Date(month.y, month.m, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const todayISO = today.toISOString().slice(0, 10);

  function prev() {
    setMonth((m) => (m.m === 0 ? { y: m.y - 1, m: 11 } : { y: m.y, m: m.m - 1 }));
  }
  function next() {
    setMonth((m) => (m.m === 11 ? { y: m.y + 1, m: 0 } : { y: m.y, m: m.m + 1 }));
  }

  return (
    <div className="space-y-6" data-testid="calendar-view">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-blue font-bold">Flight Plan</p>
          <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">Calendar</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Click any day to schedule. Drag posts to reschedule.
          </p>
        </div>
        <Link href="/composer">
          <Button data-testid="calendar-new-post">
            <Plus className="w-4 h-4 mr-1.5" /> New post
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="w-9 h-9 grid place-items-center rounded-md hover:bg-secondary/40"
              data-testid="calendar-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 grid place-items-center rounded-md hover:bg-secondary/40"
              data-testid="calendar-next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <h2 className="font-sora text-lg font-bold ml-2">{monthName}</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand" /> Scheduled</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-blue" /> Queued</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Published</span>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-border text-[10px] uppercase tracking-[0.25em] text-accent-blue font-bold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-3 py-2.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-6 min-h-[600px]">
          {cells.map((c, i) => {
            const dayEvents = c.iso ? EVENTS.filter((e) => e.date === c.iso) : [];
            const isToday = c.iso === todayISO;
            return (
              <div
                key={i}
                className={cn(
                  "border-r border-b border-border p-2 hover:bg-secondary/40/40 transition-colors min-h-[100px]",
                  !c.d && "bg-secondary/40/20",
                )}
                data-testid={c.iso ? `calendar-day-${c.iso}` : undefined}
              >
                {c.d && (
                  <>
                    <p className={cn("text-xs font-mono mb-2", isToday ? "text-brand font-bold" : "text-muted-foreground")}>
                      {String(c.d).padStart(2, "0")}{isToday && " · today"}
                    </p>
                    <div className="space-y-1">
                      {dayEvents.map((e, idx) => (
                        <div
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded truncate"
                          style={{ background: `${e.color}22`, color: e.color, borderLeft: `2px solid ${e.color}` }}
                        >
                          <span className="font-mono mr-1.5">{e.time}</span>{e.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
