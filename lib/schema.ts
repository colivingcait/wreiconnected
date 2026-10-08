import type {
  BlogPosting,
  BreadcrumbList,
  Event,
  FAQPage,
  Organization,
  Person,
  WithContext,
} from "schema-dts";
import { getAllPosts, getAuthor, getPost } from "@/lib/blog";
import { chapters, getChapter } from "@/lib/chapters";
import { zonedIso } from "@/lib/dates";
import { getGroup } from "@/lib/directory";
import {
  eventDescription,
  eventName,
  eventsForGroup,
  nextSummit,
  upcomingEvents,
} from "@/lib/events";
import { chapterFaqs } from "@/lib/faq";
import {
  NATIONAL_SENTENCE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  citySentence,
} from "@/lib/site";
import type { WreiEvent } from "@/lib/types";

type JsonLd = WithContext<Organization | Event | FAQPage | BreadcrumbList | Person | BlogPosting>;

function breadcrumbs(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function nationalOrganization(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["ReConnected", "WREI"],
    description: NATIONAL_SENTENCE,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
  };
}

function chapterOrganization(chapter: (typeof chapters)[number]): WithContext<Organization> {
  const sameAs = [
    ...chapter.sameAs,
    chapter.social.instagram,
    chapter.social.facebook,
    chapter.social.linkedin,
  ].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: chapter.groupName,
    description: citySentence(chapter.city, chapter.state),
    url: absoluteUrl(`/${chapter.slug}`),
    logo: absoluteUrl("/logo.svg"),
    parentOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: chapter.city,
      containedInPlace: {
        "@type": "State",
        name: chapter.state,
      },
    },
    alternateName: ["ReConnected", "WREI", ...(chapter.alternateNames ?? [])],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function hostPerson(chapter: (typeof chapters)[number], hostId: string): WithContext<Person> | undefined {
  const host = chapter.hosts.find((item) => item.id === hostId);
  if (!host) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: host.name,
    jobTitle: host.role,
    description: host.credentials,
    image: absoluteUrl(host.photo),
    url: absoluteUrl(`/${chapter.slug}#host-${host.id}`),
    worksFor: {
      "@type": "Organization",
      name: chapter.groupName,
      url: absoluteUrl(`/${chapter.slug}`),
    },
  };
}

function faqPage(items: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function schemaTimes(event: WreiEvent, timeZone: string): { startDate: string; endDate?: string } {
  if (!event.startTime) {
    return { startDate: event.date };
  }
  return {
    startDate: zonedIso(event.date, event.startTime, timeZone),
    ...(event.endTime ? { endDate: zonedIso(event.date, event.endTime, timeZone) } : {}),
  };
}

function indexableEvent(event: WreiEvent | undefined): event is WreiEvent {
  return Boolean(event && !event.placeholder);
}

export function eventSchema(event: WreiEvent): WithContext<Event> | undefined {
  const group = event.groupId === "national" ? undefined : getGroup(event.groupId);
  const timeZone = group?.timezone ?? "America/New_York";
  const times = schemaTimes(event, timeZone);
  const image = group?.hasPage
    ? absoluteUrl(getChapter(group.id)?.heroImage ?? "/images/meetup.jpg")
    : absoluteUrl("/images/meetup.jpg");

  if (event.type === "summit") {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Quarterly Summit",
      description: eventDescription(event, group),
      ...times,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      image,
      location: {
        "@type": "VirtualLocation",
        url: event.rsvpUrl,
        name: "Online",
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
        url: event.rsvpUrl,
        availability: "https://schema.org/InStock",
      },
    };
  }

  if (!group) return undefined;
  const placeName = event.venueName || group.venueName || group.city;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName(event, group),
    description: eventDescription(event, group),
    ...times,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image,
    location: {
      "@type": "Place",
      name: placeName,
      address: {
        "@type": "PostalAddress",
        ...(event.streetAddress || group.streetAddress
          ? { streetAddress: event.streetAddress || group.streetAddress }
          : {}),
        addressLocality: group.city,
        addressRegion: group.stateCode,
        ...(group.postalCode ? { postalCode: group.postalCode } : {}),
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.type === "chapter" ? group.name : SITE_NAME,
      url: group.hasPage ? absoluteUrl(`/${group.id}`) : SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      url: event.rsvpUrl,
      availability: "https://schema.org/InStock",
    },
  };
}

function blogPosting(slug: string): JsonLd[] {
  const post = getPost(slug);
  if (!post) return [];
  const author = getAuthor(post.authorId);
  const chapter = author ? getChapter(author.chapterSlug) : undefined;
  const nodes: JsonLd[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      image: absoluteUrl(post.image),
      url: absoluteUrl(`/blog/${post.slug}`),
      author: author
        ? {
            "@type": "Person",
            name: author.name,
            url: absoluteUrl(`/${author.chapterSlug}#host-${author.id}`),
            description: author.credentials,
          }
        : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
      },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faq.length) nodes.push(faqPage(post.faq));
  void chapter;
  return nodes;
}

export function schemasForPath(path: string): JsonLd[] {
  const base = [nationalOrganization()];

  if (path === "/") {
    const summit = nextSummit();
    const summitNode = indexableEvent(summit) ? eventSchema(summit) : undefined;
    return [...base, ...(summitNode ? [summitNode] : []), breadcrumbs([{ name: "Home", path: "/" }])];
  }

  if (path === "/events") {
    const events = upcomingEvents()
      .filter((event) => !event.placeholder)
      .map((event) => eventSchema(event))
      .filter((node): node is WithContext<Event> => Boolean(node));
    return [
      ...base,
      ...events,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
      ]),
    ];
  }

  const chapter = chapters.find((item) => `/${item.slug}` === path);
  if (chapter) {
    const people = chapter.hosts
      .map((host) => hostPerson(chapter, host.id))
      .filter((node): node is WithContext<Person> => Boolean(node));
    const summit = nextSummit();
    const meetups = [...eventsForGroup(chapter.slug), ...(indexableEvent(summit) ? [summit] : [])]
      .filter((event) => !event.placeholder)
      .map((event) => eventSchema(event))
      .filter((node): node is WithContext<Event> => Boolean(node));
    return [
      ...base,
      chapterOrganization(chapter),
      ...meetups,
      faqPage(chapterFaqs(chapter)),
      ...people,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Find a Meetup", path: "/find" },
        { name: chapter.city, path: `/${chapter.slug}` },
      ]),
    ];
  }

  if (path.startsWith("/blog/city/")) {
    const slug = path.replace("/blog/city/", "");
    const city = getChapter(slug);
    return [
      ...base,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: city?.city ?? slug, path },
      ]),
    ];
  }

  if (path.startsWith("/blog/") && path !== "/blog") {
    return [...base, ...blogPosting(path.replace("/blog/", ""))];
  }

  const names: Record<string, string> = {
    "/find": "Find a Meetup",
    "/partner": "Become a Partner",
    "/sponsors": "Sponsors",
    "/about": "Our Story",
    "/apply": "Apply to Open a Market",
    "/affiliates": "Affiliates",
    "/blog": "Blog",
  };
  return [
    ...base,
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: names[path] ?? "Page", path },
    ]),
  ];
}

export function getRouteSchemas(): { path: string; nodes: JsonLd[] }[] {
  const paths = [
    "/",
    "/find",
    "/events",
    "/partner",
    "/sponsors",
    "/about",
    "/apply",
    "/affiliates",
    "/blog",
    ...chapters.flatMap((chapter) => [`/${chapter.slug}`, `/blog/city/${chapter.slug}`]),
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
  ];
  return paths.map((path) => ({ path, nodes: schemasForPath(path) }));
}
