import { useMemo } from "react"
import { Link } from "react-router-dom"
import { EditorialRows } from "@/components/site/EditorialRows"
import { GridLines } from "@/components/site/GridLines"
import { WordReveal } from "@/components/site/ScrollText"
import { getCaseStudies, getPrivateCaseStudies } from "@/lib/content"

export function Work() {
  const caseStudies = useMemo(() => {
    const gated = getPrivateCaseStudies().map((cs) => ({ ...cs, gated: true }))
    return [...getCaseStudies().map((cs) => ({ ...cs, gated: false })), ...gated].sort(
      (a, b) => a.order - b.order
    )
  }, [])

  return (
    <>
      <section className="relative px-page pb-6">
        <GridLines inset />
        <div className="relative">
          <WordReveal
            as="h1"
            text="Work"
            className="pt-[clamp(64px,10.4vw,150px)] font-display text-[clamp(4.5rem,13.9vw,200px)] font-bold uppercase leading-none tracking-[-0.04em] -mb-[0.08em]"
          />
          <div className="py-10 md:grid md:grid-cols-2">
            <p className="max-w-[672px] text-[clamp(1.5rem,2.36vw,34px)] leading-[1.15] tracking-[-0.02em] md:col-start-2">
              Experience-led strategy for the most complex platforms — from AI assistants and legacy
              consolidation to design systems that scale.
            </p>
          </div>
          <p className="text-[15px] font-semibold uppercase leading-none text-muted-foreground">
            ({caseStudies.length}) case studies
          </p>
        </div>
      </section>

      {caseStudies.length > 0 ? (
        <EditorialRows caseStudies={caseStudies} />
      ) : (
        <section className="px-page pb-24">
          <div className="flex flex-col items-start gap-4 border-t border-border pt-16">
            <p className="max-w-xl text-lg text-muted-foreground">
              Case studies are in progress — full write-ups on legacy modernization, AI-driven
              healthcare experiences, and experience-led product strategy are coming soon.
            </p>
            <Link to="/contact" className="text-sm font-medium underline underline-offset-4">
              Get in touch in the meantime
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
