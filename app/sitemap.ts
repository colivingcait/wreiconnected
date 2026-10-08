import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { chapters } from "@/lib/chapters";
import { SITE_UPDATED, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/find", "/events", "/partner", "/sponsors", "/about", "/apply", "/affiliates", "/blog"];
  return [
    ...staticPaths.map((path) => ({
      url: path === "/" ? absoluteUrl("/") : absoluteUrl(path),
      lastModified: SITE_UPDATED,
    })),
    ...chapters.flatMap((chapter) => [
      { url: absoluteUrl(`/${chapter.slug}`), lastModified: chapter.updated },
      { url: absoluteUrl(`/blog/city/${chapter.slug}`), lastModified: chapter.updated },
    ]),
    ...getAllPosts().map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.dateModified,
    })),
  ];
}
