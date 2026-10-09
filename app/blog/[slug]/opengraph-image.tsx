import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "WREI Connected women's real estate investing article";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const title = post.title.length > 80 ? `${post.title.slice(0, 77)}…` : post.title;
  return OgImage({
    kicker: post.category,
    title,
    subtitle: "WREI Connected · Women's real estate investing",
  });
}
