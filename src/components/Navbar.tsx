"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";

export function Navbar() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "stack", label: t("stack") },
    { id: "experience", label: t("experience") },
    { id: "contact", label: t("contact") },
  ];

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    // Find the active section
    const sectionIds = ["about", "projects", "stack", "experience", "contact"];
    let current = "";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const toggleLocale = () => {
    const currentPath = window.location.pathname;
    const isSpanish = currentPath.startsWith("/es");
    if (isSpanish) {
      router.replace(pathname, { locale: "en" });
    } else {
      router.replace(pathname, { locale: "es" });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "glass-panel shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <a
          href="#"
          className="text-lg font-bold tracking-tight transition-colors duration-300 hover:text-accent"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          jm<span className="text-accent">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-0.5 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-300
                ${
                  activeSection === s.id
                    ? "text-accent"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                }`}
            >
              {s.label}
              {/* Active indicator dot */}
              {activeSection === s.id && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </a>
          ))}
          <div className="ml-3 flex items-center gap-0.5 border-l border-neutral-200/60 pl-3 dark:border-neutral-800/60">
            <button
              onClick={toggleLocale}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 transition-colors duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              aria-label="Toggle language"
            >
              <Globe size={17} />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 transition-colors duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleLocale}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
          >
            <Globe size={17} />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-panel border-t px-6 py-4">
          <div className="flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-300
                  ${
                    activeSection === s.id
                      ? "bg-accent/8 text-accent"
                      : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
