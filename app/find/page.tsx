import { Suspense } from "react";
import { FindExplorer } from "@/components/FindExplorer";
import { JsonLd } from "@/components/JsonLd";
import { Footer, SiteNav } from "@/components/SiteChrome";
import { getDirectory } from "@/lib/directory";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, findSeo } from "@/lib/seo";

export const metadata = buildMetadata(findSeo());

export default function FindPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="top on-mid">
            <div className="c">
              <SiteNav />
              <section className="phead">
                <div className="eyebrow">Find a meetup</div>
                <h1>
                  Find your people, <em>in your city.</em>
                </h1>
              </section>
            </div>
          </div>
        }
      >
        <FindExplorer groups={getDirectory()} />
      </Suspense>
      <Footer />
      <JsonLd data={schemasForPath("/find")} />
    </>
  );
}
