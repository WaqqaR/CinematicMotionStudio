import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import { AnimatedSection, AnimatedItem } from "@/components/ui/Animated";

const CAPABILITIES = [
  {
    k: "Direction",
    t: "Story-first frame design",
    d: "Every beat storyboarded before a single frame renders. The scroll is the edit.",
  },
  {
    k: "Render",
    t: "Offline 3D pipeline",
    d: "Blender / Cinema 4D out to a graded image sequence — full art-direction control.",
  },
  {
    k: "Engineering",
    t: "Sticky-canvas delivery",
    d: "RAF-throttled, DPR-aware, preloaded. 60fps on mobile Safari, every time.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Second scroll-driven canvas — scroll deeper to reach it */}
      <Showcase />

      {/* Closing section */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="max-w-[20ch]">
            <AnimatedItem>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-2">
                The studio
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground md:text-6xl">
                We build the frame people remember.
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="mt-20 grid gap-6 md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <AnimatedItem key={c.k}>
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

          <AnimatedSection className="mt-24 flex flex-col items-start gap-8 md:mt-32 md:flex-row md:items-center md:justify-between">
            <AnimatedItem>
              <p className="max-w-[24ch] text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                Have a story that deserves a scroll like this?
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neu-sm group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-tight text-foreground transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a screening
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="text-accent-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </AnimatedItem>
          </AnimatedSection>
        </div>

        <footer className="mx-auto mt-28 flex max-w-[1400px] flex-col gap-2 border-t border-[var(--line)] pt-8 font-mono text-xs tracking-[0.2em] text-faint md:flex-row md:items-center md:justify-between">
          <span>AURELIA — CINEMATIC MOTION STUDIO</span>
          <span>TWO SCROLL SEQUENCES · 302 FRAMES · {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}
