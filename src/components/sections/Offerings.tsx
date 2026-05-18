import { Check, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { AnimatedSection, AnimatedItem } from "@/components/ui/Animated";
import { site, quoteHref } from "@/lib/site";

const TIERS = [
  {
    name: "The Spot",
    tagline: "One cinematic hero film.",
    for: "Best for a single product or a focused launch.",
    items: [
      "1 hero film (15–30s)",
      "3 vertical cutdowns (9:16)",
      "1 round of revisions",
      "Delivery in ~2 weeks",
    ],
    featured: false,
  },
  {
    name: "The Campaign",
    tagline: "A launch built to perform.",
    for: "Best for a full go-to-market across paid social.",
    items: [
      "Hero film + teaser",
      "6+ paid cutdowns (9:16 / 1:1 / 16:9)",
      "Thumbnail & still frames",
      "2 rounds of revisions",
      "Delivery in ~3–4 weeks",
    ],
    featured: true,
  },
  {
    name: "The Brand World",
    tagline: "An ownable cinematic universe.",
    for: "Best for brands making film a long-term channel.",
    items: [
      "Bespoke 3D brand world",
      "Film library (3+ films)",
      "Seasonal refresh option",
      "Full usage rights",
      "Ongoing partner retainer",
    ],
    featured: false,
  },
] as const;

export default function Offerings() {
  return (
    <section
      id="offerings"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection className="max-w-[22ch]">
          <AnimatedItem>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-2">
              The offering
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground md:text-6xl">
              Three ways to put your product on screen.
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
              Every engagement is scoped to your product and launch. Pricing is
              quoted per project — pick the shape that fits and we&apos;ll send
              numbers within a day.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="mt-16 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => (
            <AnimatedItem key={t.name} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[20px] p-7 ${
                  t.featured
                    ? "neu ring-2 ring-accent-2/40"
                    : "neu-sm"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {t.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-2">
                  {t.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {t.for}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-2/12">
                        <Check size={12} weight="bold" className="text-accent-2" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href={quoteHref}
                  className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-transform duration-300 hover:-translate-y-0.5 ${
                    t.featured
                      ? "bg-foreground text-background"
                      : "neu-sm text-foreground"
                  }`}
                >
                  {site.ctaLabel}
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-accent-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
