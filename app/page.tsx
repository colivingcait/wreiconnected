import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { dateParts, publicTitle, timeLabel } from "@/lib/display";
import { getDirectory, getGroup, groupHref } from "@/lib/directory";
import { nextEventForGroup, nextSummit, upcomingEvents } from "@/lib/events";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, homeSeo } from "@/lib/seo";
import { HOST_CTA, NATIONAL_SENTENCE, PRIMARY_TAGLINE } from "@/lib/site";
import type { WreiEvent } from "@/lib/types";

export const metadata = buildMetadata(homeSeo());

export default function HomePage() {
  const cards = [
    nextEventForGroup("atlanta"),
    nextEventForGroup("charleston"),
    upcomingEvents().find((event) => event.type === "affiliate"),
    nextSummit(),
  ]
    .filter((event): event is WreiEvent => Boolean(event))
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  return (
    <>
      <Top>
        <section className="hero">
          <div>
            <div className="eyebrow">For women real estate investors</div>
            <h1>
              {PRIMARY_TAGLINE.split(". ")[0]}. <em>National network.</em>
            </h1>
            <p className="lede">
              {NATIONAL_SENTENCE} Come meet women doing deals in your city, whether it&apos;s your first deal or your
              fortieth.
            </p>
            <form className="search" action="/find">
              <input name="q" placeholder="Enter your city" aria-label="Enter your city" />
              <button className="btn btn-peach" type="submit">
                Find a meetup
              </button>
            </form>
            <p className="under">
              Run a group already? <Link href="/partner">{HOST_CTA}</Link>
            </p>
          </div>
          <div className="collage">
            <Image
              className="a"
              src="/images/meetup.jpg"
              alt="Women real estate investors at a WREI Connected meetup"
              width={900}
              height={700}
              priority
            />
            <div className="ring" />
            <Image
              className="b"
              src="/images/hero.jpg"
              alt="Women real estate investors talking at a WREI Connected meetup"
              width={1400}
              height={900}
            />
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Upcoming events</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Meet up this month
              </h2>
            </div>
            <Link className="btn btn-line" href="/events">
              See all events
            </Link>
          </div>
          <div className="events">
            {cards.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec find">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Find a meetup</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Groups in cities across the country
              </h2>
            </div>
            <p>Chapters run under WREI Connected. Affiliates keep their own name and belong to the national network.</p>
          </div>
          <div className="cities">
            {getDirectory().map((group) => {
              const href = groupHref(group);
              const className = `city${group.kind === "chapter" ? " feat" : ""}`;
              const body = (
                <>
                  <div>
                    <div className="n">{group.name}</div>
                    <div className="s">{group.blurb}</div>
                  </div>
                  <span className={group.kind === "chapter" ? "pill ch" : "pill af"}>
                    {group.kind === "chapter" ? "Chapter" : "Affiliate"}
                  </span>
                </>
              );
              return href ? (
                <Link key={group.id} className={className} href={href}>
                  {body}
                </Link>
              ) : (
                <div key={group.id} className={className}>
                  {body}
                </div>
              );
            })}
            <div className="city start">
              <div>
                <div className="n">Don&apos;t see your city?</div>
                <div className="s">Start a group with us behind you</div>
              </div>
              <Link className="btn btn-mid" href="/partner" style={{ padding: "10px 16px", fontSize: 13 }}>
                Become a partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Why women join</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                No woman should invest alone
              </h2>
            </div>
          </div>
          <div className="pillars">
            <div>
              <div className="k">
                <i />
              </div>
              <h3>Real connection</h3>
              <p>Relationships built face to face, at a meetup in your own city.</p>
            </div>
            <div>
              <div className="k">
                <i />
              </div>
              <h3>Local roots, national reach</h3>
              <p>Your city&apos;s group, plus women investors everywhere at the Quarterly Summit.</p>
            </div>
            <div>
              <div className="k">
                <i />
              </div>
              <h3>Women doing deals</h3>
              <p>Practical knowledge from people with real portfolios. Here&apos;s what worked, not a pitch.</p>
            </div>
            <div>
              <div className="k">
                <i />
              </div>
              <h3>Room for every stage</h3>
              <p>Beginners and experienced investors learning together, with every win celebrated.</p>
            </div>
          </div>
          <div className="photos" style={{ marginTop: 56 }}>
            <Image
              src="/images/meetup.jpg"
              alt="Women real estate investors at a WREI Connected meetup"
              width={900}
              height={700}
              style={{ objectPosition: "70% 50%" }}
            />
            <Image src="/images/g1.jpg" alt="Women real estate investors meeting in person with WREI Connected" width={900} height={700} />
            <Image
              src="/images/coach.jpg"
              alt="A woman real estate investor with the WREI Connected community"
              width={900}
              height={900}
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c aud">
          <div className="card host">
            <div className="eyebrow">For hosts</div>
            <h3>{HOST_CTA}</h3>
            <p>
              Join as a Chapter and we bring funding, marketing, and a national network behind your group. Prefer to keep
              your brand? Join as an Affiliate.
            </p>
            <Link className="btn btn-peach" href="/partner">
              Become a partner
            </Link>
          </div>
          <div className="card spon">
            <div className="eyebrow">For sponsors</div>
            <h3>Reach women investors in every city</h3>
            <p>One partnership puts you in front of engaged women investors at in-person meetups across the country.</p>
            <Link className="btn btn-mid" href="/sponsors">
              Become a sponsor
            </Link>
          </div>
          <div className="card coach">
            <div className="eyebrow">Coaching · Name coming soon</div>
            <h3>Guidance to your first or next deal</h3>
            <p>Structured coaching from the WREI Connected community, with webinars, a monthly course, and small-group calls.</p>
            <p className="note">Open to investors of any gender.</p>
            <Link className="btn btn-mid" href="/coaching">
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>

      <section className="c">
        <div className="signup on-mid">
          <div>
            <div className="eyebrow">Join the national list</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Hear about meetups near you
            </h2>
            <p>
              You&apos;ll get event updates and the monthly newsletter from WREI Connected, plus personal outreach from
              your local host.
            </p>
          </div>
          <SignupForm
            kind="national-signup"
            button="Join the network"
            emailLabel="Yes, email me WREI Connected updates and news from my local host."
          />
        </div>
      </section>

      <Footer />
      <JsonLd data={schemasForPath("/")} />
    </>
  );
}

function EventCard({ event }: { event: WreiEvent }) {
  const group = event.groupId === "national" ? undefined : getGroup(event.groupId);
  const parts = dateParts(event, group?.timezone ?? "America/New_York");
  if (event.type === "summit") {
    return (
      <article className="ev summit">
        <span className="tag">Virtual · Every chapter</span>
        <div className="date">
          <span className="d">{parts.day}</span>
          <span className="m">
            {parts.month} · {parts.weekday}
          </span>
        </div>
        <div className="t">{event.title}</div>
        <div className="w">{event.topic}</div>
        <a className="r" href={event.rsvpUrl}>
          Save my seat
        </a>
      </article>
    );
  }
  return (
    <article className="ev">
      <div className="date">
        <span className="d">{parts.day}</span>
        <span className="m">
          {parts.month} · {parts.weekday}
        </span>
      </div>
      <div className="t">{publicTitle(event, group)}</div>
      <div className="w">
        {timeLabel(event)}
        {group ? ` · ${group.city}` : ""}
      </div>
      <a className="r" href={event.rsvpUrl}>
        {event.type === "affiliate" ? "RSVP on their site" : "RSVP on Eventbrite"}
      </a>
    </article>
  );
}
