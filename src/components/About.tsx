"use client";

import { useTranslations } from "next-intl";
import { MapPin, Building2, GraduationCap, Languages } from "lucide-react";
import { Reveal, Stagger } from "./AnimationProvider";
import { cn } from "@/lib/utils";

export function About() {
  const t = useTranslations("about");

  const highlights = [
    { icon: Building2, label: "Bunny Studio", sub: "San Francisco", color: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10" },
    { icon: MapPin, label: "Peru", sub: "Remote-first", color: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10" },
    { icon: GraduationCap, label: "USAT", sub: "Systems Engineering", color: "from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10" },
    { icon: Languages, label: "ES / EN / PT", sub: "Trilingual", color: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10" },
  ];

  return (
    <section id="about" className="section-container">
      <Reveal variant="fade-up">
        <div className="section-label mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("title")}
        </div>
      </Reveal>

      <Reveal variant="fade-up" delay={0.1}>
        <h2 className="section-title mb-6">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-5">
        {/* Text content — takes 3 cols */}
        <div className="space-y-6 lg:col-span-3">
          <Reveal variant="fade-up" delay={0.15}>
            <p className="text-xl leading-[1.85] text-neutral-600 dark:text-neutral-300 font-light">
              {t("p1")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.25}>
            <p className="text-base leading-[1.85] text-neutral-500 dark:text-neutral-400">
              {t("p2")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.35}>
            <p className="text-base leading-[1.85] text-neutral-500 dark:text-neutral-400">
              {t("p3")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.45}>
            <p className="text-base leading-[1.85] text-neutral-500 dark:text-neutral-400">
              {t("p4")}
            </p>
          </Reveal>
        </div>

        {/* Highlight cards — 2 cols */}
        <Stagger
          variant="fade-left"
          staggerDelay={0.12}
          className="space-y-4 lg:col-span-2"
        >
          {highlights.map(({ icon: Icon, label, sub, color }) => (
            <div
              key={label}
              className="group glass-card flex items-center gap-5 p-5"
            >
              <div className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-500",
                color,
                "group-hover:scale-110 group-hover:shadow-lg"
              )}>
                <Icon size={20} className="text-neutral-700 dark:text-neutral-300" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-900 dark:text-white">{label}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{sub}</p>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-accent/40 transition-colors duration-300 group-hover:bg-accent" />
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
