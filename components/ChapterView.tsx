import Image from "next/image";
import Link from "next/link";
import { HostMessageForm, SignupForm } from "@/components/Forms";
import { SiteNav } from "@/components/SiteChrome";
import { calendarUrl, dateParts, timeLabel } from "@/lib/display";
import { eventsForGroup, nextSummit } from "@/lib/events";
import { chapterFaqs } from "@/lib/faq";
import { getCityGuide, getLatestRecap } from "@/lib/blog";
import { MARKET_BLURB, marketName } from "@/lib/site";
import type { Chapter } from "@/lib/types";

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const meetups = eventsForGroup(chapter.slug);
  const featured = meetups[0];
  const summit = nextSummit();
  const later = [...meetups.slice(1), ...(summit ? [summit] : [])].sort((a, b) => a.date.localeCompare(b.date));
  const guide = getCityGuide(chapter.slug);
  const recap = getLatestRecap(chapter.slug);
  const faqs = chapterFaqs(chapter);
  const featuredParts = featured ? dateParts(featured, chapter.timezone) : null;
  const name = marketName(chapter.city);
  const address = [chapter.streetAddress, `${chapter.city}, ${chapter.stateCode}`, chapter.postalCode]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <div className="top on-mid">
        <div className="c">
          <SiteNav />
          <div className="crumb">
            <Link href="/find">Find a Meetup</Link>
            {" / "}
            {chapter.city}
          </div>
          <section className="chero">
            <div>
              <div className="eyebrow">{chapter.city}&apos;s meetup for women real estate investors</div>
              <h1>
                <span>{chapter.city}</span>
                <br />
                WREI Connected
              </h1>
              {chapter.poweredBy ? <p className="powered">Powered by {chapter.poweredBy}</p> : null}
              {chapter.formerly ? <p className="formerly">{`Formerly ${chapter.formerly}.`}</p> : null}
              <p className="lede">{MARKET_BLURB}</p>
              <div className="acts">
                {featured ? (
                  <a className="btn btn-peach" href={featured.rsvpUrl}>
                    RSVP
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
              </nav>
              {chapter.placeholder ? <p className="placeholder-flag">Placeholder market</p> : null}
            </div>
            <Image
              className="hero-photo"
              src={chapter.heroImage}
              alt={chapter.heroImageAlt}
              width={900}
              height={700}
              priority
            />
          </section>
        </div>
      </div>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Your co-hosts</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Meet your Co-Hosts
              </h2>
            </div>
          </div>
          <div className="hosts">
            {chapter.hosts.map((host) => (
              <article className="host" id={`host-${host.id}`} key={host.id}>
                <Image src={host.photo} alt={`${host.name}, co-host of ${name}, a women's real estate investing meetup`} width={host.photoWidth} height={host.photoHeight} />
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

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="story">
            <div>
              <div className="eyebrow">About us</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                A message from your hosts
              </h2>
            </div>
            <div className="body">
              <p>{chapter.hostIntro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Come to the next one</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Upcoming events
              </h2>
            </div>
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
                <div className="foot2">
                  <a className="btn btn-peach" href={featured.rsvpUrl}>
                    RSVP free
                  </a>
                  <small>
                    {featured.goingCount ? `${featured.goingCount} going · ` : null}
                    <a href={calendarUrl(featured, `${name} – ${featured.title}`, address)}>Add to calendar</a>
                  </small>
                </div>
              </div>
            ) : (
              <div className="next">
                <div className="t">Dates coming soon</div>
                <p className="topic">The hosts have not published the next meetup yet.</p>
              </div>
            )}
            <div className="evlist">
              {later.map((event) => {
                const parts = dateParts(event, event.type === "summit" ? "America/New_York" : chapter.timezone);
                const weekday = `${parts.weekday.slice(0, 1)}${parts.weekday.slice(1).toLowerCase()}`;
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
                          ? `${weekday} · Online · the whole national network`
                          : `${weekday} · ${timeLabel(event)}`}
                      </div>
                    </div>
                    <a href={event.rsvpUrl}>RSVP</a>
                  </div>
                );
              })}
            </div>
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
            <div className="eyebrow">Stay in the loop</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Subscribe to {name}
            </h2>
            <p>Hear about each {chapter.city} meetup first, plus the national newsletter.</p>
          </div>
          <SignupForm
            kind="city-signup"
            button="Subscribe"
            emailLabel={`Yes, email me ${name} invites and WREI Connected news.`}
            cityValue={`${chapter.city}, ${chapter.stateCode}`}
          />
        </div>
        <div className="nat">
          <div>
            <h3>Part of a national network</h3>
            <p>{chapter.city} members also get the Quarterly Summit and a welcome at any market across the country.</p>
          </div>
          <Link className="btn btn-mid" href="/find">
            See all markets
          </Link>
        </div>
      </section>
    </>
  );
}
