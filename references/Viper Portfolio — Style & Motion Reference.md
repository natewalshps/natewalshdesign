# Viper Portfolio — Style & Motion Reference

Sep 18, 2026 · @Nathan Walsh

A teardown of [Viper](https://viper-template.framer.website/), a Framer portfolio/agency template, captured for reference when building a similar experience for Nate's own portfolio.

## Overview

Viper is a Framer template for a solo 3D/digital designer's portfolio. It's built around a confident, editorial tone: oversized display type, a single hot accent color against near-black and off-white neutrals, and full-bleed photography with a dark overlay for legibility.

**Site map:** Home, About, Work (index of case studies), individual project pages (e.g. `/work/raven-claw`), and a shared footer with a numbered index-style nav (01/ Home, 02/ About, 03/ Work...).

**Home page flow (top to bottom):**

1. Full-bleed portrait hero with name/title reveal and a copyright tag
2. Intro statement (large display-weight sentence, not a paragraph)
3. "Bringing Ideas to Life" — services blurb
4. Full-bleed product/lifestyle image stack (3 tall images, one per scroll section)
5. Infinite horizontal client-logo marquee
6. Three-step process cards (numbered 01/02/03, each with a mini progress-dot indicator)
7. Skill/progress bars (Strategy 25%, Design 60%, Launch 100%)
8. Full-bleed portrait section
9. "Featured Portfolio" section header with a diagonal decorative blob background
10. Stacked project cards (image + title + year + tag pills), each linking to its own case-study page
11. "Stay connected" contact CTA
12. Footer with numbered page index and legal line

**Project case-study page flow:** dark-overlay hero (title, one-line description, date badge, tag pills, "Preview Site" CTA) → large statement paragraph → 5-star "best rated" credibility block → Problem section (full-bleed image + copy) → Solution section (headline + copy) → a second full-bleed image + closing statement → related-project cards → same footer.

Each major text section uses small red square bullets + eyebrow labels (e.g. "Hey, Just An Intro", "Problem", "Solution") to mark section starts — a consistent wayfinding device throughout the site.

## Color Palette

One hot accent against a restrained near-black/off-white neutral system — the accent almost never competes with more than one other saturated color on screen at once.

| Color | Hex | Used for |
| --- | --- | --- |
| Signal orange-red | `#FF462E` | Logo asterisk, CTA circles, active/current pagination dot, section bullet squares, sticky nav background on scroll |
| Near-black | `#090909` | Primary body text, dark hero overlays |
| Charcoal | `#1E1E1E` | Secondary dark surfaces (dark buttons, dark cards) |
| Muted grey | `#7F7F80` | Body copy on light backgrounds |
| Warm grey | `#63615E` | Secondary muted text |
| Off-white | `#F5F4F3`, `#F9F9F9`, `#FAF9F5` | Page background, button fills |
| Light grey | `#EAEAEA`, `#D9D9D9` | Pill/tag backgrounds, dividers |
| Orange tint | `rgba(255,70,46,0.1–0.2)` | Soft badge backgrounds (e.g. the "Portfolio" pill) |

**Pattern to borrow:** a single saturated accent color, used sparingly and consistently (one CTA color, one bullet color, one active-state color) against a mostly monochrome, slightly warm-toned neutral palette. Photography carries the rest of the color — the UI chrome stays disciplined so images read as the star.

## Typography

A single typeface family does all the work: **Inter Display**, sans-serif. Contrast comes from scale and weight, not from mixing typefaces.

| Role | Size | Weight | Letter-spacing | Line-height |
| --- | --- | --- | --- | --- |
| Display headline (hero H1, section titles) | \~110–160px | 600 (semibold) | −4px (tight) | \~0.85× font size (tighter than default) |
| Section sub-heads | \~40–48px | 600–700 | slightly tight | normal |
| Body copy | 18px | 400–500 | normal | \~1.5× |
| Eyebrow labels ("Hey, Just An Intro") | 14–16px | 500–600, often uppercase-adjacent | normal | normal |

**Key move:** display type is set noticeably larger and tighter than most portfolio sites dare — headlines wrap to 3–4 lines at desktop width, with line-height pulled in below 1× so the block reads as a single dense mass rather than loose stacked lines. Body copy stays conservative (18px, muted grey) so it never competes with the display type.

## Layout Patterns

**Hero:** full-bleed portrait/environmental photo, dark gradient overlay bottom-up for text legibility, name/title set in the display face over the image, a small ©2025-style tag top-left, and (on inner pages) a date badge + tag pills + primary CTA anchored bottom-left. A down-chevron sits bottom-right as a scroll affordance.

**Section rhythm:** every section opens with a thin horizontal rule, a small colored square bullet, and an eyebrow label (e.g. "Featured Works", "Problem", "Solution") before the heading — this is the site's main wayfinding device and repeats on every single section, home and case-study pages alike.

**Full-bleed image blocks:** tall (near full-viewport-height) images used as breathing room between text sections, always with rounded corners (\~16–24px radius) and a soft edge/border, never edge-to-edge bleed on desktop.

**Cards:** project cards stack vertically (one per viewport, not a grid) — large image, title + year below-left, tag pills below-right, and a row of pagination dots. Process/step cards use a light diagonal-hatched background fill and a large numeral (01/02/03) instead of an icon.

**Logo marquee:** an infinite horizontal auto-scrolling strip of client wordmarks, full-bleed edge to edge, breaking the vertical rhythm as a horizontal beat.

**Footer:** numbered index-style nav (01/ Home, 02/ About, 03/ Work…), each row full-width with a divider and a trailing arrow icon — reads like a table of contents rather than a typical link list. Preceded by a large "Stay connected" headline and an underlined email link.

## Scroll & Reveal Motion

- **Text reveal on load:** headline text animates in per line/word (blur or opacity + slight upward offset, staggered), so a fresh hero or section headline never appears instantly — it assembles itself over roughly half a second.
- **Nav color-shift on scroll/menu open:** the top nav bar sits transparent over the hero; toggling the "+" menu (or scrolling) swaps its background to the full-width signal-orange bar and reveals a breadcrumb ("Home 01") plus a "Get in touch" pill — the header actively changes state rather than just staying sticky.
- **Infinite logo marquee:** the client-logo row auto-scrolls horizontally on a continuous loop, no user interaction required.
- **Progress-dot indicators:** case-study sections use a row of small dots (● ● ○ ○) that fill in red as the reader scrolls through the narrative — a lightweight "you are here" progress cue rather than a traditional progress bar.
- **Numeric/stat reveals:** skill or process metrics ("Strategy 25%", "Design 60%", "Launch 100%") are laid out as a simple label + right-aligned percentage list, implying a fill/count-up animation as they scroll into view.
- **Section dividers:** a thin horizontal rule with a centered "+" mark appears between major sections — a small consistent punctuation mark that also seems to be an expand affordance in some contexts.

**Overall feel:** motion is used for *arrival* (things reveal as you reach them) and *state change* (nav, dots), not for constant background animation — nothing distracts from the photography.

## Page Transitions

Tested by navigating Home → project case study (`/work/raven-claw`) and Home → About. The pattern is consistent both times:

1. **Instant route swap, no wipe/curtain.** Clicking a project card or a footer nav row jumps straight to the new URL and scrolls to top — there's no slide, fade-through-black, or curtain animation covering the swap itself. It reads as a fast SPA route change.
2. **A brief oversized single-letter watermark.** For a fraction of a second, the new page's hero shows one giant initial letter (the first letter of the page/project title — "R" for Raven Claw, "A" for About) as a large ghost/watermark element bottom-left, over the darkened hero image, before the full title finishes rendering. This reads as a lightweight branded loading/placeholder state rather than a true transition effect.
3. **New hero text reveals in.** The full headline ("Raven Claw", "About Clive") then animates in — same staggered/blurred-line reveal used elsewhere on the site — immediately followed by the supporting one-line description and CTA fading/sliding in just after.
4. **Visual continuity via consistent hero template.** Because every page (home hero, about hero, case-study hero) uses the identical structural recipe — full-bleed photo, dark gradient overlay, ©-year tag top-left, oversized display headline, thin rule, CTA — the site *feels* like it has a polished transition even though the mechanism is really just "instant navigation + consistent template + text reveal." The perceived smoothness comes from template consistency, not from a heavyweight page-transition animation.

**Takeaway for your build:** you don't need a complex shared-element or curtain transition to get this feel. A same-structure hero template on every route, combined with a \~400–600ms staggered text/line reveal on the incoming headline, gets you 90% of the perceived polish with far less engineering risk than a true animated route transition (which is also harder to get right in plain Framer Motion / Next.js without jank).

## Micro-interactions

- **Pill buttons** ("Get in touch", "Contact now", "Preview Site") pair a small solid-orange circular icon chip (arrow) with a light-grey/off-white pill label — a consistent two-tone button shape used everywhere a primary action appears.
- **Nav toggle ("+")** in the top-right doubles as a menu trigger: clicking it swaps the transparent header for a full-width orange bar and reveals a breadcrumb + CTA, rather than opening a traditional dropdown/overlay menu.
- **Tag/category pills** ("Portfolio", "E-Commerce") use a neutral grey fill with fully rounded corners — secondary, non-interactive-looking metadata, visually distinct from the primary orange CTAs.
- **Section-divider "+"** marks between sections hint at expandability even where nothing expands — a recurring graphic motif more than a literal control.
- **Cursor:** standard pointer throughout; no custom cursor or magnetic-button effects were observed.

## Recommendations for Your Portfolio

**Assumption:** you're building a personal site (likely Next.js/React given your toolset) rather than staying in Framer, so recommendations below focus on the *system*, not Framer-specific implementation.

1. **Pick one accent color and use it sparingly.** One saturated color (Viper's is `#FF462E`) for CTAs, active states and one recurring UI mark (bullet, dot, asterisk) — everything else neutral. For your work (design systems, healthcare UI), this restraint also demonstrates the same discipline you preach professionally.
2. **One display typeface, pushed harder than feels comfortable.** Set headlines large (100px+) with tight negative letter-spacing and line-height under 1×. This is the single biggest lever for the "confident portfolio" feel — more impactful than any animation.
3. **Build one hero template, reuse it on every route.** Full-bleed image + dark gradient overlay + tag/date + display headline + one-line description + CTA. Apply it identically to home, about, and each case study. This consistency is what makes navigation *feel* like a polished transition system even without one.
4. **Skip heavyweight page transitions.** Invest instead in a staggered text-reveal animation (CSS `clip-path`/`opacity` + stagger, or Framer Motion `staggerChildren`) on the incoming headline, \~400–600ms. Lower engineering risk, same perceived polish.
5. **Adopt a repeating section-marker device.** A small colored bullet + eyebrow label before every section heading gives you free wayfinding and a strong signature detail, cheap to implement (a two-line component) and consistent across a whole site.
6. **Use scroll-progress dots, not a progress bar, inside long case studies.** Cheap to build, reads as more editorial/considered than a linear progress bar.
7. **Consider one motion element that's purely delightful** — Viper's is the infinite logo marquee. For your context this could be a scrolling strip of client/product logos (OptumRx, other engagements you can publicly name) or a scrolling strip of tools/skills.

**Open question:** what's the target stack for the new site (Next.js + Framer Motion, Webflow, Framer itself, something else)? That determines whether the text-reveal and hero-template recommendations above translate to component code or to a page-builder configuration.
