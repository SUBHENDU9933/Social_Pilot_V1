"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Play,
  Pause,
  Calendar,
  Trash2,
  Copy,
  Edit,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Image as ImageIcon,
  GripVertical,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PlatformKey } from "@/lib/platforms";

const ICONS: Record<PlatformKey, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: ImageIcon,
  google_business: MapPin,
  twitter: Linkedin,
};

const DEFAULT_QUEUE = [
  { id: "q1", time: "Today · 10:00", content: "Spring sale launches today 🌸 #SS26", platforms: ["facebook", "instagram", "linkedin"], status: "scheduled" },
  { id: "q2", time: "Today · 12:30", content: "Behind the scenes: HQ tour 🎬", platforms: ["instagram", "youtube"], status: "scheduled" },
  { id: "q3", time: "Today · 17:00", content: "Customer story: ACME +312% growth", platforms: ["linkedin", "google_business"], status: "scheduled" },
  { id: "q4", time: "Tomorrow · 09:00", content: "Weekly digest →", platforms: ["facebook", "linkedin"], status: "scheduled" },
  { id: "q5", time: "Tomorrow · 14:00", content: "Product Tip Tuesday 🧑‍✈️", platforms: ["instagram", "linkedin"], status: "draft" },
  { id: "q6", time: "Wed · 11:30", content: "New blog post: 7 social ops mistakes →", platforms: ["facebook", "linkedin", "google_business"], status: "scheduled" },
];

export function QueueView() {
  const [items, setItems] = useState(DEFAULT_QUEUE);
  const [paused, setPaused] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  function onDragStart(id: string) {
    setDraggedId(id);
  }
  function onDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault();
    if (!draggedId || draggedId === overId) return;
    const fromIdx = items.findIndex((i) => i.id === draggedId);
    const toIdx = items.findIndex((i) => i.id === overId);
    if (fromIdx === -1 || toIdx === -1) return;
    const next = [...items];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setItems(next);
  }

  function remove(id: string) {
    setItems(items.filter((i) => i.id !== id));
    toast.success("Post removed from queue");
  }
  function duplicate(id: string) {
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const clone = { ...items[idx], id: `${id}-c-${Date.now()}` };
    const next = [...items];
    next.splice(idx + 1, 0, clone);
    setItems(next);
    toast.success("Post duplicated");
  }

  return (
    <div className="space-y-6" data-testid="queue-view">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-blue font-bold">
            Departures
          </p>
          <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">
            Content queue
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Drag to reorder. Pause to halt all scheduled departures.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={paused ? "default" : "darkOutline"}
            onClick={() => {
              setPaused(!paused);
              toast.success(paused ? "Queue resumed" : "Queue paused");
            }}
            data-testid="queue-pause-toggle"
          >
            {paused ? <Play className="w-4 h-4 mr-1.5" /> : <Pause className="w-4 h-4 mr-1.5" />}
            {paused ? "Resume queue" : "Pause queue"}
          </Button>
          <Button variant="darkOutline" data-testid="queue-manage-slots">
            <Calendar className="w-4 h-4 mr-1.5" /> Manage slots
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <ListOrdered className="w-3.5 h-3.5" /> {items.length} posts in queue
          </span>
          {paused && <Badge variant="warning">Queue paused</Badge>}
        </div>

        <div className="divide-y divide-border">
          {items.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={() => onDragStart(it.id)}
              onDragOver={(e) => onDragOver(e, it.id)}
              className="group px-6 py-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors cursor-grab active:cursor-grabbing"
              data-testid={`queue-item-${it.id}`}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground" />
              <span className="font-mono text-xs text-accent-blue w-32 shrink-0">{it.time}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{it.content}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {it.platforms.map((p) => {
                    const Icon = ICONS[p as PlatformKey];
                    return (
                      <span key={p} className="w-5 h-5 rounded-sm bg-secondary/40 grid place-items-center">
                        <Icon className="w-2.5 h-2.5 text-accent-blue" />
                      </span>
                    );
                  })}
                  {it.status === "draft" && <Badge variant="warning">Draft</Badge>}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 grid place-items-center rounded hover:bg-card" data-testid={`queue-edit-${it.id}`}><Edit className="w-3.5 h-3.5" /></button>
                <button className="w-8 h-8 grid place-items-center rounded hover:bg-card" onClick={() => duplicate(it.id)} data-testid={`queue-duplicate-${it.id}`}><Copy className="w-3.5 h-3.5" /></button>
                <button className="w-8 h-8 grid place-items-center rounded hover:bg-card text-red-400" onClick={() => remove(it.id)} data-testid={`queue-delete-${it.id}`}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
