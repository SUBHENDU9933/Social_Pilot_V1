import { NextResponse, type NextRequest } from "next/server";
import { PLATFORMS, type PlatformKey } from "@/lib/platforms";

/**
 * Channel connection endpoint.
 *  - For platforms with real OAuth configured (Meta/FB+IG), build the OAuth URL.
 *  - For mocked platforms, return a synthetic "connected" payload so the UI
 *    can hot-add an entry. Production wiring is identical — only the token
 *    issuance changes.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const key = platform as PlatformKey;
  if (!(key in PLATFORMS)) {
    return NextResponse.json({ error: "Unknown platform" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const meta_app_id = process.env.META_APP_ID;

  if ((key === "facebook" || key === "instagram") && meta_app_id) {
    const redirect = `${appUrl}/api/channels/callback/${key}`;
    const scope =
      key === "facebook"
        ? "pages_manage_posts,pages_read_engagement,pages_show_list,business_management"
        : "instagram_basic,instagram_content_publish,pages_show_list,business_management";
    const oauth = new URL("https://www.facebook.com/v19.0/dialog/oauth");
    oauth.searchParams.set("client_id", meta_app_id);
    oauth.searchParams.set("redirect_uri", redirect);
    oauth.searchParams.set("scope", scope);
    oauth.searchParams.set("state", crypto.randomUUID());
    return NextResponse.json({ redirect_url: oauth.toString(), mock: false });
  }

  // Mock path: return a synthetic connection — frontend uses this for the
  // UI flow until you wire real credentials.
  return NextResponse.json({
    mock: true,
    platform: key,
    account_name: `Demo ${PLATFORMS[key].label} account`,
    message: "Connected in preview/mock mode. Add real OAuth credentials to enable live publishing.",
  });
}
