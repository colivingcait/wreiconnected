import { chapters } from "@/lib/chapters";
import type { DirectoryGroup } from "@/lib/types";

/**
 * Directory-only groups. They show on the home page, /find, and /events.
 * They are NOT chapter configs: they do not get a city page, JSON-LD chapter
 * entity, sitemap city URL, llms.txt city sentence, or OG image.
 * To launch one, move it into `chapters` in lib/chapters.ts.
 *
 * Every value here is a PLACEHOLDER.
 */
const extraGroups: DirectoryGroup[] = [
  {
    id: "charlotte",
    kind: "chapter",
    hasPage: false,
    name: "WREI Connected | Charlotte",
    city: "Charlotte",
    state: "North Carolina",
    stateCode: "NC",
    blurb: "Monthly · Host: TBD", // PLACEHOLDER
    lat: 35.2271,
    lng: -80.8431,
    timezone: "America/New_York",
    venueName: "Venue TBA", // PLACEHOLDER
    placeholder: true,
  },
  {
    id: "nashville",
    kind: "chapter",
    hasPage: false,
    name: "WREI Connected | Nashville",
    city: "Nashville",
    state: "Tennessee",
    stateCode: "TN",
    blurb: "Monthly · Host: TBD", // PLACEHOLDER
    lat: 36.1627,
    lng: -86.7816,
    timezone: "America/Chicago",
    venueName: "Venue TBA", // PLACEHOLDER
    placeholder: true,
  },
  {
    id: "st-louis",
    kind: "affiliate",
    hasPage: false,
    name: "St. Louis Women Investors",
    city: "St. Louis",
    state: "Missouri",
    stateCode: "MO",
    blurb: "A WREI Connected Affiliate",
    lat: 38.627,
    lng: -90.1994,
    timezone: "America/Chicago",
    venueName: "Central West End", // PLACEHOLDER neighborhood label, not a street address
    placeholder: true,
  },
  {
    id: "tampa",
    kind: "affiliate",
    hasPage: false,
    name: "Tampa Bay Women in REI",
    city: "Tampa",
    state: "Florida",
    stateCode: "FL",
    blurb: "A WREI Connected Affiliate",
    lat: 27.9506,
    lng: -82.4572,
    timezone: "America/New_York",
    venueName: "Venue TBA", // PLACEHOLDER
    placeholder: true,
  },
  {
    id: "dallas",
    kind: "affiliate",
    hasPage: false,
    name: "Dallas Women Investor Circle",
    city: "Dallas",
    state: "Texas",
    stateCode: "TX",
    blurb: "A WREI Connected Affiliate",
    lat: 32.7767,
    lng: -96.797,
    timezone: "America/Chicago",
    venueName: "Venue TBA", // PLACEHOLDER
    placeholder: true,
  },
];

export function chapterToGroup(chapter: (typeof chapters)[number]): DirectoryGroup {
  return {
    id: chapter.slug,
    kind: "chapter",
    hasPage: true,
    name: chapter.groupName,
    city: chapter.city,
    state: chapter.state,
    stateCode: chapter.stateCode,
    blurb: chapter.directoryBlurb,
    lat: chapter.lat,
    lng: chapter.lng,
    timezone: chapter.timezone,
    venueName: chapter.venueName,
    streetAddress: chapter.streetAddress,
    postalCode: chapter.postalCode,
    placeholder: chapter.placeholder,
  };
}

export function getDirectory(): DirectoryGroup[] {
  const fromChapters = chapters.map(chapterToGroup);
  return [...fromChapters, ...extraGroups];
}

export function getGroup(id: string): DirectoryGroup | undefined {
  return getDirectory().find((group) => group.id === id);
}

export function groupHref(group: DirectoryGroup): string | null {
  return group.hasPage ? `/${group.id}` : null;
}
