"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteChrome";

const CATEGORIES = [
  "Getting started",
  "House hacking",
  "Financing",
  "Shared housing",
  "City guides",
  "Meetup recaps",
] as const;

type Card = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  minutes: number;
  authorId: string;
  city?: string;
  authorName: string;
  authorPhoto?: string;
};

export function BlogIndex({ posts }: { posts: Card[] }) {
  const [category, setCategory] = useState<string>("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (!needle) return true;
      return `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(needle);
    });
  }, [posts, category, q]);
  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="top on-mid">
        <div className="c">
          <SiteNav />
          <section className="bh">
            <div>
              <div className="eyebrow">Blog</div>
              <h1>
                Learn from women <span>who invest</span>
              </h1>
              <p className="lede">
                Plain-English guides, city investing guides, and recaps from every meetup, written by our hosts.
              </p>
            </div>
            <div>
              <div className="srch">
                <input
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                  placeholder='Search articles, like "house hacking" or "DSCR loan"'
                  aria-label="Search articles"
                />
                <button className="btn btn-peach" type="button">
                  Search
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="c">
      {featured ? (
        <article className="feat-post">
          <Link href={`/blog/${featured.slug}`}>
            <Image className="cover" src={featured.image} alt={featured.imageAlt} width={900} height={700} priority />
          </Link>
          <div className="b">
            <span className="btag">
              {featured.category}
              {featured.city ? ` · ${featured.city[0].toUpperCase()}${featured.city.slice(1)}` : ""}
            </span>
            <h2>
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.description}</p>
            <div className="by">
              {featured.authorPhoto ? <Image src={featured.authorPhoto} alt="" width={34} height={34} /> : null}
              <span>
                <b>{featured.authorName}</b>
                {featured.city ? ` · Host, ${featured.city[0].toUpperCase()}${featured.city.slice(1)} WREI Connected` : ""} · {featured.minutes} min read
              </span>
            </div>
          </div>
        </article>
      ) : (
        <p className="empty">No articles match that search.</p>
      )}
      <div className="blog-cats">
        {["All", ...CATEGORIES].map((item) => (
          <button key={item} type="button" className={category === item ? "chip on" : "chip"} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="pg">
        {rest.map((post) => (
          <article className="pc" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Image className="cover" src={post.image} alt={post.imageAlt} width={900} height={700} />
            </Link>
            <div className="b">
              <span className="btag">{post.category}</span>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
              <div className="by">
                {post.authorPhoto ? <Image src={post.authorPhoto} alt="" width={34} height={34} /> : null}
                <span>
                  <b>{post.authorName}</b> · {post.minutes} min read
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}
