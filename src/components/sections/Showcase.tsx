"use client";

import { useCallback, useRef, useState } from "react";
import { useFrameSequence } from "./useFrameSequence";

const FRAME_COUNT = 151;
const framePath = (i: number) =>
  `/ocean-frames/frame_${String(i).padStart(4, "0")}.jpg`;

const SCENES = [
  {
    id: "surface",
    show: 0.16,
    hide: 0.38,
    eyebrow: "01 — The surface",
    title: "An island that only exists in render",
    body: "Modeled, lit and color-graded to feel shot on location. Nothing here was ever filmed.",
    pos: "left-6 top-28 md:left-12 md:top-32",
  },
  {
    id: "threshold",
    show: 0.44,
    hide: 0.66,
    eyebrow: "02 — The threshold",
    title: "The waterline is the edit",
    body: "One continuous descent, frame-locked to your scroll. No cut — you control the dive.",
    pos: "right-6 top-1/2 -translate-y-1/2 md:right-12",
  },
  {
    id: "depth",
    show: 0.72,
    hide: 0.97,
    eyebrow: "03 — The depth",
    title: "A living reef of detail",
    body: "The payoff you scroll all the way down for. This is what world-building buys you.",
    pos: "left-6 bottom-24 md:left-12 md:bottom-28",
  },
] as const;

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const prevVisibleIdsRef = useRef("");
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const onProgress = useCallback((progress: number) => {
    if (depthRef.current) {
      depthRef.current.textContent = String(
        Math.round(progress * 100)
      ).padStart(2, "0");
    }
    // Intro title fades out over the first 10% of the descent.
    if (introRef.current) {
      const o = Math.max(0, 1 - progress / 0.1);
      introRef.current.style.opacity = String(o);
      introRef.current.style.pointerEvents = o < 0.05 ? "none" : "auto";
    }
    const next = new Set<string>();
    for (const s of SCENES) {
      if (progress >= s.show && progress < s.hide) next.add(s.id);
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
    <section ref={sectionRef} className="scroll-animation relative bg-[#062b34]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* Section label */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-12">
          <span className="font-mono text-sm font-medium tracking-[0.3em] text-white">
            SELECTED WORLD
          </span>
          <span className="hidden font-mono text-xs tracking-[0.25em] text-white sm:block">
            OCEAN / RENDER 002
          </span>
        </div>

        {/* Descent indicator */}
        <div className="pointer-events-none absolute bottom-6 left-6 z-30 font-mono text-xs tracking-[0.25em] text-white mix-blend-difference md:bottom-8 md:left-12">
          DEPTH&nbsp;
          <span ref={depthRef}>00</span>%
        </div>

        {/* Intro title — fades out as you dive in */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Second sequence · {FRAME_COUNT} frames
          </span>
          <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.04] tracking-tighter text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl">
            We don&apos;t shoot scenes. We build{" "}
            <span className="text-gradient">worlds</span>.
          </h2>
          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-white/75 drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] md:text-lg">
            Keep scrolling to dive beneath the surface — one unbroken shot,
            rendered frame by frame.
          </p>
        </div>

        {/* Scene cards — dark glass to read on the bright water */}
        {SCENES.map((s) => {
          const visible = visibleCards.has(s.id);
          return (
            <div
              key={s.id}
              className={`absolute z-20 w-[min(20rem,calc(100vw-3rem))] ${s.pos} transition-all duration-500 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-6 opacity-0"
              }`}
            >
              <div className="glass-dark rounded-[20px] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}

        {/* Inline preload cover — only blankets this section's viewport */}
        {!loaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#062b34]">
            <span className="mb-8 font-mono text-xs uppercase tracking-[0.4em] text-white/50">
              SELECTED WORLD
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
      </div>
    </section>
  );
}
