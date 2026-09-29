import { useRef } from "react"
import { useScroll, useSpring, useTransform } from "motion/react"

/** Spring-smoothed scroll parallax for an element, per
 *  https://samuelkraft.com/blog/spring-parallax-framer-motion-guide —
 *  tracks the element through the viewport and returns a `y` motion
 *  value that eases toward its scroll-linked target instead of
 *  snapping to it. */
export function useParallax(distance = 40) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-distance, distance]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return { ref, y }
}
