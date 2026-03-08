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
        <h2 className="section-title mb-12">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-5 text-neutral-600 dark:text-neutral-400 lg:col-span-2">
          <Reveal variant="fade-up" delay={0.1}>
            <p className="text-lg leading-relaxed">{t("p1")}</p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="leading-relaxed">{t("p2")}</p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.3}>
            <p className="leading-relaxed">{t("p3")}</p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.4}>
            <p className="leading-relaxed">{t("p4")}</p>
          </Reveal>
        </div>

        <Stagger
          variant="fade-left"
          staggerDelay={0.12}
          className="space-y-4"
        >
          {highlights.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="card flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">{sub}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
