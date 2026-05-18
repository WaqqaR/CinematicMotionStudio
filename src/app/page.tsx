import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Offerings from "@/components/sections/Offerings";
import Process from "@/components/sections/Process";
import { AnimatedSection, AnimatedItem } from "@/components/ui/Animated";
import { site, quoteHref } from "@/lib/site";

const WHY = [
  {
    k: "Stop the scroll",
    t: "Cinematic beats a product photo",
    d: "A still gets skipped. A film that moves like this earns the three seconds that decide the sale.",
  },
  {
    k: "Premium perception",
    t: "Look like the category leader",
    d: "Render-grade production makes a young brand read as established — without a full-scale production budget.",
  },
  {
    k: "Performance-ready",
    t: "Built for paid from day one",
    d: "Every film ships with the cutdowns and ratios your media buyer needs to run it the same week.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Second scroll-driven canvas — scroll deeper to reach it */}
      <Showcase />

      {/* Why cinematic converts */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="max-w-[24ch]">
            <AnimatedItem>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-2">
                Why it works
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground md:text-6xl">
                A product film does what a photo can&apos;t.
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid gap-6 md:grid-cols-3">
            {WHY.map((c) => (
              <AnimatedItem key={c.k} className="h-full">
                <div className="neu h-full rounded-[20px] p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-2">
                    {c.k}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {c.d}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* The productized offering */}
      <Offerings />

      {/* How it works */}
      <Process />

      {/* Quote conversion block */}
      <section
        id="quote"
        className="relative overflow-hidden scroll-mt-24 px-6 pb-28 md:px-12 md:pb-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="neu rounded-[28px] px-7 py-16 text-center md:px-16 md:py-24">
            <AnimatedItem>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-2">
                Start your project
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="mx-auto mt-6 max-w-[18ch] text-4xl font-semibold leading-[1.04] tracking-tighter text-foreground md:text-6xl">
                Have a product that deserves a film?
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
                Tell us the product, the launch date, and where the ad will run.
                You&apos;ll get a scoped quote and a creative direction within a
                day.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="mt-12 flex flex-col items-center gap-4">
                <a
                  href={quoteHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-semibold tracking-tight text-background transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {site.ctaLabel}
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="text-accent-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-xs tracking-[0.2em] text-faint underline-offset-4 hover:text-muted hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <footer className="mt-20 flex flex-col gap-2 border-t border-[var(--line)] pt-8 font-mono text-xs tracking-[0.2em] text-faint md:flex-row md:items-center md:justify-between">
            <span>
              {site.brand} — {site.domain}
            </span>
            <span>
              CINEMATIC ADS FOR {site.audience.toUpperCase()} ·{" "}
              {new Date().getFullYear()}
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}
