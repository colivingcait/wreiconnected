import Link from "next/link";
import { CoachingForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, coachingSeo } from "@/lib/seo";

export const metadata = buildMetadata(coachingSeo());

export default function CoachingPage() {
  return (
    <>
      <Top>
        <section className="chh">
          <div>
            <div className="eyebrow">Coaching · Name coming soon</div>
            <h1>
              Guidance to your <span>first or next deal</span>
            </h1>
            <p className="lede">
              Structured coaching for newer investors: webinars, a monthly course, and small-group calls. Open to
              investors of any gender. From the WREI Connected community of women real estate investors.
            </p>
            <div className="endorse">
              <i />
              From the WREI Connected community
            </div>
          </div>
          <div className="wl">
            <div className="eyebrow">Waitlist</div>
            <h2>Be first to know when it opens</h2>
            <p className="sub">We&apos;ll email you when enrollment opens, plus an invite to a free intro webinar.</p>
            <CoachingForm />
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">What&apos;s inside</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Three ways to learn
              </h2>
            </div>
            <p>Built for people who want a clear path instead of piecing it together from podcasts and forums.</p>
          </div>
          <div className="in3">
            <div className="inc">
              <div className="no">01</div>
              <h3>Live webinars</h3>
              <p>Free sessions on one topic at a time, like analyzing a deal, financing options, or house hacking. Open to anyone.</p>
            </div>
            <div className="inc">
              <div className="no">02</div>
              <h3>Monthly course</h3>
              <p>A step-by-step course that walks you from goals and budget to your first offer, one module at a time.</p>
            </div>
            <div className="inc">
              <div className="no">03</div>
              <h3>Small-group calls</h3>
              <p>Bring your real questions and deals to a small group and get feedback from experienced investors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec find">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Is it for you?</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Made for newer investors
              </h2>
            </div>
          </div>
          <div className="fit">
            <div className="fitc" style={{ background: "var(--white)", border: "1px solid var(--line)" }}>
              <div className="eyebrow">A great fit if you</div>
              <h3>Want structure and support</h3>
              <ul>
                <li>Haven&apos;t bought your first investment property yet</li>
                <li>Have one or two deals and want a repeatable plan</li>
                <li>Are thinking about house hacking or shared housing</li>
                <li>Want real answers from people who invest</li>
              </ul>
            </div>
            <div className="fitc no" style={{ background: "var(--peach-lt)" }}>
              <div className="eyebrow">Probably not for you if you</div>
              <h3>Already have a system</h3>
              <ul>
                <li>Run a large portfolio with your own team</li>
                <li>Want someone to find and close deals for you</li>
                <li>Are looking for get-rich-quick shortcuts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <div className="head">
            <div>
              <div className="eyebrow">Questions</div>
              <h2 className="big" style={{ marginTop: 10 }}>
                Good to know
              </h2>
            </div>
          </div>
          <div className="faq2">
            <div>
              <h3>Is coaching only for women?</h3>
              <p>No. Coaching is open to everyone. Our meetups and community spaces stay women-focused.</p>
            </div>
            <div>
              <h3>How much will it cost?</h3>
              <p>Pricing will be shared with the waitlist first, before enrollment opens.</p>
            </div>
            <div>
              <h3>Do I need to attend a meetup?</h3>
              <p>
                No, but we&apos;d love to see you at one. Find a group near you on the <Link href="/find">Find a Meetup</Link> page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="c">
        <div className="nat" style={{ marginTop: 0 }}>
          <div>
            <h3>Want to meet other investors now?</h3>
            <p>WREI Connected meetups are free and happen every month across the country.</p>
          </div>
          <Link className="btn btn-mid" href="/find">
            Find a meetup
          </Link>
        </div>
      </section>
      <div style={{ height: 80 }} />
      <Footer />
      <JsonLd data={schemasForPath("/coaching")} />
    </>
  );
}
