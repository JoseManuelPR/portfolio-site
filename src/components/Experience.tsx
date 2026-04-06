"use client";

import { useTranslations, useMessages } from "next-intl";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { Reveal } from "./AnimationProvider";
import { useState, useMemo } from "react";

type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
};

export function Experience() {
  const t = useTranslations("experience");
  const messages = useMessages() as any;
  const [visibleCount, setVisibleCount] = useState(5);

  const allItems: ExperienceItem[] = useMemo(
    () => (messages?.experience?.items ?? []) as ExperienceItem[],
    [messages]
  );

  const total = allItems.length;
  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < total;

  return (
    <section id="experience" className="section-container">
      <Reveal variant="fade-up">
        <h2 className="section-title mb-3">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>
      <Reveal variant="fade-up" delay={0.1}>
        <p className="section-subtitle mb-14">{t("subtitle")}</p>
      </Reveal>

      <div className="relative space-y-6">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-3 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/40 via-neutral-200 to-transparent dark:via-neutral-800 md:block" />

        {visibleItems.map((item, i) => (
          <Reveal key={`${item.company}-${i}`} variant="fade-up" delay={i < 5 ? i * 0.08 : 0}>
            <div className="relative md:pl-14">
              {/* Timeline dot */}
              <div className="absolute left-[11px] top-8 hidden md:block">
                <div className="h-4 w-4 rounded-full border-[2.5px] border-accent bg-white shadow-sm shadow-accent/20 dark:bg-neutral-950" />
                {i === 0 && (
                  <div
                    className="absolute inset-0 animate-ping rounded-full bg-accent/20"
                    style={{ animationDuration: "3s" }}
                  />
                )}
              </div>

              <div className="card group">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-accent">
                      {item.company}
                    </h3>
                    <p className="mt-0.5 font-medium text-accent/80">{item.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-[0.925rem] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.achievements.map((achievement: string, j: number) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
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
      {total > 5 && (
        <Reveal variant="fade" delay={0.2}>
          <div className="mt-12 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  prev >= total ? 5 : Math.min(prev + 5, total)
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
