/** Brand and URL constants. Canonical sentences are used verbatim. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://wreiconnected.com"
).replace(/\/$/, "");

export const SITE_NAME = "WREI Connected";
export const SITE_UPDATED = "2026-09-28";

/** SEO-SPEC §10. Do not paraphrase. */
export const NATIONAL_SENTENCE =
  "WREI Connected is a national network of women's real estate investing meetups, with local chapters across the U.S. and a Quarterly Summit online.";

export const PRIMARY_TAGLINE = "Local meetups. National network.";
export const HOST_CTA = "Your group. Our network.";
export const FOOTER_KEYWORD_LINE =
  "A national network of women's real estate investing meetups";

export const RESERVED_SLUGS = [
  "find",
  "events",
  "partner",
  "sponsors",
  "about",
  "coaching",
  "blog",
  "keystatic",
  "api",
] as const;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

/** SEO-SPEC §10 city sentence. Do not paraphrase. */
export function citySentence(city: string, state: string): string {
  return `WREI Connected | ${city} is a free monthly women's real estate investing meetup in ${city}, ${state}, and a chapter of WREI Connected, the national network of women's real estate investing meetups.`;
}

export function aboutSentence(input: {
  city: string;
  state: string;
  rhythm: string;
  timeRange: string;
  venueName: string;
  cost: string;
}): string {
  return `${citySentence(input.city, input.state)} It meets ${input.rhythm}, ${input.timeRange}, at ${input.venueName}. Cost: ${input.cost}.`;
}

export const BRAND_RE = /WREI Connected/;
export const WOMENS_PHRASE_RE =
  /women's real estate investing|women real estate investors/i;
