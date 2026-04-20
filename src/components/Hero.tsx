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

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section className="relative flex min-h-dvh items-center" id="hero">
      {/* Ambient glow orbs */}
      <div className="absolute left-1/3 top-1/4 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[100px] dark:bg-accent/[0.08]" />
      <div className="absolute right-1/4 bottom-1/3 -z-10 h-[320px] w-[320px] rounded-full bg-purple-500/[0.03] blur-[80px] dark:bg-purple-500/[0.06]" />

      <div className="section-container w-full">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ${ease} 0.05s`,
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-medium text-emerald-700 backdrop-blur-sm dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" style={{ animationDuration: "2s" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </span>
          </div>

          {/* Greeting */}
          <p
            className="mt-8 font-mono text-sm tracking-wide text-accent"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ${ease} 0.15s`,
            }}
          >
            {t("greeting")}
          </p>

          {/* Name — animated gradient */}
          <h1
            className="mt-3 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.8s ${ease} 0.25s`,
            }}
          >
            <span className="animated-gradient">{t("name")}</span>
          </h1>

          {/* Title */}
          <h2
            className="mt-4 text-2xl font-semibold text-neutral-400 dark:text-neutral-500 sm:text-3xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.8s ${ease} 0.4s`,
            }}
          >
            {t("title")}
            <span className="text-accent">.</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mt-3 font-mono text-sm font-medium text-accent/80"
            style={{
              opacity: mounted ? 1 : 0,
              transition: `all 0.6s ${ease} 0.55s`,
            }}
          >
            {t("subtitle")}
          </p>

          {/* Pitch */}
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.8s ${ease} 0.6s`,
            }}
          >
            {t("pitch")}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.8s ${ease} 0.75s`,
            }}
          >
            <a href="#contact" className="btn-primary">
              <Mail size={16} />
              {t("contact")}
            </a>
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
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-300 transition-colors duration-300 hover:text-accent dark:text-neutral-700"
          aria-label="Scroll down"
          style={{
            opacity: mounted ? 1 : 0,
            transition: `opacity 1.2s ease 1.4s`,
          }}
        >
          <ArrowDown size={20} className="animate-bounce" style={{ animationDuration: "2s" }} />
        </a>
      </div>
    </section>
  );
}
