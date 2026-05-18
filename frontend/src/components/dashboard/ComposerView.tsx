"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Image as ImageIcon,
  Hash,
  Smile,
  Send,
  Calendar as CalendarIcon,
  Sparkles,
  Save,
  Plane,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { PLATFORMS, type PlatformKey } from "@/lib/platforms";
import { cn } from "@/lib/utils";

const ICONS: Record<PlatformKey, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: ImageIcon,
  google_business: MapPin,
  twitter: Twitter,
};

const MOCK_ACCOUNTS: Array<{
  id: string;
  platform: PlatformKey;
  name: string;
}> = [
  { id: "fb-1", platform: "facebook", name: "Northwind Co." },
  { id: "fb-2", platform: "facebook", name: "Northwind Studios" },
  { id: "ig-1", platform: "instagram", name: "@northwind.studio" },
  { id: "ig-2", platform: "instagram", name: "@northwind.kids" },
  { id: "li-1", platform: "linkedin", name: "Northwind / Company" },
  { id: "pt-1", platform: "pinterest", name: "@northwind" },
  { id: "gbp-1", platform: "google_business", name: "Northwind HQ — Berlin" },
  { id: "yt-1", platform: "youtube", name: "Northwind TV" },
];

export function ComposerView() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["fb-1", "ig-1", "li-1"]));
  const [baseContent, setBaseContent] = useState(
    "✈️ Big news — PostPilot AI just launched its v2 calendar.\n\nReplace your messy spreadsheet today and reclaim Friday afternoons. #SocialMedia #Marketing #PostPilotAI",
  );
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("all");
  const [scheduleAt, setScheduleAt] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedAccounts = MOCK_ACCOUNTS.filter((a) => selected.has(a.id));
  const platformsInPost = useMemo(
    () => Array.from(new Set(selectedAccounts.map((a) => a.platform))),
    [selectedAccounts],
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function contentFor(accountId: string) {
    return variants[accountId] ?? baseContent;
  }

  async function handlePublish(mode: "now" | "schedule" | "queue" | "draft") {
    if (selected.size === 0) {
      toast.error("Pick at least one channel to publish to.");
      return;
    }
    if (mode === "schedule" && !scheduleAt) {
      toast.error("Pick a date and time first.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        mode,
        scheduled_at: scheduleAt || null,
        targets: Array.from(selected).map((id) => ({
          channel_asset_id: id,
          content: contentFor(id),
        })),
      };
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not save");
      toast.success(
        mode === "now"
          ? `Published to ${selected.size} channel(s)!`
          : mode === "schedule"
            ? "Post scheduled."
            : mode === "queue"
              ? "Added to queue."
              : "Saved as draft.",
      );
    } catch (e: any) {
      toast.error(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-testid="composer-view">
      {/* LEFT: account picker */}
      <aside className="lg:col-span-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent-blue font-bold">
            Destinations
          </p>
          <h2 className="font-sora text-lg font-bold mt-1">Channels</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Pick where this post should fly to.
          </p>

          <div className="mt-5 space-y-1.5 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1">
            {MOCK_ACCOUNTS.map((a) => {
              const Icon = ICONS[a.platform];
              const checked = selected.has(a.id);
              return (
                <label
                  key={a.id}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors",
                    checked ? "bg-brand/10 border border-brand/30" : "hover:bg-secondary/40 border border-transparent",
                  )}
                  data-testid={`composer-channel-${a.id}`}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggle(a.id)} />
                  <Icon className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm truncate">{a.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      </aside>

      {/* CENTER: editor */}
      <main className="lg:col-span-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-blue font-bold">
                Composer
              </p>
              <h2 className="font-sora text-xl font-bold mt-1">Craft your post</h2>
            </div>
            <Button variant="darkOutline" size="sm" data-testid="composer-ai-button">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI suggest
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all">All channels</TabsTrigger>
              {platformsInPost.map((p) => (
                <TabsTrigger key={p} value={p} data-testid={`tab-${p}`}>
                  {PLATFORMS[p].label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <Textarea
                value={baseContent}
                onChange={(e) => setBaseContent(e.target.value)}
                className="bg-secondary/40 text-foreground border-border min-h-[180px]"
                placeholder="Write something brilliant…"
                data-testid="composer-textarea"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <div className="flex gap-3">
                  <button className="flex items-center gap-1.5 hover:text-brand"><ImageIcon className="w-3.5 h-3.5" /> Media</button>
                  <button className="flex items-center gap-1.5 hover:text-brand"><Hash className="w-3.5 h-3.5" /> Tags</button>
                  <button className="flex items-center gap-1.5 hover:text-brand"><Smile className="w-3.5 h-3.5" /> Emoji</button>
                </div>
                <span className="font-mono">
                  {baseContent.length} chars
                </span>
              </div>
            </TabsContent>

            {platformsInPost.map((p) => {
              const accs = selectedAccounts.filter((a) => a.platform === p);
              return (
                <TabsContent key={p} value={p} className="space-y-4">
                  {accs.map((a) => (
                    <div key={a.id}>
                      <p className="text-xs text-accent-blue mb-1.5">{a.name}</p>
                      <Textarea
                        value={contentFor(a.id)}
                        onChange={(e) => setVariants({ ...variants, [a.id]: e.target.value })}
                        className="bg-secondary/40 text-foreground border-border min-h-[140px]"
                      />
                      <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground font-mono">
                        <span>{PLATFORMS[p].label} · max {PLATFORMS[p].charLimit.toLocaleString()}</span>
                        <span className={cn(contentFor(a.id).length > PLATFORMS[p].charLimit && "text-red-400")}>
                          {contentFor(a.id).length}/{PLATFORMS[p].charLimit}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Schedule */}
          <div className="mt-6 border-t border-border pt-5 flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-blue mb-1.5">
                Schedule (optional)
              </p>
              <Input
                type="datetime-local"
                value={scheduleAt}
                onChange={(e) => setScheduleAt(e.target.value)}
                className="bg-secondary/40 text-foreground border-border"
                data-testid="composer-schedule-input"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="darkOutline" onClick={() => handlePublish("draft")} disabled={saving} data-testid="composer-draft">
                <Save className="w-4 h-4 mr-1.5" /> Draft
              </Button>
              <Button variant="darkOutline" onClick={() => handlePublish("queue")} disabled={saving} data-testid="composer-queue">
                <Plane className="w-4 h-4 mr-1.5" /> Queue
              </Button>
              <Button variant="secondary" onClick={() => handlePublish("schedule")} disabled={saving} data-testid="composer-schedule">
                <CalendarIcon className="w-4 h-4 mr-1.5" /> Schedule
              </Button>
              <Button onClick={() => handlePublish("now")} disabled={saving} data-testid="composer-publish">
                <Send className="w-4 h-4 mr-1.5" /> Publish now
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT: previews */}
      <aside className="lg:col-span-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent-blue font-bold">
            Previews
          </p>
          <h2 className="font-sora text-lg font-bold mt-1">As your audience sees it</h2>

          {selected.size === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Pick a destination to see live previews.
            </p>
          ) : (
            <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1">
              {selectedAccounts.map((a) => {
                const Icon = ICONS[a.platform];
                return (
                  <div
                    key={a.id}
                    className="rounded-md bg-secondary/40 border border-border p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-3.5 h-3.5 text-accent-blue" />
                      <span className="text-xs font-semibold text-foreground/80">
                        {a.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {PLATFORMS[a.platform].label}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/85 whitespace-pre-wrap line-clamp-6">
                      {contentFor(a.id)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
