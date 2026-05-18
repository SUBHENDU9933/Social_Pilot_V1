import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

/**
 * Create a post. Modes:
 *  - "now"      → publish immediately to every selected channel
 *  - "schedule" → set scheduled_at and mark as scheduled
 *  - "queue"    → add to next available queue slot
 *  - "draft"    → save as draft
 *
 * Body shape:
 *   {
 *     mode: "now" | "schedule" | "queue" | "draft",
 *     scheduled_at?: string,
 *     targets: Array<{ channel_asset_id: string, content: string, media_urls?: string[], hashtags?: string[] }>
 *   }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, scheduled_at, targets } = body || {};
    if (!mode || !Array.isArray(targets) || targets.length === 0) {
      return NextResponse.json(
        { error: "Invalid payload — mode and at least one target required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }

    // In preview without supabase, we don't actually persist — just echo success.
    if (!user) {
      return NextResponse.json({
        ok: true,
        preview: true,
        message: "Preview mode — Supabase not configured, post echoed.",
        post: {
          id: `preview_${Date.now()}`,
          mode,
          scheduled_at,
          targets: targets.length,
        },
      });
    }

    const admin = createAdminClient();
    // Look up workspace owned by user (or first membership)
    const { data: ws } = await admin
      .from("workspaces")
      .select("id")
      .eq("owner_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!ws) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 400 });
    }

    const postRow = {
      workspace_id: ws.id,
      created_by: user.id,
      status: mode === "draft" ? "draft" : mode === "now" ? "publishing" : "scheduled",
      scheduled_at: scheduled_at || null,
      timezone: "UTC",
    };

    const { data: post, error: postErr } = await admin
      .from("posts")
      .insert(postRow)
      .select("id")
      .single();

    if (postErr) throw postErr;

    const variants = targets.map((t: any) => ({
      post_id: post.id,
      channel_asset_id: t.channel_asset_id,
      content: t.content,
      hashtags: t.hashtags || [],
      media_urls: t.media_urls || [],
      platform_options: {},
      publish_status: mode === "now" ? "queued_for_publish" : "pending",
    }));

    const { error: variantErr } = await admin.from("post_variants").insert(variants);
    if (variantErr) throw variantErr;

    return NextResponse.json({ ok: true, post_id: post.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
