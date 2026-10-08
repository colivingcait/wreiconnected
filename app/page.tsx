import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { chapters } from "@/lib/chapters";
import { dateParts } from "@/lib/display";
import { nextSummit } from "@/lib/events";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, homeSeo } from "@/lib/seo";
import { MARKET_DEFAULT_IMAGE, MARKET_DEFAULT_IMAGE_ALT, NATIONAL_SENTENCE, PRIMARY_TAGLINE, marketName } from "@/lib/site";

export const metadata = buildMetadata(homeSeo());

export default function HomePage() {
  const summit = nextSummit();
  const summitParts = summit ? dateParts(summit, "America/New_York") : null;

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
          </div>
          <div className="collage">
            <Image className="a" src={MARKET_DEFAULT_IMAGE} alt={MARKET_DEFAULT_IMAGE_ALT} width={900} height={700} priority />
            <div className="ring" />
            <Image
              className="b"
              src="/images/founders.jpg"
              alt="Jasmine Brown and Caitlyn Verdugo, co-founders of WREI Connected"
              width={640}
              height={800}
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </section>
      </Top>

      <section className="sec find">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Markets</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Find your market
              </h2>
            </div>
            <p>Local meetups for women real estate investors, all part of one national network.</p>
          </div>
          <div className="cities">
            {chapters.map((chapter) => (
              <Link key={chapter.slug} className="city feat" href={`/${chapter.slug}`}>
                <div>
                  <div className="n">{marketName(chapter.city)}</div>
                  <div className="s">{chapter.poweredBy ? `Powered by ${chapter.poweredBy}` : `${chapter.city}, ${chapter.stateCode}`}</div>
                </div>
                <span className="pill ch">Market</span>
              </Link>
            ))}
          </div>
          <p className="start-line">
            Want to start a market meetup? <Link href="/apply">Apply</Link> to open a market.
          </p>
        </div>
      </section>

      {summit && summitParts ? (
        <section className="sec">
          <div className="c">
            <div className="head">
              <div>
                <div className="eyebrow">Quarterly Summit</div>
                <h2 className="big" style={{ marginTop: 10 }}>
                  RSVP to our next Quarterly Summit
                </h2>
              </div>
            </div>
            <article className="summit-card" style={{ marginTop: 0 }}>
              <div className="sdate">
                <div className="m">{summitParts.month}</div>
                <div className="d">{summitParts.day}</div>
                <div className="m" style={{ marginTop: 4 }}>
                  {summitParts.weekday}
                </div>
              </div>
              <div>
                <div className="eyebrow">Online · Every market</div>
                <h2>{summit.title}</h2>
                <p>{summit.topic}</p>
              </div>
              <div className="r">
                <a className="btn btn-peach" href={summit.rsvpUrl}>
                  RSVP
                </a>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className="sec" style={{ paddingTop: summit ? 0 : undefined }}>
        <div className="c">
          <div className="story">
            <div>
              <div className="eyebrow">How this came together</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                We started out as strangers <em>at a meetup.</em>
              </h2>
            </div>
            <div className="body">
              <p>
                Back in 2024, the two of us met at a women&apos;s real estate investing meetup and hit it off right away. We
                became friends, then decided to do something bolder: build a portfolio together.
              </p>
              <p>
                Over the next couple of years we grew to <b>50 rooms</b> plus long-term rentals, and started co-hosting
                women&apos;s investing events. WREI Connected takes that room to cities across the country, because{" "}
                <b>your future partner could be sitting at the next table.</b>
              </p>
              <Link className="btn btn-line" href="/about">
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
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
              <p>Your city&apos;s market, plus women investors everywhere at the Quarterly Summit.</p>
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
