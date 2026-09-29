# Nate Walsh Design — Portfolio Site: Build Instructions

Living spec for the new portfolio site. Source of truth for positioning: `docs/personal-brand-manager.md`. Update this doc as decisions change — don't let it drift from what's actually built.

---

## 1. Purpose & Positioning

**Who this is for:** Nathan Walsh, Associate Creative Director at Publicis Sapient (embedded at Optum/UnitedHealth Group), targeting VP Creative / Managing Creative Director roles — in-house at a health tech org or at an agency with a major healthcare practice.

**What the site needs to do:** Prove that positioning. Not a general design portfolio — a case for strategic creative leadership at the intersection of AI, healthcare, and product experience. Every page should answer "why should this person run creative for a health tech org or agency practice."

**Old site status:** `/Users/nathanwalsh/Documents/Personal/site` is a ~2010-era fine-art painting portfolio (oil paintings, jQuery/Fancybox gallery). It predates the design career entirely — no reusable case-study content, just name/contact/social links and basic nav patterns (Work / About / Contact). Treat it as historical reference only, not a content source.

**Real content source:** `/Users/nathanwalsh/Claude/Projects/Personal Brand Manager/design portfolio` is Nate's actual 2022–2024 professional UX portfolio — real case study copy and screenshots for Genentech, Walgreens, MGBHP, Elevance Health, PVH, Acadian Asset Management, Johnson Financial Group, Sunrise Senior Living, ATCC, and others. This is the primary content source for seeded case studies; copy is reframed toward the current four pillars, not pasted verbatim. The brand manager doc's §5 project archive is the source of truth for which projects exist and their Content Flag (Both / Portfolio / LinkedIn / Archive).

**Voice principles** (from brand manager doc — apply to all copy):
- Strategic before tactical — lead with the *why*.
- Confident and direct — real expertise, no hedging.
- Accessible to non-designers (CPOs, VPs, product leaders).
- Forward-looking — where things are going, not just where they are.
- Every claim grounded in a real project.

---

## 2. Thought Leadership Pillars

Every piece of site content should map to at least one:

| Pillar | Angle |
|---|---|
| AI-Driven Healthcare Creative | AI transforming UX/visual design in healthcare |
| Experience-Led Product Strategy | Design owning the full product lifecycle |
| Legacy Modernization at Scale | Avoiding "junk drawer" UX in enterprise modernization |
| Modernizing the Design Craft | AI-accelerated design workflows, dev handoff, craft as quality layer |

---

## 3. Information Architecture

```
/                    Home — hero statement, pillar framing, featured case studies, CTA
/work                Case study index (filterable by pillar)
/work/[slug]         Case study detail (meta bar + freeform narrative sections + gallery)
/about               Bio, positioning statement, career trajectory, credentials
/contact             Contact — email + LinkedIn, no form dependency on legacy PHP mailer
```

No blog/LinkedIn-post archive in v1 — that content lives on LinkedIn per the brand manager's content pipeline. Revisit if Nate wants a "writing" section later.

### Flagship case studies (priority order, per brand manager doc §4.2)

1. **BenefitCentral** — High priority. Unified SaaS platform, legacy consolidation via micro-product architecture. Pillars: Legacy Modernization + Experience-Led Strategy.
2. **Optimus Assistant** — High priority. AI-powered adjunctive agents automating OptumRx client workflows. Pillar: AI-Driven Healthcare Creative.
3. **NextGen Unified UI** — Medium priority. Advisory role preventing lift-and-shift mistakes. Pillars: Legacy Modernization + Modernizing the Craft.

These three are current OptumRx work and still contain `TK` placeholder narrative — kept `Featured = true` but `Published = false` in Notion until real copy exists, so they don't render on the live site with unfinished content.

### Full project archive (22 rows, seeded from brand manager doc §5)

Beyond the three flagship OptumRx projects above, the CMS is seeded with 19 additional projects pulled from Nate's real portfolio history (Verndale/agency client work + Aware Web Solutions). Each carries its original **Content Flag** (Both / Portfolio / LinkedIn / Archive) from the brand manager doc, which determined its Published status at seed time:

- **Published now (10):** Genentech, Walgreens, MGBHP, Elevance Health, PVH, Bio-Partnering, Johnson Financial Group, Acadian Asset Management, Sunrise Senior Living, ATCC — real narrative + gallery images pulled from the old portfolio site, reframed to the four pillars.
- **Seeded but unpublished (9):** the remaining Archive-tier Aware Web Solutions projects (Stratasys, Toro, Nintex, Lionbridge, Ivy Investments, DAP, BSU, StayWell, Dell Compellent) — rows exist in Notion with metadata filled in but `Published = false`; flip to true and add narrative sections when/if these are worth surfacing.

---

## 4. Content Model → Notion CMS

The site is statically generated from Notion at build time (no client-side Notion calls, no exposed token). Two databases, created in the **PS AI Explorers** Notion workspace under a "Nate Walsh Design — Site CMS" parent page.

**Content model is hybrid**, not flat properties: database properties carry queryable metadata (for filtering/sorting on the index page and for the build script), and the full narrative — the actual case study story — lives in the **page body** as headed sections, not in a rich-text property. This was a deliberate choice over an all-properties model: Notion property values aren't built for long-form editing (no headings, no easy paragraph structure), and the page-body approach lets Nate write case studies the way he'd write in any doc editor, using Heading 1/2/3 blocks to define section breaks that the build script parses automatically.

### `Case Studies`
| Property | Type | Notes |
|---|---|---|
| Name | Title | Project name, e.g. "Genentech" |
| Slug | Rich text | URL segment, e.g. `genentech` |
| Agency | Select | Publicis Sapient, Verndale, Aware Web Solutions, Personal |
| Client | Select | OptumRx, Genentech, Walgreens, etc. — the end client, distinct from Agency |
| Role Title | Rich text | Nate's title/scope on the project, e.g. "Lead UX Designer" |
| Timeline | Rich text | e.g. "2023–Present" |
| Team | Rich text | Team composition/size |
| Pillar | Multi-select | AI Healthcare / Experience-Led Strategy / Legacy Modernization / Craft |
| Priority | Select | High / Medium / Low |
| Content Flag | Select | Both / Portfolio / LinkedIn / Archive — carried over from the brand manager doc's archive, drives what's worth publishing |
| Featured | Checkbox | Surfaces on the homepage "Selected work" grid (only if also Published) |
| Status | Status | To write / In progress / Ready to publish / Published |
| Dek | Rich text | One-line summary for cards/index |
| Outcome Headline | Rich text | The single biggest result, shown large on the card hover and case study meta bar |
| Cover Image URL | URL | Hero image (site-relative path into `public/case-studies/<slug>/`) |
| Gallery | Rich text | One site-relative image path per line — additional visual evidence rendered as a grid at the bottom of the case study |
| Order | Number | Manual sort on index page |
| Published | Checkbox | Gates visibility on the live site |

Page body: Heading 1/2/3 blocks define section titles (e.g. "The Problem," "My Role," "The Approach," "The Outcome" — or any headings Nate wants; the parser doesn't enforce a fixed set). Paragraph, bulleted/numbered list, and quote blocks under a heading accumulate as that section's body text.

### `Site Content`
Singleton key/value store for copy that isn't a case study — hero headline, subhead, About bio, positioning statement, contact copy.

| Property | Type | Notes |
|---|---|---|
| Key | Title | e.g. `home.hero.headline`, `about.bio`, `about.positioning` |
| Value | Rich text | The actual copy |
| Section | Select | Home / About / Contact / Global |

This keeps non-technical edits (swap a headline, update the bio) entirely inside Notion — no code deploys needed for copy changes.

### Image hosting: a real platform constraint, not a design choice

Notion's API can't ingest arbitrary local image files without a publicly reachable URL to fetch from — there's no "upload from disk" path available to this build pipeline. So images are **not** hosted inline in Notion. Instead: real screenshots live in the git repo at `public/case-studies/<slug>/`, and Notion's `Cover Image URL` and `Gallery` properties hold site-relative paths (e.g. `/case-studies/genentech/gene-interviews.png`) pointing at them. This keeps images version-controlled and fast to serve once deployed, at the cost of Nate needing to drop new images into the repo (not just Notion) when adding visual evidence to a case study — worth calling out since it's a deviation from "everything lives in Notion."

### Sync approach
- Build-time fetch via `@notionhq/client`'s **data sources API** (`notion.dataSources.query` — `databases.query` is retired), using a server-side integration token (never shipped to the browser).
- The fetch script (`scripts/fetch-notion-content.mjs`) pulls both properties and page-body blocks per case study, parsing blocks into `{heading, body}[]` sections.
- For a static host (Vercel), regenerate on deploy or via an on-demand revalidation webhook if Notion supports it in your setup — otherwise a manual "redeploy" after editing Notion is the v1 workflow.
- Only rows with `Published = true` render, sorted by `Order`. `src/data/content.json` is also checked into git as a dev-mode fallback seed so `npm run dev` works without a live `NOTION_TOKEN`.

### Status: created and seeded with 22 real projects

The CMS parent page, both databases, and real content already exist in the **PS AI Explorers** Notion workspace:

- Parent page: [Nate Walsh Design — Site CMS](https://app.notion.com/p/39f19cccc35a8164a4ecf3cd9b4a2adf)
- `Case Studies` — 22 rows total: the 3 current OptumRx flagships (BenefitCentral, Optimus Assistant, NextGen Unified UI — `Featured = true`, `Published = false`, still TK) plus 19 real projects from the brand manager doc's archive. 10 of those 19 are `Published = true` with real narrative and gallery images pulled from the old portfolio site; the remaining 9 (lower-priority Archive-tier agency work) are seeded with metadata but `Published = false`.
- `Site Content` — seeded with home hero copy, About bio/positioning, and contact info pulled from the brand manager doc.
- Data source IDs are already in `.env.example` — copy to `.env` and add your own `NOTION_TOKEN`.

Next step is finishing the 3 OptumRx flagships: replace the `TK` narrative placeholders with real copy and flip `Published` to true when ready to go live. Optionally, revisit the 9 unpublished archive projects and decide whether any are worth surfacing.

---

## 5. Visual & Interaction Direction

Reference sites: **zoox.com** (dogstudio, Awwwards SOTD 7.65) and **excape.cafe** (Escape Coffee, Awwwards SOTD 7.45). Both scored high on restraint, not maximalism — that's the throughline to copy, not any single effect.

**What both sites actually do, concretely:**
- **Near-monochrome palettes.** Zoox: pure black `#000` + white `#fff`. Escape: off-white `#F5F4F2` + near-black `#151515`. No brand-color confetti — one accent used sparingly, everything else neutral.
- **Oversized, editorial hero typography.** Single bold statement sentence as the hero (Zoox: "It's not a car. It's a robotaxi designed around you."), not a paragraph. Big type carries the page, not decoration around it.
- **Full-bleed, high-quality imagery** driving each section — not thumbnails in cards, but photography/renders that fill the frame.
- **Generous negative space** between sections; content breathes instead of stacking dense.
- **Subtle, purposeful motion** — scroll-triggered fades/parallax, smooth page-transition (Zoox uses Highway.js for this), hover-reveal micro-interactions on listings (Escape's product-hover pattern). Motion supports hierarchy, it doesn't perform for its own sake.
- **Minimal, often vertical or slide-out navigation** — chrome stays out of the way of content.

**Direction for this site:**
- Palette: near-black (`#111214` or similar) + off-white (`#F6F5F2`), one restrained accent color (candidate: a desaturated teal or amber — pick during design, keep it to links/tags/CTA only).
- Type: one confident display face for headlines (oversized, tight leading), one clean text face for body. Avoid more than 2 families.
- Hero pattern per page: one bold positioning statement, not marketing copy — e.g. home hero should read like "Zoox" energy applied to Nate's positioning statement in §1.3 of the brand manager doc, not a generic "Hi, I'm Nate" intro.
- Case study cards: full-bleed cover image, hover reveal of dek + pillar tag, minimal chrome.
- Motion: shadcn/Framer Motion for scroll-reveal and page transitions — subtle, consistent easing, never blocking content or scroll.
- Dark-first or light-first is an open call — Zoox is dark-first, Escape is light-first. Recommend **light-first with a near-black hero band on Home** to split the difference and stay legible for long-form case study reading.

---

## 6. Tech Architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | React + Vite + TypeScript | Fast local dev, no server runtime needed for a mostly-static portfolio |
| Routing | React Router | Simple multi-page structure, no need for Next.js server features |
| Styling | Tailwind CSS | Pairs directly with shadcn, fast iteration |
| Components | shadcn/ui | Accessible primitives, owns the code (not a black-box dependency) — fits the "design as quality layer" pillar even in the tool choice |
| Motion | Framer Motion | Scroll-reveal, page transitions |
| CMS | Notion (`@notionhq/client`) | Nate already lives in Notion; avoids standing up a separate CMS |
| Data fetching | Build-time script → static JSON | No client-side Notion token exposure, fast page loads |
| Hosting | Vercel (recommended — MCP tooling already available for this account) | Zero-config static hosting, preview deploys per branch |

If deeper server rendering / on-demand ISR from Notion becomes a priority later, this can migrate to Next.js — the component and content-model work carries over.

---

## 7. Repo Structure

```
natewalshdesign/
├── INSTRUCTIONS.md          ← this file
├── docs/
│   └── personal-brand-manager.md
├── .env.example
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json          ← shadcn config
├── scripts/
│   └── fetch-notion-content.mjs   ← build-time Notion → JSON (properties + page-body sections)
├── public/
│   └── case-studies/
│       └── <slug>/           ← real screenshots, referenced by Notion's Cover Image URL / Gallery properties
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── data/
│   │   └── content.json     ← generated by fetch script; also checked in as dev-mode fallback seed
│   ├── lib/
│   │   ├── types.ts          ← CaseStudy / CaseStudySection / SiteData types
│   │   ├── content.ts        ← getCaseStudies / getFeaturedCaseStudies / getCaseStudy / getContent
│   │   └── utils.ts
│   ├── components/
│   │   ├── ui/               ← shadcn primitives
│   │   ├── layout/            (Header, Footer, PageTransition)
│   │   └── site/              (Hero, CaseStudyCard, PillarTag)
│   └── pages/
│       ├── Home.tsx
│       ├── Work.tsx
│       ├── CaseStudy.tsx
│       ├── About.tsx
│       └── Contact.tsx
```

---

## 8. Build Phases

1. **Scaffold** (done) — Vite + React + TS + Tailwind + shadcn, routing, placeholder pages, Notion client stub, `.env.example`.
2. **Notion CMS live** (done) — hybrid `Case Studies` + `Site Content` databases created; 22 real projects seeded from the brand manager doc archive, 10 published with real narrative and gallery images pulled from the old portfolio site.
3. **Site code updated for the richer model** (done) — types, content loader, fetch script, and all consuming pages (`CaseStudy.tsx`, `CaseStudyCard.tsx`, `Home.tsx`) rewritten to render sections/meta bar/gallery instead of the old flat Problem/Role/Approach/Outcome fields. Build and lint verified clean.
4. **Remaining real content** — Nate writes actual narrative for the 3 OptumRx flagships (BenefitCentral, Optimus Assistant, NextGen UI) to replace `TK` placeholders, then flips `Published` to true.
5. **Visual design pass** — apply the direction in §5: type scale, palette tokens, imagery, motion.
6. **Deploy** — connect repo to Vercel, wire Notion token as env var, confirm build-time fetch works in CI.

---

## 9. Open Questions / Assumptions

- **Case study imagery** doesn't exist yet for OptumRx work (likely NDA-sensitive — confirm what can be shown publicly vs. needs abstraction/redaction). The 10 published agency case studies do have real imagery, sourced from the old portfolio site.
- **Contact form**: old site used a PHP formmail script — not viable on a static host. Recommend `mailto:` + LinkedIn link for v1, or a lightweight form service (Formspree/Resend) if a real form is wanted later.
- **Accent color** not yet chosen — pick during visual design pass, keep usage minimal per §5.
- **9 unpublished Archive-tier projects** (Stratasys, Toro, Nintex, Lionbridge, Ivy Investments, DAP, BSU, StayWell, Dell Compellent) are seeded with metadata only — decide whether any are worth writing up and publishing, or leave as-is for range/reference.
- **Image maintenance workflow**: since images live in the repo (`public/case-studies/`) rather than Notion itself, adding visual evidence to a case study means two steps — drop the file into the repo, then add its path to the Notion `Gallery` property. Worth a short note for Nate so it doesn't feel like a broken CMS.
