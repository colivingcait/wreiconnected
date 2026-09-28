import { getAllPosts, getPost } from "@/lib/blog";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "WREI Connected women's real estate investing article";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "WREI Connected";
  return OgImage({
    kicker: post?.category ?? "Blog",
    title: title.length > 80 ? `${title.slice(0, 77)}…` : title,
    subtitle: "WREI Connected · Women's real estate investing",
  });
}
