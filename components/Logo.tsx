import Link from "next/link";

/** Plain text wordmark. Swap this component when the real logo is ready. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo">
      WREI Connected
    </Link>
  );
}
