import { useEffect, useId, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/Logo"
import { getContent } from "@/lib/content"

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

const EASE = [0.65, 0, 0.35, 1] as const
/** Tailwind's `sm` breakpoint — the inline nav takes over from here up. */
const DESKTOP_QUERY = "(min-width: 40rem)"

/** Two bars that cross into an X when the menu is open. */
function MenuIcon({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[2px] w-full rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
  return (
    <span aria-hidden="true" className="relative block h-3 w-[22px]">
      <span className={cn(bar, "top-0", open && "translate-y-[5px] rotate-45")} />
      <span className={cn(bar, "bottom-0", open && "-translate-y-[5px] -rotate-45")} />
    </span>
  )
}

/**
 * Fixed, floating header pill: NW monogram + wordmark on the left, nav on the
 * right. From `sm` up the nav is inline; below it collapses into a hamburger
 * that expands the pill into a full menu panel.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const email = getContent("contact.email", "natewalshdesign@gmail.com")
  const linkedin = getContent("contact.linkedin", "https://www.linkedin.com/in/natewalsh")

  // Close on navigation (covers back/forward as well as link taps).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // While open: lock page scroll, move focus into the menu, close on
  // Escape and keep Tab cycling inside the header.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLElement>("a")?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== "Tab" || !headerRef.current) return
      const items = [
        ...headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      root.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-4 z-50 px-page">
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className="pointer-events-auto fixed inset-0 -z-10 bg-black/30 backdrop-blur-[2px] sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-auto rounded-2xl bg-white/80 shadow-[0_1px_1.5px_rgba(0,0,0,0.3)] backdrop-blur-md dark:bg-black/80">
        <div className="flex h-[70px] items-center justify-between px-4 sm:px-6">
          <NavLink to="/" aria-label="Nate Walsh — home" className="flex items-center gap-3">
            <Logo className="h-5 w-auto sm:h-6" />
            <span className="whitespace-nowrap font-display text-[19px] font-semibold leading-none tracking-[-0.03em] sm:text-[22px]">
              Nate Walsh
            </span>
          </NavLink>

          <nav aria-label="Main" className="hidden items-center gap-5 sm:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "roll text-[15px] font-semibold uppercase tracking-[-0.01em]",
                    !isActive && "opacity-70 hover:opacity-100"
                  )
                }
              >
                <span>{link.label}</span>
                <span aria-hidden="true">{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex size-11 items-center justify-center rounded-full transition-colors hover:bg-foreground/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="menu"
              ref={panelRef}
              id={menuId}
              className="overflow-hidden sm:hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            >
              <nav aria-label="Main" className="border-t border-foreground/10 px-4 pb-6 pt-3">
                <ul className="flex flex-col">
                  {links.map((link, i) => (
                    <li key={link.to} className="overflow-hidden">
                      <motion.div
                        initial={reduce ? false : { y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
                      >
                        <NavLink
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "flex items-baseline justify-between py-2 font-display text-[clamp(2.25rem,11vw,3rem)] font-bold uppercase leading-none tracking-[-0.04em]",
                              !isActive && "opacity-60 active:opacity-100"
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span>{link.label}</span>
                              {isActive && (
                                <span aria-hidden="true" className="text-[0.45em] text-accent">
                                  •
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <motion.div
                  className="mt-6 flex gap-6 border-t border-foreground/10 pt-4 text-base text-muted-foreground"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <a href={`mailto:${email}`} className="hover:text-foreground">
                    Email
                  </a>
                  <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    LinkedIn
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
