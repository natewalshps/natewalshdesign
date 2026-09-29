import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Hero } from "@/components/site/Hero"
import { PillarTag } from "@/components/site/PillarTag"
import { ParallaxImage } from "@/components/site/ParallaxImage"
import { WordReveal } from "@/components/site/ScrollText"
import type { CaseStudy } from "@/lib/types"

/** Public case studies without the "AI Healthcare" pillar that are still
 *  healthcare / life-sciences work. */
const HEALTHCARE_SLUGS = new Set(["genentech", "walgreens", "mgbhp", "elevance-health", "bio-partnering"])

function isHealthcare(caseStudy: CaseStudy) {
  return caseStudy.pillars.includes("AI Healthcare") || HEALTHCARE_SLUGS.has(caseStudy.slug)
}

/** Renders a section body that may contain simple `[text](url)` markdown
 *  links (the only markdown the Notion sync preserves) and blank-line
 *  paragraph breaks. Good enough for case study prose without pulling in
 *  a full markdown renderer. */
function SectionBody({ text }: { text: string }) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  return (
    <>
      {text.split(/\n\n+/).map((paragraph, i) => {
        const parts: ReactNode[] = []
        let lastIndex = 0
        let match: RegExpExecArray | null
        linkPattern.lastIndex = 0
        while ((match = linkPattern.exec(paragraph))) {
          if (match.index > lastIndex) {
            parts.push(paragraph.slice(lastIndex, match.index))
          }
          parts.push(
            <a
              key={match.index}
              href={match[2]}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:no-underline"
            >
              {match[1]}
            </a>
          )
          lastIndex = match.index + match[0].length
        }
        if (lastIndex < paragraph.length) parts.push(paragraph.slice(lastIndex))
        return (
          <p key={i} className="text-lg leading-relaxed sm:text-xl">
            {parts}
          </p>
        )
      })}
    </>
  )
}

/** Full case study layout — hero, meta bar, cover image, narrative
 *  sections, gallery. Shared by the public /work/:slug route and the
 *  password-gated private demo route so both stay visually identical. */
export function CaseStudyDetail({
  caseStudy,
  banner,
}: {
  caseStudy: CaseStudy
  banner?: ReactNode
}) {
  const meta = [
    ["Role", caseStudy.roleTitle],
    ["Agency", caseStudy.agency],
    ["Timeline", caseStudy.timeline],
    ["Team", caseStudy.team],
  ].filter(([, value]) => value)

  return (
    <>
      {banner}
      <Hero eyebrow={caseStudy.client} headline={caseStudy.name} subhead={caseStudy.dek}>
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.pillars.map((pillar) => (
            <PillarTag key={pillar} pillar={pillar} />
          ))}
        </div>
      </Hero>

      {(meta.length > 0 || caseStudy.outcomeHeadline) && (
        <section className="border-y border-border/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-8 sm:grid-cols-4">
            {meta.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 text-sm">{value}</p>
              </div>
            ))}
            {caseStudy.outcomeHeadline && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Outcome
                </p>
                <p className="mt-1 text-sm">{caseStudy.outcomeHeadline}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {caseStudy.coverImageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]"
        >
          <ParallaxImage src={caseStudy.coverImageUrl} alt={caseStudy.name} distance={60} />
        </motion.div>
      )}

      <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <div className="flex flex-col gap-20 sm:gap-24">
          {caseStudy.sections.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {section.heading}
              </h2>
              <SectionBody text={section.body} />
            </motion.div>
          ))}
        </div>
      </section>

      {caseStudy.gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {caseStudy.gallery.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt={`${caseStudy.name} visual evidence ${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-lg object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      {isHealthcare(caseStudy) && (
        <section className="border-t border-border/60 px-6 py-[18vh]">
          <WordReveal
            text="Building something complex in healthcare? Let's talk."
            className="max-w-[20ch] font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
          />
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-semibold uppercase tracking-wide text-background transition-transform hover:scale-[1.03]"
          >
            Get in touch →
          </Link>
        </section>
      )}
    </>
  )
}
