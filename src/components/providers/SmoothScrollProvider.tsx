"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Physics-based smooth scroll. Lenis drives native window scroll position
 * (no transform hack), so getBoundingClientRect()-based scroll math in the
 * Hero canvas stays accurate. Safari-safe defaults: gentle lerp, no syncTouch
 * (syncTouch stutters on iOS).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
