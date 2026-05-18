"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type Options = {
  sectionRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  frameCount: number;
  framePath: (i: number) => string;
  /**
   * Called on every scroll RAF tick with the clamped progress (0–1) and the
   * active frame index. Do direct-DOM work here (opacity via refs); keep React
   * state updates guarded so they only fire when something actually changes.
   */
  onProgress?: (progress: number, frameIndex: number) => void;
};

/**
 * Shared scroll-driven frame-sequence engine.
 *
 * Both the Hero and the Showcase use this. Source clips are portrait, so the
 * draw is "cinematic ambient fit": a blurred, darkened cover layer fills the
 * viewport, then the full sharp frame is drawn contained and centered on top —
 * the whole vertical composition stays visible instead of being hard-cropped.
 *
 * Performance rules (non-negotiable): preload everything behind a real bar,
 * RAF + ticking ref, passive scroll listener, redraw only when the frame index
 * changes, DPR-aware sizing capped at 2.
 */
export function useFrameSequence({
  sectionRef,
  canvasRef,
  frameCount,
  framePath,
  onProgress,
}: Options) {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const currentFrameRef = useRef(-1);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* ---- Preload every frame ---- */
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      const done = () => {
        if (cancelled) return;
        count++;
        setLoadProgress(count / frameCount);
        if (count === frameCount) setLoaded(true);
      };
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, [frameCount, framePath]);

  /* ---- Cinematic ambient-fit draw ---- */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = framesRef.current[index];
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      ctx.clearRect(0, 0, cw, ch);

      // Blurred, darkened cover layer (fills the whole viewport).
      let bw: number;
      let bh: number;
      if (canvasRatio > imgRatio) {
        bw = cw;
        bh = cw / imgRatio;
      } else {
        bh = ch;
        bw = ch * imgRatio;
      }
      bw *= 1.12;
      bh *= 1.12;
      ctx.save();
      ctx.filter = "blur(34px) brightness(0.42) saturate(1.15)";
      ctx.drawImage(img, (cw - bw) / 2, (ch - bh) / 2, bw, bh);
      ctx.restore();

      // Sharp contained frame, centered — entire composition visible.
      const scale = Math.min(cw / iw, ch / ih);
      const fw = iw * scale;
      const fh = ih * scale;
      ctx.drawImage(img, (cw - fw) / 2, (ch - fh) / 2, fw, fh);
    },
    [canvasRef]
  );

  /* ---- DPR-aware sizing ---- */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(currentFrameRef.current >= 0 ? currentFrameRef.current : 0);
  }, [canvasRef, drawFrame]);

  /* ---- Scroll loop ---- */
  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;

    resizeCanvas();
    drawFrame(0);
    currentFrameRef.current = 0;

    const update = () => {
      tickingRef.current = false;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, scrollable))
      );
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
      onProgressRef.current?.(progress, frameIndex);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loaded, sectionRef, frameCount, drawFrame, resizeCanvas]);

  return { loaded, loadProgress };
}
