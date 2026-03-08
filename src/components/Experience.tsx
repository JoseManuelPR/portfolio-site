"use client";

import { useTranslations } from "next-intl";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export function Experience() {
  const t = useTranslations("experience");

  const items = [t.raw("items.0"), t.raw("items.1")] as Array<{
    company: string;
    location: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
  }>;

  return (
    <section id="experience" className="section-container">
      <h2 className="section-title mb-2">
        {t("title")}
        <span className="text-accent">.</span>
      </h2>
      <p className="mb-12 text-neutral-500 dark:text-neutral-400">
        {t("subtitle")}
      </p>

      <div className="relative space-y-12">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-neutral-200 dark:bg-neutral-800 md:block" />

        {items.map((item, i) => (
          <div key={i} className="relative md:pl-14">
            {/* Timeline dot */}
            <div className="absolute left-2.5 top-1.5 hidden h-3 w-3 rounded-full border-2 border-accent bg-white dark:bg-neutral-950 md:block" />

            <div className="card">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{item.company}</h3>
                  <p className="text-accent font-medium">{item.role}</p>
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
        ))}
      </div>
    </section>
  );
}
