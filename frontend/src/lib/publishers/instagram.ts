import type { Publisher } from "./index";

/**
 * Real Instagram Graph API publisher. Two-step:
 *   1) POST /{ig-user-id}/media  → creation container
 *   2) POST /{ig-user-id}/media_publish → publish
 */
export const instagramPublisher: Publisher = async ({ token, target_id, content, media_urls }) => {
  if (!media_urls.length) throw new Error("Instagram requires at least one media item");

  // Step 1 — container
  const cParams = new URLSearchParams({
    access_token: token,
    caption: content,
    image_url: media_urls[0],
  });
  const containerRes = await fetch(`https://graph.facebook.com/v19.0/${target_id}/media`, {
    method: "POST",
    body: cParams,
  });
  const containerJson = await containerRes.json();
  if (!containerRes.ok || !containerJson?.id) {
    throw new Error(containerJson?.error?.message || `Instagram container failed`);
  }

  // Step 2 — publish
  const publishRes = await fetch(
    `https://graph.facebook.com/v19.0/${target_id}/media_publish`,
    {
      method: "POST",
      body: new URLSearchParams({ access_token: token, creation_id: containerJson.id }),
    },
  );
  const publishJson = await publishRes.json();
  if (!publishRes.ok || !publishJson?.id) {
    throw new Error(publishJson?.error?.message || `Instagram publish failed`);
  }
  return { platform_post_id: String(publishJson.id) };
};
