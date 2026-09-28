"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { FOOTER_KEYWORD_LINE, PRIMARY_TAGLINE } from "@/lib/site";

const LINKS = [
  { href: "/find", label: "Find a Meetup" },
  { href: "/events", label: "Events" },
  { href: "/partner", label: "Become a Partner" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/coaching", label: "Coaching" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <>
      <nav className="nav">
        <Logo />
        <div className="links">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(path, link.href) ? "active" : undefined}>
              {link.label}
            </Link>
          ))}
          <Link className="btn btn-peach" href="/find">
            Find a meetup
          </Link>
        </div>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={open ? "nav-panel open" : "nav-panel"}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link className="btn btn-peach" href="/find">
          Find a meetup
        </Link>
      </div>
    </>
  );
}

export function Top({ children }: { children: React.ReactNode }) {
  return (
    <div className="top on-mid">
      <div className="c">
        <SiteNav />
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="c">
        <div className="foot">
          <div>
            <Logo />
            <p className="tl">{PRIMARY_TAGLINE}</p>
            <p className="tl">{FOOTER_KEYWORD_LINE}</p>
          </div>
          <div>
            <h4>Members</h4>
            <Link href="/find">Find a Meetup</Link>
            <Link href="/events">Events</Link>
            <Link href="/events">Quarterly Summit</Link>
            <Link href="/blog">Blog</Link>
            {/* TODO: Facebook group URL was not in the handoff. */}
            <a href="#facebook-group">Facebook group</a>
          </div>
          <div>
            <h4>Partners</h4>
            <Link href="/partner">Become a Partner</Link>
            <Link href="/sponsors">Sponsors</Link>
            <Link href="/coaching">Coaching</Link>
          </div>
          <div>
            <h4>About</h4>
            <Link href="/about">Our story</Link>
            <a href="#code-of-conduct">Code of conduct</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="legal">
          <span>Educational content only. Nothing on this site is financial, legal, or investment advice.</span>
          <span>
            <a href="#privacy">Privacy</a>
            {" · "}
            <a href="#terms">Terms</a>
            {" · "}
            <a href="#sms-terms">SMS terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
