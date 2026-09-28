import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/blog";

function textFrom(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFrom).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return textFrom(props.children);
  }
  return "";
}

function H2({ children }: { children?: ReactNode }) {
  const id = slugifyHeading(textFrom(children));
  return <h2 id={id}>{children}</h2>;
}

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{
        h2: H2,
        table: (props) => <table className="tbl" {...props} />,
      }}
    />
  );
}
