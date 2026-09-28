# WREI Connected

Marketing site for [wreiconnected.com](https://wreiconnected.com) (pronounced “ReConnected”), a national network of local women’s real estate investing meetups. Next.js App Router, TypeScript, static generation, deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

`npm run build` runs the SEO phrase check and the JSON-LD check before `next build`.

```bash
npm run check:seo
npm run validate:schema
npm run lint
```

## Routes

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/find` | City directory |
| `/atlanta`, `/charleston` | Chapter pages from `lib/chapters.ts`. Unknown cities 404. |
| `/events` | Server-rendered list plus a client MapLibre map |
| `/partner`, `/sponsors`, `/about`, `/coaching` | Marketing pages |
| `/blog` | Article index |
| `/blog/[slug]` | MDX post, including city guides and the three national pillars |
| `/blog/city/[city]` | Posts tagged to a chapter |
| `/llms.txt`, `/robots.txt`, `/sitemap.xml` | Generated from config |
| `/keystatic` | Git CMS, local mode in development |

Trailing slashes are off. Every public page sets a canonical URL.

## Where the data lives

- Chapter configs: `lib/chapters.ts`
- Shared events array: `lib/events.ts`
- Directory-only groups (no city page): `lib/directory.ts`
- Blog posts: `content/blog/*.mdx`
- Canonical sentences: `lib/site.ts` (`NATIONAL_SENTENCE`, `citySentence`)

## Add a city

1. Add one object to the `chapters` array in `lib/chapters.ts`. Mark unfinished values with a `PLACEHOLDER` comment. Use a public business venue only. Never add a personal phone, a personal email, or a coliving address.
2. Add that city’s upcoming rows to `lib/events.ts` (same shape as the existing rows).
3. Optional: add `content/blog/{slug}-real-estate-investing-guide.mdx` with `city` set to the chapter slug.

A new chapter config creates the city page, JSON-LD, sitemap entry, `llms.txt` line, Open Graph image, and a listing on `/find` and `/events`. Charleston is the placeholder city that proves this.

## Add a post

Create `content/blog/your-slug.mdx` with the frontmatter used by the existing posts (title, description, category, city, tags, authorId, dates, image, imageAlt, quickAnswer, faq, pillar, placeholder). The description must include “WREI Connected” and either “women's real estate investing” or “women real estate investors”. City posts must name the city in the title and description.

Or edit posts in the CMS at `/keystatic` while `npm run dev` is running.

Categories: Getting started, House hacking, Financing, Shared housing, City guides, Meetup recaps.

## CMS

[Keystatic](https://keystatic.com) is the git-based CMS. Local mode is the default: it writes MDX into `content/blog/` and needs no database. The admin UI is disabled on production deploys in local mode, because a serverless host cannot write the repo.

To edit on the deployed site later, set:

- `KEYSTATIC_STORAGE=github`
- `KEYSTATIC_GITHUB_OWNER`
- `KEYSTATIC_GITHUB_REPO`
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`

Then register the GitHub OAuth app Keystatic documents, and redeploy.

## IndexNow

Set `INDEXNOW_KEY` to a random string. The site serves it at `/indexnow-key.txt`. Without the variable, pings no-op and the key URL returns 404.

```bash
INDEXNOW_KEY=your-key npm run indexnow
# or ping a few paths
INDEXNOW_KEY=your-key npm run indexnow /atlanta /blog
```

`POST /api/indexnow` with `Authorization: Bearer $INDEXNOW_KEY` pings the public URLs (or a JSON `{ "urls": [...] }` body).

## Search Console and Bing Webmaster

These steps are manual:

1. Add `https://wreiconnected.com` as a property in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Verify the domain (DNS TXT is the straightforward option).
3. Submit `https://wreiconnected.com/sitemap.xml` in both tools.
4. In Bing, enable IndexNow if you want their crawler to honor the key file above.
5. After the first real content launch, request indexing for `/`, `/atlanta`, and `/events`.

## Forms and events

Every form posts to `lib/submitForm.ts`, which sends nothing and returns a success state. Eventbrite sync is not built yet. RSVP links are placeholders.

## Privacy

Do not put personal phone numbers, personal email addresses, or any coliving property address in configs, posts, or images. Host contact addresses in config are organizational inboxes only and are not rendered on the page.
