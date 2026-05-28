"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail } from "lucide-react";

function TorreIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-5 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M6.325 18.225C4.1 18.225 2.525 17.25 2.525 14.35V7.4H0.85V4.8H2.525V1.175H5.55V4.8H9.1V7.4H5.55V13.875C5.55 15.05 6.15 15.525 7.175 15.525C7.85 15.525 8.45 15.375 9.05 15.075V17.55C8.3 17.975 7.475 18.225 6.325 18.225Z" />
    </svg>
  );
}

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

          {/* Social icons */}
          <div className="flex items-center gap-2">
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
