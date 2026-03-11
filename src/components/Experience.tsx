"use client";

import { useTranslations } from "next-intl";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { Reveal } from "./AnimationProvider";
import { useState } from "react";

export function Experience() {
  const t = useTranslations("experience");
  const [visibleCount, setVisibleCount] = useState(5);

  // Get all items count from translations
  const allItems: Array<{
    company: string;
    location: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
  }> = [];

  // Dynamically read all items
  let idx = 0;
  while (true) {
    try {
      const item = t.raw(`items.${idx}`);
      if (!item) break;
      allItems.push(item as any);
      idx++;
    } catch {
      break;
    }
  }

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  return (
    <section id="experience" className="section-container">
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

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/50 via-neutral-200 to-transparent dark:via-neutral-800 md:block" />

        {visibleItems.map((item, i) => (
          <Reveal key={`${item.company}-${i}`} variant="fade-up" delay={i < 5 ? i * 0.1 : 0}>
            <div className="relative md:pl-14">
              {/* Timeline dot */}
              <div className="absolute left-2 top-2 hidden md:block">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-white dark:bg-neutral-950" />
                {i === 0 && (
                  <div
                    className="absolute left-0.5 top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-accent/30"
                    style={{ animationDuration: "3s" }}
                  />
                )}
              </div>

              <div className="card">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{item.company}</h3>
                    <p className="font-medium text-accent">{item.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.achievements.map((achievement: string, j: number) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Show more / Show less */}
      {allItems.length > 5 && (
        <Reveal variant="fade" delay={0.2}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  prev >= allItems.length ? 5 : Math.min(prev + 5, allItems.length)
                )
              }
              className="btn-secondary group"
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  !hasMore ? "rotate-180" : ""
                }`}
              />
              {hasMore ? t("showMore") : t("showLess")}
            </button>
          </div>
        </Reveal>
      )}
    </section>
  );
}
