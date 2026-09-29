# Nate Walsh Design — Portfolio

React + Vite + TypeScript + Tailwind + shadcn/ui portfolio site, content-managed via Notion.

See **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** for the full build spec: positioning, sitemap, content model, visual direction, and roadmap. See **[docs/personal-brand-manager.md](./docs/personal-brand-manager.md)** for brand strategy and source content.

## Getting started

```bash
npm install
npm run dev
```

The site runs immediately using the placeholder content committed at `src/data/content.json` — no Notion connection required for local dev.

## Connecting the Notion CMS

The CMS already exists: **[Nate Walsh Design — Site CMS](https://app.notion.com/p/39f19cccc35a8164a4ecf3cd9b4a2adf)** in the PS AI Explorers workspace, with `Case Studies` and `Site Content` databases seeded (see INSTRUCTIONS.md §4 and §7).

1. Create a Notion integration token at [notion.so/my-integrations](https://www.notion.so/my-integrations) and share the CMS page above with it.
2. Copy `.env.example` to `.env` — the data source IDs are already filled in; just add your `NOTION_TOKEN`.
3. Run `npm run fetch:notion` to pull live content from Notion into `src/data/content.json`.
4. Re-run before each deploy (or wire it into your CI build step) to pick up edits made in Notion.

Case studies only appear on the site once their `Published` checkbox is `true` in Notion.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Oxlint |
| `npm run fetch:notion` | Pull latest content from Notion into `src/data/content.json` |

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui (owned components in `src/components/ui`) · Framer Motion · Notion API (`@notionhq/client`) · React Router
