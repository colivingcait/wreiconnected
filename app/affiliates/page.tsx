import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { getDirectory } from "@/lib/directory";
import { schemasForPath } from "@/lib/schema";
import { affiliatesSeo, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(affiliatesSeo());

export default function AffiliatesPage() {
  const affiliates = getDirectory().filter((group) => group.kind === "affiliate");
  return (
    <>
      <Top>
        <section className="phero" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <div className="eyebrow">Affiliates</div>
            <h1>
              Local groups, <em>one network.</em>
            </h1>
            <p className="lede">
              Affiliates are women&apos;s real estate investing groups that keep their own name and belong to the WREI
              Connected network.
            </p>
          </div>
        </section>
      </Top>

      <section className="sec">
        <div className="c">
          <div className="cities">
            {affiliates.map((group) => (
              <div key={group.id} className="city">
                <div>
                  <div className="n">{group.name}</div>
                  <div className="s">
                    {group.city}, {group.stateCode}
                  </div>
                </div>
                <span className="pill af">Affiliate</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath("/affiliates")} />
    </>
  );
}
