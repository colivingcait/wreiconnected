export type Host = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoWidth: number;
  photoHeight: number;
  credentials: string;
};

export type Chapter = {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  groupName: string;
  rhythm: string;
  timeRange: string;
  venueName: string;
  streetAddress: string;
  postalCode: string;
  lookFor: string;
  lookForDetail: string;
  parkingNote: string;
  cost: string;
  hosts: Host[];
  eventbriteOrganizerUrl: string;
  hostContactEmail: string;
  timezone: string;
  lat: number;
  lng: number;
  /** Affiliate sub-header, e.g. "901 Women In Real Estate Development (WIRED)". */
  poweredBy?: string;
  formerly?: string;
  alternateNames?: string[];
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  sameAs: string[];
  updated: string;
  heroImage: string;
  heroImageAlt: string;
  placeholder: boolean;
  /** "Message from your hosts" section. Co-hosts write this in their own words. */
  hostIntro: string;
  /** Short line on the home and find cards. */
  directoryBlurb: string;
};

export type GroupKind = "chapter" | "affiliate";

/** A row on /find and a pin on /events. Chapters with hasPage also get /[city]. */
export type DirectoryGroup = {
  id: string;
  kind: GroupKind;
  hasPage: boolean;
  name: string;
  city: string;
  state: string;
  stateCode: string;
  blurb: string;
  lat: number;
  lng: number;
  timezone: string;
  venueName?: string;
  streetAddress?: string;
  postalCode?: string;
  placeholder: boolean;
};

export type EventType = "chapter" | "affiliate" | "summit";

/**
 * Shared events source. A later Eventbrite sync can replace this array
 * without changing chapter pages, /events, blog cards, or JSON-LD.
 */
export type WreiEvent = {
  id: string;
  type: EventType;
  /** Chapter slug, affiliate id, or "national" for the summit. */
  groupId: string;
  date: string;
  /** Local 24h time. Null means the public time is still TBA. */
  startTime: string | null;
  endTime: string | null;
  /** Short label, e.g. "October Meetup" or "Quarterly Summit – Q4 2026". */
  title: string;
  topic: string;
  rsvpUrl: string;
  venueName?: string;
  /** Public business address only. Never a home or coliving property. */
  streetAddress?: string;
  goingCount?: number;
  placeholder: boolean;
};
