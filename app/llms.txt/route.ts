import { getAllPosts } from "@/lib/blog";
import { chapters } from "@/lib/chapters";
import { NATIONAL_SENTENCE, SITE_URL, absoluteUrl, citySentence } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = ["# WREI Connected", "", NATIONAL_SENTENCE, "", "## Chapters", ""];
  for (const chapter of chapters) {
    lines.push(
      `- [${chapter.groupName}](${absoluteUrl(`/${chapter.slug}`)}): ${citySentence(chapter.city, chapter.state)}`,
    );
  }
  lines.push(
    "",
    "## Events",
    "",
    `- [Women's real estate investing meetups](${absoluteUrl("/events")}): Every WREI Connected chapter, affiliate, and the Quarterly Summit online.`,
    "",
    "## Key guides",
    "",
  );
  const guides = getAllPosts().filter((post) => post.pillar || post.category === "City guides");
  for (const post of guides) {
    lines.push(`- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`);
  }
  lines.push("", `Site: ${SITE_URL}`);
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
