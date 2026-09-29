import { Link, useParams } from "react-router-dom"
import { Hero } from "@/components/site/Hero"
import { CaseStudyDetail } from "@/components/site/CaseStudyDetail"
import { getCaseStudy } from "@/lib/content"

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = slug ? getCaseStudy(slug) : undefined

  if (!caseStudy) {
    return (
      <Hero
        eyebrow="Work"
        headline="Case study not found."
        subhead="This project may not be published yet."
      >
        <Link to="/work" className="text-sm underline">
          Back to work
        </Link>
      </Hero>
    )
  }

  return <CaseStudyDetail caseStudy={caseStudy} />
}
