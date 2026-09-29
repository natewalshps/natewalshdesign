import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Lock } from "lucide-react"
import { PillarTag } from "@/components/site/PillarTag"
import { ParallaxImage } from "@/components/site/ParallaxImage"
import type { CaseStudy } from "@/lib/types"

export function CaseStudyCard({
  caseStudy,
  gated = false,
}: {
  caseStudy: CaseStudy
  /** True for the password-protected client demos — links to the
   *  gated route and flags the card so visitors know before they click. */
  gated?: boolean
}) {
  return (
    <Link
      to={gated ? `/work/private/${caseStudy.slug}` : `/work/${caseStudy.slug}`}
      className="group block"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary"
      >
        {caseStudy.coverImageUrl ? (
          <ParallaxImage
            src={caseStudy.coverImageUrl}
            alt={caseStudy.name}
            distance={24}
            imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            {caseStudy.name}
          </div>
        )}
        {gated && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Lock className="size-3" />
            Client demo
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {caseStudy.outcomeHeadline && (
            <p className="mb-1 text-sm font-semibold text-white">{caseStudy.outcomeHeadline}</p>
          )}
          <p className="text-sm text-white/90">{caseStudy.dek}</p>
        </div>
      </motion.div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{caseStudy.name}</h3>
          <p className="text-sm text-muted-foreground">{caseStudy.client}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {caseStudy.pillars.map((pillar) => (
            <PillarTag key={pillar} pillar={pillar} />
          ))}
        </div>
      </div>
    </Link>
  )
}
