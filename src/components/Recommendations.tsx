"use client";

import { useTranslations, useMessages } from "next-intl";
import { Reveal } from "./AnimationProvider";

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
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 text-sm font-bold text-accent ring-2 ring-accent/10">
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
        <h2 className="section-title mb-3">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>
      <Reveal variant="fade-up" delay={0.1}>
        <p className="section-subtitle mb-14">{t("subtitle")}</p>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2">
        {items.map((rec, i) => (
          <Reveal key={i} variant="fade-up" delay={i * 0.1}>
            <article className="group card flex h-full flex-col p-8">
              {/* Large decorative quote */}
              <span
                aria-hidden="true"
                className="mb-2 block font-serif text-7xl leading-none text-accent/15 select-none transition-colors duration-500 group-hover:text-accent/25"
              >
                &ldquo;
              </span>

              {/* Recommendation text */}
              <p className="flex-1 text-[0.95rem] leading-[1.85] text-neutral-500 dark:text-neutral-400">
                {rec.text}
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-6 dark:border-neutral-800/60">
                <Initials name={rec.name} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-neutral-900 dark:text-white">
                    {rec.name}
                  </p>
                  <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
                    {rec.role}
                  </p>
                  <p className="truncate text-xs font-medium text-accent/60 mt-0.5">
                    {rec.relationship}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
