import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/BlogPostView";
import { Footer } from "@/components/SiteChrome";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPost } from "@/lib/blog";
import { schemasForPath } from "@/lib/schema";
import { buildMetadata, postSeo } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata(postSeo(post), { type: "article" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostView post={post} />
      <Footer />
      <JsonLd data={schemasForPath(`/blog/${post.slug}`)} />
    </>
  );
}
