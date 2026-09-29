export type Pillar =
  | "AI Healthcare"
  | "Experience-Led Strategy"
  | "Legacy Modernization"
  | "Craft"

export type ContentFlag = "Both" | "Portfolio" | "LinkedIn" | "Archive" | ""

export interface CaseStudySection {
  heading: string
  body: string
}

export interface CaseStudy {
  slug: string
  name: string
  agency: string
  client: string
  roleTitle: string
  timeline: string
  team: string
  pillars: Pillar[]
  priority: "High" | "Medium" | "Low"
  contentFlag: ContentFlag
  featured: boolean
  status: string
  dek: string
  outcomeHeadline: string
  coverImageUrl: string
  gallery: string[]
  /** Parsed from the Notion page body — one entry per H2 section
   *  (Executive Summary, Context, Your Role, Key Insights, Design
   *  Decisions, Visual Evidence, Outcome & Impact). See
   *  scripts/fetch-notion-content.mjs. */
  sections: CaseStudySection[]
  order: number
  published: boolean
}

export interface SiteContentMap {
  [key: string]: string
}

export interface SiteData {
  caseStudies: CaseStudy[]
  content: SiteContentMap
}
