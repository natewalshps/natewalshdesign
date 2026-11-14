import { Link } from "react-router-dom"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CaseStudy } from "@/lib/types"
import "./EditorialRows.css"

export type RowCaseStudy = CaseStudy & { gated?: boolean }

/** Stand-in art for case studies that don't have a cover yet. */
const PLACEHOLDERS = [
  "linear-gradient(135deg,#1d2b2f,#6d8a8f 55%,#d9e2dc)",
  "linear-gradient(160deg,#2a2320,#a4653f 50%,#f0d2b4)",
  "linear-gradient(120deg,#0e0f1a,#3b3f8c 50%,#b9bff2)",
  "linear-gradient(200deg,#233020,#7e9b6a 50%,#eef0d8)",
]

/**
 * One case study as a full-width editorial row: copy + client meta on the
 * left, a dashed gutter, and the cover on the right (stacked on mobile).
 * Gated client demos link to /work/private/:slug and carry a lock icon.
 */
function Row({ cs, index }: { cs: RowCaseStudy; index: number }) {
  const to = cs.gated ? `/work/private/${cs.slug}` : `/work/${cs.slug}`
  const isLogo = /logo\.(png|svg)$/i.test(cs.coverImageUrl)
  const fit = cs.coverFit ?? (isLogo ? "contain" : "cover")

  return (
    <Link to={to} className="editorial-row">
      <div className="editorial-row__content">
        <div className="editorial-row__copy">
          <h3 className="editorial-row__title">{cs.name}</h3>
          <p className="editorial-row__dek">{cs.dek}</p>
        </div>
        <div className="editorial-row__meta">
          <i aria-hidden="true" />
          <div>
            <b className="editorial-row__client">
              {cs.gated && <Lock className="editorial-row__lock" aria-label="Password-protected" />}
              {cs.client}
            </b>
            <small className="editorial-row__timeline">{cs.timeline}</small>
          </div>
        </div>
      </div>
      <div className="editorial-row__gutter" aria-hidden="true" />
      <div className="editorial-row__media">
        {cs.coverImageUrl ? (
          <img
            src={cs.coverImageUrl}
            alt=""
            loading="lazy"
            className={cn("editorial-row__cover", isLogo && "editorial-row__cover--logo")}
            style={{ objectFit: fit, objectPosition: cs.coverPosition ?? "center" }}
          />
        ) : (
          <div
            className="editorial-row__cover"
            style={{ background: PLACEHOLDERS[index % PLACEHOLDERS.length] }}
          />
        )}
      </div>
    </Link>
  )
}

export function EditorialRows({ caseStudies }: { caseStudies: RowCaseStudy[] }) {
  return (
    <div className="editorial-rows">
      {caseStudies.map((cs, i) => (
        <Row key={cs.slug} cs={cs} index={i} />
      ))}
    </div>
  )
}
