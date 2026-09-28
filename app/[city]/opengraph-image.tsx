import { chapters, getChapter } from "@/lib/chapters";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "WREI Connected women's real estate investing meetup";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ city: chapter.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const chapter = getChapter(city);
  return OgImage({
    kicker: chapter ? `${chapter.city}, ${chapter.stateCode}` : "Meetup",
    title: chapter ? `Women's real estate investing in ${chapter.city}` : "WREI Connected",
    subtitle: chapter ? chapter.groupName : "WREI Connected",
  });
}
