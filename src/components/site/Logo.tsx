import type { SVGProps } from "react"

/** width / height of the NW monogram's viewBox */
export const LOGO_ASPECT = 58.94 / 32

/** Where the monogram sits when docked in the header, left of the wordmark.
 *  Keep in sync with the wordmark's `left` in <Header />. */
export function headerLogoBox(viewportWidth: number) {
  const small = viewportWidth < 640
  const h = small ? 18 : 22
  return { h, w: h * LOGO_ASPECT, left: 24, top: small ? 25 : 21 }
}

/** NW monogram. Fills with currentColor so it can be tinted/animated. */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 58.94 32" fill="currentColor" aria-hidden="true" {...props}>
      <polygon points="52.18,0 43.12,24.83 39.07,14.65 44.57,0.09 38.84,0.09 35.15,10.68 31.49,0.09 25.72,0.09 31.18,14.65 27.21,24.83 18.11,0 11.43,0 11.45,0.04 11.41,0 0,32 5.36,32 14.79,8.42 24.19,32 29.55,32 35.15,18.57 40.78,32 46.14,32 58.94,0" />
    </svg>
  )
}
