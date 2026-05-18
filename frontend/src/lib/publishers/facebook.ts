import type { Publisher } from "./index";

/** Real Meta Graph API publisher for Facebook Pages. */
export const facebookPublisher: Publisher = async ({ token, target_id, content, media_urls }) => {
  const url = `https://graph.facebook.com/v19.0/${target_id}/${media_urls.length ? "photos" : "feed"}`;
  const body = new URLSearchParams({ access_token: token, message: content });
  if (media_urls.length === 1) body.set("url", media_urls[0]);

  const res = await fetch(url, { method: "POST", body });
  const json = await res.json();
  if (!res.ok || json?.error) {
    throw new Error(json?.error?.message || `Facebook publish failed (${res.status})`);
  }
  return { platform_post_id: String(json.id || json.post_id || `fb_${Date.now()}`) };
};
