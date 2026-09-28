import { FindExplorer } from "@/components/FindExplorer";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/SiteChrome";
import { getDirectory } from "@/lib/directory";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, findSeo } from "@/lib/seo";

export const metadata = buildMetadata(findSeo());

export default function FindPage() {
  return (
    <>
      <FindExplorer groups={getDirectory()} />
      <Footer />
      <JsonLd data={schemasForPath("/find")} />
    </>
  );
}
