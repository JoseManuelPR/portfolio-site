"use client";

import { useEffect, useState } from "react";

// Film-grain overlay for the whole v2 surface. Mounted after hydration so the
// expensive feTurbulence paint never sits in the pre-LCP critical path.
export function V2Grain() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
