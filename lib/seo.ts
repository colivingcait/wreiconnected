import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { chapters } from "@/lib/chapters";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  city?: string;
};

const HOME_TITLE =
  "WREI Connected | National Network of Women's Real Estate Investing Meetups";
const HOME_DESCRIPTION =
  "WREI Connected is a national network of women's real estate investing meetups, with local chapters across the U.S. and a Quarterly Summit online. Find women real estate investors in your city.";

export function cityTitle(city: string): string {
  return `Women's Real Estate Investing Meetup in ${city} | WREI Connected`;
}

export function cityDescription(input: {
  city: string;
  rhythm: string;
  timeRange: string;
  venueName: string;
}): string {
  const when = input.rhythm.replace(/^the\s+/i, "");
  const time = input.timeRange.split("–")[0].trim();
  return `Free monthly women's real estate investing meetup in ${input.city} from WREI Connected. ${when}, ${time} at ${input.venueName}. All levels welcome. RSVP free.`;
}

export function blogPostTitle(title: string): string {
  return `${title} | WREI Connected, Women's Real Estate Investing`;
}

export function buildMetadata(entry: SeoEntry, options?: { type?: "website" | "article" }): Metadata {
  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: { canonical: entry.path },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: entry.path,
      siteName: SITE_NAME,
      type: options?.type ?? "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export function homeSeo(): SeoEntry {
  return { path: "/", title: HOME_TITLE, description: HOME_DESCRIPTION };
}

export function findSeo(): SeoEntry {
  return {
    path: "/find",
    title: "Find a Women's Real Estate Investing Meetup | WREI Connected",
    description:
      "Find a WREI Connected chapter or affiliate near you. In-person women's real estate investing meetups across the U.S., plus the Quarterly Summit online.",
  };
}

export function eventsSeo(): SeoEntry {
  return {
    path: "/events",
    title: "Women's Real Estate Investing Meetups Near You | WREI Connected",
    description:
      "Every WREI Connected women's real estate investing meetup on one calendar. Chapters, affiliates, and the Quarterly Summit online. Filter by state and date.",
  };
}

export function partnerSeo(): SeoEntry {
  return {
    path: "/partner",
    title: "Become a Partner | WREI Connected, Women's Real Estate Investing",
    description:
      "Host a women's real estate investing meetup with WREI Connected. Chapters get funding, marketing, and a national network. Affiliates keep their own brand.",
  };
}

export function sponsorsSeo(): SeoEntry {
  return {
    path: "/sponsors",
    title: "Sponsor Women's Real Estate Investing Meetups | WREI Connected",
    description:
      "Sponsor WREI Connected and reach women real estate investors at in-person meetups and the Quarterly Summit. One partnership, cities across the country.",
  };
}

export function aboutSeo(): SeoEntry {
  return {
    path: "/about",
    title: "Our Story | WREI Connected, Women's Real Estate Investing",
    description:
      "WREI Connected started when two women real estate investors met at a meetup. The Atlanta chapter was formerly Atlanta Women Investors. Local meetups, national network.",
  };
}

export function coachingSeo(): SeoEntry {
  return {
    path: "/coaching",
    title: "Coaching from the WREI Connected Community | Women's Real Estate Investing",
    description:
      "Join the waitlist for coaching from the WREI Connected community. Structured guidance for women real estate investors and investors of any gender. No pricing yet.",
  };
}

export function blogIndexSeo(): SeoEntry {
  return {
    path: "/blog",
    title: "Women's Real Estate Investing Guides | WREI Connected",
    description:
      "Guides, city notes, and meetup recaps from WREI Connected hosts. Plain-English women's real estate investing for beginners and experienced investors.",
  };
}

export function blogCitySeo(cityName: string, slug: string): SeoEntry {
  return {
    path: `/blog/city/${slug}`,
    title: `Women's Real Estate Investing in ${cityName} | WREI Connected`,
    description: `Guides and meetup recaps for women real estate investors in ${cityName}, from the WREI Connected ${cityName} chapter.`,
    city: cityName,
  };
}

export function postSeo(post: { slug: string; title: string; description: string; city?: string }): SeoEntry {
  const chapter = post.city ? chapters.find((item) => item.slug === post.city) : undefined;
  return {
    path: `/blog/${post.slug}`,
    title: blogPostTitle(post.title),
    description: post.description,
    city: chapter?.city,
  };
}

export function chapterSeo(chapter: (typeof chapters)[number]): SeoEntry {
  return {
    path: `/${chapter.slug}`,
    title: cityTitle(chapter.city),
    description: cityDescription(chapter),
    city: chapter.city,
  };
}

/** Every indexable route. The build fails if any entry misses the brand phrases. */
export function getSeoInventory(): SeoEntry[] {
  const staticEntries = [
    homeSeo(),
    findSeo(),
    eventsSeo(),
    partnerSeo(),
    sponsorsSeo(),
    aboutSeo(),
    coachingSeo(),
    blogIndexSeo(),
  ];
  const chapterEntries = chapters.flatMap((chapter) => [
    chapterSeo(chapter),
    blogCitySeo(chapter.city, chapter.slug),
  ]);
  const postEntries = getAllPosts().map((post) => postSeo(post));
  return [...staticEntries, ...chapterEntries, ...postEntries];
}

export function allPublicPaths(): string[] {
  return getSeoInventory().map((entry) => entry.path);
}

export function absolutePublicUrls(): string[] {
  return allPublicPaths().map((path) => (path === "/" ? SITE_URL : absoluteUrl(path)));
}
