const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function parseDate(isoDate: string): { y: number; m: number; d: number } {
  const [y, m, d] = isoDate.split("-").map(Number);
  return { y, m, d };
}

export function monthShort(isoDate: string): string {
  return MONTHS[parseDate(isoDate).m - 1];
}

export function monthLong(isoDate: string): string {
  return MONTHS_LONG[parseDate(isoDate).m - 1];
}

export function dayNumber(isoDate: string): number {
  return parseDate(isoDate).d;
}

/** Weekday in the given IANA timezone. */
export function weekdayShort(isoDate: string, timeZone: string): string {
  const { y, m, d } = parseDate(isoDate);
  const utc = new Date(Date.UTC(y, m - 1, d, 16, 0, 0));
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(utc);
  return formatted.slice(0, 3);
}

export function weekdayLong(isoDate: string, timeZone: string): string {
  const { y, m, d } = parseDate(isoDate);
  const utc = new Date(Date.UTC(y, m - 1, d, 16, 0, 0));
  return new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long" }).format(utc);
}

export function monthKey(isoDate: string): string {
  const { y, m } = parseDate(isoDate);
  return `${MONTHS_LONG[m - 1]} ${y}`;
}

/** Local civil time as ISO-8601 with the real timezone offset. */
export function zonedIso(isoDate: string, time: string, timeZone: string): string {
  const { y, m, d } = parseDate(isoDate);
  const [hh, mm] = time.split(":").map(Number);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  let guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  let offset = "+00:00";
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(
      dtf.formatToParts(new Date(guess)).map((part) => [part.type, part.value]),
    );
    const name = parts.timeZoneName ?? "GMT";
    const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
    if (!match) break;
    offset = `${match[1]}${match[2]}:${match[3]}`;
    const sign = match[1] === "+" ? 1 : -1;
    const offMin = sign * (Number(match[2]) * 60 + Number(match[3]));
    guess = Date.UTC(y, m - 1, d, hh, mm, 0) - offMin * 60 * 1000;
  }

  const hhPad = String(hh).padStart(2, "0");
  const mmPad = String(mm).padStart(2, "0");
  return `${isoDate}T${hhPad}:${mmPad}:00${offset}`;
}

export function formatTimeLabel(time: string | null): string {
  if (!time) return "Time TBA";
  const [hh, mm] = time.split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour = hh % 12 === 0 ? 12 : hh % 12;
  return mm === 0 ? `${hour}:00 ${suffix}` : `${hour}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export function formatShortDate(isoDate: string, timeZone: string): string {
  const day = weekdayShort(isoDate, timeZone);
  const { m, d } = parseDate(isoDate);
  return `${day}, ${MONTHS[m - 1]} ${d}`;
}

export function daysFromToday(isoDate: string, today = new Date()): number {
  const { y, m, d } = parseDate(isoDate);
  const target = Date.UTC(y, m - 1, d);
  const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target - start) / 86_400_000);
}

export function isOnOrAfterToday(isoDate: string, today = new Date()): boolean {
  return daysFromToday(isoDate, today) >= 0;
}

void WEEKDAYS;
