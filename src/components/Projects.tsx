"use client";

import { useTranslations } from "next-intl";
import {
  Code2,
  GitBranch,
  Globe,
  Layers,
  Rocket,
  Calendar,
  Users,
  Zap,
} from "lucide-react";
import { Reveal, Stagger, CountUp } from "./AnimationProvider";

export function Projects() {
  const t = useTranslations("projects");

  const stats = [
    { icon: Code2, value: 19, suffix: "+", label: t("stats.repos"), color: "from-indigo-500 to-purple-500" },
    { icon: Calendar, value: 7, suffix: "+", label: t("stats.years"), color: "from-blue-500 to-cyan-500" },
    { icon: Layers, value: 12, suffix: "+", label: t("stats.technologies"), color: "from-emerald-500 to-teal-500" },
    { icon: Globe, value: 5, suffix: "+", label: t("stats.deployed"), color: "from-amber-500 to-orange-500" },
    { icon: Users, value: 3, suffix: "", label: t("stats.languages"), color: "from-rose-500 to-pink-500" },
    { icon: Zap, value: 1000, suffix: "+", label: t("stats.contributions"), color: "from-violet-500 to-fuchsia-500" },
  ];

  const highlights = [
    { icon: Rocket, title: t("highlights.production.title"), description: t("highlights.production.description") },
    { icon: GitBranch, title: t("highlights.openSource.title"), description: t("highlights.openSource.description") },
    { icon: Globe, title: t("highlights.global.title"), description: t("highlights.global.description") },
  ];

  return (
    <section id="projects" className="section-container">
      <Reveal variant="fade-up">
        <h2 className="section-title mb-3">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
      </Reveal>
      <Reveal variant="fade-up" delay={0.1}>
        <p className="section-subtitle mb-16">{t("subtitle")}</p>
      </Reveal>

      {/* Stats grid */}
      <Stagger
        variant="scale"
        staggerDelay={0.06}
        className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {stats.map(({ icon: Icon, value, suffix, label, color }) => (
          <div key={label} className="group card text-center">
            <div
              className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
              <CountUp end={value} duration={2} suffix={suffix} />
            </div>
            <p className="mt-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {label}
            </p>
          </div>
        ))}
      </Stagger>

      {/* Highlight cards */}
      <Stagger
        variant="fade-up"
        staggerDelay={0.12}
        className="grid gap-6 sm:grid-cols-3"
      >
        {highlights.map(({ icon: Icon, title, description }) => (
          <div key={title} className="group card">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/8 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white dark:bg-accent/15">
              <Icon size={20} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
