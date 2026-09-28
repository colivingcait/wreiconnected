import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, aboutSeo } from "@/lib/seo";
import { HOST_CTA, NATIONAL_SENTENCE } from "@/lib/site";

export const metadata = buildMetadata(aboutSeo());

export default function AboutPage() {
  return (
    <>
      <Top>
        <section className="ahero">
          <div>
            <div className="eyebrow">Our story</div>
            <h1>
              We started out as strangers <em>at a meetup.</em>
            </h1>
            <p className="lede">
              WREI Connected exists because of one room. Two women met at a local investing meetup, and a friendship
              turned into a partnership and a portfolio. We want every woman real estate investor to have a room like
              that.
            </p>
            <div className="acts">
              <Link className="btn btn-peach" href="/find">
                Find a meetup
              </Link>
              <a className="btn btn-line-lt" href="#why">
                Why meetups
              </a>
            </div>
          </div>
          <div>
            <Image
              className="arch"
              src="/images/founders.jpg"
              alt="Jasmine Brown and Caitlyn Verdugo, co-founders of WREI Connected, at a women's real estate investing meetup"
              width={640}
              height={800}
              priority
            />
            <div className="cap">Jasmine and Caitlyn, hosting in Atlanta</div>
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="story">
            <div>
              <div className="eyebrow">How it started</div>
              <div className="quote">
                Two strangers at a table, now business partners with our lives and goals <em>completely intertwined.</em>
              </div>
            </div>
            <div className="body">
              <p>
                Back in 2024, the two of us met at a women&apos;s real estate investing meetup and hit it off right away. We
                became friends, then decided to do something bolder: build a portfolio together.
              </p>
              <p>
                Over the next couple of years we grew to <b>50 rooms</b> plus long-term rentals, and started co-hosting
                women&apos;s investing events, including monthly meetups in Atlanta. The Atlanta chapter was formerly
                Atlanta Women Investors.
              </p>
              <p>
                {NATIONAL_SENTENCE} That&apos;s the whole point of the room. <b>Your future partner could be sitting at this table, too.</b>
              </p>
            </div>
          </div>
          <div className="tline">
            <div>
              <i />
              <b>2024</b>
              <span>We meet as strangers at a women&apos;s investing meetup.</span>
            </div>
            <div>
              <i />
              <b>Friends</b>
              <span>We hit it off right away and become fast friends.</span>
            </div>
            <div>
              <i />
              <b>Partners</b>
              <span>We build a portfolio together and grow to 50 rooms plus long-term rentals.</span>
            </div>
            <div>
              <i />
              <b>Hosts</b>
              <span>We start co-hosting monthly meetups for women investors in Atlanta, formerly Atlanta Women Investors.</span>
            </div>
            <div className="now">
              <i />
              <b>2026</b>
              <span>WREI Connected takes that room to cities across the country.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec why on-mid" id="why">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Why we believe in meetups</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Some things only happen in person
              </h2>
            </div>
            <p>We&apos;re investors first. We back meetups because they&apos;re where our own best deals and relationships came from.</p>
          </div>
          <div className="whys">
            <div className="w">
              <div className="no">01</div>
              <h3>Our partnership started in a room</h3>
              <p>We could have followed each other online for years. It took sitting across a table to know we could trust each other with a deal.</p>
            </div>
            <div className="w">
              <div className="no">02</div>
              <h3>Deals come from people</h3>
              <p>Lenders, partners, contractors, and the friend who talks you through your first offer. So much of what we&apos;ve built came from someone we met face to face.</p>
            </div>
            <div className="w">
              <div className="no">03</div>
              <h3>Every stage belongs in the same room</h3>
              <p>The woman looking at her first house hack learns from the one with a full portfolio, and the woman with the portfolio still leaves with something new.</p>
            </div>
            <div className="w">
              <div className="no">04</div>
              <h3>No woman should invest alone</h3>
              <p>Investing can feel isolating, especially when you&apos;re the only woman at the table. A monthly room full of women doing deals changes that.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c built">
          <div>
            <div className="eyebrow">Why we built WREI Connected</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              One room changed things for us. We want one in every city.
            </h2>
            <p>
              We saw what a monthly meetup did for us and for the women in our Atlanta room. WREI Connected brings that
              to every city, with local groups run by local hosts and funding, marketing, and a national network behind
              them.
            </p>
            <p>It&apos;s built around the hosts and members, not the two of us, so it can grow in cities we&apos;ve never visited.</p>
          </div>
          <div className="mission">
            <div className="eyebrow">What we stand for</div>
            <h3>Make sure no woman invests in real estate alone.</h3>
            <ul>
              <li>
                <b>Real connection</b>
                Relationships built face to face.
              </li>
              <li>
                <b>Local roots</b>
                Your city&apos;s group, and the whole country behind it.
              </li>
              <li>
                <b>Women doing deals</b>
                Practical talk from real portfolios, never a pitch.
              </li>
              <li>
                <b>Every stage</b>
                Beginners and veterans learning together.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Co-founders</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Meet Caitlyn and Jasmine
              </h2>
            </div>
          </div>
          <div className="founders">
            <div className="f">
              <Image src="/images/cv.jpg" alt="Caitlyn Verdugo, co-founder of WREI Connected" width={200} height={200} />
              <div>
                <div className="n">Caitlyn Verdugo</div>
                <div className="r">Realtor · Investor · Serial house hacker</div>
                <p>
                  Keller Williams Realtor in metro Atlanta and co-author of <i>Coliving Authority</i>. She helps
                  investors and house hackers buy their first and next properties.
                </p>
                <Link href="/atlanta#host-caitlyn-verdugo">Contact Caitlyn</Link>
              </div>
            </div>
            <div className="f">
              <Image src="/images/jb.jpg" alt="Jasmine Brown, co-founder of WREI Connected" width={200} height={200} />
              <div>
                <div className="n">Jasmine Brown</div>
                <div className="r">Hard money lender · Investor</div>
                <p>
                  Jasmine funds investors&apos; deals as a hard money lender and invests alongside Caitlyn. Bio line in
                  Jasmine&apos;s own words goes here.
                </p>
                <Link href="/atlanta#host-jasmine-brown">Contact Jasmine</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c ctas">
          <div className="card host">
            <div className="eyebrow">Come to a meetup</div>
            <h3>Your future partner could be at the next one.</h3>
            <p>Find a group in your city, or join the Quarterly Summit online.</p>
            <Link className="btn btn-peach" href="/find">
              Find a meetup
            </Link>
          </div>
          <div className="card coach">
            <div className="eyebrow">Host in your city</div>
            <h3>{HOST_CTA}</h3>
            <p>Start a Chapter or bring your group in as an Affiliate.</p>
            <Link className="btn btn-mid" href="/partner">
              Become a partner
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath("/about")} />
    </>
  );
}
