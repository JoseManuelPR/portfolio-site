"use client";

import { useTranslations } from "next-intl";

const techData = {
  frontend: [
    { name: "TypeScript", level: 95 },
    { name: "JavaScript", level: 95 },
    { name: "React.js", level: 90 },
    { name: "Vue.js", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "TailwindCSS", level: 90 },
    { name: "Angular", level: 75 },
    { name: "HTML/CSS", level: 95 },
  ],
  backend: [
    { name: "Node.js", level: 90 },
    { name: "Python", level: 85 },
    { name: "Scala", level: 70 },
    { name: "REST APIs", level: 95 },
    { name: "GraphQL", level: 75 },
    { name: "Express", level: 90 },
  ],
  databases: [
    { name: "PostgreSQL", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "Firebase", level: 85 },
    { name: "Redis", level: 70 },
    { name: "MongoDB", level: 75 },
  ],
  devops: [
    { name: "AWS", level: 85 },
    { name: "Docker", level: 80 },
    { name: "CI/CD", level: 85 },
    { name: "Vercel", level: 90 },
    { name: "Git", level: 95 },
    { name: "Linux", level: 80 },
  ],
  ai: [
    { name: "LLM Integration", level: 75 },
    { name: "OpenAI API", level: 70 },
    { name: "Prompt Engineering", level: 75 },
    { name: "AI Tooling", level: 70 },
  ],
};

export function TechStack() {
  const t = useTranslations("stack");

  const categories = Object.entries(techData).map(([key, items]) => ({
    key,
    label: t(`categories.${key}`),
    items,
  }));

  return (
    <section
      id="stack"
      className="border-y border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="section-container">
        <h2 className="section-title mb-2">
          {t("title")}
          <span className="text-accent">.</span>
        </h2>
        <p className="mb-12 text-neutral-500 dark:text-neutral-400">
          {t("subtitle")}
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ key, label, items }) => (
            <div key={key}>
              <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
                {label}
              </h3>
              <div className="space-y-3">
                {items.map(({ name, level }) => (
                  <div key={name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="font-mono text-xs text-neutral-400">
                        {level}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-1000"
                        style={{ width: `${level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
