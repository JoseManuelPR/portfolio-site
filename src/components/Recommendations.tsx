"use client";

import { useTranslations, useMessages } from "next-intl";
import { Reveal, Stagger } from "./AnimationProvider";

type RecommendationItem = {
  name: string;
  role: string;
  relationship: string;
  text: string;
};

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent ring-1 ring-accent/20">
      {letters.toUpperCase()}
    </div>
  );
}

export function Recommendations() {
  const t = useTranslations("recommendations");
  const messages = useMessages() as any;
  const items: RecommendationItem[] =
    (messages?.recommendations?.items ?? []) as RecommendationItem[];

  if (!items.length) return null;

  return (
    <section id="recommendations" className="section-container">
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

      <Stagger className="grid gap-6 sm:grid-cols-2">
        {items.map((rec, i) => (
          <Reveal key={i} variant="fade-up" delay={i * 0.1}>
            <article className="flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-white/80 p-8 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/80">
              {/* Large decorative quote */}
              <span
                aria-hidden="true"
                className="mb-4 block font-serif text-6xl leading-none text-accent/20 select-none"
              >
                &ldquo;
              </span>

              {/* Recommendation text */}
              <p className="flex-1 text-[0.95rem] leading-relaxed text-neutral-600 dark:text-neutral-300">
                {rec.text}
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                <Initials name={rec.name} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-sm text-neutral-900 dark:text-white">
                    {rec.name}
                  </p>
                  <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                    {rec.role}
                  </p>
                  <p className="truncate text-xs text-accent/70 mt-0.5">
                    {rec.relationship}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Stagger>
    </section>
  );
}
