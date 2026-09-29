// Build-time content fetch: pulls the Case Studies + Site Content
// data sources from Notion and writes a static src/data/content.json.
// Runs in Node only — the Notion token never reaches the browser bundle.
//
// Usage: node scripts/fetch-notion-content.mjs
// Requires .env with NOTION_TOKEN, NOTION_CASE_STUDIES_DATA_SOURCE_ID,
// NOTION_SITE_CONTENT_DATA_SOURCE_ID (see .env.example).
//
// Content model (see INSTRUCTIONS.md §4 for the full spec):
// - Database properties hold metadata used for cards/filtering/sorting.
// - The narrative itself (Executive Summary, Context, Your Role, Key
//   Insights, Design Decisions, Visual Evidence, Outcome & Impact) lives
//   in the Notion page BODY as H2-delimited sections, parsed below into
//   `sections: { heading, body }[]`.
// - Images referenced in "Visual Evidence" are NOT embedded in Notion —
//   Notion can't host files without a public source URL, and these are
//   local screenshots. They live in this repo under /public/case-studies/
//   and are wired in via the "Gallery" property (one site-relative path
//   per line), which Notion CAN store as plain text.

import { Client } from "@notionhq/client"
import { writeFile } from "node:fs/promises"
import path from "node:path"

const {
  NOTION_TOKEN,
  NOTION_CASE_STUDIES_DATA_SOURCE_ID,
  NOTION_SITE_CONTENT_DATA_SOURCE_ID,
} = process.env

function richText(prop) {
  if (!prop) return ""
  const arr = prop.rich_text ?? prop.title ?? []
  return arr.map((t) => t.plain_text).join("")
}

function selectValue(prop) {
  return prop?.select?.name ?? prop?.status?.name ?? ""
}

function multiSelectValues(prop) {
  return (prop?.multi_select ?? []).map((o) => o.name)
}

function checkboxValue(prop) {
  return prop?.checkbox ?? false
}

function linesToArray(prop) {
  const text = richText(prop)
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

// --- Page body -> structured sections -------------------------------

function blockRichTextToMarkdown(richTextArr = []) {
  return richTextArr
    .map((rt) => {
      let text = rt.plain_text ?? ""
      if (rt.annotations?.code) text = `\`${text}\``
      if (rt.annotations?.bold) text = `**${text}**`
      if (rt.annotations?.italic) text = `*${text}*`
      if (rt.href) text = `[${text}](${rt.href})`
      return text
    })
    .join("")
}

async function fetchAllBlocks(notion, blockId) {
  const blocks = []
  let cursor
  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })
    blocks.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return blocks
}

async function fetchPageSections(notion, pageId) {
  const blocks = await fetchAllBlocks(notion, pageId)
  const sections = []
  let current = null

  for (const block of blocks) {
    const type = block.type
    if (type === "heading_1" || type === "heading_2" || type === "heading_3") {
      const heading = blockRichTextToMarkdown(block[type].rich_text)
      current = { heading, lines: [] }
      sections.push(current)
      continue
    }
    if (!current) continue // skip any content before the first heading

    if (type === "paragraph") {
      const text = blockRichTextToMarkdown(block.paragraph.rich_text)
      if (text.trim()) current.lines.push(text)
    } else if (type === "bulleted_list_item" || type === "numbered_list_item") {
      const text = blockRichTextToMarkdown(block[type].rich_text)
      current.lines.push(`- ${text}`)
    } else if (type === "quote") {
      const text = blockRichTextToMarkdown(block.quote.rich_text)
      current.lines.push(`> ${text}`)
    }
  }

  return sections
    .map((s) => ({ heading: s.heading, body: s.lines.join("\n\n") }))
    .filter((s) => s.heading || s.body)
}

// --- Case Studies ------------------------------------------------------

async function fetchCaseStudies(notion) {
  const results = []
  let cursor
  do {
    const res = await notion.dataSources.query({
      data_source_id: NOTION_CASE_STUDIES_DATA_SOURCE_ID,
      start_cursor: cursor,
    })
    results.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)

  const published = results.filter(
    (page) => page.properties["Published"]?.checkbox
  )

  const caseStudies = []
  for (const page of published) {
    const p = page.properties
    const sections = await fetchPageSections(notion, page.id)
    caseStudies.push({
      slug: richText(p["Slug"]),
      name: richText(p["Name"]),
      agency: selectValue(p["Agency"]),
      client: selectValue(p["Client"]),
      roleTitle: richText(p["Role Title"]),
      timeline: richText(p["Timeline"]),
      team: richText(p["Team"]),
      pillars: multiSelectValues(p["Pillar"]),
      priority: selectValue(p["Priority"]),
      contentFlag: selectValue(p["Content Flag"]),
      featured: checkboxValue(p["Featured"]),
      status: selectValue(p["Status"]),
      dek: richText(p["Dek"]),
      outcomeHeadline: richText(p["Outcome Headline"]),
      coverImageUrl: p["Cover Image URL"]?.url ?? "",
      gallery: linesToArray(p["Gallery"]),
      sections,
      order: p["Order"]?.number ?? 0,
      published: true,
    })
  }

  return caseStudies.sort((a, b) => a.order - b.order)
}

async function fetchSiteContent(notion) {
  const results = []
  let cursor
  do {
    const res = await notion.dataSources.query({
      data_source_id: NOTION_SITE_CONTENT_DATA_SOURCE_ID,
      start_cursor: cursor,
    })
    results.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)

  const content = {}
  for (const page of results) {
    const p = page.properties
    const key = richText(p["Key"])
    if (key) content[key] = richText(p["Value"])
  }
  return content
}

async function main() {
  if (
    !NOTION_TOKEN ||
    !NOTION_CASE_STUDIES_DATA_SOURCE_ID ||
    !NOTION_SITE_CONTENT_DATA_SOURCE_ID
  ) {
    console.warn(
      "[fetch-notion-content] Missing NOTION_TOKEN / data source IDs — leaving existing src/data/content.json in place."
    )
    return
  }

  const notion = new Client({ auth: NOTION_TOKEN })

  const [caseStudies, content] = await Promise.all([
    fetchCaseStudies(notion),
    fetchSiteContent(notion),
  ])

  const outPath = path.resolve(process.cwd(), "src/data/content.json")
  await writeFile(outPath, JSON.stringify({ caseStudies, content }, null, 2))
  console.log(
    `[fetch-notion-content] Wrote ${caseStudies.length} published case studies and ${
      Object.keys(content).length
    } content keys to src/data/content.json`
  )
}

main().catch((err) => {
  console.error("[fetch-notion-content] Failed:", err)
  process.exit(1)
})
