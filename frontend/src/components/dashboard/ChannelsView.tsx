"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Image as ImageIcon,
  Twitter,
  Plus,
  RefreshCw,
  Unplug,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PLATFORMS, type PlatformKey } from "@/lib/platforms";

const ICONS: Record<PlatformKey, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: ImageIcon,
  google_business: MapPin,
  twitter: Twitter,
};

type Connection = {
  id: string;
  platform: PlatformKey;
  name: string;
  status: "connected" | "needs_reconnect" | "disconnected";
};

const INITIAL: Connection[] = [
  { id: "fb-1", platform: "facebook", name: "Northwind Co.", status: "connected" },
  { id: "ig-1", platform: "instagram", name: "@northwind.studio", status: "connected" },
  { id: "li-1", platform: "linkedin", name: "Northwind / Company", status: "connected" },
  { id: "yt-1", platform: "youtube", name: "Northwind TV", status: "needs_reconnect" },
];

export function ChannelsView() {
  const [conns, setConns] = useState<Connection[]>(INITIAL);
  const [connecting, setConnecting] = useState<PlatformKey | null>(null);

  async function connect(p: PlatformKey) {
    setConnecting(p);
    try {
      const res = await fetch(`/api/channels/connect/${p}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Connection failed");

      if (data.redirect_url && !data.mock) {
        window.location.href = data.redirect_url;
        return;
      }

      // Mocked platforms — add a fake asset locally
      const newConn: Connection = {
        id: `${p}-${Date.now()}`,
        platform: p,
        name: data.account_name || `New ${PLATFORMS[p].label} account`,
        status: "connected",
      };
      setConns([...conns, newConn]);
      toast.success(`${PLATFORMS[p].label} connected!`);
    } catch (e: any) {
      toast.error(e?.message || "Could not connect");
    } finally {
      setConnecting(null);
    }
  }

  function disconnect(id: string) {
    setConns(conns.filter((c) => c.id !== id));
    toast.success("Channel disconnected");
  }

  function reconnect(id: string) {
    setConns(conns.map((c) => (c.id === id ? { ...c, status: "connected" } : c)));
    toast.success("Channel reconnected");
  }

  return (
    <div className="space-y-6" data-testid="channels-view">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Fleet
          </p>
          <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">Channels</h1>
          <p className="text-[#DDEBFF]/65 text-sm mt-1">
            Connect your social accounts. We handle the rest — no API keys required.
          </p>
        </div>
      </div>

      {/* Available platforms */}
      <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D] p-6">
        <h2 className="font-sora font-bold mb-4">Available platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(PLATFORMS) as PlatformKey[]).map((p) => {
            const Icon = ICONS[p];
            const info = PLATFORMS[p];
            return (
              <button
                key={p}
                onClick={() => connect(p)}
                disabled={connecting === p}
                className="group flex flex-col items-start gap-3 p-4 rounded-lg border border-[#4DA8FF]/15 bg-[#081826] hover:border-[#FF7A1A]/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 text-left"
                data-testid={`connect-${p}`}
              >
                <div
                  className="w-10 h-10 rounded-md grid place-items-center"
                  style={{ background: info.bg, color: info.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{info.label}</p>
                  <p className="text-[10px] text-[#DDEBFF]/40 uppercase tracking-wider mt-0.5">
                    {info.mock ? "OAuth ready" : "Live OAuth"}
                  </p>
                </div>
                <span className="text-xs text-[#FF7A1A] flex items-center gap-1 group-hover:gap-2 transition-all">
                  {connecting === p ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" /> Connecting…
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" /> Connect
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Connected channels */}
      <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D]">
        <div className="px-6 py-4 border-b border-[#4DA8FF]/10 flex items-center justify-between">
          <h2 className="font-sora font-bold">Connected ({conns.length})</h2>
        </div>
        <div className="divide-y divide-[#4DA8FF]/10">
          {conns.map((c) => {
            const Icon = ICONS[c.platform];
            const info = PLATFORMS[c.platform];
            const isOK = c.status === "connected";
            return (
              <div
                key={c.id}
                className="px-6 py-4 flex items-center gap-4"
                data-testid={`channel-row-${c.id}`}
              >
                <div
                  className="w-10 h-10 rounded-md grid place-items-center"
                  style={{ background: info.bg, color: info.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-[#DDEBFF]/50">{info.label}</p>
                </div>
                {isOK ? (
                  <Badge variant="success">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="warning">
                    <AlertCircle className="w-3 h-3 mr-1" /> Needs reconnect
                  </Badge>
                )}
                <div className="flex gap-2">
                  {!isOK && (
                    <Button size="sm" variant="darkOutline" onClick={() => reconnect(c.id)}>
                      <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reconnect
                    </Button>
                  )}
                  <Button size="sm" variant="darkOutline" onClick={() => disconnect(c.id)}>
                    <Unplug className="w-3.5 h-3.5 mr-1" /> Disconnect
                  </Button>
                </div>
              </div>
            );
          })}
          {conns.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-[#DDEBFF]/50">
              No channels connected yet. Pick a platform above to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
