"use client";

import { setWorkerUrl } from "maplibre-gl";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const [cardPos, setCardPos] = useState({ left: 18, top: 18 });
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

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const place = () => {
      const pin = stage.querySelector(".mpin.sel i") ?? stage.querySelector(".mpin.sel");
      const card = stage.querySelector(".map-card");
      if (!(pin instanceof HTMLElement) || !(card instanceof HTMLElement)) return;
      const sr = stage.getBoundingClientRect();
      const pr = pin.getBoundingClientRect();
      const cardW = card.offsetWidth;
      const cardH = card.offsetHeight;
      const margin = 12;
      const bottomGap = 88;
      let left = pr.right - sr.left + 14;
      let top = pr.top - sr.top;
      if (left + cardW > sr.width - margin) left = pr.left - sr.left - cardW - 14;
      left = Math.min(Math.max(margin, left), Math.max(margin, sr.width - margin - cardW));
      const maxTop = Math.max(margin, sr.height - bottomGap - cardH);
      if (top + cardH > sr.height - bottomGap) top = pr.top - sr.top - cardH - 8;
      top = Math.min(Math.max(margin, top), maxTop);
      left = Math.round(left);
      top = Math.round(top);
      setCardPos((prev) => (prev.left === left && prev.top === top ? prev : { left, top }));
    };
    place();
    const map = mapRef.current?.getMap();
    map?.on("move", place);
    map?.on("resize", place);
    return () => {
      map?.off("move", place);
      map?.off("resize", place);
    };
  }, [selected?.group.id]);

  return (
    <div className={`mapstage${sheetOpen && selected ? " has-sheet" : ""}`} ref={stageRef}>
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
              setSheetFor(group.id);
              setSheetOpen(true);
            }}
          >
            <span className={`mpin ${group.kind === "affiliate" ? "af" : "ch"} ${selected?.group.id === group.id ? "sel" : ""}`}>
              <i />
              <span>{group.city}</span>
            </span>
          </Marker>
        ))}
      </Map>
      {selected ? (
        <div className="map-card" role="dialog" aria-label={selected.group.name} style={{ left: cardPos.left, top: cardPos.top }}>
          <VenueCard group={selected} />
        </div>
      ) : null}
      <div className="map-legend">
        <div>
          <i /> Market
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
        {group.group.kind === "chapter" ? "Market" : "Affiliate"}
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
            Market page
          </Link>
        ) : null}
      </div>
    </div>
  );
}
