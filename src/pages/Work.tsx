import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Hero } from "@/components/site/Hero"
import { EditorialRows } from "@/components/site/EditorialRows"
import { cn } from "@/lib/utils"
import { getCaseStudies, getPrivateCaseStudies } from "@/lib/content"
import type { Pillar } from "@/lib/types"

export function Work() {
  const allCaseStudies = useMemo(() => {
    const gated = getPrivateCaseStudies().map((cs) => ({ ...cs, gated: true }))
    return [...getCaseStudies().map((cs) => ({ ...cs, gated: false })), ...gated].sort(
      (a, b) => a.order - b.order
    )
  }, [])
  const [activePillar, setActivePillar] = useState<Pillar | null>(null)

  const pillars = useMemo(
    () => Array.from(new Set(allCaseStudies.flatMap((cs) => cs.pillars))).sort(),
    [allCaseStudies]
  )

  const filtered = activePillar
    ? allCaseStudies.filter((cs) => cs.pillars.includes(activePillar))
    : allCaseStudies

  return (
    <>
      <Hero
        eyebrow="Work"
        headline="Experience-led strategy for healthcare's most complex platforms."
      />
      <section className="px-6 pb-24">
        <div>
          {allCaseStudies.length > 0 ? (
            <>
              {pillars.length > 1 && (
                <div className="mb-12 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePillar(null)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-colors",
                      activePillar === null
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    All work
                  </button>
                  {pillars.map((pillar) => (
                    <button
                      key={pillar}
                      type="button"
                      onClick={() =>
                        setActivePillar(pillar === activePillar ? null : pillar)
                      }
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-colors",
                        activePillar === pillar
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      )}
                    >
                      {pillar}
                    </button>
                  ))}
                </div>
              )}

              {filtered.length > 0 ? (
                <div className="-mx-6">
                  <EditorialRows key={activePillar ?? "all"} caseStudies={filtered} />
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4 py-16">
                  <p className="max-w-md text-lg text-muted-foreground">
                    Nothing filed under {activePillar} yet — the pillar's
                    still real, the write-up just isn't published.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActivePillar(null)}
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    View all work
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-start gap-4 border-t border-border pt-16">
              <p className="max-w-xl text-lg text-muted-foreground">
                Case studies are in progress — full write-ups on legacy
                modernization, AI-driven healthcare experiences, and
                experience-led product strategy are coming soon.
              </p>
              <Link
                to="/contact"
                className="text-sm font-medium underline underline-offset-4"
              >
                Get in touch in the meantime
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
