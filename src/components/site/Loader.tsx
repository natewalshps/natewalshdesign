import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Logo } from "@/components/site/Logo"

const COLS = 8
/** How long the mark is on screen before the wipe starts, ms. */
const HOLD = 1600
const EASE = [0.65, 0, 0.35, 1] as const

/** Plays once per page load — client-side navigation back to Home skips it. */
let played = false

/**
 * Intro loader: a dark field of eight columns carrying the NW monogram and
 * "Nate Walsh". The mark lifts away, then the columns wipe upward in a
 * staggered staircase (last column first, as in
 * references/scroll-columns-demo.html), revealing the hero underneath.
 */
export function Loader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(!played)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = "hidden"

    let finish: ReturnType<typeof setTimeout>
    const start = setTimeout(() => {
      setLeaving(true)
      finish = setTimeout(() => {
        played = true
        setVisible(false)
        root.style.overflow = prev
      }, reduce ? 300 : 1400)
    }, HOLD)
    return () => {
      clearTimeout(start)
      clearTimeout(finish)
      root.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount
  }, [])

  // Portalled to <body>: the page-transition wrapper is transformed, which
  // would otherwise become this fixed overlay's containing block.
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading Nate Walsh"
          className="fixed inset-0 z-[100] flex"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {Array.from({ length: COLS }, (_, i) => (
            <motion.div
              key={i}
              className="h-full flex-1 bg-foreground"
              initial={{ y: 0 }}
              animate={leaving && !reduce ? { y: "-100%" } : { y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 + (COLS - 1 - i) * 0.06 }}
            />
          ))}

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 text-background"
            initial={{ opacity: 0, y: 16 }}
            animate={leaving ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
            transition={{ duration: leaving ? 0.35 : 0.5, ease: EASE }}
          >
            <Logo className="h-auto w-[clamp(96px,14vw,168px)]" />
            <span className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.045em]">
              Nate Walsh
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
