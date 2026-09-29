import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Hero } from "@/components/site/Hero"
import { CaseStudyDetail } from "@/components/site/CaseStudyDetail"
import { PasswordGate } from "@/components/site/PasswordGate"
import { getPrivateCaseStudy } from "@/lib/content"

/** Keeps this route out of search indexes for as long as it's mounted —
 *  the password gate keeps casual visitors out, this keeps crawlers out. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])
}

export function PrivateCaseStudy() {
  useNoIndex()
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = slug ? getPrivateCaseStudy(slug) : undefined

  if (!caseStudy) {
    return (
      <Hero eyebrow="Work" headline="Demo not found.">
        <Link to="/work" className="text-sm underline">
          Back to work
        </Link>
      </Hero>
    )
  }

  return (
    <PasswordGate>
      <CaseStudyDetail
        caseStudy={caseStudy}
        banner={
          <div className="border-b border-border/60 bg-muted px-6 py-2 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Private client demo — not for external distribution
          </div>
        }
      />
    </PasswordGate>
  )
}
