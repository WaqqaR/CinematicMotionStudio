/**
 * Single source of truth for brand + conversion wiring.
 *
 * RENAME THE BRAND HERE — change `brand` (and optionally `brandTag` / `email`)
 * and it updates everywhere: hero, showcase, offerings, footer, <title>.
 *
 * To swap the "Request a quote" destination for a real form (Typeform,
 * Tally, Calendly, etc.), change `quoteHref`. It currently opens a
 * pre-filled email so the funnel works with zero backend.
 */
export const site = {
  brand: "MOTIVE",
  brandTag: "CINEMATIC AD STUDIO",
  /** Who we sell to — used in supporting copy. */
  audience: "DTC product brands",
  email: "hello@motive.studio",
  ctaLabel: "Request a quote",
  /** In-page anchor used by mid-page CTAs to jump to the quote block. */
  quoteAnchor: "#quote",
} as const;

/** mailto: link with a prefilled subject — the working quote funnel. */
export const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project enquiry — cinematic ad"
)}&body=${encodeURIComponent(
  "Tell us about your product, launch date, and where the films will run:\n\n"
)}`;
