import Image from "next/image";
import Link from "next/link";
import { PartnerForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, partnerSeo } from "@/lib/seo";

export const metadata = buildMetadata(partnerSeo());

const CHAPTER_ROWS = [
  ["Brand", "Full WREI Connected branding and a launch-ready brand kit"],
  ["Events", "Run on our Eventbrite and show up on the website automatically"],
  ["Marketing", "Done-for-you email and text campaigns, featured on the website"],
  ["Funding", "Startup venue support and venue negotiation help"],
  ["Sponsors", "Sponsors in your city help cover your meetups and marketing"],
  ["Community", "Host mastermind, Quarterly Summit, national network"],
  ["Onboarding", "Guided onboarding and rebrand support"],
];

const AFFILIATE_ROWS: { label: string; text: string; missing?: boolean }[] = [
  ["Brand", "Keep your own name and brand, and add the Affiliate mark"],
  ["Events", "Run on your own Eventbrite, and submit a link to the website"],
  ["Marketing", "A listing in the website directory"],
  ["Funding", "Not included", true],
  ["Sponsors", "Not included", true],
  ["Community", "Host mastermind, Quarterly Summit, national network"],
  ["Onboarding", "Light onboarding"],
].map(([label, text, missing]) => ({ label: String(label), text: String(text), missing: Boolean(missing) }));

export default function PartnerPage() {
  return (
    <>
      <Top>
        <section className="phero">
          <div>
            <div className="eyebrow">Become a partner</div>
            <h1>
              Your group.
              <br />
              <em>Our network.</em>
            </h1>
            <p className="lede">
              Get funding, marketing, and a national network behind your group. Start a new women&apos;s real estate
              investing meetup in your city or bring the one you already run into WREI Connected.
            </p>
            <div className="acts">
              <a className="btn btn-peach" href="#apply">
                Apply to partner
              </a>
              <a className="btn btn-line-lt" href="#compare">
                Compare Market and Affiliate
              </a>
            </div>
          </div>
          <div className="ph">
            <Image
              src="/images/coach.jpg"
              alt="A woman real estate investor who could host a WREI Connected meetup"
              width={900}
              height={900}
              style={{ objectPosition: "50% 25%" }}
              priority
            />
            <div className="float">
              <div className="eyebrow">Hosts get</div>
              <ul>
                <li>Funding and venue help</li>
                <li>Done-for-you marketing</li>
                <li>A host mastermind</li>
                <li>The Quarterly Summit</li>
              </ul>
            </div>
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Why host with us</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Hosts here get real support
              </h2>
            </div>
            <p>Most networks leave local leaders to figure it out alone. We fund, market, and connect the women who run our meetups.</p>
          </div>
          <div className="gets">
            <div>
              <div className="k" />
              <h3>Funding and venues</h3>
              <p>Markets get startup venue support and help negotiating venues, so the first meetup doesn&apos;t come out of your pocket.</p>
            </div>
            <div>
              <div className="k" />
              <h3>Marketing done for you</h3>
              <p>Markets get email and text campaigns, event pages, and a featured spot on the website. You focus on the room.</p>
            </div>
            <div>
              <div className="k" />
              <h3>A network behind you</h3>
              <p>Every partner joins the host mastermind and the Quarterly Summit, with hosts in other cities who&apos;ve done this before.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec find" id="compare">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Two ways to join</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Market or Affiliate
              </h2>
            </div>
            <p>Both are real options. A market gets the most support. Affiliate lets an established group join and keep its own brand.</p>
          </div>
          <div className="cmp">
            <div className="tier ch">
              <div className="top2">
                <div className="eyebrow">WREI Connected Market</div>
                <span className="rec">Recommended</span>
              </div>
              <h3>Run it with us</h3>
              <div className="nm">Named &quot;Your City WREI Connected&quot;</div>
              <dl>
                {CHAPTER_ROWS.map(([label, text]) => (
                  <span key={label} style={{ display: "contents" }}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </span>
                ))}
              </dl>
              <a className="btn btn-peach" href="#apply">
                Apply as a Market
              </a>
            </div>
            <div className="tier af">
              <div className="top2">
                <div className="eyebrow">WREI Connected Affiliate</div>
              </div>
              <h3>Keep your brand</h3>
              <div className="nm">Named &quot;Your Group × WREI Connected&quot;</div>
              <dl>
                {AFFILIATE_ROWS.map((row) => (
                  <span key={row.label} style={{ display: "contents" }}>
                    <dt>{row.label}</dt>
                    <dd className={row.missing ? "no" : undefined}>{row.text}</dd>
                  </span>
                ))}
              </dl>
              <a className="btn btn-line" href="#apply">
                Apply as an Affiliate
              </a>
            </div>
          </div>
          <p className="conv">Start as an Affiliate and change your mind later? You can become a Market anytime, with full onboarding support.</p>
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">What we ask</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                What we ask of every partner
              </h2>
            </div>
            <p>A short list so every group in the network feels like part of the same thing.</p>
          </div>
          <div className="asks">
            <div className="ask">
              <h3>Meet regularly</h3>
              <p>At least once a quarter, and monthly is best. Every meetup stays welcoming and pitch-free.</p>
              <span className="who">All partners</span>
            </div>
            <div className="ask">
              <h3>Use the name</h3>
              <p>Network events include &quot;WREI Connected&quot; in the title so members can find them on the website.</p>
              <span className="who">All partners</span>
            </div>
            <div className="ask">
              <h3>Report monthly</h3>
              <p>A short form with attendance and member counts. Only counts, never anyone&apos;s personal details.</p>
              <span className="who">All partners</span>
            </div>
            <div className="ask">
              <h3>Share the network</h3>
              <p>Invite your members to join the national network with our signup link and QR code.</p>
              <span className="who">Affiliates</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">How to join</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                From application to first meetup
              </h2>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <div className="no">01</div>
              <h3>Apply</h3>
              <p>Tell us about you, your city, and your group if you already run one.</p>
            </div>
            <div className="step">
              <div className="no">02</div>
              <h3>Intro call</h3>
              <p>We get to know you, walk through both options, and answer questions.</p>
            </div>
            <div className="step">
              <div className="no">03</div>
              <h3>Agreement</h3>
              <p>Sign a Market or Affiliate agreement, including clear terms on who owns which member lists.</p>
            </div>
            <div className="step">
              <div className="no">04</div>
              <h3>Onboarding</h3>
              <p>Markets get a brand kit, Eventbrite setup, saved venues, and a city page. Affiliates get a listing, a signup link, and a QR code.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec find" id="apply">
        <div className="c apply">
          <div className="side">
            <div className="eyebrow">Apply</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Apply to host in your city
            </h2>
            <p>It takes about five minutes. One of our founders will reach out to set up an intro call.</p>
            <div className="cityrule">
              <b>One partner per metro</b>
              To start, we partner with one group per city. Check <Link href="/find">Find a Meetup</Link> to see if yours is taken, and apply anyway if the city&apos;s big enough for more than one group.
            </div>
          </div>
          <div className="fcard">
            <PartnerForm />
          </div>
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath("/partner")} />
    </>
  );
}
