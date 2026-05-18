import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { decrypt } from "@/lib/security/crypto";
import { runPublisher } from "@/lib/publishers";

/**
 * Cron job endpoint — invoked every minute by cron-job.org.
 *
 * Required: GET request with header `Authorization: Bearer ${CRON_SECRET}`
 * (or `?secret=` query param fallback).
 *
 * Behaviour:
 *  1. Fetch every post_variant where parent post.status='scheduled' and scheduled_at <= now.
 *  2. For each variant: load channel + decrypt token, dispatch to the right publisher.
 *  3. Persist publish_status / platform_post_id / error_message and post.status.
 *  4. Write an activity_log entry per attempt (success or failure).
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "") || url.searchParams.get("secret") || "";
  if (!process.env.CRON_SECRET || token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();

  let due;
  try {
    const { data, error } = await admin
      .from("posts")
      .select(
        "id, workspace_id, scheduled_at, status, post_variants(id, channel_asset_id, content, hashtags, media_urls, platform_options, publish_status)",
      )
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .limit(50);
    if (error) throw error;
    due = data || [];
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      message: "Database not yet configured — cron handler is healthy.",
      configured: false,
      error: e?.message,
    });
  }

  let attempted = 0;
  let success = 0;
  let failed = 0;

  for (const post of due) {
    await admin.from("posts").update({ status: "publishing" }).eq("id", post.id);
    for (const v of post.post_variants || []) {
      attempted++;
      try {
        const { data: asset } = await admin
          .from("channel_assets")
          .select(
            "id, asset_identifier, asset_name, social_channel_id, social_channels(platform, access_token_encrypted, metadata)",
          )
          .eq("id", v.channel_asset_id)
          .maybeSingle();
        if (!asset) throw new Error("Asset not found");

        const channel = asset.social_channels as any;
        const token = decrypt(channel.access_token_encrypted);

        const res = await runPublisher(channel.platform, {
          token,
          target_id: asset.asset_identifier,
          content: v.content,
          media_urls: v.media_urls || [],
          options: v.platform_options || {},
        });

        await admin
          .from("post_variants")
          .update({
            publish_status: "published",
            platform_post_id: res.platform_post_id,
            error_message: null,
          })
          .eq("id", v.id);

        await admin.from("activity_logs").insert({
          workspace_id: post.workspace_id,
          user_id: null,
          action: "post.publish.success",
          metadata: {
            post_id: post.id,
            variant_id: v.id,
            platform: channel.platform,
            platform_post_id: res.platform_post_id,
          },
        });

        success++;
      } catch (e: any) {
        failed++;
        await admin
          .from("post_variants")
          .update({
            publish_status: "failed",
            error_message: String(e?.message || e),
          })
          .eq("id", v.id);
        await admin.from("activity_logs").insert({
          workspace_id: post.workspace_id,
          user_id: null,
          action: "post.publish.failure",
          metadata: { post_id: post.id, variant_id: v.id, error: String(e?.message || e) },
        });
      }
    }

    await admin
      .from("posts")
      .update({
        status: failed === 0 ? "published" : "failed",
        published_at: new Date().toISOString(),
      })
      .eq("id", post.id);
  }

  return NextResponse.json({
    ok: true,
    processed_posts: due.length,
    attempted_variants: attempted,
    success,
    failed,
    ran_at: now,
  });
}
