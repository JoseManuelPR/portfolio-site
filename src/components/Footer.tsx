"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, PenLine } from "lucide-react";
import { Link } from "@/i18n/routing";
import { TorreIcon } from "./icons/TorreIcon";

export function Footer() {
  const t = useTranslations("footer");

  const socials = [
    { icon: Github, href: "https://github.com/JoseManuelPR", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/josemanuelpr23/", label: "LinkedIn" },
    { icon: TorreIcon, href: "https://torre.ai/josemanuelpr23", label: "Torre" },
    { icon: Mail, href: "mailto:josemanuelpr23@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative">
      <div className="section-divider" />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <a href="#" className="text-lg font-bold tracking-tight">
              jm<span className="text-accent">.</span>
            </a>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              &copy; {new Date().getFullYear()} Jose Manuel Puicon Rodas. {t("rights")}
            </p>
          </div>

          {/* Blog + Social icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-accent dark:text-neutral-500 dark:hover:bg-white/[0.04] dark:hover:text-accent"
            >
              <PenLine size={14} />
              Blog
            </Link>
            <div className="mx-1 h-5 w-px bg-neutral-200 dark:bg-white/[0.06]" />
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-accent dark:text-neutral-500 dark:hover:bg-white/[0.04] dark:hover:text-accent"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Built with */}
        <div className="mt-8 flex justify-center">
          <p className="text-[11px] text-neutral-300 dark:text-neutral-700">
            {t("built")}
          </p>
        </div>
      </div>
    </footer>
  );
}
