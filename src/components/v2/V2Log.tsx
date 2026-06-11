"use client";

import { useEffect, useState } from "react";

type LogLine = { cmd: string; out: string };

// Field-log typing animation — the spiritual heir of v1's terminal.
// Types each command, then prints its output, then moves on. Mounted
// client-side only, well after the hero's first paint.
export function V2Log({ lines }: { lines: LogLine[] }) {
  const [mounted, setMounted] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // Honor reduced motion: render the full log statically, no typing loop
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      setLineIdx(lines.length);
      return;
    }
    const t = setTimeout(() => setMounted(true), 1600);
    return () => clearTimeout(t);
  }, [lines.length]);

  useEffect(() => {
    if (!mounted || lineIdx >= lines.length) return;

    const full = lines[lineIdx].cmd.length;
    if (charCount < full) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 34);
      return () => clearTimeout(t);
    }
    // Command finished typing → reveal output, pause, next line
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharCount(0);
    }, 650);
    return () => clearTimeout(t);
  }, [mounted, lineIdx, charCount, lines]);

  if (!mounted) return null;

  return (
    <div
      className="space-y-1.5 font-mono text-[11px] leading-relaxed tracking-[0.14em]"
      aria-hidden="true"
    >
      {lines.map((line, i) => {
        if (i > lineIdx) return null;
        const typing = i === lineIdx;
        const shown = typing ? line.cmd.slice(0, charCount) : line.cmd;
        const done = !typing || charCount >= line.cmd.length;
        return (
          <div key={i}>
            <p className={typing && !done ? "v2-caret" : ""}>
              <span className="opacity-70">$ </span>
              {shown}
            </p>
            {done && i < lines.length && (
              <p className={`pl-4 opacity-90 ${typing ? "v2-caret" : ""}`}>
                {line.out}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
