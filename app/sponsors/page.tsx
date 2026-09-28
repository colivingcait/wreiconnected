import Link from "next/link";
import { SponsorForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, sponsorsSeo } from "@/lib/seo";

export const metadata = buildMetadata(sponsorsSeo());

export default function SponsorsPage() {
  return (
    <>
      <Top>
        <section className="shero">
          <div>
            <div className="eyebrow">Sponsors</div>
            <h1>
              Reach women investors
              <br />
              <em>in every city.</em>
            </h1>
            <p className="lede">
              One partnership puts you in front of engaged women real estate investors at WREI Connected in-person
              meetups across the country, and at our national Quarterly Summit.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-peach" href="#inquire">
                Become a sponsor
              </a>
              <a className="btn btn-line-lt" href="#inquire">
                Request the media kit
              </a>
            </div>
          </div>
          <div className="reach">
            <div className="eyebrow">Network reach · Updated quarterly</div>
            {/* PLACEHOLDER reach figures from the approved mock. Replace with Eventbrite counts. */}
            <div className="rg">
              <div>
                <b>7</b>
                <span>Cities with active groups</span>
              </div>
              <div>
                <b>60+</b>
                <span>In-person meetups a year</span>
              </div>
              <div>
                <b>2,400</b>
                <span>Women on the national list</span>
              </div>
              <div>
                <b>4</b>
                <span>Quarterly Summits a year</span>
              </div>
            </div>
            <p className="fine">Attendance comes from Eventbrite check-ins. Reach counts only members who opted in to the national list.</p>
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Who we partner with</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Resources our members use
              </h2>
            </div>
            <p>We present sponsors to members as resources, so we look for companies that genuinely help women buy, fund, and run properties.</p>
          </div>
          <div className="cats">
            <span>Lenders and financing</span>
            <span>Proptech and software</span>
            <span>Investor tools</span>
            <span>Insurance</span>
            <span>Title and closing</span>
            <span>Property services</span>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">What sponsors get</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Visibility that members welcome
              </h2>
            </div>
          </div>
          <div className="gets5">
            <div className="g">
              <div className="no">01</div>
              <h3>Presence at Chapter meetups</h3>
              <p>A two-minute welcome, a resource table, and thank-yous on slides and in the event emails.</p>
            </div>
            <div className="g">
              <div className="no">02</div>
              <h3>A Summit Spotlight</h3>
              <p>A clearly labeled, roughly five-minute Sponsor Spotlight at the national Quarterly Summit.</p>
            </div>
            <div className="g">
              <div className="no">03</div>
              <h3>Website and newsletter</h3>
              <p>Placement on the WREI Connected website and in the monthly newsletter that goes to the national list.</p>
            </div>
            <div className="g dark">
              <div className="no">04</div>
              <h3>Opt-in leads only</h3>
              <p>Members check &quot;Want info from you?&quot; if they&apos;re interested. We never share or sell our member list.</p>
            </div>
            <div className="g">
              <div className="no">05</div>
              <h3>A year-end report</h3>
              <p>Reach and engagement numbers backed by Eventbrite check-in data, so you can see what you got.</p>
            </div>
            <div className="g">
              <div className="no">06</div>
              <h3>Category exclusivity</h3>
              <p>Where it makes sense, one sponsor per category and tier, so you aren&apos;t sharing the room with a competitor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec find">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Ways to sponsor</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                National reach or one city
              </h2>
            </div>
            <p>Pricing is based on total reach, including list size, cities, and attendance. Ask for the current media kit.</p>
          </div>
          <div className="ways">
            <div className="way nat">
              <div className="eyebrow">National sponsorship</div>
              <h3>Every Chapter, the Summit, and the national list</h3>
              <p>A national package covers Chapter meetups across the country, the Quarterly Summit, the website, and the newsletter.</p>
              <div className="tiers">
                <span>Title sponsor</span>
                <span>National partner</span>
                <span>Supporter</span>
              </div>
              <a className="btn btn-peach" href="#inquire">
                Ask about national packages
              </a>
            </div>
            <div className="way loc">
              <div className="eyebrow">Local event sponsor</div>
              <h3>Present one meetup in one city</h3>
              <p>Be the presenting sponsor for a single Chapter meetup. It&apos;s a good fit for a local lender, contractor, or title company that wants to cover food and meet the room.</p>
              <div style={{ height: 22 }} />
              <Link className="btn btn-mid" href="#inquire">
                Sponsor a local meetup
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c promise">
          <div>
            <div className="eyebrow">How sponsor moments work</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Our meetups stay pitch-free, and that&apos;s why sponsors do well here
            </h2>
          </div>
          <ul>
            <li>
              <b>Brief and labeled</b>
              Sponsor moments are short, clearly marked, and educational, so members stay open to them.
            </li>
            <li>
              <b>Leads by consent</b>
              Members raise their hand to hear from you. Nobody gets added to a list without asking.
            </li>
            <li>
              <b>Fair market value</b>
              Lender and settlement-service sponsorships pay for real marketing, never for referrals or leads.
            </li>
            <li>
              <b>Vetted partners</b>
              We set sponsor criteria, review content before events, and keep the right to decline.
            </li>
            <li>
              <b>Upfront about lending</b>
              One of our co-founders is a hard money lender. Lender sponsors get the same access rules she follows.
            </li>
          </ul>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Current sponsors</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Thank you to our partners
              </h2>
            </div>
          </div>
          <div className="logos">
            <div className="logo-slot">
              <b>Title sponsor</b>
              Logo
            </div>
            <div className="logo-slot">Partner logo</div>
            <div className="logo-slot">Partner logo</div>
            <div className="logo-slot">Partner logo</div>
            <div className="logo-slot">Partner logo</div>
          </div>
        </div>
      </section>

      <section className="sec find" id="inquire">
        <div className="c apply">
          <div className="side">
            <div className="eyebrow">Sponsor inquiry</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Let&apos;s talk about a partnership
            </h2>
            <p>Tell us a little about your company and what you&apos;re hoping to reach. We&apos;ll send the current media kit and set up a call.</p>
            <div className="cityrule">
              <b>Prefer email?</b>
              The sponsorship email address goes here once the domain is set up.
            </div>
          </div>
          <div className="fcard">
            <SponsorForm />
          </div>
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath("/sponsors")} />
    </>
  );
}
