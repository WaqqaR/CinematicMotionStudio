import { AnimatedSection, AnimatedItem } from "@/components/ui/Animated";

const STEPS = [
  {
    n: "01",
    t: "Brief & capture",
    d: "We capture your product — ship it to us or we shoot it on location — with the launch date and where the films will run. You get a creative direction back.",
  },
  {
    n: "02",
    t: "Direction & boards",
    d: "Storyboards and a look-frame you sign off on before a single frame renders. No surprises, no wasted cycles.",
  },
  {
    n: "03",
    t: "Render & grade",
    d: "We build and light the world in 3D, then grade it cinematic. You review on shared frames, not vague descriptions.",
  },
  {
    n: "04",
    t: "Delivery + cutdowns",
    d: "Master film plus every paid-ready cutdown and aspect ratio, exported and labelled for each placement.",
  },
] as const;

export default function Process() {
  return (
    <section className="relative overflow-hidden px-6 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection className="max-w-[22ch]">
          <AnimatedItem>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-2">
              How it works
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground md:text-6xl">
              Four steps. No film crew.
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <AnimatedItem key={s.n} className="h-full">
              <div className="neu-sm flex h-full flex-col rounded-[20px] p-7">
                <span className="font-mono text-sm tracking-[0.2em] text-accent-2">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.d}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
