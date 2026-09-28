import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteChrome";
import { MdxContent } from "@/components/MdxContent";
import { PostGrid } from "@/components/BlogCards";
import { extractToc, getAuthor, meetupForPost, relatedPosts, type BlogPost } from "@/lib/blog";
import { getChapter } from "@/lib/chapters";
import { shortWhen } from "@/lib/display";

function pretty(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const label = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return label;
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const author = getAuthor(post.authorId);
  const chapter = post.city ? getChapter(post.city) : undefined;
  const toc = extractToc(post.content);
  const meetup = meetupForPost(post);
  const related = relatedPosts(post);

  return (
    <>
      <div className="top on-mid">
        <div className="c">
          <SiteNav />
      <section className="ph2">
        <div className="crumb">
          <Link href="/blog">Blog</Link>
          {" / "}
          {post.category}
        </div>
        <span className="btag" style={{ background: "var(--peach)", color: "var(--mid)" }}>
          {post.category}
          {chapter ? ` · ${chapter.city}` : ""}
        </span>
        <h1>{post.title}</h1>
        <div className="meta">
          {author ? (
            <Image src={author.photo} alt="" width={42} height={42} />
          ) : null}
          <div>
            <b>{author?.name ?? "WREI Connected"}</b>
            {author ? `${author.role.split("·")[0].trim()}, ${author.chapterName}` : "WREI Connected"}
            {" · "}Updated {pretty(post.dateModified)} · {post.minutes} min read
          </div>
        </div>
        {post.placeholder ? (
          <p className="draft-note">Placeholder draft. The hosts still need to replace this copy.</p>
        ) : null}
      </section>
        </div>
      </div>
      <div className="c">
      <Image className="hero2" src={post.image} alt={post.imageAlt} width={900} height={700} priority />
      <div className="pw">
        <div>
          <div className="qa">
            <div className="eyebrow">Quick answer</div>
            <p>{post.quickAnswer}</p>
          </div>
          <div className="art">
            <MdxContent source={post.content} />
            {post.faq.length ? (
              <>
                <h2 id="faq">Frequently asked questions</h2>
                <div className="pfaq">
                  {post.faq.map((item, index) => (
                    <details key={item.question} open={index === 0}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          {author ? (
            <div className="abox">
              <Image src={author.photo} alt="" width={72} height={72} />
              <div>
                <b>{author.name}</b>
                <p>{author.credentials}</p>
                <Link href={`/${author.chapterSlug}#host-${author.id}`}>Read the host bio</Link>
              </div>
            </div>
          ) : null}
          <p className="disclaimer">Educational content only. Not financial, legal, or investment advice.</p>
        </div>
        <aside className="side2">
          <div className="toc">
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              In this article
            </div>
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.text}
              </a>
            ))}
            {post.faq.length ? <a href="#faq">FAQ</a> : null}
          </div>
          {meetup ? (
            <div className="meet">
              <div className="eyebrow">Meet us in person</div>
              <h2>
                {meetup.label} meetup · {shortWhen(meetup.event, chapter?.timezone ?? "America/New_York")}
              </h2>
              <p>
                {meetup.event.type === "summit"
                  ? "The national online summit for women real estate investors. Free for members."
                  : `Bring your questions to the next ${chapter?.city ?? ""} meetup${chapter ? ` at ${chapter.venueName}` : ""}. Free.`}
              </p>
              <a className="btn btn-peach" href={meetup.event.rsvpUrl} style={{ display: "block", textAlign: "center" }}>
                {meetup.event.type === "summit" ? "Save my seat" : "RSVP free"}
              </a>
              {chapter ? (
                <p style={{ marginTop: 12 }}>
                  <Link href={`/${chapter.slug}`} style={{ color: "var(--peach)", fontWeight: 600 }}>
                    {chapter.groupName}
                  </Link>
                </p>
              ) : null}
            </div>
          ) : null}
        </aside>
      </div>
      <section style={{ paddingTop: 80 }}>
        <div className="head">
          <div>
            <div className="eyebrow">Keep reading</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Related articles
            </h2>
          </div>
        </div>
        <PostGrid posts={related} />
      </section>
      </div>
    </>
  );
}
