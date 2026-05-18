/**
 * Single source of truth for brand + conversion wiring.
 *
 * RENAME THE BRAND HERE — change `brand` (and optionally `brandTag` /
 * `domain`) and it updates everywhere: hero, showcase, offerings, footer,
 * <title>.
 *
 * The quote funnel is a contact form (see ContactForm + the sendContact
 * server action). Where the enquiry email lands is `contactEmail`.
 */
export const site = {
  /** Company name (the wordmark). */
  brand: "AURELIA",
  brandTag: "CINEMATIC AD STUDIO",
  /** Live domain — the company is Aurelia; the site is aureliadigital. */
  domain: "aureliadigital.co.uk",
  /** Who we sell to — used in supporting copy. */
  audience: "DTC product brands",
  /** Where contact-form enquiries are delivered. */
  contactEmail: "waqqar@cyberninjascorp.com",
  ctaLabel: "Request a quote",
  /** In-page anchor used by all CTAs to jump to the contact form. */
  quoteAnchor: "#quote",
  /** AURELIA is a child brand of this parent company. */
  parent: {
    name: "Cyber Ninjas Corp",
    url: "https://cyberninjascorp.com",
  },
} as const;
