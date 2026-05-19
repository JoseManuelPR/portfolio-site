"use client";

import { useTranslations, useMessages } from "next-intl";
import { Reveal } from "./AnimationProvider";
import { Quote } from "lucide-react";

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
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 text-sm font-bold text-accent ring-2 ring-accent/10 transition-transform duration-500 group-hover:scale-110 dark:from-accent/15 dark:to-purple-500/15">
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
        <div className="section-label mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("title")}
        </div>
      </Reveal>

      <Reveal variant="fade-up" delay={0.1}>
        <h2 className="section-title mb-4">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>
      <Reveal variant="fade-up" delay={0.15}>
        <p className="section-subtitle mb-16">{t("subtitle")}</p>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2">
        {items.map((rec, i) => (
          <Reveal key={i} variant="fade-up" delay={i * 0.12}>
            <article className="group glass-card relative flex h-full flex-col overflow-hidden p-8">
              {/* Gradient accent top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {/* Quote icon */}
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white dark:bg-accent/15">
                <Quote size={18} />
              </div>

              {/* Recommendation text */}
              <p className="flex-1 text-[0.95rem] leading-[1.9] text-neutral-500 dark:text-neutral-400 italic">
                &ldquo;{rec.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4 border-t border-neutral-100/80 pt-6 dark:border-white/[0.04]">
                <Initials name={rec.name} />
                <div className="min-w-0">
                  <p className="truncate font-bold text-neutral-900 dark:text-white">
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
