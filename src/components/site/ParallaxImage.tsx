import { motion } from "motion/react"
import { useParallax } from "@/hooks/useParallax"
import { cn } from "@/lib/utils"

/** Fills a `relative overflow-hidden` parent with an image that drifts
 *  on scroll via `useParallax`. Overscans vertically so the spring's
 *  translate range never reveals the container's edge. */
export function ParallaxImage({
  src,
  alt,
  imgClassName,
  distance = 40,
}: {
  src: string
  alt: string
  imgClassName?: string
  distance?: number
}) {
  const { ref, y } = useParallax(distance)
  const overscan = distance * 1.5

  return (
    <motion.div
      ref={ref}
      style={{ y, top: -overscan, bottom: -overscan }}
      className="absolute inset-x-0"
    >
      <img src={src} alt={alt} className={cn("h-full w-full object-cover", imgClassName)} />
    </motion.div>
  )
}
