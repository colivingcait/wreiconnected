import { absolutePublicUrls } from "../lib/seo";
import { pingIndexNow } from "../lib/indexnow";
import { SITE_URL } from "../lib/site";

const args = process.argv.slice(2);
const urls = args.length
  ? args.map((value) => (value.startsWith("http") ? value : `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`))
  : absolutePublicUrls();

const result = await pingIndexNow(urls);
if (result.skipped) {
  console.log("IndexNow skipped: INDEXNOW_KEY is unset or no URLs were provided.");
  process.exit(0);
}
console.log(`IndexNow ${result.ok ? "ok" : "failed"} (${result.status}) for ${urls.length} URL(s).`);
if (!result.ok) process.exit(1);
