"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { Reveal } from "./AnimationProvider";

export function Recommendations() {
  const t = useTranslations("recommendations");

  const items: Array<{
    name: string;
    role: string;
    relationship: string;
    text: string;
  }> = [];

  let idx = 0;
  while (true) {
    try {
      const item = t.raw(`items.${idx}`);
      if (!item) break;
      items.push(item as any);
      idx++;
    } catch {
      break;
    }
  }

  // Duplicate for seamless loop
  const duplicated = [...items, ...items];

  return (
    <section
      id="recommendations"
      className="border-y border-neutral-200/60 bg-white/50 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-950/50"
    >
      <div className="section-container">
        <Reveal variant="fade-up">
          <h2 className="section-title mb-2">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.1}>
          <p className="mb-12 text-neutral-500 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.2}>
          <div className="logo-carousel relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/80 dark:from-neutral-950/80 sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/80 dark:from-neutral-950/80 sm:w-24" />

            <div className="flex w-max gap-6 animate-scroll-left" style={{ animationDuration: "60s" }}>
              {duplicated.map((rec, i) => (
                <div
                  key={`${rec.name}-${i}`}
                  className="w-[340px] shrink-0 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:w-[400px]"
                >
                  <Quote
                    size={20}
                    className="mb-3 text-accent/40"
                  />
                  <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    &ldquo;{rec.text}&rdquo;
                  </p>
                  <div className="border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <p className="font-semibold text-sm">{rec.name}</p>
                    <p className="text-xs text-neutral-500">{rec.role}</p>
                    <p className="text-xs text-accent/70 mt-0.5">{rec.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
