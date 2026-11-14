import { cn } from "@/lib/utils"

/**
 * Faint vertical rules that continue the hero's eight-column rhythm.
 * `inset` aligns the grid to the page gutter (and closes the right edge)
 * instead of running full-bleed.
 */
export function GridLines({ inset = false, className }: { inset?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 grid grid-cols-8",
        inset ? "inset-x-[var(--page-x)] border-r border-foreground/[0.07]" : "inset-x-0",
        className
      )}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="border-l border-foreground/[0.07]" />
      ))}
    </div>
  )
}
