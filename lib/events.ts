import { daysFromToday, isOnOrAfterToday, monthLong } from "@/lib/dates";
import { getGroup } from "@/lib/directory";
import { citySentence } from "@/lib/site";
import type { DirectoryGroup, WreiEvent } from "@/lib/types";

/**
 * PLACEHOLDER RSVP target until Eventbrite links are synced.
 * This is the public Eventbrite home, not a personal URL.
 */
export const PLACEHOLDER_RSVP = "https://www.eventbrite.com/";

/**
 * ONE shared events array.
 * Chapter pages, /events, the blog "Meet us in person" card, and JSON-LD
 * all read from here. Replace this array (same shape) when Eventbrite sync lands.
 *
 * Dates below follow the approved events mock, with Atlanta's chapter-page
 * dates (Oct 27, Nov 24, Dec 22, Jan 26) winning over the home mock's Oct 14.
 * Rows marked placeholder are dummy data.
 */
export const events: WreiEvent[] = [
  {
    id: "charlotte-2026-10-06",
    type: "chapter",
    groupId: "charlotte",
    date: "2026-10-06",
    startTime: "18:30",
    endTime: "21:30",
    title: "October Meetup",
    topic: "PLACEHOLDER topic from Eventbrite.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "st-louis-2026-10-08",
    type: "affiliate",
    groupId: "st-louis",
    date: "2026-10-08",
    startTime: "18:00",
    endTime: "21:00",
    title: "October Meetup",
    topic: "PLACEHOLDER topic.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "nashville-2026-10-14",
    type: "chapter",
    groupId: "nashville",
    date: "2026-10-14",
    startTime: "18:30",
    endTime: "21:30",
    title: "October Meetup",
    topic: "PLACEHOLDER topic from Eventbrite.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "tampa-2026-10-17",
    type: "affiliate",
    groupId: "tampa",
    date: "2026-10-17",
    startTime: "10:00",
    endTime: "12:00",
    title: "October Meetup",
    topic: "PLACEHOLDER topic.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "charleston-2026-10-20",
    type: "chapter",
    groupId: "charleston",
    date: "2026-10-20",
    startTime: "18:30",
    endTime: "21:30",
    title: "October Meetup",
    topic: "PLACEHOLDER topic and speaker.",
    rsvpUrl: PLACEHOLDER_RSVP,
    // PLACEHOLDER headcount
    goingCount: 18,
    placeholder: true,
  },
  {
    id: "dallas-2026-10-22",
    type: "affiliate",
    groupId: "dallas",
    date: "2026-10-22",
    startTime: "18:30",
    endTime: "21:00",
    title: "October Meetup",
    topic: "PLACEHOLDER topic.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "atlanta-2026-10-27",
    type: "chapter",
    groupId: "atlanta",
    date: "2026-10-27",
    startTime: "18:30",
    endTime: "21:30",
    title: "October Meetup",
    topic: "Topic and speaker come from the Eventbrite listing.",
    rsvpUrl: PLACEHOLDER_RSVP,
    venueName: "New Realm Brewing",
    streetAddress: "345 Armour Dr NE, Atlanta, GA 30324",
    goingCount: 38, // PLACEHOLDER RSVP count
    placeholder: true,
  },
  {
    id: "charlotte-2026-11-03",
    type: "chapter",
    groupId: "charlotte",
    date: "2026-11-03",
    startTime: "18:30",
    endTime: "21:30",
    title: "November Meetup",
    topic: "PLACEHOLDER topic from Eventbrite.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "summit-2026-q4",
    type: "summit",
    groupId: "national",
    date: "2026-11-12",
    // PLACEHOLDER clock time so schema has a start/end. The page says Time TBA.
    startTime: null,
    endTime: null,
    title: "Quarterly Summit – Q4 2026",
    topic:
      "Four times a year, every chapter and Affiliate meets online. Hear from investors across the country and meet women beyond your city.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "st-louis-2026-11-12",
    type: "affiliate",
    groupId: "st-louis",
    date: "2026-11-12",
    startTime: "18:00",
    endTime: "21:00",
    title: "November Meetup",
    topic: "PLACEHOLDER topic.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "charleston-2026-11-17",
    type: "chapter",
    groupId: "charleston",
    date: "2026-11-17",
    startTime: "18:30",
    endTime: "21:30",
    title: "November Meetup",
    topic: "PLACEHOLDER topic and speaker.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "nashville-2026-11-18",
    type: "chapter",
    groupId: "nashville",
    date: "2026-11-18",
    startTime: "18:30",
    endTime: "21:30",
    title: "November Meetup",
    topic: "PLACEHOLDER topic from Eventbrite.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "atlanta-2026-11-24",
    type: "chapter",
    groupId: "atlanta",
    date: "2026-11-24",
    startTime: "18:30",
    endTime: "21:30",
    title: "November Meetup",
    topic: "Topic and speaker come from the Eventbrite listing.",
    rsvpUrl: PLACEHOLDER_RSVP,
    venueName: "New Realm Brewing",
    streetAddress: "345 Armour Dr NE, Atlanta, GA 30324",
    placeholder: true,
  },
  {
    id: "charleston-2026-12-15",
    type: "chapter",
    groupId: "charleston",
    date: "2026-12-15",
    startTime: "18:30",
    endTime: "21:30",
    title: "December Meetup",
    topic: "PLACEHOLDER topic and speaker.",
    rsvpUrl: PLACEHOLDER_RSVP,
    placeholder: true,
  },
  {
    id: "atlanta-2026-12-22",
    type: "chapter",
    groupId: "atlanta",
    date: "2026-12-22",
    startTime: "18:30",
    endTime: "21:30",
    title: "December Meetup",
    topic: "Topic and speaker come from the Eventbrite listing.",
    rsvpUrl: PLACEHOLDER_RSVP,
    venueName: "New Realm Brewing",
    streetAddress: "345 Armour Dr NE, Atlanta, GA 30324",
    placeholder: true,
  },
  {
    id: "atlanta-2027-01-26",
    type: "chapter",
    groupId: "atlanta",
    date: "2027-01-26",
    startTime: "18:30",
    endTime: "21:30",
    title: "January Meetup",
    topic: "Topic and speaker come from the Eventbrite listing.",
    rsvpUrl: PLACEHOLDER_RSVP,
    venueName: "New Realm Brewing",
    streetAddress: "345 Armour Dr NE, Atlanta, GA 30324",
    placeholder: true,
  },
];

export function upcomingEvents(today = new Date()): WreiEvent[] {
  return events
    .filter((event) => isOnOrAfterToday(event.date, today))
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export function eventsForGroup(groupId: string, today = new Date()): WreiEvent[] {
  return upcomingEvents(today).filter((event) => event.groupId === groupId);
}

export function nextEventForGroup(groupId: string, today = new Date()): WreiEvent | undefined {
  return eventsForGroup(groupId, today)[0];
}

export function nextSummit(today = new Date()): WreiEvent | undefined {
  return upcomingEvents(today).find((event) => event.type === "summit");
}

export function eventName(event: WreiEvent, group?: DirectoryGroup): string {
  if (event.type === "summit") return event.title;
  if (event.type === "chapter" && group) {
    return `WREI Connected | ${group.city} – ${monthLong(event.date)} Meetup`;
  }
  return group ? `${group.name} – ${event.title}` : event.title;
}

export function eventDescription(event: WreiEvent, group?: DirectoryGroup): string {
  if (event.type === "summit") {
    return `Quarterly Summit is the national online summit for women real estate investors. ${event.topic}`;
  }
  if (group && event.type === "chapter") {
    return `${citySentence(group.city, group.state)} ${event.topic}`;
  }
  return event.topic;
}

export function withinDays(event: WreiEvent, days: number, today = new Date()): boolean {
  const delta = daysFromToday(event.date, today);
  return delta >= 0 && delta <= days;
}

export type DateWindow = 60 | 90 | 180 | 3650;

export function filterEvents(
  source: WreiEvent[],
  filters: { type: "all" | "chapter" | "affiliate" | "summit"; state: string; window: DateWindow },
  today = new Date(),
): WreiEvent[] {
  return source.filter((event) => {
    if (!withinDays(event, filters.window, today)) return false;
    if (filters.type !== "all" && event.type !== filters.type) return false;
    if (filters.state !== "all") {
      const group = getGroup(event.groupId);
      if (event.type === "summit") return false;
      if (!group || group.stateCode !== filters.state) return false;
    }
    return true;
  });
}
