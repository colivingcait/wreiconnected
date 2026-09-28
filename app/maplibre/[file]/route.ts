import fs from "node:fs";
import path from "node:path";

const ALLOWED = new Set(["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]);

export function GET(_request: Request, context: { params: Promise<{ file: string }> }) {
  return context.params.then(({ file }) => {
    if (!ALLOWED.has(file)) {
      return new Response("Not found", { status: 404 });
    }
    const body = fs.readFileSync(path.join(process.cwd(), "node_modules/maplibre-gl/dist", file));
    return new Response(body, {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  });
}
