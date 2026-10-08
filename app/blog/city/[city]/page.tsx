import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/BlogCards";
import { JsonLd } from "@/components/JsonLd";
import { Footer, Top } from "@/components/SiteChrome";
import { getPostsByCity } from "@/lib/blog";
import { chapters, getChapter } from "@/lib/chapters";
import { schemasForPath } from "@/lib/schema";
import { blogCitySeo, buildMetadata } from "@/lib/seo";

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
  return buildMetadata(blogCitySeo(chapter.city, chapter.slug));
}

export default async function BlogCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const chapter = getChapter(city);
  if (!chapter) notFound();
  const posts = getPostsByCity(chapter.slug);

  return (
    <>
      <Top>
        <section className="phead">
          <div className="crumb">
            <Link href="/blog">Blog</Link>
            {" / "}
            {chapter.city}
          </div>
          <div className="eyebrow">City notes</div>
          <h1>
            Women&apos;s real estate investing in <em>{chapter.city}</em>
          </h1>
          <p className="lede">
            Guides and meetup recaps for women real estate investors in {chapter.city}, from {chapter.city} WREI Connected.
          </p>
          <Link className="btn btn-peach" href={`/${chapter.slug}`}>
            Visit the {chapter.city} market
          </Link>
        </section>
      </Top>
      <section className="sec">
        <div className="c">
          {posts.length ? <PostGrid posts={posts} /> : <p className="empty">Guides for {chapter.city} are on the way.</p>}
        </div>
      </section>
      <Footer />
      <JsonLd data={schemasForPath(`/blog/city/${chapter.slug}`)} />
    </>
  );
}
