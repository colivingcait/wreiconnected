import Image from "next/image";
import Link from "next/link";
import { HostMessageForm, SignupForm } from "@/components/Forms";
import { SiteNav } from "@/components/SiteChrome";
import { calendarUrl, dateParts, timeLabel } from "@/lib/display";
import { eventsForGroup, nextSummit } from "@/lib/events";
import { AGENDA, chapterFaqs } from "@/lib/faq";
import { getCityGuide, getLatestRecap } from "@/lib/blog";
import { aboutSentence } from "@/lib/site";
import type { Chapter } from "@/lib/types";

function hostTitle(chapter: Chapter) {
  const names = chapter.hosts.map((host) => host.name.split(" ")[0]);
  if (names.length === 1) return `Meet ${chapter.hosts[0].name}`;
  if (names.length === 2) return `Meet ${names[0]} and ${names[1]}`;
  return "Meet your hosts";
}

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const meetups = eventsForGroup(chapter.slug);
  const featured = meetups[0];
  const summit = nextSummit();
  const later = [...meetups.slice(1), ...(summit ? [summit] : [])].sort((a, b) => a.date.localeCompare(b.date));
  const guide = getCityGuide(chapter.slug);
  const recap = getLatestRecap(chapter.slug);
  const faqs = chapterFaqs(chapter);
  const featuredParts = featured ? dateParts(featured, chapter.timezone) : null;
  const address = [chapter.streetAddress, `${chapter.city}, ${chapter.stateCode}`, chapter.postalCode]
    .filter(Boolean)
    .join(", ");
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [chapter.venueName, chapter.streetAddress, chapter.city, chapter.stateCode].filter(Boolean).join(" "),
  )}`;

  return (
    <>
      <div className="top on-mid">
        <div className="c">
          <SiteNav />
      <div className="crumb">
        <Link href="/find">Find a Meetup</Link>
        {" / "}
        {chapter.city}
        <span style={{ opacity: 0.55 }}> · wreiconnected.com/{chapter.slug}</span>
      </div>
      <section className="chero">
        <div>
          <div className="eyebrow">{chapter.city}&apos;s meetup for women real estate investors</div>
          <h1>
            WREI Connected |<br />
            <span>{chapter.city}</span>
          </h1>
          {chapter.formerly ? <p className="formerly">{`Formerly ${chapter.formerly}.`}</p> : null}
          <p className="about-line">
            <strong>About this group. </strong>
            {aboutSentence(chapter)}
          </p>
          <p className="lede">{chapter.heroLede}</p>
          <div className="acts">
            {featured ? (
              <a className="btn btn-peach" href={featured.rsvpUrl}>
                RSVP for {featuredParts ? `${featuredParts.month.charAt(0)}${featuredParts.month.slice(1).toLowerCase()} ${featuredParts.day}` : "the next meetup"}
              </a>
            ) : null}
            <a className="btn btn-line-lt" href="#msg">
              Message the hosts
            </a>
          </div>
          <nav className="chapter-links" aria-label="Related">
            {guide ? <Link href={`/blog/${guide.slug}`}>{chapter.city} investing guide</Link> : null}
            {recap ? <Link href={`/blog/${recap.slug}`}>Latest meetup recap</Link> : null}
            <Link href="/events">All events</Link>
            <a href="#hosts">Hosts</a>
          </nav>
          {chapter.placeholder ? <p className="placeholder-flag">Placeholder chapter</p> : null}
        </div>
        <Image
          className="hero-photo"
          src={chapter.heroImage}
          alt={chapter.heroImageAlt}
          width={chapter.slug === "atlanta" ? 640 : 900}
          height={chapter.slug === "atlanta" ? 800 : 700}
          priority
        />
      </section>
        </div>
      </div>

      <div className="c">
        <div className="ww">
          <div className="info">
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Where and when
            </div>
            <div className="wrow">
              <b>When</b>
              <div>
                <div className="v">{chapter.rhythm.replace(/^the\s+/i, "").replace(/^./, (char) => char.toUpperCase())}</div>
                <div className="s">
                  {chapter.timeRange}
                  {featured && featuredParts ? ` · next one ${featuredParts.weekday.slice(0, 1)}${featuredParts.weekday.slice(1).toLowerCase()}, ${featuredParts.month.slice(0, 1)}${featuredParts.month.slice(1).toLowerCase()} ${featuredParts.day}` : ""}
                </div>
              </div>
            </div>
            <div className="wrow">
              <b>Where</b>
              <div>
                <div className="v">{chapter.venueName}</div>
                <div className="s">{address || `${chapter.city}, ${chapter.stateCode}`}</div>
              </div>
            </div>
            <div className="wrow">
              <b>Look for</b>
              <div>
                <div className="v">{chapter.lookFor}</div>
                <div className="s">{chapter.lookForDetail}</div>
              </div>
            </div>
            <div className="wrow">
              <b>Parking</b>
              <div>
                <div className="v">Parking at the venue</div>
                <div className="s">{chapter.parkingNote}</div>
              </div>
            </div>
            <div className="wrow">
              <b>Cost</b>
              <div>
                <div className="v">{chapter.cost}</div>
                <div className="s">RSVP so we can plan the space</div>
              </div>
            </div>
          </div>
          <div className="mapwrap">
            <div className="decor-map" aria-hidden>
              <div className="pin-mark" />
            </div>
            <a className="btn btn-line" href={directions}>
              Get directions
            </a>
          </div>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: 72 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Come to the next one</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Upcoming meetups
              </h2>
            </div>
            <span className="sync">
              <i />
              Updates automatically from Eventbrite
            </span>
          </div>
          <div className="upw">
            {featured && featuredParts ? (
              <div className="next">
                <div className="row1">
                  <div className="dbig">
                    <div className="m">{featuredParts.month}</div>
                    <div className="d">{featuredParts.day}</div>
                    <div className="m" style={{ marginTop: 4 }}>
                      {featuredParts.weekday}
                    </div>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--peach)" }}>
                      Next meetup
                    </div>
                    <div className="t">{featured.title}</div>
                    <div className="topic">{featured.topic}</div>
                  </div>
                </div>
                <div className="agenda">
                  {AGENDA.map((item) => (
                    <div key={item.time}>
                      <span>{item.time}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="foot2">
                  <a className="btn btn-peach" href={featured.rsvpUrl}>
                    RSVP free
                  </a>
                  <small>
                    {featured.goingCount ? `${featured.goingCount} going · ` : null}
                    <a href={calendarUrl(featured, `${chapter.groupName} – ${featured.title}`, address)}>Add to calendar</a>
                  </small>
                </div>
              </div>
            ) : (
              <div className="next">
                <div className="t">Dates coming soon</div>
                <p className="topic">The host has not published the next meetup yet.</p>
              </div>
            )}
            <div className="evlist">
              {later.map((event) => {
                const parts = dateParts(event, event.type === "summit" ? "America/New_York" : chapter.timezone);
                return (
                  <div className={event.type === "summit" ? "ev2 sum" : "ev2"} key={event.id}>
                    <div className="dt">
                      <div className="m">{parts.month}</div>
                      <div className="d">{parts.day}</div>
                    </div>
                    <div>
                      <div className="t">{event.type === "summit" ? "Quarterly Summit" : event.title}</div>
                      <div className="s">
                        {event.type === "summit"
                          ? `${parts.weekday.slice(0, 1)}${parts.weekday.slice(1).toLowerCase()} · Online · the whole national network`
                          : `${parts.weekday.slice(0, 1)}${parts.weekday.slice(1).toLowerCase()} · ${timeLabel(event)} · ${event.venueName || chapter.venueName}`}
                      </div>
                    </div>
                    <a href={event.rsvpUrl}>{event.type === "summit" ? "Save my seat" : "RSVP"}</a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} id="hosts">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Your hosts</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                {hostTitle(chapter)}
              </h2>
            </div>
            <p>{chapter.hostIntro}</p>
          </div>
          <div className="hosts">
            {chapter.hosts.map((host) => (
              <article className="host" id={`host-${host.id}`} key={host.id}>
                <Image src={host.photo} alt={`${host.name}, host of the ${chapter.groupName} women's real estate investing meetup`} width={host.photoWidth} height={host.photoHeight} />
                <div>
                  <div className="n">{host.name}</div>
                  <div className="r">{host.role}</div>
                  <p>{host.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec find" id="msg">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Before you come</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Questions, answered
              </h2>
            </div>
          </div>
          <div className="faqwrap">
            <div className="faq">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="msg">
              <div className="eyebrow">Message the hosts</div>
              <h3>Still have a question?</h3>
              <p className="sub">Send it here and the hosts will get back to you.</p>
              <div className="who">
                {chapter.hosts.map((host) => (
                  <Image key={host.id} src={host.photo} alt="" width={38} height={38} />
                ))}
                Usually replies within a day
              </div>
              <HostMessageForm city={chapter.city} />
            </div>
          </div>
        </div>
      </section>

      <section className="c" style={{ paddingTop: 80 }}>
        <div className="signup on-mid">
          <div>
            <div className="eyebrow">Join {chapter.city}</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Get the {chapter.city} invites
            </h2>
            <p>Hear about each {chapter.city} meetup first, plus the national newsletter.</p>
          </div>
          <SignupForm
            kind="city-signup"
            button={`Join the ${chapter.city} list`}
            emailLabel={`Yes, email me ${chapter.city} meetup invites and WREI Connected news.`}
            cityValue={`${chapter.city}, ${chapter.stateCode}`}
          />
        </div>
        <div className="nat">
          <div>
            <h3>Part of a national network</h3>
            <p>{chapter.city} members also get the Quarterly Summit and a welcome at any group across the country.</p>
          </div>
          <Link className="btn btn-mid" href="/find">
            See all groups
          </Link>
        </div>
      </section>
    </>
  );
}
