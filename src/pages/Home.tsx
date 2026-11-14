import { Link } from "react-router-dom"
import { HomeHero } from "@/components/site/HomeHero"
import { EditorialRows } from "@/components/site/EditorialRows"
import { GridLines } from "@/components/site/GridLines"
import { Marquee } from "@/components/site/Marquee"
import { Loader } from "@/components/site/Loader"
import { ScrollHighlight, WordReveal } from "@/components/site/ScrollText"
import { getFeaturedCaseStudies, getPrivateCaseStudies, getContent } from "@/lib/content"

export function Home() {
  const caseStudies = [
    ...getPrivateCaseStudies().map((cs) => ({ ...cs, gated: true })),
    ...getFeaturedCaseStudies(),
  ]

  return (
    <>
      <Loader />
      <HomeHero
        headline={getContent(
          "home.hero.headline",
          "I shape the vision, strategy, and experiences that help businesses reinvent themselves."
        )}
      />
      <section className="relative z-[4] bg-background">
        <GridLines />
        <div className="mt-[11vh]">
          <Marquee transparent decorative />
        </div>
        <div className="relative px-page pb-[18vh] pt-[10vh]">
          <ScrollHighlight
            text={getContent(
              "home.statement",
              "Experience led strategy for the most complex platforms — where AI, legacy modernization, and product craft meet."
            )}
            className="max-w-[22ch] font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          />
        </div>

        <div className="relative flex items-end justify-between gap-6 px-page pb-8">
          <WordReveal
            text="Selected work"
            className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.055em]"
          />
          <Link to="/work" className="roll mb-2 text-sm font-semibold uppercase tracking-[-0.02em]">
            <span>View all →</span>
            <span aria-hidden="true">View all →</span>
          </Link>
        </div>
        <div className="relative">
          <EditorialRows caseStudies={caseStudies} />
        </div>
      </section>
    </>
  )
}
