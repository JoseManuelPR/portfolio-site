"use client";

import { useTranslations, useMessages } from "next-intl";
import { MapPin, Calendar, ChevronDown, Briefcase } from "lucide-react";
import { Reveal } from "./AnimationProvider";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

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
        <p className="section-subtitle mb-12">{t("subtitle")}</p>
      </Reveal>

      <div className="relative space-y-4">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-6 hidden h-[calc(100%-3rem)] w-px md:block">
          <div className="h-full w-full bg-gradient-to-b from-accent/50 via-neutral-200/50 to-transparent dark:via-white/[0.06]" />
        </div>

        {visibleItems.map((item, i) => (
          <Reveal key={`${item.company}-${i}`} variant="fade-up" delay={i < 5 ? i * 0.08 : 0}>
            <div className="relative md:pl-16">
              {/* Timeline dot */}
              <div className="absolute left-[14px] top-8 hidden md:block">
                <div className="relative">
                  <div className="h-[18px] w-[18px] rounded-full border-[2.5px] border-accent bg-white shadow-sm shadow-accent/20 dark:bg-[#0a0a0f]" />
                  {i === 0 && (
                    <div
                      className="absolute inset-0 rounded-full bg-accent/20"
                      style={{ animation: "pulseGlow 3s ease-in-out infinite" }}
                    />
                  )}
                </div>
              </div>

              <div className="glass-card group p-7">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/8 text-accent dark:bg-accent/15 md:hidden">
                        <Briefcase size={16} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-accent">
                          {item.company}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-accent/80">{item.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-sm text-neutral-400">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-neutral-100/80 px-3 py-1 text-xs font-medium dark:bg-white/[0.04]">
                      <Calendar size={12} />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <MapPin size={11} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mb-5 text-[0.925rem] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>

                <ul className="space-y-2.5">
                  {item.achievements.map((achievement: string, j: number) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {total > 5 && (
        <Reveal variant="fade" delay={0.2}>
          <div className="mt-14 flex justify-center">
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
                className={cn(
                  "transition-transform duration-300",
                  !hasMore && "rotate-180"
                )}
              />
              {hasMore ? t("showMore") : t("showLess")}
            </button>
          </div>
        </Reveal>
      )}
    </section>
  );
}
