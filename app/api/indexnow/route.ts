import { pingIndexNow } from "@/lib/indexnow";
import { absolutePublicUrls } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_KEY;
  if (!secret) {
    return Response.json({ ok: false, skipped: true });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let urls = absolutePublicUrls();
  try {
    const body = (await request.json()) as { urls?: unknown };
    if (Array.isArray(body.urls) && body.urls.every((url) => typeof url === "string")) {
      urls = body.urls;
    }
  } catch {
    // An empty body pings every public URL.
  }

  const result = await pingIndexNow(urls);
  return Response.json(result, { status: result.ok || result.skipped ? 200 : 502 });
}
