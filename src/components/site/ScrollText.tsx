import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

const CHAR_SPAN = 0.5
const CHAR_STAGGER = 0.1

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Mirrors a GSAP scrubbed stagger: each char gets its own slice of the
  // timeline, offset by the stagger and normalised to the full duration.
  const duration = CHAR_SPAN + CHAR_STAGGER * (total - 1)
  const start = (index * CHAR_STAGGER) / duration
  const end = (index * CHAR_STAGGER + CHAR_SPAN) / duration
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}

/** Big statement whose characters fill in (0.2 → 1 opacity) as it moves
 *  up the screen. Scroll-scrubbed, from references/scroll-columns-demo.html. */
export function ScrollHighlight({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string
  as?: "h2" | "p"
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] })

  if (reduce) return <Tag className={className}>{text}</Tag>

  const words = text.split(/(\s+)/)
  const total = text.replace(/\s+/g, "").length
  let i = 0

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((part, w) =>
        /\s+/.test(part) ? (
          part
        ) : (
          <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
            {[...part].map((ch) => (
              <Char key={i} char={ch} index={i++} total={total} progress={scrollYProgress} />
            ))}
          </span>
        )
      )}
    </Tag>
  )
}

/** Heading that rises in word by word the first time it enters view. */
export function WordReveal({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string
  as?: "h1" | "h2" | "h3" | "p"
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={cn(className)}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {text
        .trim()
        .split(/\s+/)
        .map((word, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduce ? 0 : "110%" },
                shown: { y: 0, transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] } },
              }}
            >
              {word}
            </motion.span>
            {" "}
          </span>
        ))}
    </Tag>
  )
}
