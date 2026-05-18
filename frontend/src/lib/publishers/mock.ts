import type { Publisher } from "./index";

/**
 * Mock publisher used until real OAuth credentials are wired up.
 * Logs the attempted publish to stdout and returns a synthetic id.
 * Swap with a real implementation in `lib/publishers/{platform}.ts`.
 */
export function mockPublisher(platform: string): Publisher {
  return async ({ content }) => {
    console.log(
      `[publisher:${platform}] (mock) would publish ${content.length} chars`,
    );
    return { platform_post_id: `mock_${platform}_${Date.now()}` };
  };
}
