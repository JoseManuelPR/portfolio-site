"use client";

import { useTranslations } from "next-intl";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
  const t = useTranslations("projects");

  const items = [
    t.raw("items.0"),
    t.raw("items.1"),
    t.raw("items.2"),
    t.raw("items.3"),
    t.raw("items.4"),
    t.raw("items.5"),
  ] as Array<{
    name: string;
    description: string;
    tech: string[];
    github: string;
    demo: string;
  }>;

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title mb-2">
        {t("title")}
        <span className="text-accent">.</span>
      </h2>
      <p className="mb-12 text-neutral-500 dark:text-neutral-400">
        {t("subtitle")}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <div key={project.name} className="card group flex flex-col">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-accent"
                    aria-label={`${t("viewCode")} - ${project.name}`}
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-accent"
                    aria-label={`${t("liveDemo")} - ${project.name}`}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
