"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect, useCallback, useRef } from "react";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const sections = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "stack", label: t("stack") },
    { id: "experience", label: t("experience") },
    { id: "contact", label: t("contact") },
  ];

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);
    setHidden(y > 100 && y > lastY.current);
    lastY.current = y;

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
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass-panel shadow-soft" : "bg-transparent",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8 lg:px-12">
        {/* Logo */}
        <a
          href="#"
          className="group relative text-xl font-bold tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="transition-colors duration-300 group-hover:text-accent">jm</span>
          <span className="text-accent">.</span>
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-300",
                activeSection === s.id
                  ? "text-accent"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              )}
            >
              {s.label}
              {activeSection === s.id && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </a>
          ))}

          <div className="ml-4 flex items-center gap-1 border-l border-neutral-200/40 pl-4 dark:border-white/[0.06]">
            <button
              onClick={toggleLocale}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/[0.06] dark:hover:text-neutral-100"
              aria-label="Toggle language"
            >
              <Globe size={16} />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/[0.06] dark:hover:text-neutral-100"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleLocale}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
          >
            <Globe size={16} />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out md:hidden",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-panel border-t px-6 py-4">
          <div className="flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                  activeSection === s.id
                    ? "bg-accent/8 text-accent"
                    : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/[0.04]"
                )}
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
