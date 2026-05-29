"use client";

import { useEffect, useCallback, useRef, useState } from "react";

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    container.style.setProperty("--mouse-x", `${e.clientX}px`);
    container.style.setProperty("--mouse-y", `${e.clientY}px`);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Decorative-only. Rendered after mount so the expensive paints (blur,
  // feTurbulence noise, gradient mesh) never block the hero's first/largest
  // contentful paint. Everything here is behind content and aria-hidden.
  if (!mounted) return null;

  return (
    <>
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 dot-grid-bg"
        aria-hidden="true"
      />
      {/* Gradient mesh */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 gradient-mesh"
        aria-hidden="true"
      />
      {/* Cursor spotlight */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 -z-10 spotlight transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* Noise grain */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
