import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterView } from "@/components/ChapterView";
import { Footer } from "@/components/SiteChrome";
import { JsonLd } from "@/components/JsonLd";
import { chapters, getChapter, isReservedSlug } from "@/lib/chapters";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ city: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const chapter = getChapter(city);
  if (!chapter) return {};
  return buildMetadata(chapterSeo(chapter));
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (isReservedSlug(city)) notFound();
  const chapter = getChapter(city);
  if (!chapter) notFound();

  return (
    <>
      <ChapterView chapter={chapter} />
      <Footer />
      <JsonLd data={schemasForPath(`/${chapter.slug}`)} />
    </>
  );
}
