import { MARKET_DEFAULT_IMAGE, MARKET_DEFAULT_IMAGE_ALT, RESERVED_SLUGS } from "@/lib/site";
import type { Chapter } from "@/lib/types";

/**
 * One object per market page.
 * Adding a market here creates its page, JSON-LD, sitemap entry, llms.txt
 * line, Open Graph image, and a listing on /find and /events.
 *
 * Do not put personal phone numbers or personal email addresses in this file.
 * Venue addresses must be public businesses, never a home or coliving property.
 */
export const chapters: Chapter[] = [
  {
    slug: "atlanta",
    city: "Atlanta",
    state: "Georgia",
    stateCode: "GA",
    groupName: "Atlanta WREI Connected",
    rhythm: "the 4th Tuesday of every month",
    timeRange: "6:30–9:30 PM",
    venueName: "New Realm Brewing",
    // Public brewery at Armour Yards. Not a residence or coliving address.
    streetAddress: "345 Armour Dr NE",
    postalCode: "30324",
    lookFor: "Private event room",
    lookForDetail: "Follow the WREI Connected sign to the name-tag table",
    // PLACEHOLDER — host replaces this with the real parking note.
    parkingNote:
      "Park in the New Realm Brewing lot at the venue. Host adds any extra parking tips once.",
    cost: "Free · all levels welcome",
    hosts: [
      {
        id: "caitlyn-verdugo",
        name: "Caitlyn Verdugo",
        role: "Realtor · Investor · Serial house hacker",
        bio: "Keller Williams Realtor in metro Atlanta and co-author of Coliving Authority.",
        photo: "/images/cv.jpg",
        photoWidth: 200,
        photoHeight: 200,
        credentials:
          "Keller Williams Realtor in metro Atlanta, co-author of Coliving Authority, and co-host of Atlanta WREI Connected.",
      },
      {
        id: "jasmine-brown",
        name: "Jasmine Brown",
        role: "Hard money lender · Investor",
        bio: "Funds investors' deals and builds a portfolio alongside Caitlyn.",
        photo: "/images/jb.jpg",
        photoWidth: 200,
        photoHeight: 200,
        credentials:
          "Hard money lender and investor. Co-host of Atlanta WREI Connected. Bio line in Jasmine's own words goes here.",
      },
    ],
    // TODO: real Eventbrite organizer URL was not in the handoff.
    eventbriteOrganizerUrl: "",
    // Organizational inbox only. Not a personal email.
    hostContactEmail: "atlanta-hosts@wreiconnected.com",
    timezone: "America/New_York",
    lat: 33.8014,
    lng: -84.3702,
    formerly: "Atlanta Women Investors",
    alternateNames: ["Atlanta Women Investors"],
    social: {
      // TODO: real profile URLs were not in the handoff. Do not invent them.
      instagram: "",
      facebook: "",
      linkedin: "",
    },
    sameAs: ["https://atlantawomeninvestors.com"],
    updated: "2026-09-28",
    heroImage: MARKET_DEFAULT_IMAGE,
    heroImageAlt: MARKET_DEFAULT_IMAGE_ALT,
    placeholder: false,
    hostIntro:
      "We met as strangers at a women's investing meetup in 2024. Now we're business partners, and we'd love to meet you.",
    directoryBlurb: "Monthly · Host: Caitlyn V.",
  },
  {
    // PLACEHOLDER city. Proves a new config creates a page, schema, sitemap,
    // llms.txt entry, OG image, and listings on /find and /events.
    slug: "charleston",
    city: "Charleston",
    state: "South Carolina",
    stateCode: "SC",
    groupName: "Charleston WREI Connected",
    rhythm: "the 3rd Tuesday of every month", // PLACEHOLDER
    timeRange: "6:30–9:30 PM", // PLACEHOLDER
    venueName: "Downtown public venue", // PLACEHOLDER — replace with a real public business
    streetAddress: "", // PLACEHOLDER — do not invent a street address
    postalCode: "29401", // PLACEHOLDER
    lookFor: "WREI Connected sign", // PLACEHOLDER
    lookForDetail: "PLACEHOLDER — host adds the room and sign note once.",
    parkingNote:
      "PLACEHOLDER — host adds parking tips once. Use the venue's public parking.",
    cost: "Free · all levels welcome",
    hosts: [
      {
        id: "charleston-host",
        name: "Host TBD", // PLACEHOLDER — not a real person
        role: "Chapter host",
        bio: "PLACEHOLDER bio. Replace with the host's two-line bio before this chapter launches.",
        photo: "/images/coach.jpg", // PLACEHOLDER stock photo
        photoWidth: 900,
        photoHeight: 900,
        credentials: "PLACEHOLDER credentials for the Charleston host.",
      },
    ],
    eventbriteOrganizerUrl: "", // TODO
    hostContactEmail: "charleston-hosts@wreiconnected.com", // PLACEHOLDER org inbox
    timezone: "America/New_York",
    lat: 32.7765, // PLACEHOLDER downtown pin
    lng: -79.9311,
    social: {
      instagram: "", // TODO
      facebook: "", // TODO
      linkedin: "", // TODO
    },
    sameAs: [],
    updated: "2026-09-28",
    heroImage: MARKET_DEFAULT_IMAGE,
    heroImageAlt: MARKET_DEFAULT_IMAGE_ALT,
    placeholder: true,
    hostIntro: "PLACEHOLDER — host introduction goes here.",
    directoryBlurb: "Monthly · Host: TBD", // PLACEHOLDER
  },
  {
    // PLACEHOLDER market details. Hosts, schedule, and venue still to come
    // from the Memphis co-hosts.
    slug: "memphis",
    city: "Memphis",
    state: "Tennessee",
    stateCode: "TN",
    groupName: "Memphis WREI Connected",
    poweredBy: "901 Women In Real Estate Development (WIRED)",
    rhythm: "once a month", // PLACEHOLDER
    timeRange: "6:30–8:30 PM", // PLACEHOLDER
    venueName: "Venue TBA", // PLACEHOLDER — replace with a real public business
    streetAddress: "", // PLACEHOLDER — do not invent a street address
    postalCode: "", // PLACEHOLDER
    lookFor: "WREI Connected sign", // PLACEHOLDER
    lookForDetail: "PLACEHOLDER — host adds the room and sign note once.",
    parkingNote: "PLACEHOLDER — host adds parking tips once. Use the venue's public parking.",
    cost: "Free · all levels welcome",
    hosts: [
      {
        id: "memphis-host",
        name: "Host TBD", // PLACEHOLDER — not a real person
        role: "Market co-host",
        bio: "PLACEHOLDER bio. Replace with the co-host's two-line bio.",
        photo: "/images/coach.jpg", // PLACEHOLDER stock photo
        photoWidth: 900,
        photoHeight: 900,
        credentials: "PLACEHOLDER credentials for the Memphis co-host.",
      },
    ],
    eventbriteOrganizerUrl: "", // TODO
    hostContactEmail: "memphis-hosts@wreiconnected.com", // PLACEHOLDER org inbox
    timezone: "America/Chicago",
    lat: 35.1495, // PLACEHOLDER downtown pin
    lng: -90.049,
    social: {
      instagram: "", // TODO
      facebook: "", // TODO
      linkedin: "", // TODO
    },
    sameAs: [],
    updated: "2026-10-08",
    heroImage: MARKET_DEFAULT_IMAGE,
    heroImageAlt: MARKET_DEFAULT_IMAGE_ALT,
    placeholder: true,
    hostIntro: "PLACEHOLDER — the Memphis co-hosts write their message here.",
    directoryBlurb: "Powered by 901 WIRED",
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function isReservedSlug(slug: string): boolean {
  return (RESERVED_SLUGS as readonly string[]).includes(slug);
}
