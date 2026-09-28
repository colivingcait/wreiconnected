import { chapters } from "../lib/chapters";
import { NATIONAL_SENTENCE, citySentence } from "../lib/site";
import { getRouteSchemas } from "../lib/schema";
import { getAllPosts } from "../lib/blog";

type Node = Record<string, unknown>;

function asNode(value: unknown): Node {
  return value as Node;
}

function types(node: Node): string[] {
  const value = node["@type"];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.map(String);
  return [];
}

function findAll(nodes: Node[], type: string): Node[] {
  return nodes.filter((node) => types(node).includes(type));
}

const failures: string[] = [];
const graphs = getRouteSchemas();

function requireFields(path: string, node: Node, fields: string[]) {
  for (const field of fields) {
    if (node[field] === undefined || node[field] === "") {
      failures.push(`${path} ${types(node).join("/")} missing ${field}`);
    }
  }
}

for (const graph of graphs) {
  const nodes = graph.nodes.map(asNode);
  if (!nodes.length) {
    failures.push(`${graph.path} has no JSON-LD`);
    continue;
  }
  for (const node of nodes) {
    if (node["@context"] !== "https://schema.org") {
      failures.push(`${graph.path} node missing @context`);
    }
    if (!types(node).length) failures.push(`${graph.path} node missing @type`);
  }

  const orgs = findAll(nodes, "Organization");
  const national = orgs.find((org) => org.name === "WREI Connected" && !org.parentOrganization);
  if (!national) failures.push(`${graph.path} missing site-wide Organization`);
  else {
    requireFields(graph.path, national, ["name", "url", "logo", "description", "alternateName"]);
    if (national.description !== NATIONAL_SENTENCE) {
      failures.push(`${graph.path} Organization.description is not the national sentence`);
    }
    const names = national.alternateName;
    const list = Array.isArray(names) ? names.map(String) : [];
    if (!list.includes("ReConnected") || !list.includes("WREI")) {
      failures.push(`${graph.path} Organization.alternateName must include ReConnected and WREI`);
    }
  }

  if (!findAll(nodes, "BreadcrumbList").length) {
    failures.push(`${graph.path} missing BreadcrumbList`);
  }
}

for (const chapter of chapters) {
  const graph = graphs.find((item) => item.path === `/${chapter.slug}`);
  if (!graph) {
    failures.push(`Missing schema graph for /${chapter.slug}`);
    continue;
  }
  const nodes = graph.nodes.map(asNode);
  const chapterOrg = findAll(nodes, "Organization").find((org) => org.name === chapter.groupName);
  if (!chapterOrg) failures.push(`/${chapter.slug} missing chapter Organization`);
  else {
    if (chapterOrg.description !== citySentence(chapter.city, chapter.state)) {
      failures.push(`/${chapter.slug} chapter description is not the city sentence`);
    }
    const parent = asNode(chapterOrg.parentOrganization);
    if (parent.name !== "WREI Connected") {
      failures.push(`/${chapter.slug} missing parentOrganization`);
    }
    if (!chapterOrg.areaServed) failures.push(`/${chapter.slug} missing areaServed`);
    const names = Array.isArray(chapterOrg.alternateName) ? chapterOrg.alternateName.map(String) : [];
    for (const extra of chapter.alternateNames ?? []) {
      if (!names.includes(extra)) failures.push(`/${chapter.slug} missing alternateName ${extra}`);
    }
  }

  const events = findAll(nodes, "Event").filter((event) => event.eventAttendanceMode !== "https://schema.org/OnlineEventAttendanceMode");
  if (!events.length) failures.push(`/${chapter.slug} missing offline Event`);
  for (const event of events) {
    requireFields(graph.path, event, [
      "name",
      "description",
      "startDate",
      "endDate",
      "eventStatus",
      "eventAttendanceMode",
      "location",
      "organizer",
      "offers",
      "image",
    ]);
    const start = String(event.startDate);
    if (!/T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(start)) {
      failures.push(`/${chapter.slug} Event startDate missing timezone offset: ${start}`);
    }
    if (event.eventAttendanceMode !== "https://schema.org/OfflineEventAttendanceMode") {
      failures.push(`/${chapter.slug} meetup is not Offline`);
    }
    const description = String(event.description);
    if (!description.startsWith(citySentence(chapter.city, chapter.state))) {
      failures.push(`/${chapter.slug} Event.description must start with the city sentence`);
    }
    if (!String(event.name).includes(`WREI Connected | ${chapter.city}`)) {
      failures.push(`/${chapter.slug} Event.name should be WREI Connected | ${chapter.city} – Month Meetup`);
    }
    const location = asNode(event.location);
    if (!types(location).includes("Place")) failures.push(`/${chapter.slug} Event location is not a Place`);
    const address = asNode(location.address);
    if (!types(address).includes("PostalAddress")) {
      failures.push(`/${chapter.slug} Event missing PostalAddress`);
    }
    const offers = asNode(event.offers);
    if (Number(offers.price) !== 0 || !offers.url) {
      failures.push(`/${chapter.slug} Event offers must be price 0 with a url`);
    }
  }

  const summit = findAll(nodes, "Event").find(
    (event) => event.eventAttendanceMode === "https://schema.org/OnlineEventAttendanceMode",
  );
  if (!summit) failures.push(`/${chapter.slug} missing Quarterly Summit Event`);
  else if (!String(summit.description).includes("the national online summit for women real estate investors")) {
    failures.push(`/${chapter.slug} summit description missing the required phrase`);
  } else {
    const location = asNode(summit.location);
    if (!types(location).includes("VirtualLocation")) {
      failures.push(`/${chapter.slug} summit location is not VirtualLocation`);
    }
  }

  if (!findAll(nodes, "FAQPage").length) failures.push(`/${chapter.slug} missing FAQPage`);
  const people = findAll(nodes, "Person");
  if (people.length < chapter.hosts.length) {
    failures.push(`/${chapter.slug} missing Person nodes for hosts`);
  }
}

const eventsGraph = graphs.find((item) => item.path === "/events");
if (eventsGraph) {
  const summit = eventsGraph.nodes.map(asNode).find((node) => types(node).includes("Event") && node.eventAttendanceMode === "https://schema.org/OnlineEventAttendanceMode");
  if (!summit) failures.push("/events missing online Quarterly Summit");
  else {
    const location = asNode(summit.location);
    if (!types(location).includes("VirtualLocation")) failures.push("/events summit missing VirtualLocation");
    if (!String(summit.description).includes("the national online summit for women real estate investors")) {
      failures.push("/events summit description missing required phrase");
    }
  }
}

for (const post of getAllPosts()) {
  const graph = graphs.find((item) => item.path === `/blog/${post.slug}`);
  if (!graph) {
    failures.push(`Missing schema for /blog/${post.slug}`);
    continue;
  }
  const nodes = graph.nodes.map(asNode);
  const posting = findAll(nodes, "BlogPosting")[0];
  if (!posting) {
    failures.push(`/blog/${post.slug} missing BlogPosting`);
    continue;
  }
  requireFields(`/blog/${post.slug}`, posting, ["headline", "datePublished", "dateModified", "image", "author"]);
  const author = asNode(posting.author);
  if (!types(author).includes("Person") || !author.url) {
    failures.push(`/blog/${post.slug} author must be a Person with a url`);
  }
  if (post.faq.length && !findAll(nodes, "FAQPage").length) {
    failures.push(`/blog/${post.slug} missing FAQPage`);
  }
}

if (failures.length) {
  console.error("Schema validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Schema validation passed for ${graphs.length} routes.`);
