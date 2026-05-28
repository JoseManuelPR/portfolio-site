"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./AnimationProvider";
import { cn } from "@/lib/utils";

interface TechLogo {
  name: string;
  slug: string;
  color: string;
  invertOnDark?: boolean;
}

const row1: TechLogo[] = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Next.js", slug: "nextdotjs", color: "000000", invertOnDark: true },
  { name: "Angular", slug: "angular", color: "DD0031" },
  { name: "TailwindCSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6" },
  { name: "Sass", slug: "sass", color: "CC6699" },
];

const row2: TechLogo[] = [
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Scala", slug: "scala", color: "DC322F" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Firebase", slug: "firebase", color: "DD2C00" },
  { name: "Redis", slug: "redis", color: "FF4438" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "AWS", slug: "amazonwebservices", color: "232F3E" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Vercel", slug: "vercel", color: "000000", invertOnDark: true },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Linux", slug: "linux", color: "FCC624" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
];

function LogoRow({
  logos,
  direction,
}: {
  logos: TechLogo[];
  direction: "left" | "right";
}) {
  const items = [...logos, ...logos];

  return (
    <div
      className="marquee-container relative overflow-hidden py-4"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >

      <div className={cn(
        "flex w-max gap-5 sm:gap-6",
        direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
      )}>
        {items.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="group flex flex-col items-center gap-2.5"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-200/50 bg-white p-2.5 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent/20 group-hover:shadow-glow dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:border-accent/30 sm:h-16 sm:w-16 sm:rounded-2xl sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
                alt={logo.name}
                width={32}
                height={32}
                loading="lazy"
                className={cn(
                  "h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110",
                  logo.invertOnDark && "dark:invert"
                )}
              />
            </div>
            <span className="text-[10px] font-medium text-neutral-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="relative">
      <div className="section-divider" />

      <div className="section-container">
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

        <Reveal variant="fade" delay={0.2}>
          <div className="space-y-6">
            <LogoRow logos={row1} direction="left" />
            <LogoRow logos={row2} direction="right" />
          </div>
        </Reveal>
      </div>

      <div className="section-divider" />
    </section>
  );
}
