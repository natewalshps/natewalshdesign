import { motion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Hero({
  eyebrow,
  headline,
  subhead,
  dark = false,
  size = "default",
  children,
}: {
  eyebrow?: string
  headline: string
  subhead?: string
  dark?: boolean
  size?: "default" | "xl"
  children?: ReactNode
}) {
  return (
    <section
      className={cn(
        "px-6 py-24 sm:py-32",
        dark && "bg-foreground text-background"
      )}
    >
      <div className={cn("mx-auto", size === "xl" ? "max-w-5xl" : "max-w-4xl")}>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "mb-4 text-sm font-medium uppercase tracking-widest",
              dark ? "text-background/60" : "text-muted-foreground"
            )}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "font-display font-semibold leading-[0.98] tracking-tight",
            size === "xl"
              ? "text-5xl sm:text-7xl lg:text-8xl"
              : "text-4xl sm:text-6xl"
          )}
        >
          {headline}
        </motion.h1>
        {subhead && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-6 max-w-2xl text-lg",
              dark ? "text-background/80" : "text-muted-foreground"
            )}
          >
            {subhead}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
