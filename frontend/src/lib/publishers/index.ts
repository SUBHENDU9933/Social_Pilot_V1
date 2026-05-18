/**
 * Pluggable publisher registry.
 *
 * Each publisher receives a normalized `PublishContext` and is expected to
 * return either { platform_post_id } on success or throw on failure.
 *
 * For platforms without real credentials wired yet (LinkedIn, Pinterest,
 * Google Business, YouTube, X) we simulate publishing — the architecture
 * is unchanged, so swapping in real API calls later is a one-file edit.
 */

import type { PlatformKey } from "@/lib/platforms";
import { facebookPublisher } from "./facebook";
import { instagramPublisher } from "./instagram";
import { mockPublisher } from "./mock";

export type PublishContext = {
  token: string;
  target_id: string;
  content: string;
  media_urls: string[];
  options: Record<string, unknown>;
};
export type PublishResult = { platform_post_id: string };
export type Publisher = (ctx: PublishContext) => Promise<PublishResult>;

const REGISTRY: Record<PlatformKey, Publisher> = {
  facebook: facebookPublisher,
  instagram: instagramPublisher,
  linkedin: mockPublisher("linkedin"),
  pinterest: mockPublisher("pinterest"),
  google_business: mockPublisher("google_business"),
  youtube: mockPublisher("youtube"),
  twitter: mockPublisher("twitter"),
};

export async function runPublisher(platform: string, ctx: PublishContext): Promise<PublishResult> {
  const pub = REGISTRY[platform as PlatformKey];
  if (!pub) throw new Error(`No publisher for ${platform}`);
  return pub(ctx);
}
