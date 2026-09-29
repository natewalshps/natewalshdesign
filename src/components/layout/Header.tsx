import { useEffect, useState } from "react"
// import { useLayoutEffect, useRef } from "react" // wordmark hero animation (disabled)
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Logo, headerLogoBox } from "@/components/site/Logo"

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

/* ---------------------------------------------------------------------------
 * Wordmark hero animation — DISABLED, kept for later.
 * On Home at the top of the page the wordmark was scaled up with a transform
 * to span the viewport and pushed to the bottom of the hero, then docked into
 * the header after DOCK_THRESHOLD px of scroll
 * (references/logo-to-header-effect.html). To re-enable: restore these
 * constants, the commented hooks inside <Header />, the `ref`, the transition
 * classes and the `style` on the wordmark link.
 *
 * // px scrolled before the homepage wordmark docks into the header
 * const DOCK_THRESHOLD = 10
 * const GUTTER = 24
 * // gap between the big wordmark's baseline box and the bottom of the hero
 * const HERO_BOTTOM_GAP = 0.04
 * ------------------------------------------------------------------------- */

/**
 * Fixed header. The "Nate Walsh" wordmark is docked at the left, offset to
 * make room for the NW monogram. On Home the monogram flies in from the hero
 * (<HomeHero />); everywhere else it's simply docked.
 */
export function Header() {
  const [logoBox, setLogoBox] = useState(() => headerLogoBox(typeof window === "undefined" ? 1440 : window.innerWidth))

  useEffect(() => {
    const measure = () => setLogoBox(headerLogoBox(window.innerWidth))
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  /* Wordmark hero animation (disabled) ---------------------------------------
  const logoRef = useRef<HTMLAnchorElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hero, setHero] = useState({ s: 1, tx: 0, ty: 0 })
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    const el = logoRef.current
    if (!el) return
    const measure = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      const top = el.offsetTop
      const s = (window.innerWidth - GUTTER * 2) / w
      const tx = GUTTER - el.offsetLeft
      const ty = window.innerHeight * (1 - HERO_BOTTOM_GAP) - h * s - top
      setHero({ s, tx, ty })
    }
    measure()
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > DOCK_THRESHOLD)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [pathname])

  // Skip the transition on first paint so a mid-page reload doesn't animate.
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  const big = isHome && !scrolled
  ------------------------------------------------------------------------- */

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[70px] bg-white/80 text-foreground shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:bg-black/80">
      <NavLink
        // ref={logoRef} // wordmark hero animation (disabled)
        to="/"
        aria-label="Nate Walsh — home"
        className={cn(
          "pointer-events-auto absolute left-[65px] top-[24px] sm:left-[75px] sm:top-[19px] origin-top-left whitespace-nowrap font-display text-[20px] font-semibold sm:text-[26px] leading-[1] tracking-[-0.045em]"
          // Wordmark hero animation (disabled):
          // "will-change-transform motion-reduce:transition-none",
          // animate && "transition-transform duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)]"
        )}
        // Wordmark hero animation (disabled):
        // style={{
        //   transform: big ? `translate(${hero.tx}px, ${hero.ty}px) scale(${hero.s})` : "none",
        // }}
      >
        Nate Walsh
      </NavLink>
      <NavLink
        to="/"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-auto absolute"
        style={{ left: logoBox.left, top: logoBox.top, width: logoBox.w, height: logoBox.h }}
      >
        <Logo className="block h-full w-full" />
      </NavLink>
      <nav className="pointer-events-auto absolute right-4 top-0 flex h-full items-center gap-3 sm:right-6 sm:gap-5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn("roll text-[13px] font-semibold sm:text-[15px] uppercase tracking-[-0.02em]", !isActive && "opacity-70 hover:opacity-100")
            }
          >
            <span>{link.label}</span>
            <span aria-hidden="true">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
