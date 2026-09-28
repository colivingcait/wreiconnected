"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { dateParts, listSubline, monthLabel, placeLine, publicTitle, rsvpLabel, shortWhen } from "@/lib/display";
import { getGroup } from "@/lib/directory";
import { filterEvents, upcomingEvents, type DateWindow } from "@/lib/events";
import type { WreiEvent } from "@/lib/types";

const EventsMap = dynamic(() => import("@/components/EventsMap").then((mod) => mod.EventsMap), {
  ssr: false,
  loading: () => <div className="mapstage" aria-hidden />,
});

const WINDOWS: { value: DateWindow; label: string }[] = [
  { value: 60, label: "Next 60 days" },
  { value: 90, label: "Next 90 days" },
  { value: 180, label: "Next 6 months" },
  { value: 3650, label: "All upcoming" },
];

export function EventsBrowser({ initialEvents }: { initialEvents: WreiEvent[] }) {
  const [mode, setMode] = useState<"list" | "map">("list");
  const [type, setType] = useState<"all" | "chapter" | "affiliate" | "summit">("all");
  const [state, setState] = useState("all");
  const [windowDays, setWindowDays] = useState<DateWindow>(60);
  const [selectedId, setSelectedId] = useState<string>("");

  const states = useMemo(() => {
    const codes = new Set<string>();
    for (const event of initialEvents) {
      const group = getGroup(event.groupId);
      if (group) codes.add(group.stateCode);
    }
    return [...codes].sort();
  }, [initialEvents]);

  const visible = useMemo(
    () => filterEvents(initialEvents, { type, state, window: windowDays }),
    [initialEvents, type, state, windowDays],
  );

  const months = useMemo(() => {
    const groups = new Map<string, WreiEvent[]>();
    for (const event of visible) {
      const key = monthLabel(event);
      groups.set(key, [...(groups.get(key) ?? []), event]);
    }
    return [...groups.entries()];
  }, [visible]);

  const mapGroups = useMemo(() => {
    const byId = new Map<string, WreiEvent[]>();
    for (const event of visible) {
      if (event.type === "summit") continue;
      byId.set(event.groupId, [...(byId.get(event.groupId) ?? []), event]);
    }
    return [...byId.entries()]
      .map(([id, events]) => {
        const group = getGroup(id);
        if (!group) return null;
        return { group, upcoming: events };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => a.upcoming[0].date.localeCompare(b.upcoming[0].date));
  }, [visible]);

  const summit = visible.find((event) => event.type === "summit") ?? upcomingEvents().find((event) => event.type === "summit");
  const activeId = selectedId || mapGroups[0]?.group.id || "";

  return (
    <div className={mode === "map" ? "events-browser is-map" : "events-browser"}>
      <div className="ebar">
        <div className="tog" role="tablist" aria-label="Events view">
          <button type="button" className={mode === "list" ? "on" : undefined} onClick={() => setMode("list")}>
            List
          </button>
          <button type="button" className={mode === "map" ? "on" : undefined} onClick={() => setMode("map")}>
            Map
          </button>
        </div>
        <div className="filters">
          {(
            [
              ["all", "All"],
              ["chapter", "Chapters"],
              ["affiliate", "Affiliates"],
              ["summit", "Summits"],
            ] as const
          ).map(([value, label]) => (
            <button key={value} type="button" className={type === value ? "chip on" : "chip"} onClick={() => setType(value)}>
              {label}
            </button>
          ))}
          <select aria-label="State" value={state} onChange={(event) => setState(event.target.value)}>
            <option value="all">All states</option>
            {states.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <select
            aria-label="Date range"
            value={windowDays}
            onChange={(event) => setWindowDays(Number(event.target.value) as DateWindow)}
          >
            {WINDOWS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="listv">
        <p className="count">
          {visible.length} event{visible.length === 1 ? "" : "s"} in this view · synced from each group&apos;s Eventbrite
        </p>
        {months.map(([month, rows]) => (
          <section key={month}>
            <h2 className="month">{month}</h2>
            <div className="elist">
              {rows.map((event) => {
                const group = getGroup(event.groupId);
                const tz = group?.timezone ?? "America/New_York";
                const parts = dateParts(event, tz);
                const place = placeLine(event, group);
                const badge = event.type === "summit" ? "su" : event.type === "affiliate" ? "af" : "ch";
                const badgeLabel = event.type === "summit" ? "Summit" : event.type === "affiliate" ? "Affiliate" : "Chapter";
                return (
                  <article key={event.id} className={event.type === "summit" ? "er sum" : "er"}>
                    <div className="dt">
                      <div className="m">{parts.month}</div>
                      <div className="d">{parts.day}</div>
                    </div>
                    <div className="g">
                      {publicTitle(event, group)}
                      <small>{listSubline(event)}</small>
                    </div>
                    <div className="w">
                      {place.city}
                      <span>{place.when}</span>
                    </div>
                    <span className={`badge ${badge}`}>{badgeLabel}</span>
                    <a href={event.rsvpUrl}>{rsvpLabel(event)}</a>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {visible.length === 0 ? <p className="empty">No events match these filters.</p> : null}
      </div>

      <div className="mapv">
        <div className="side">
          <div className="hd">
            <b>
              {mapGroups.length} group{mapGroups.length === 1 ? "" : "s"} in view
            </b>
            Next event at each, soonest first
          </div>
          {mapGroups.map(({ group, upcoming }) => {
            const event = upcoming[0];
            const parts = dateParts(event, group.timezone);
            return (
              <button
                key={group.id}
                type="button"
                className={activeId === group.id ? "si on" : "si"}
                onClick={() => {
                  setSelectedId(group.id);
                  setMode("map");
                }}
              >
                <div className="dt">
                  <div className="m">{parts.month}</div>
                  <div className="d">{parts.day}</div>
                </div>
                <div>
                  <div className="g">{group.name}</div>
                  <div className="s">
                    {group.city}, {group.stateCode} · {shortWhen(event, group.timezone)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {mode === "map" ? (
          <EventsMap
            groups={mapGroups}
            selectedId={activeId}
            onSelect={setSelectedId}
            summit={
              summit
                ? {
                    label: shortWhen(summit, "America/New_York"),
                    href: summit.rsvpUrl,
                  }
                : undefined
            }
          />
        ) : (
          <div className="mapstage" />
        )}
      </div>
    </div>
  );
}
