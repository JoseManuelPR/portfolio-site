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
import { cn } from "@/lib/utils";
import type { GitHubStats } from "@/lib/github";

export function Projects({ githubStats }: { githubStats?: GitHubStats }) {
  const t = useTranslations("projects");

  const stats = [
    { icon: Code2, value: githubStats?.publicRepos ?? 19, suffix: "+", label: t("stats.repos"), gradient: "from-indigo-500 to-purple-500" },
    { icon: Calendar, value: 7, suffix: "+", label: t("stats.years"), gradient: "from-blue-500 to-cyan-500" },
    { icon: Layers, value: 12, suffix: "+", label: t("stats.technologies"), gradient: "from-emerald-500 to-teal-500" },
    { icon: Globe, value: 5, suffix: "+", label: t("stats.deployed"), gradient: "from-amber-500 to-orange-500" },
    { icon: Users, value: 3, suffix: "", label: t("stats.languages"), gradient: "from-rose-500 to-pink-500" },
    { icon: Zap, value: githubStats?.contributions ?? 1000, suffix: "+", label: t("stats.contributions"), gradient: "from-violet-500 to-fuchsia-500" },
  ];

  const highlights = [
    {
      icon: Rocket,
      title: t("highlights.production.title"),
      description: t("highlights.production.description"),
      accent: "from-blue-500/10 via-cyan-500/10 to-transparent",
    },
    {
      icon: GitBranch,
      title: t("highlights.openSource.title"),
      description: t("highlights.openSource.description"),
      accent: "from-violet-500/10 via-purple-500/10 to-transparent",
    },
    {
      icon: Globe,
      title: t("highlights.global.title"),
      description: t("highlights.global.description"),
      accent: "from-emerald-500/10 via-teal-500/10 to-transparent",
    },
  ];

  return (
    <section id="projects" className="section-container">
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
        <p className="section-subtitle mb-14">{t("subtitle")}</p>
      </Reveal>

      {/* Stats — bento-style grid */}
      <Stagger
        variant="scale"
        staggerDelay={0.06}
        className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
      >
        {stats.map(({ icon: Icon, value, suffix, label, gradient }) => (
          <div key={label} className="group glass-card p-6 text-center hover:scale-[1.02]">
            <div
              className={cn(
                "mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg",
                gradient
              )}
            >
              <Icon size={18} />
            </div>
            <div className="text-3xl font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
              <CountUp end={value} duration={2.5} suffix={suffix} />
            </div>
            <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
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
        {highlights.map(({ icon: Icon, title, description, accent }) => (
          <div key={title} className="group glass-card relative overflow-hidden p-8">
            {/* Gradient accent top */}
            <div className={cn("absolute inset-x-0 top-0 h-px bg-linear-to-r", accent)} />
            <div className={cn("absolute inset-x-0 top-0 h-24 bg-linear-to-b opacity-0 transition-opacity duration-500 group-hover:opacity-100", accent)} />

            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:shadow-glow dark:bg-accent/15">
                <Icon size={22} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
