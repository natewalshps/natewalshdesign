import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
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

function Row({
  cs,
  index,
  open,
  onEnter,
}: {
  cs: RowCaseStudy
  index: number
  open: boolean
  onEnter: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const href = cs.gated ? `/work/private/${cs.slug}` : `/work/${cs.slug}`
  // The row is a clipping window: the headline drifts up through it as the
  // row crosses the viewport, so it's sliced by the top edge on the way out.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["22%", "-22%"])
  const isLogo = /logo\.(png|svg)$/i.test(cs.coverImageUrl)

  return (
    <article
      ref={ref}
      onMouseEnter={onEnter}
      className="editorial-row"
    >
      <div className="editorial-row__copy-column">
        <div className="editorial-row__gutter-rules" />
        <motion.div
          style={{ y: copyY }}
          className="editorial-row__copy"
        >
          <p className="editorial-row__pillars">
            ({String(index + 1).padStart(2, "0")}) {cs.pillars.join(" · ")}
          </p>
          <h3 className="editorial-row__title">
            <Link to={href}>
              {cs.name}
            </Link>
          </h3>
          <p className="editorial-row__dek">
            {cs.dek}
          </p>
        </motion.div>
        <div className="editorial-row__metadata">
          <i />
          <div>
            <b className="editorial-row__client">
              {cs.gated && <Lock className="editorial-row__lock" aria-label="Password-protected" />}
              {cs.client}
            </b>
            <small className="editorial-row__timeline">
              {cs.timeline}
            </small>
          </div>
        </div>
      </div>

      <div className="editorial-row__visual">
        <Link
          to={href}
          aria-label={cs.name}
          tabIndex={-1}
          className="editorial-row__image-link"
        >
          <div
            className={cn(
              "editorial-row__cover",
              isLogo && "editorial-row__cover--logo",
              !isLogo && "editorial-row__cover--photo",
              open ? "editorial-row__cover--open" : "editorial-row__cover--closed"
            )}
            style={{
              backgroundImage: cs.coverImageUrl
                ? `url("${cs.coverImageUrl}")`
                : PLACEHOLDERS[index % PLACEHOLDERS.length],
            }}
          />
          {!isLogo && <div className="editorial-row__image-shade" />}
          <div
            className={cn(
              "editorial-row__curtain editorial-row__curtain--left",
              open && "editorial-row__curtain--open"
            )}
          />
          <div
            className={cn(
              "editorial-row__curtain editorial-row__curtain--right",
              open && "editorial-row__curtain--open"
            )}
          />
          <div
            className={cn(
              "editorial-row__outcome",
              isLogo && "editorial-row__outcome--logo",
              open ? "editorial-row__outcome--open" : "editorial-row__outcome--closed"
            )}
          >
            <p className="editorial-row__outcome-headline">
              {cs.outcomeHeadline || cs.dek}
            </p>
            <small className="editorial-row__outcome-meta">
              {cs.gated ? "Client demo · password required" : cs.roleTitle || cs.pillars[0]}
            </small>
          </div>
        </Link>
      </div>
    </article>
  )
}

/**
 * Stack of full-bleed, half-viewport case study rows
 * (references/editorial-rows-demo.html). Hover opens a row on pointer
 * devices; on touch, the row crossing the middle of the screen opens.
 */
export function EditorialRows({ caseStudies }: { caseStudies: RowCaseStudy[] }) {
  const [openIndex, setOpenIndex] = useState(0)
  const [canHover, setCanHover] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (canHover || !listRef.current) return
    const rows = [...listRef.current.querySelectorAll("article")]
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setOpenIndex(rows.indexOf(e.target as HTMLElement))
        }),
      { rootMargin: "-45% 0px -45% 0px" }
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [canHover, caseStudies])

  return (
    <div ref={listRef} className="editorial-rows">
      {caseStudies.map((cs, i) => (
        <Row
          key={cs.slug}
          cs={cs}
          index={i}
          open={openIndex === i}
          onEnter={() => canHover && setOpenIndex(i)}
        />
      ))}
    </div>
  )
}
