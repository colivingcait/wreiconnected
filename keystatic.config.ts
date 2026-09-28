import { config, fields, collection } from "@keystatic/core";

const storage =
  process.env.KEYSTATIC_STORAGE === "github"
    ? {
        kind: "github" as const,
        repo: {
          owner: process.env.KEYSTATIC_GITHUB_OWNER ?? "OWNER",
          name: process.env.KEYSTATIC_GITHUB_REPO ?? "REPO",
        },
      }
    : { kind: "local" as const };

/**
 * Git-based CMS. Local mode is the default (edit files in this repo).
 * Set KEYSTATIC_STORAGE=github plus KEYSTATIC_GITHUB_OWNER, KEYSTATIC_GITHUB_REPO,
 * KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, and KEYSTATIC_SECRET
 * to edit on the deployed site. See the README.
 */
export default config({
  storage,
  ui: {
    brand: { name: "WREI Connected" },
    navigation: ["posts"],
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Meta description", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Getting started", value: "Getting started" },
            { label: "House hacking", value: "House hacking" },
            { label: "Financing", value: "Financing" },
            { label: "Shared housing", value: "Shared housing" },
            { label: "City guides", value: "City guides" },
            { label: "Meetup recaps", value: "Meetup recaps" },
          ],
          defaultValue: "Getting started",
        }),
        city: fields.text({
          label: "City slug",
          description: "Chapter slug such as atlanta. Leave blank for a national post.",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags" }),
        authorId: fields.select({
          label: "Author",
          options: [
            { label: "Caitlyn Verdugo", value: "caitlyn-verdugo" },
            { label: "Jasmine Brown", value: "jasmine-brown" },
          ],
          defaultValue: "caitlyn-verdugo",
        }),
        datePublished: fields.date({ label: "Published" }),
        dateModified: fields.date({ label: "Updated" }),
        image: fields.text({ label: "Image path", defaultValue: "/images/meetup.jpg" }),
        imageAlt: fields.text({ label: "Image alt text", multiline: true }),
        quickAnswer: fields.text({ label: "Quick answer", multiline: true }),
        pillar: fields.checkbox({ label: "National pillar page", defaultValue: false }),
        placeholder: fields.checkbox({ label: "Placeholder draft", defaultValue: true }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQ" },
        ),
        content: fields.mdx({ label: "Body" }),
      },
    }),
  },
});
