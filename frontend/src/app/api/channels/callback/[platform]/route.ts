import { NextResponse, type NextRequest } from "next/server";
import { encrypt } from "@/lib/security/crypto";
import { createAdminClient, createClient } from "@/lib/supabase/server";

/**
 * OAuth callback. Currently wired for Meta Graph API (FB/IG).
 * For mocked platforms we never reach here — the UI fakes the connection.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/channels?error=missing_code`);
  }

  const meta_app_id = process.env.META_APP_ID;
  const meta_app_secret = process.env.META_APP_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

  if ((platform === "facebook" || platform === "instagram") && meta_app_id && meta_app_secret) {
    try {
      const redirect = `${appUrl}/api/channels/callback/${platform}`;
      const tokenRes = await fetch(
        `https://graph.facebook.com/v19.0/oauth/access_token?` +
          new URLSearchParams({
            client_id: meta_app_id,
            client_secret: meta_app_secret,
            redirect_uri: redirect,
            code,
          }),
      );
      const tokenJson = await tokenRes.json();
      if (!tokenJson.access_token) {
        return NextResponse.redirect(`${origin}/channels?error=token_exchange_failed`);
      }

      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return NextResponse.redirect(`${origin}/auth/login`);

      const admin = createAdminClient();
      const { data: ws } = await admin
        .from("workspaces")
        .select("id")
        .eq("owner_id", user.id)
        .limit(1)
        .maybeSingle();

      if (ws) {
        await admin.from("social_channels").insert({
          workspace_id: ws.id,
          platform,
          platform_account_id: "pending_sync",
          account_name: `${platform} account`,
          access_token_encrypted: encrypt(tokenJson.access_token),
          status: "connected",
        });
      }

      return NextResponse.redirect(`${origin}/channels?connected=${platform}`);
    } catch {
      return NextResponse.redirect(`${origin}/channels?error=callback_failed`);
    }
  }

  return NextResponse.redirect(`${origin}/channels?error=unsupported_platform`);
}
