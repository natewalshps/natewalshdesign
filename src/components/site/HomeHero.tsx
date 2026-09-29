import { useEffect, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { WordReveal } from "@/components/site/ScrollText"

/** Stepped bottom edge of the hanging curtain — % of viewport height. */
//const TOP_HEIGHTS = [98, 96, 94, 92, 88, 84, 80, 76]
const TOP_HEIGHTS = [0, 0, 0, 0, 0, 0, 0, 0]
const COLS = TOP_HEIGHTS.length
const STAGGER = 0.05
const SPAN = 0.5

const power3Out = (t: number) => 1 - Math.pow(1 - t, 3)
const power2Out = (t: number) => 1 - Math.pow(1 - t, 2)

/** Normalised [start, end] for column i when the stagger runs from the end
 *  (last column moves first), same maths as a GSAP scrubbed stagger. */
function slice(i: number) {
  const k = COLS - 1 - i
  const total = SPAN + STAGGER * (COLS - 1)
  return [(k * STAGGER) / total, (k * STAGGER + SPAN) / total]
}

function Column({
  i,
  progress,
  from,
  to,
  ease,
  height,
}: {
  i: number
  progress: MotionValue<number>
  from: number
  to: number
  ease: (t: number) => number
  height?: string
}) {
  const y = useTransform(progress, slice(i), [`${from}vh`, `${to}vh`], { ease })
  return (
    <motion.div
      style={{ y, height }}
      className="flex-1 border-l border-foreground/[0.07] bg-background will-change-transform"
    />
  )
}

/** Animated dot-matrix field — lightweight canvas stand-in for a WebGL scene. */
function DotMatrix() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext("2d")
    if (!c || !ctx) return
    let w = 0
    let h = 0
    let dpr = 1
    let t = 0
    let raf = 0
    const size = () => {
      dpr = Math.min(window.devicePixelRatio, 2)
      w = c.width = c.offsetWidth * dpr
      h = c.height = c.offsetHeight * dpr
    }
    size()
    window.addEventListener("resize", size)
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "rgba(150, 214, 205, 0.55)"
      const s = 9 * dpr
      for (let y = 0; y < h; y += s)
        for (let x = 0; x < w; x += s) {
          const n =
            Math.sin(x * 0.004 + t) * Math.cos(y * 0.005 - t * 0.8) +
            Math.sin((x + y) * 0.002 + t * 0.5)
          const r = Math.max(0, n) * 1.6 * dpr
          if (r > 0.3) {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, 6.283)
            ctx.fill()
          }
        }
      if (!reduce) t += 0.006
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", size)
    }
  }, [reduce])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

/**
 * Homepage hero (references/scroll-columns-demo.html): a sticky dot-matrix
 * field framed by eight page-coloured columns hanging from the top with a
 * stepped edge. On scroll they slide up while a second set rises from below
 * in a staircase and wipes the field away. The "Nathan Walsh" wordmark that
 * sits at the bottom of this hero is rendered by <Header />.
 */
export function HomeHero({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow?: string
  headline: string
  subhead?: string
}) {
  const heroRef = useRef<HTMLElement>(null)
  const riseRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress: heroRaw } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const { scrollYProgress: riseRaw } = useScroll({ target: riseRef, offset: ["start 0.9", "start -0.3"] })
  // scrub: 0.9 — a soft spring lag behind the scrollbar
  const spring = { stiffness: 120, damping: 30, mass: 0.6 }
  const heroP = useSpring(heroRaw, spring)
  const riseP = useSpring(riseRaw, spring)

  return (
    <section ref={heroRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <DotMatrix />
      </div>

      {/* Set 1: hangs from the top with a stepped bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-screen items-start">
        {TOP_HEIGHTS.map((h, i) => (
          <Column
            key={i}
            i={i}
            progress={heroP}
            from={0}
            to={reduce ? 0 : -10}
            ease={power3Out}
            height={`${h}%`}
          />
        ))}
      </div>

      {/* Set 2: rises from below; the staircase comes from the staggered scrub */}
      <div ref={riseRef} className="pointer-events-none absolute inset-x-0 top-[100vh] z-[2] flex h-[130vh]">
        {TOP_HEIGHTS.map((_, i) => (
          <Column key={i} i={i} progress={riseP} from={reduce ? -30 : 100} to={-30} ease={power2Out} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] grid h-screen grid-cols-8 items-center px-6">
        <div className="col-span-8 text-white sm:col-span-6 lg:col-span-6 xl:col-span-7">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-white"
            >
              {eyebrow}
            </motion.p>
          )}
          <WordReveal
            as="h1"
            text={headline}
            className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-semibold leading-[1] tracking-[-0.035em] text-balance"
          />
          {subhead && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[46ch] text-base leading-relaxed text-white sm:text-lg"
            >
              {subhead}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
