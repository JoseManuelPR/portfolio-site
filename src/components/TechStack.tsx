"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./AnimationProvider";

/*
  Two rows of logos scrolling in opposite directions.
  Using cdn.simpleicons.org for official SVG logos.
  Dark mode inverts logos that are too dark.
*/

interface TechLogo {
  name: string;
  slug: string;
  color: string;
}

const row1: TechLogo[] = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
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
  { name: "Vercel", slug: "vercel", color: "000000" },
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
  // Duplicate for seamless loop
  const items = [...logos, ...logos];
  const animClass =
    direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="logo-carousel relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white/90 dark:from-neutral-950/90" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white/90 dark:from-neutral-950/90" />

      <div className={`flex w-max gap-12 ${animClass}`}>
        {items.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-200 dark:bg-neutral-800/80 dark:group-hover:bg-neutral-700/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
                alt={logo.name}
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-[10px] font-medium text-neutral-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
    <section
      id="stack"
      className="border-y border-neutral-200/60 bg-white/50 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-950/50"
    >
      <div className="section-container">
        <Reveal variant="fade-up">
          <h2 className="section-title mb-2">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.1}>
          <p className="mb-12 text-neutral-500 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.2}>
          <div className="space-y-2">
            <LogoRow logos={row1} direction="left" />
            <LogoRow logos={row2} direction="right" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
