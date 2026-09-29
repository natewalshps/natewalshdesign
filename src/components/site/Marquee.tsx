import { cn } from "@/lib/utils"

const DEFAULT_ITEMS = [
  "AI Healthcare",
  "Experience-Led Strategy",
  "Legacy Modernization",
  "Design Systems",
  "Creative Direction",
  "Product Craft",
]

/**
 * Full-bleed, endlessly scrolling band of keywords separated by accent
 * asterisks (references/Asterisk Portfolio Kit.html). The track holds two
 * identical copies and slides -50%, so the loop is seamless.
 *
 * `transparent` drops the band's background so the page's grid rules show
 * through; `decorative` hides it from assistive tech (use on repeat copies).
 */
export function Marquee({
  items = DEFAULT_ITEMS,
  transparent = false,
  decorative = false,
}: {
  items?: string[]
  transparent?: boolean
  decorative?: boolean
}) {
  const copy = (hidden: boolean) => (
    <span
      aria-hidden={hidden || undefined}
      className="whitespace-nowrap px-7 py-[26px] font-display text-[clamp(1.4rem,4vw,2.4rem)] font-bold uppercase tracking-[-0.01em] text-muted-foreground"
    >
      {items.map((item) => (
        <span key={item}>
          {item}
          <i className="ml-7 mr-7 not-italic text-accent" aria-hidden="true">
            •
          </i>
        </span>
      ))}
    </span>
  )

  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn(
        "marquee-wrap relative overflow-hidden border-y border-foreground/15",
        !transparent && "bg-background"
      )}
    >
      <div className="marquee flex w-max">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}
