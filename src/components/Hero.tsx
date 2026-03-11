"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, ExternalLink, Mail, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center" id="hero">
      {/* Soft gradient orb */}
      <div className="absolute left-1/2 top-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />

      <div className="section-container w-full">
        <div className="max-w-3xl">
          <p
            className="mb-4 font-mono text-sm text-accent"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            {t("greeting")}
          </p>

          <h1
            className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {t("name")}
          </h1>

          <h2
            className="mb-6 text-2xl font-semibold text-neutral-500 dark:text-neutral-400 sm:text-3xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
          >
            {t("title")}
            <span className="text-accent">.</span>
          </h2>

          <p
            className="mb-4 font-mono text-sm font-medium text-accent"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            {t("subtitle")}
          </p>

          <p
            className="mb-10 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
            }}
          >
            {t("pitch")}
          </p>

          <div
            className="flex flex-wrap gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}
          >
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
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
