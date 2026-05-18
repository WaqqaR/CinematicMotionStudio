"use client";

import { useCallback, useRef, useState } from "react";
import { useFrameSequence } from "./useFrameSequence";
import { site } from "@/lib/site";

const FRAME_COUNT = 151;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const ANNOTATIONS = [
  {
    id: "stop",
    show: 0.14,
    hide: 0.36,
    eyebrow: "01 — Scroll-stopping",
    title: "Engineered for the first 3 seconds",
    body: "We design the exact frame that kills the thumb-stop. Your product, on screen, impossible to skip past.",
    pos: "left-6 bottom-24 md:left-12 md:bottom-28",
  },
  {
    id: "convert",
    show: 0.42,
    hide: 0.64,
    eyebrow: "02 — Made to convert",
    title: "Every cut mapped to the buy",
    body: "One hero film plus paid-ready cutdowns for every placement — built around the decision, not just the look.",
    pos: "right-6 top-28 md:right-12 md:top-32",
  },
  {
    id: "speed",
    show: 0.7,
    hide: 0.97,
    eyebrow: "03 — Launch in weeks",
    title: "Product to film in 2–4 weeks",
    body: "We capture your real product, then build the world around it in 3D. Finished films in weeks — not a months-long production.",
    pos: "right-6 bottom-24 md:right-12 md:bottom-28",
  },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevVisibleIdsRef = useRef("");
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const onProgress = useCallback((progress: number, frameIndex: number) => {
    if (counterRef.current) {
      counterRef.current.textContent = String(frameIndex + 1).padStart(3, "0");
    }
    if (heroTextRef.current) {
      const o = Math.max(0, 1 - progress / 0.08);
      heroTextRef.current.style.opacity = String(o);
      heroTextRef.current.style.pointerEvents = o < 0.05 ? "none" : "auto";
    }
    const next = new Set<string>();
    for (const a of ANNOTATIONS) {
      if (progress >= a.show && progress < a.hide) next.add(a.id);
    }
    const key = [...next].sort().join(",");
    if (key !== prevVisibleIdsRef.current) {
      prevVisibleIdsRef.current = key;
      setVisibleCards(next);
    }
  }, []);

  const { loaded, loadProgress } = useFrameSequence({
    sectionRef,
    canvasRef,
    frameCount: FRAME_COUNT,
    framePath,
    onProgress,
  });

  return (
    <section ref={sectionRef} className="scroll-animation relative bg-[#05060a]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* Scrim — keeps the headline readable over the busy iris */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,6,10,0.72)_0%,rgba(5,6,10,0.4)_45%,rgba(5,6,10,0.15)_100%)]"
        />

        {/* Top bar — reads on dark & light via mix-blend-difference */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-12">
          <span className="font-mono text-sm font-medium tracking-[0.3em] text-white">
            {site.brand}
          </span>
          <span className="hidden font-mono text-xs tracking-[0.25em] text-white sm:block">
            {site.brandTag}
          </span>
        </div>

        {/* Frame counter */}
        <div className="pointer-events-none absolute bottom-6 left-6 z-30 font-mono text-xs tracking-[0.25em] text-white mix-blend-difference md:bottom-8 md:left-12">
          FRAME&nbsp;
          <span ref={counterRef}>001</span>
          &nbsp;/&nbsp;{FRAME_COUNT}
        </div>

        {/* Hero text — fades out in the first 8% of scroll */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Cinematic ads for {site.audience}
          </span>
          <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-tighter text-white sm:text-7xl md:text-8xl">
            Make them <span className="text-gradient">stop scrolling</span>.
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/65 md:text-lg">
            We turn your product into a cinematic film built to sell — the kind
            of ad people screenshot, share, and buy from.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href={site.quoteAnchor}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-[#05060a] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {site.ctaLabel}
              <span className="text-accent-2">↗</span>
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
              or scroll to see the work
            </span>
          </div>
        </div>

        {/* Annotation cards */}
        {ANNOTATIONS.map((a) => {
          const visible = visibleCards.has(a.id);
          return (
            <div
              key={a.id}
              className={`absolute z-20 w-[min(20rem,calc(100vw-3rem))] ${a.pos} transition-all duration-500 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-6 opacity-0"
              }`}
            >
              <div className="neu rounded-[20px] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-2">
                  {a.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {a.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preload overlay with real progress */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060a]">
          <span className="mb-8 font-mono text-xs uppercase tracking-[0.4em] text-white/50">
            {site.brand}
          </span>
          <div className="h-px w-64 overflow-hidden bg-white/15">
            <div
              className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-[width] duration-200"
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
          <span className="mt-5 font-mono text-xs tracking-[0.3em] text-white/40">
            LOADING {Math.round(loadProgress * 100)}%
          </span>
        </div>
      )}
    </section>
  );
}
