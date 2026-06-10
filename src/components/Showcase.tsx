"use client";

import { useTranslations, useMessages } from "next-intl";
import { Reveal } from "./AnimationProvider";
import { ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/GithubIcon";

type ShowcaseItem = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  type: "featured" | "project";
  gradient: string;
  icon: string;
};

const gradients: Record<string, string> = {
  purple: "from-violet-600/20 via-purple-600/10 to-transparent",
  blue: "from-blue-600/20 via-cyan-600/10 to-transparent",
  green: "from-emerald-600/20 via-teal-600/10 to-transparent",
  amber: "from-amber-600/20 via-orange-600/10 to-transparent",
  rose: "from-rose-600/20 via-pink-600/10 to-transparent",
};

function ProjectCard({ item, index, featured }: { item: ShowcaseItem; index: number; featured?: boolean }) {
  return (
    <Reveal variant="fade-up" delay={index * 0.08}>
      <div
        className={cn(
          "group glass-card relative flex flex-col overflow-hidden",
          featured ? "p-8 sm:p-10" : "p-6 sm:p-8",
          item.href && "cursor-pointer"
        )}
      >
        {/* Gradient accent */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-48 bg-gradient-to-b opacity-60 transition-opacity duration-700 group-hover:opacity-100",
            gradients[item.gradient] ?? gradients.purple
          )}
        />

        {/* Top beam */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Stretched link — whole card is clickable, no nested anchors */}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}
            className="absolute inset-0 z-10 rounded-2xl"
          />
        )}

        <div className="relative flex flex-1 flex-col">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <div className="flex items-center gap-2">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={`${item.title} — GitHub`}
                >
                  <GithubIcon size={15} />
                </a>
              )}
              {item.href ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 group-hover:text-accent" aria-hidden="true">
                  <ExternalLink size={15} />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500" title="Private" aria-hidden="true">
                  <Lock size={13} />
                </div>
              )}
            </div>
          </div>

          {/* Title + description */}
          <h3
            className={cn(
              "font-bold text-neutral-900 transition-colors duration-300 group-hover:text-accent dark:text-white",
              featured ? "mb-3 text-xl sm:text-2xl" : "mb-2 text-lg"
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "flex-1 leading-relaxed text-neutral-500 dark:text-neutral-400",
              featured ? "text-[0.95rem]" : "text-sm"
            )}
          >
            {item.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-accent/8 px-2.5 py-1 text-[11px] font-semibold text-accent dark:bg-accent/15 dark:text-accent-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Showcase() {
  const t = useTranslations("showcase");
  const messages = useMessages() as Record<string, unknown>;
  const section = messages?.showcase as { items?: ShowcaseItem[] } | undefined;
  const items = section?.items ?? [];

  if (!items.length) return null;

  const featured = items.filter((i) => i.type === "featured");
  const projects = items.filter((i) => i.type === "project");

  return (
    <section id="work" className="relative">
      <div className="section-divider" />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
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

        {/* Featured row */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {featured.map((item, i) => (
            <ProjectCard key={item.title} item={item} index={i} featured />
          ))}
        </div>

        {/* Projects grid */}
        <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-3">
          {projects.map((item, i) => (
            <ProjectCard key={item.title} item={item} index={featured.length + i} />
          ))}
        </div>
      </div>
    </section>
  );
}
