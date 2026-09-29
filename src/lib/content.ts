import raw from "@/data/content.json"
import privateCaseStudiesRaw from "@/data/private-case-studies.json"
import type { CaseStudy, SiteData } from "@/lib/types"

const data = raw as unknown as SiteData
const privateCaseStudies = privateCaseStudiesRaw as unknown as CaseStudy[]

/** All published case studies, sorted by Order. */
export function getCaseStudies() {
  return [...data.caseStudies].sort((a, b) => a.order - b.order)
}

/** The curated homepage set (Featured = true in Notion), falling back to
 *  the first 3 by Order if nothing is marked Featured yet. */
export function getFeaturedCaseStudies() {
  const featured = getCaseStudies().filter((cs) => cs.featured)
  return featured.length > 0 ? featured : getCaseStudies().slice(0, 3)
}

export function getCaseStudy(slug: string) {
  return data.caseStudies.find((cs) => cs.slug === slug)
}

export function getContent(key: string, fallback = "") {
  return data.content[key] ?? fallback
}

/** Password-gated client demos — not part of the public Notion-published
 *  set, so they're excluded from getCaseStudies()/getFeaturedCaseStudies()
 *  and never appear in the public Work index. Reached only via their
 *  direct /work/private/:slug link behind PasswordGate. */
export function getPrivateCaseStudy(slug: string) {
  return privateCaseStudies.find((cs) => cs.slug === slug)
}

export function getPrivateCaseStudies() {
  return [...privateCaseStudies].sort((a, b) => a.order - b.order)
}
