import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/Logo"

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

/** Fixed, floating header pill: NW monogram + wordmark left, nav right. */
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-page">
      <div className="pointer-events-auto flex h-[70px] items-center justify-between rounded-2xl bg-white/80 px-4 shadow-[0_1px_1.5px_rgba(0,0,0,0.3)] backdrop-blur-md sm:px-6 dark:bg-black/80">
        <NavLink to="/" aria-label="Nate Walsh — home" className="flex items-center gap-3">
          <Logo className="h-5 w-auto sm:h-6" />
          <span className="hidden whitespace-nowrap font-display min-[400px]:inline text-[19px] font-semibold leading-none tracking-[-0.03em] sm:text-[22px]">
            Nate Walsh
          </span>
        </NavLink>
        <nav className="flex items-center gap-3 sm:gap-5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "roll text-[14px] font-semibold uppercase tracking-[-0.01em] sm:text-[15px]",
                  !isActive && "opacity-70 hover:opacity-100"
                )
              }
            >
              <span>{link.label}</span>
              <span aria-hidden="true">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
