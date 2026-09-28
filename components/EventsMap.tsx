"use client";

import { setWorkerUrl } from "maplibre-gl";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Next's bundler breaks MapLibre's default worker URL. Serve the matching
// worker from /maplibre so tiles actually render.
setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
import Link from "next/link";
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
  const lngs = groups.map((item) => item.group.lng);
  const lats = groups.map((item) => item.group.lat);
  const bounds: [[number, number], [number, number]] | undefined = groups.length
    ? [
        [Math.min(...lngs) - 1.5, Math.min(...lats) - 1.2],
        [Math.max(...lngs) + 1.5, Math.max(...lats) + 1.2],
      ]
    : undefined;

  return (
    <div className="mapstage">
      <Map
        key={groups.map((item) => item.group.id).join("-") || "empty"}
        initialViewState={
          bounds
            ? { bounds, fitBoundsOptions: { padding: 70 } }
            : { longitude: -84.4, latitude: 33.8, zoom: 4 }
        }
        mapStyle={STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        {groups.map(({ group }) => (
          <Marker key={group.id} longitude={group.lng} latitude={group.lat} anchor="bottom" onClick={(event) => {
            event.originalEvent.stopPropagation();
            onSelect(group.id);
          }}>
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
          >
            <div className="pop-card">
              <div className="g">{selected.group.name}</div>
              <div className="s">
                {selected.group.kind === "chapter" ? "Chapter" : "Affiliate"}
                {selected.group.venueName ? ` · ${selected.group.venueName}` : ""}
              </div>
              {selected.upcoming.slice(0, 2).map((event) => (
                <div className="row" key={event.id}>
                  <span>
                    <b>{shortWhen(event, selected.group.timezone)}</b>
                  </span>
                  <span>{event.title}</span>
                </div>
              ))}
              <div className="btns">
                {selected.upcoming[0] ? (
                  <a className="btn btn-peach" href={selected.upcoming[0].rsvpUrl}>
                    RSVP {dateParts(selected.upcoming[0], selected.group.timezone).month}{" "}
                    {dateParts(selected.upcoming[0], selected.group.timezone).day}
                  </a>
                ) : null}
                {selected.group.hasPage ? (
                  <Link className="btn btn-line" href={`/${selected.group.id}`}>
                    Chapter page
                  </Link>
                ) : null}
              </div>
            </div>
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
    </div>
  );
}
