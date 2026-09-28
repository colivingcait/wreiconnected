import Link from "next/link";
import { BlogIndex } from "@/components/BlogIndex";
import { SignupForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/SiteChrome";
import { getAllPosts, getAuthor, getCityGuide } from "@/lib/blog";
import { chapters } from "@/lib/chapters";
import { schemasForPath } from "@/lib/schema";
import { blogIndexSeo, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(blogIndexSeo());

export default function BlogPage() {
  const posts = getAllPosts().map((post) => {
    const author = getAuthor(post.authorId);
    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      image: post.image,
      imageAlt: post.imageAlt,
      minutes: post.minutes,
      authorId: post.authorId,
      city: post.city,
      authorName: author?.name ?? "WREI Connected",
      authorPhoto: author?.photo,
    };
  });

  return (
    <>
      <BlogIndex posts={posts} />
      <section className="c" style={{ paddingTop: 80 }}>
        <div className="head">
          <div>
            <div className="eyebrow">City guides</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              Investing in your city
            </h2>
          </div>
          <p>Every chapter publishes a local guide written by its hosts.</p>
        </div>
        <div className="cg">
          {chapters.map((chapter) => {
            const guide = getCityGuide(chapter.slug);
            if (!guide) {
              return (
                <div className="cgc soon" key={chapter.slug}>
                  <div className="eyebrow">
                    {chapter.city}, {chapter.stateCode}
                  </div>
                  <h3>A beginner&apos;s guide to investing in {chapter.city}</h3>
                  <Link href={`/${chapter.slug}`}>Visit the chapter</Link>
                </div>
              );
            }
            return (
              <div className="cgc" key={chapter.slug}>
                <div className="eyebrow">
                  {chapter.city}, {chapter.stateCode}
                </div>
                <h3>A beginner&apos;s guide to investing in {chapter.city}</h3>
                <Link href={`/blog/${guide.slug}`}>Read the guide</Link>
              </div>
            );
          })}
          <div className="cgc soon">
            <div className="eyebrow">Your city</div>
            <h3>Want to host a meetup and write your city&apos;s guide?</h3>
            <Link href="/partner">Become a Partner</Link>
          </div>
        </div>
      </section>
      <section className="c" style={{ paddingTop: 80 }}>
        <div className="signup on-mid">
          <div>
            <div className="eyebrow">Newsletter</div>
            <h2 className="big" style={{ marginTop: 10 }}>
              New guides in your inbox
            </h2>
            <p>Two to four emails a month with new articles and women&apos;s real estate investing meetups near you.</p>
          </div>
          <SignupForm
            kind="national-signup"
            button="Subscribe"
            emailLabel="Yes, email me WREI Connected news and guides."
            showSms={false}
          />
        </div>
      </section>
      <div style={{ height: 80 }} />
      <Footer />
      <JsonLd data={schemasForPath("/blog")} />
    </>
  );
}
