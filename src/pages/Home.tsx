import { Link } from "react-router-dom"
import { HomeHero } from "@/components/site/HomeHero"
import { EditorialRows } from "@/components/site/EditorialRows"
import { Marquee } from "@/components/site/Marquee"
import { Loader } from "@/components/site/Loader"
import { ScrollHighlight, WordReveal } from "@/components/site/ScrollText"
import { getFeaturedCaseStudies, getPrivateCaseStudies, getContent } from "@/lib/content"

/** Faint vertical rules that continue the hero's eight-column rhythm. */
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-8" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="border-l border-foreground/[0.07]" />
      ))}
    </div>
  )
}

export function Home() {
  const caseStudies = [
    ...getPrivateCaseStudies().map((cs) => ({ ...cs, gated: true })),
    ...getFeaturedCaseStudies(),
  ]

  return (
    <>
      <Loader />
      <HomeHero
        //eyebrow="Creative Director, Publicis Sapient"
        headline={getContent(
          "home.hero.headline",
          "I shape the vision, strategy, and experiences that help businesses reinvent themselves."
        )}
      />
      <section className="relative z-[4] bg-background">
        <GridLines />
        <div className="-mx-6 mt-[11vh]">
          <Marquee transparent decorative />
        </div>
        <div className="relative px-6 pb-[18vh] pt-[10vh]">
          <ScrollHighlight
            text={getContent(
              "home.statement",
              "Experience led strategy for the most complex platforms — where AI, legacy modernization, and product craft meet."
            )}
            className="max-w-[22ch] font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          />
          
          {/* <div className="mt-[11vh] grid grid-cols-8 gap-x-6">
            <WordReveal
              as="h3"
              text="Design doesn't ship features. It ships the case for what's possible."
              className="col-span-8 max-w-[22ch] font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-[1.12] tracking-[-0.02em] md:col-span-5"
            />
            <p className="col-span-8 mt-5 max-w-[48ch] leading-relaxed text-muted-foreground md:col-span-4 md:col-start-5">
              {getContent("home.hero.subhead")}
            </p>
          </div> */}
        </div>

        <div className="relative flex items-end justify-between gap-6 px-6 pb-8">
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
