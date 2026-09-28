import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { getAuthor } from "@/lib/blog";

export type BlogCard = Pick<BlogPost, "slug" | "title" | "description" | "category" | "image" | "imageAlt" | "minutes" | "authorId">;

export function PostCard({ post }: { post: BlogCard }) {
  const author = getAuthor(post.authorId);
  return (
    <article className="pc">
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
          {author ? <Image src={author.photo} alt="" width={34} height={34} /> : null}
          <span>
            <b>{author?.name ?? "WREI Connected"}</b> · {post.minutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}

export function PostGrid({ posts }: { posts: BlogCard[] }) {
  return (
    <div className="pg">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
