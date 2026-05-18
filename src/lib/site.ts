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
  /** Company name (the wordmark). */
  brand: "AURELIA",
  brandTag: "CINEMATIC AD STUDIO",
  /** Live domain — the company is Aurelia; the site is aureliadigital. */
  domain: "aureliadigital.co.uk",
  /** Who we sell to — used in supporting copy. */
  audience: "DTC product brands",
  email: "hello@aureliadigital.co.uk",
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
