# Nate Walsh — personal site template

Static site. No build step. Open `index.html` or upload the folder to any host (Netlify, Vercel, GitHub Pages, Webflow custom code).

## Files
| File | What it is |
|---|---|
| `index.html` | Content and structure: loader, nav, hero, marquee, about, work, approach, contact, footer |
| `styles.css` | All styling. Brand tokens are at the top in `:root` |
| `main.js` | Motion: loader timeline, masked headline reveals, scroll reveals, word scrub, parallax, marquee |
| `assets/bg-*.svg` | Swappable background graphics, one per section |

## Swap the background graphics
Each section with a graphic has a `.bg` layer that sits behind the content and parallaxes on scroll.

1. **Easiest:** replace `assets/bg-hero.svg`, `bg-work.svg` or `bg-contact.svg` with your own file. Keep the same name.
2. **Different file type:** in `styles.css`, change the token, e.g. `--bg-hero: url("assets/my-hero.jpg");`
3. **Video or WebGL:** put a `<video autoplay muted loop playsinline src="…">` (or a canvas embed) inside the section's `<div class="bg">`. It is already sized to cover the section.
4. **Parallax strength:** edit `data-parallax="0.15"` on the `.bg` div. Use `0` to turn it off.

Tip: SVG comments can't contain `--`. If a custom SVG doesn't show up, check its comments first.

## Rebrand
- Colours, fonts, and column count: `:root` tokens in `styles.css`
- Loader wordmark: the two `<span>`s inside `.loader .logo`
- Intro timing: the `intro` timeline in `main.js`. It plays 2.2× faster for returning visitors in the same session.

## Accessibility
- The loader and all motion are skipped when the visitor's system has reduced motion turned on.
- Content stays visible if JavaScript or the CDN fails.
