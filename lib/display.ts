import { dayNumber, formatShortDate, formatTimeLabel, monthKey, monthShort, weekdayShort } from "@/lib/dates";
import { eventName } from "@/lib/events";
import type { DirectoryGroup, WreiEvent } from "@/lib/types";

export function timeLabel(event: WreiEvent): string {
  return formatTimeLabel(event.startTime);
}

export function monthLabel(event: WreiEvent): string {
  return monthKey(event.date);
}

export function dateParts(event: WreiEvent, timeZone: string) {
  return {
    month: monthShort(event.date).toUpperCase(),
    day: dayNumber(event.date),
    weekday: weekdayShort(event.date, timeZone).toUpperCase(),
  };
}

export function listSubline(event: WreiEvent): string {
  if (event.type === "summit") return "Every chapter and Affiliate, together";
  if (event.type === "affiliate") return "A WREI Connected Affiliate";
  return event.title;
}

export function placeLine(event: WreiEvent, group?: DirectoryGroup): { city: string; when: string } {
  if (event.type === "summit") {
    return { city: "Online", when: `${weekdayShort(event.date, "America/New_York")} · Time TBA` };
  }
  const tz = group?.timezone ?? "America/New_York";
  const venue = event.venueName || group?.venueName;
  const where = [group ? `${group.city}, ${group.stateCode}` : "", venue && venue !== "Venue TBA" ? venue : ""]
    .filter(Boolean)
    .join(" · ");
  return {
    city: where,
    when: `${weekdayShort(event.date, tz)} · ${timeLabel(event)}`,
  };
}

export function rsvpLabel(event: WreiEvent): string {
  if (event.type === "summit") return "Save my seat";
  if (event.type === "affiliate") return "RSVP";
  return "RSVP";
}

export function publicTitle(event: WreiEvent, group?: DirectoryGroup): string {
  if (event.type === "chapter" && group) return eventName(event, group);
  if (event.type === "affiliate" && group) return group.name;
  return event.title;
}

export function shortWhen(event: WreiEvent, timeZone: string): string {
  if (!event.startTime && event.type === "summit") return formatShortDate(event.date, timeZone);
  return `${formatShortDate(event.date, timeZone)} · ${timeLabel(event)}`;
}

export function calendarUrl(event: WreiEvent, title: string, location: string): string {
  const start = (event.startTime ?? "12:00").replace(":", "") + "00";
  const end = (event.endTime ?? "13:30").replace(":", "") + "00";
  const day = event.date.replaceAll("-", "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${day}T${start}/${day}T${end}`,
    details: event.topic,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
