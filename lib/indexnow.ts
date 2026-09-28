import { SITE_URL } from "@/lib/site";

export type IndexNowResult = {
  ok: boolean;
  skipped?: boolean;
  status?: number;
};

/**
 * Ping IndexNow for changed URLs.
 * No-ops when INDEXNOW_KEY is unset. The key file is served at /indexnow-key.txt.
 */
export async function pingIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) {
    return { ok: false, skipped: true };
  }

  const host = new URL(SITE_URL).host;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${SITE_URL}/indexnow-key.txt`,
      urlList: urls,
    }),
  });

  return { ok: response.ok, status: response.status };
}
