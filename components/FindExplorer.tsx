"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteChrome";
import { dateParts } from "@/lib/display";
import { nextEventForGroup, nextSummit } from "@/lib/events";
import { groupHref } from "@/lib/directory";
import type { DirectoryGroup } from "@/lib/types";

function project(group: DirectoryGroup) {
  const minLng = -98;
  const maxLng = -78;
  const minLat = 25;
  const maxLat = 40;
  const x = ((group.lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - group.lat) / (maxLat - minLat)) * 100;
  return {
    left: `${Math.min(92, Math.max(8, x))}%`,
    top: `${Math.min(88, Math.max(10, y))}%`,
  };
}

export function FindExplorer({ groups }: { groups: DirectoryGroup[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | "chapter" | "affiliate">("all");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q") ?? "";
    if (query) setQ(query);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return groups.filter((group) => {
      if (kind !== "all" && group.kind !== kind) return false;
      if (!needle) return true;
      return [group.city, group.state, group.stateCode, group.name, group.postalCode ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [groups, q, kind]);

  const chapters = filtered.filter((group) => group.kind === "chapter");
  const affiliates = filtered.filter((group) => group.kind === "affiliate");
  const summit = nextSummit();

  return (
    <>
      <div className="top on-mid">
        <div className="c">
          <SiteNav />
          <section className="phead">
            <div className="eyebrow">Find a meetup</div>
            <h1>
              Find your people, <em>in your city.</em>
            </h1>
            <p className="lede">
              Every group in the network meets in person. Chapters run under WREI Connected. Affiliates keep their own
              name and are part of the national network of women&apos;s real estate investing meetups.
            </p>
      <div className="bar-find">
        <form className="search" action="/find" method="get">
          <input name="q" value={q} onChange={(event) => setQ(event.target.value)} placeholder="City or zip" aria-label="City or zip" />
          <button className="btn btn-peach" type="submit">
            Search
          </button>
        </form>
        {(
          [
            ["all", "All groups"],
            ["chapter", "Chapters"],
            ["affiliate", "Affiliates"],
          ] as const
        ).map(([value, label]) => (
          <button key={value} type="button" className={kind === value ? "fp on" : "fp"} onClick={() => setKind(value)}>
            {label}
          </button>
        ))}
      </div>
          </section>
        </div>
      </div>
      <div className="c">
      <div className="wrap">
        <div className="list">
          <h2>
            Chapters <span>{chapters.length}</span>
          </h2>
          {chapters.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          <h2 style={{ marginTop: 26 }}>
            Affiliates <span>{affiliates.length}</span>
          </h2>
          {affiliates.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          {filtered.length === 0 ? <p className="empty">No groups match that search yet.</p> : null}
        </div>
        <div>
          <div className="mapcard">
            <div className="maptop">
              <b>
                {filtered.length} group{filtered.length === 1 ? "" : "s"}, one network
              </b>
              <div className="lg">
                <span>
                  <i style={{ background: "#1B2A4A", boxShadow: "0 0 0 4px #F2A98A73", display: "inline-block", width: 11, height: 11, borderRadius: "50%", marginRight: 6 }} />
                  Chapter
                </span>
                <span>
                  <i style={{ background: "#fff", border: "2px solid #1B2A4A", display: "inline-block", width: 11, height: 11, borderRadius: "50%", marginRight: 6 }} />
                  Affiliate
                </span>
              </div>
            </div>
            <div className="dirmap" aria-hidden>
              {filtered.map((group) => (
                <span key={group.id} className={`dirpin ${group.kind === "affiliate" ? "af" : "ch"}`} style={project(group)}>
                  <i />
                  {group.city}
                </span>
              ))}
            </div>
          </div>
          {summit ? (
            <div className="summitstrip">
              <div>
                <b>Can&apos;t make it in person?</b>
                <p>Every member can join the Quarterly Summit online. Next one is {summit.title.replace("Quarterly Summit – ", "")}.</p>
              </div>
              <a className="btn btn-peach" href={summit.rsvpUrl}>
                Save my seat
              </a>
            </div>
          ) : null}
        </div>
      </div>
      <div className="startband">
        <div>
          <div className="eyebrow">Don&apos;t see your city?</div>
          <h2>Start a group, with a national network behind you.</h2>
          <p>Launch a new Chapter, or bring the group you already run in as an Affiliate.</p>
        </div>
        <Link className="btn btn-mid" href="/partner">
          Become a partner
        </Link>
      </div>
      </div>
    </>
  );
}

function GroupCard({ group }: { group: DirectoryGroup }) {
  const event = nextEventForGroup(group.id);
  const href = groupHref(group);
  const parts = event ? dateParts(event, group.timezone) : null;
  return (
    <article className={group.kind === "chapter" ? "item feat" : "item"}>
      <div>
        <div className="n">{group.name}</div>
        <div className="s">{group.blurb}</div>
      </div>
      <span className={group.kind === "chapter" ? "pill ch" : "pill af"}>
        {group.kind === "chapter" ? "Chapter" : "Affiliate"}
      </span>
      <div className="nx">
        {event && parts
          ? `${parts.month} ${parts.day} · ${event.title}`
          : group.kind === "chapter"
            ? "Get notified when it launches"
            : "RSVP on their site"}
        {href ? (
          <Link href={href}>
            <span>View chapter →</span>
          </Link>
        ) : (
          <span>Directory listing</span>
        )}
      </div>
    </article>
  );
}
