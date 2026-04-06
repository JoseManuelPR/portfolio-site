"use client";

import { useTranslations } from "next-intl";
import { MapPin, Building2, GraduationCap, Languages } from "lucide-react";
import { Reveal, Stagger } from "./AnimationProvider";

export function About() {
  const t = useTranslations("about");

  const highlights = [
    { icon: Building2, label: "Bunny Studio", sub: "San Francisco" },
    { icon: MapPin, label: "Peru", sub: "Remote" },
    { icon: GraduationCap, label: "USAT", sub: "Systems Engineering" },
    { icon: Languages, label: "ES / EN / PT", sub: "Trilingual" },
  ];

  return (
    <section id="about" className="section-container">
      <Reveal variant="fade-up">
        <h2 className="section-title mb-3">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Reveal variant="fade-up" delay={0.1}>
            <p className="text-lg leading-[1.8] text-neutral-600 dark:text-neutral-400">
              {t("p1")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="leading-[1.8] text-neutral-500 dark:text-neutral-400">
              {t("p2")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.3}>
            <p className="leading-[1.8] text-neutral-500 dark:text-neutral-400">
              {t("p3")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.4}>
            <p className="leading-[1.8] text-neutral-500 dark:text-neutral-400">
              {t("p4")}
            </p>
          </Reveal>
        </div>

        <Stagger
          variant="fade-left"
          staggerDelay={0.1}
          className="space-y-4"
        >
          {highlights.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="group card flex items-center gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white dark:bg-accent/15">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-neutral-500">{sub}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
