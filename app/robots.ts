import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ALLOWED = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const allowPublic = { allow: "/", disallow: ["/keystatic", "/api"] };
  return {
    rules: [{ userAgent: "*", ...allowPublic }, ...ALLOWED.map((userAgent) => ({ userAgent, ...allowPublic }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
