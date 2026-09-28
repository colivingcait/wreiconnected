import { notFound } from "next/navigation";
import { chapters, getChapter, isReservedSlug } from "@/lib/chapters";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "WREI Connected women's real estate investing meetup";
export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ city: chapter.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (isReservedSlug(city)) notFound();
  const chapter = getChapter(city);
  if (!chapter) notFound();
  return OgImage({
    kicker: `${chapter.city}, ${chapter.stateCode}`,
    title: `Women's real estate investing in ${chapter.city}`,
    subtitle: chapter.groupName,
  });
}
