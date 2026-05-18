"use client";

import { useCallback, useRef, useState } from "react";
import { useFrameSequence } from "./useFrameSequence";

const FRAME_COUNT = 151;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const ANNOTATIONS = [
  {
    id: "craft",
    show: 0.14,
    hide: 0.36,
    eyebrow: "01 — The craft",
    title: "151 frames, scrubbed to your scroll",
    body: "No <video> tag, no jank. A hand-graded image sequence painted onto a single canvas, driven by your momentum.",
    pos: "left-6 bottom-24 md:left-12 md:bottom-28",
  },
  {
    id: "pipeline",
    show: 0.42,
    hide: 0.64,
    eyebrow: "02 — The pipeline",
    title: "Rendered offline, delivered as an engine",
    body: "Sequenced frame-by-frame, preloaded with a real progress bar, pinned sticky so it holds 60fps on mobile Safari.",
    pos: "right-6 top-28 md:right-12 md:top-32",
  },
  {
    id: "legacy",
    show: 0.7,
    hide: 0.97,
    eyebrow: "03 — The vision",
    title: "The frame people can't unsee",
    body: "Worlds built to live behind the eye long after the scroll ends. We direct the moment that lingers.",
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
            AURELIA
          </span>
          <span className="hidden font-mono text-xs tracking-[0.25em] text-white sm:block">
            CINEMATIC MOTION STUDIO
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
            Scroll-driven · {FRAME_COUNT} frames
          </span>
          <h1 className="max-w-[15ch] text-5xl font-semibold leading-[1.02] tracking-tighter text-white sm:text-7xl md:text-8xl">
            Every story starts behind the{" "}
            <span className="text-gradient">eye</span>.
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/65 md:text-lg">
            We render whole worlds offline, then scrub them to your scroll on a
            single canvas. No video. No jank. Just the frame you remember.
          </p>
          <div className="mt-12 flex flex-col items-center gap-3 text-white/50">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em]">
              Scroll to look closer
            </span>
            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
              <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
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
            AURELIA
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
