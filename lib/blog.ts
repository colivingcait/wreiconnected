import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { chapters, getChapter } from "@/lib/chapters";
import { nextEventForGroup, nextSummit } from "@/lib/events";
import type { Host, WreiEvent } from "@/lib/types";

export const BLOG_CATEGORIES = [
  "Getting started",
  "House hacking",
  "Financing",
  "Shared housing",
  "City guides",
  "Meetup recaps",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  city?: string;
  tags: string[];
  authorId: string;
  datePublished: string;
  dateModified: string;
  image: string;
  imageAlt: string;
  quickAnswer: string;
  pillar: boolean;
  placeholder: boolean;
  faq: BlogFaq[];
  content: string;
  minutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asBool(value: unknown): boolean {
  return value === true;
}

function asFaq(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const question = asString(record.question);
      const answer = asString(record.answer);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is BlogFaq => item !== null);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractToc(markdown: string): { id: string; text: string }[] {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const text = match[1].replace(/\s+\{#.+\}$/, "").trim();
    return { id: slugifyHeading(text), text };
  });
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const tags = Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [];
    const city = asString(data.city) || undefined;
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: asString(data.title),
      description: asString(data.description),
      category: asString(data.category, "Getting started") as BlogCategory,
      city,
      tags,
      authorId: asString(data.authorId),
      datePublished: asString(data.datePublished),
      dateModified: asString(data.dateModified),
      image: asString(data.image, "/images/meetup.jpg"),
      imageAlt: asString(data.imageAlt),
      quickAnswer: asString(data.quickAnswer),
      pillar: asBool(data.pillar),
      placeholder: asBool(data.placeholder),
      faq: asFaq(data.faq),
      content,
      minutes: Math.max(1, Math.round(words / 200)),
    } satisfies BlogPost;
  });
  return posts.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCity(city: string): BlogPost[] {
  return getAllPosts().filter((post) => post.city === city || post.tags.includes(city));
}

export function getCityGuide(city: string): BlogPost | undefined {
  return getAllPosts().find(
    (post) => post.city === city && post.category === "City guides",
  );
}

export function getLatestRecap(city: string): BlogPost | undefined {
  return getAllPosts().find(
    (post) => post.city === city && post.category === "Meetup recaps",
  );
}

export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((item) => item.slug !== post.slug);
  const scored = all
    .map((item) => {
      let score = 0;
      if (post.city && item.city === post.city) score += 3;
      if (item.category === post.category) score += 2;
      if (item.tags.some((tag) => post.tags.includes(tag))) score += 1;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || b.item.datePublished.localeCompare(a.item.datePublished));
  return scored.slice(0, limit).map((entry) => entry.item);
}

export type Author = Host & { chapterSlug: string; chapterName: string };

export function getAuthor(authorId: string): Author | undefined {
  for (const chapter of chapters) {
    const host = chapter.hosts.find((item) => item.id === authorId);
    if (host) {
      return { ...host, chapterSlug: chapter.slug, chapterName: chapter.groupName };
    }
  }
  return undefined;
}

export function meetupForPost(post: BlogPost): { event: WreiEvent; href: string; label: string } | undefined {
  if (post.city) {
    const event = nextEventForGroup(post.city);
    const chapter = getChapter(post.city);
    if (event && chapter) {
      return { event, href: `/${chapter.slug}`, label: chapter.city };
    }
  }
  const summit = nextSummit();
  if (!summit) return undefined;
  return { event: summit, href: "/events", label: "Quarterly Summit" };
}

export function cityGuideSlug(city: string): string {
  return `${city}-real-estate-investing-guide`;
}
