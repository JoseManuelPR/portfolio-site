"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, ExternalLink, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center" id="hero">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="section-container w-full">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-sm text-accent">{t("greeting")}</p>
          <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
          <h2 className="mb-6 text-2xl font-semibold text-neutral-500 dark:text-neutral-400 sm:text-3xl">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
          <p className="mb-4 font-mono text-sm font-medium text-accent">
            {t("subtitle")}
          </p>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("pitch")}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/JoseManuelPR"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} />
              {t("github")}
            </a>
            <a
              href="https://www.linkedin.com/in/josemanuelpr23/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Linkedin size={16} />
              {t("linkedin")}
            </a>
            <a
              href="https://torre.ai/josemanuelpr23"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <ExternalLink size={16} />
              {t("torre")}
            </a>
            <a href="#contact" className="btn-primary">
              <Mail size={16} />
              {t("contact")}
            </a>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400 transition-colors hover:text-accent"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
