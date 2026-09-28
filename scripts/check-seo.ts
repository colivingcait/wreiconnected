import { BRAND_RE, WOMENS_PHRASE_RE } from "../lib/site";
import { getSeoInventory } from "../lib/seo";

const entries = getSeoInventory();
const failures: string[] = [];

if (entries.length === 0) {
  failures.push("No routes in the SEO inventory.");
}

const paths = new Set<string>();
for (const entry of entries) {
  if (paths.has(entry.path)) failures.push(`Duplicate path ${entry.path}`);
  paths.add(entry.path);

  if (!entry.title || !entry.description) {
    failures.push(`${entry.path} is missing a title or description`);
    continue;
  }
  if (!BRAND_RE.test(entry.title) || !BRAND_RE.test(entry.description)) {
    failures.push(`${entry.path} is missing "WREI Connected" in the title or description`);
  }
  if (!WOMENS_PHRASE_RE.test(entry.title) || !WOMENS_PHRASE_RE.test(entry.description)) {
    failures.push(
      `${entry.path} is missing "women's real estate investing" or "women real estate investors"`,
    );
  }
  if (entry.city) {
    const cityRe = new RegExp(entry.city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    if (!cityRe.test(entry.title) || !cityRe.test(entry.description)) {
      failures.push(`${entry.path} is missing the city name "${entry.city}"`);
    }
  }
}

if (failures.length) {
  console.error("SEO check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO check passed for ${entries.length} routes.`);
