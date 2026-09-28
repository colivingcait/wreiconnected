import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Top } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Page not found | WREI Connected, Women's Real Estate Investing" },
  description:
    "That page is not on WREI Connected, the national network of women's real estate investing meetups.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Top>
        <section className="ehero">
          <div className="eyebrow">404</div>
          <h1>This page is not in the network.</h1>
          <p className="lede">The city or article you asked for is not on WREI Connected yet.</p>
          <Link className="btn btn-peach" href="/find">
            Find a meetup
          </Link>
        </section>
      </Top>
      <Footer />
    </>
  );
}
