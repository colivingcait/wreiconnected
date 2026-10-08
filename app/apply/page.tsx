import Link from "next/link";
import { MarketApplicationForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { schemasForPath } from "@/lib/schema";
import { applySeo, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(applySeo());

export default function ApplyPage() {
  return (
    <>
      <Top>
        <section className="phero" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <div className="eyebrow">Open a market</div>
            <h1>
              Bring WREI Connected <em>to your city.</em>
            </h1>
            <p className="lede">
              Want to start a women&apos;s real estate investing meetup where you live? Apply to open a market and co-host
              with the national network behind you.
            </p>
          </div>
        </section>
      </Top>

      <section className="sec find">
        <div className="c apply">
          <div className="side">
            <div className="eyebrow">Apply</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Apply to open a market
            </h2>
            <p>It takes about five minutes. One of our founders will reach out to set up an intro call.</p>
            <div className="cityrule">
              <b>One market per metro</b>
              Check <Link href="/find">Find a Meetup</Link> to see if your city already has a market, and apply anyway if
              the city&apos;s big enough for more than one group.
            </div>
          </div>
          <div className="fcard">
            <MarketApplicationForm />
          </div>
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath("/apply")} />
    </>
  );
}
