import Link from "next/link";
import { EventsBrowser } from "@/components/EventsBrowser";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { dateParts } from "@/lib/display";
import { nextSummit, upcomingEvents } from "@/lib/events";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, eventsSeo } from "@/lib/seo";

export const metadata = buildMetadata(eventsSeo());

export default function EventsPage() {
  const events = upcomingEvents();
  const summit = nextSummit();
  const parts = summit ? dateParts(summit, "America/New_York") : null;

  return (
    <>
      <Top>
        <section className="ehero">
          <div className="eyebrow">Events</div>
          <h1>
            Every meetup, <span>one calendar</span>
          </h1>
          <p className="lede">
            Find a WREI Connected women&apos;s real estate investing meetup near you or while you&apos;re traveling, and
            join the whole network online at the Quarterly Summit.
          </p>
        </section>
      </Top>
      <div className="c">
        {summit && parts ? (
          <article className="summit-card">
            <div className="sdate">
              <div className="m">{parts.month}</div>
              <div className="d">{parts.day}</div>
              <div className="m" style={{ marginTop: 4 }}>
                {parts.weekday}
              </div>
            </div>
            <div>
              <div className="eyebrow">Next Quarterly Summit · Online</div>
              <h2>{summit.title}</h2>
              <p>{summit.topic}</p>
              <div className="meta">
                <span>
                  <b>Online</b> · link comes with your RSVP
                </span>
                <span>
                  <b>Free</b> for members
                </span>
              </div>
            </div>
            <div className="r">
              <a className="btn btn-peach" href={summit.rsvpUrl}>
                Save my seat
              </a>
              <small>Time TBA</small>
            </div>
          </article>
        ) : null}
        <EventsBrowser initialEvents={events} />
      </div>
      <section className="c" style={{ paddingTop: 80 }}>
        <div className="nat" style={{ marginTop: 0 }}>
          <div>
            <h3>Don&apos;t see your city?</h3>
            <p>Start a WREI Connected group where you live. Your group. Our network.</p>
          </div>
          <Link className="btn btn-mid" href="/partner">
            Become a Partner
          </Link>
        </div>
      </section>
      <div style={{ height: 80 }} />
      <Footer />
      <JsonLd data={schemasForPath("/events")} />
    </>
  );
}
