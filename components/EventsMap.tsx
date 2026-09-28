"use client";

import { setWorkerUrl } from "maplibre-gl";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Webpack rewrites MapLibre's default worker to a URL that 404s, and a
// serverless read of node_modules 500s on Vercel. prebuild copies the real
// worker into public/maplibre so this same-origin module worker can load.
setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import { dateParts, shortWhen } from "@/lib/display";
import type { DirectoryGroup, WreiEvent } from "@/lib/types";

export type MapGroup = {
  group: DirectoryGroup;
  upcoming: WreiEvent[];
};

const STYLE = "https://tiles.openfreemap.org/styles/positron";

export function EventsMap({
  groups,
  selectedId,
  onSelect,
  summit,
}: {
  groups: MapGroup[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  summit?: { label: string; href: string };
}) {
  const selected = groups.find((item) => item.group.id === selectedId) ?? groups[0];
  const [sheetFor, setSheetFor] = useState(selected?.group.id ?? "");
  const [sheetOpen, setSheetOpen] = useState(true);
  if (selected && sheetFor !== selected.group.id) {
    setSheetFor(selected.group.id);
    setSheetOpen(true);
  }

  const bounds = useMemo<[[number, number], [number, number]] | undefined>(() => {
    if (!groups.length) return undefined;
    const lngs = groups.map((item) => item.group.lng);
    const lats = groups.map((item) => item.group.lat);
    return [
      [Math.min(...lngs) - 1.5, Math.min(...lats) - 1.2],
      [Math.max(...lngs) + 1.5, Math.max(...lats) + 1.2],
    ];
  }, [groups]);
  const mapRef = useRef<MapRef>(null);
  const fit = useCallback(() => {
    if (!bounds || !mapRef.current) return;
    const narrow = window.matchMedia("(max-width: 980px)").matches;
    mapRef.current.fitBounds(bounds, {
      padding: narrow
        ? { top: 150, right: 40, bottom: sheetOpen ? 220 : 64, left: 40 }
        : { top: 64, right: 64, bottom: 88, left: 64 },
      duration: 0,
    });
  }, [bounds, sheetOpen]);
  useEffect(() => {
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit]);

  return (
    <div className={`mapstage${sheetOpen && selected ? " has-sheet" : ""}`}>
      <Map
        ref={mapRef}
        key={groups.map((item) => item.group.id).join("-") || "empty"}
        onLoad={fit}
        initialViewState={
          bounds
            ? { bounds, fitBoundsOptions: { padding: { top: 70, right: 70, bottom: 120, left: 70 } } }
            : { longitude: -84.4, latitude: 33.8, zoom: 4 }
        }
        mapStyle={STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        {groups.map(({ group }) => (
          <Marker
            key={group.id}
            longitude={group.lng}
            latitude={group.lat}
            anchor="bottom"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              onSelect(group.id);
            }}
          >
            <span className={`mpin ${group.kind === "affiliate" ? "af" : "ch"} ${selected?.group.id === group.id ? "sel" : ""}`}>
              <i />
              <span>{group.city}</span>
            </span>
          </Marker>
        ))}
        {selected ? (
          <Popup
            longitude={selected.group.lng}
            latitude={selected.group.lat}
            anchor="top"
            onClose={() => onSelect("")}
            closeOnClick={false}
            offset={16}
            className="map-popup"
          >
            <VenueCard group={selected} />
          </Popup>
        ) : null}
      </Map>
      <div className="map-legend">
        <div>
          <i /> Chapter
        </div>
        <div>
          <i className="af" /> Affiliate
        </div>
      </div>
      {summit ? (
        <div className="online">
          <span>
            <b>Quarterly Summit</b> · {summit.label} · Online
          </span>
          <a className="btn btn-peach" href={summit.href} style={{ padding: "7px 14px", fontSize: 12.5 }}>
            Save my seat
          </a>
        </div>
      ) : null}
      {selected && sheetOpen ? (
        <div className="map-sheet" role="dialog" aria-label={selected.group.name}>
          <button type="button" className="sheet-x" aria-label="Close venue card" onClick={() => setSheetOpen(false)}>
            ×
          </button>
          <VenueCard group={selected} />
        </div>
      ) : null}
    </div>
  );
}

function VenueCard({ group }: { group: MapGroup }) {
  return (
    <div className="pop-card">
      <div className="g">{group.group.name}</div>
      <div className="s">
        {group.group.kind === "chapter" ? "Chapter" : "Affiliate"}
        {group.group.venueName ? ` · ${group.group.venueName}` : ""}
      </div>
      {group.upcoming.slice(0, 2).map((event) => (
        <div className="row" key={event.id}>
          <span>
            <b>{shortWhen(event, group.group.timezone)}</b>
          </span>
          <span>{event.title}</span>
        </div>
      ))}
      <div className="btns">
        {group.upcoming[0] ? (
          <a className="btn btn-peach" href={group.upcoming[0].rsvpUrl}>
            RSVP {dateParts(group.upcoming[0], group.group.timezone).month}{" "}
            {dateParts(group.upcoming[0], group.group.timezone).day}
          </a>
        ) : null}
        {group.group.hasPage ? (
          <Link className="btn btn-line" href={`/${group.group.id}`}>
            Chapter page
          </Link>
        ) : null}
      </div>
    </div>
  );
}
