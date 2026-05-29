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
  const scrollDir = useRef<"up" | "down">("up");
  const dirChangeY = useRef(0);

  const sections = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "work", label: t("work") },
    { id: "experience", label: t("experience") },
    { id: "contact", label: t("contact") },
  ];

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);

    const dir = y > lastY.current ? "down" : "up";
    if (dir !== scrollDir.current) {
      scrollDir.current = dir;
      dirChangeY.current = y;
    }
    if (dir === "down" && y > 100 && y - dirChangeY.current > 80) {
      setHidden(true);
    } else if (dir === "up") {
      setHidden(false);
    }
    lastY.current = y;

    const sectionIds = ["about", "projects", "work", "experience", "contact"];
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
        "fixed top-0 z-50 w-full transition-transform duration-500",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className={cn(
        "mx-auto mt-0 max-w-4xl transition-[margin,padding] duration-500",
        scrolled
          ? "mt-3 px-4 sm:px-6"
          : "px-0"
      )}>
        <nav className={cn(
          "flex items-center justify-between px-5 py-3 transition-[background-color,backdrop-filter,box-shadow,border-radius] duration-500",
          scrolled
            ? "floating-nav rounded-2xl shadow-lg shadow-black/[0.03] dark:shadow-none"
            : "bg-transparent"
        )}>
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
          </a>

          {/* Desktop nav — pill */}
          <div className="hidden items-center md:flex">
            <div className={cn(
              "flex items-center gap-0.5 rounded-xl px-1.5 py-1 transition-[background-color,backdrop-filter,box-shadow] duration-500",
              scrolled
                ? "bg-transparent"
                : "border border-neutral-200/40 bg-white/50 backdrop-blur-xl dark:border-transparent dark:bg-white/[0.03]"
            )}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-[color,background-color] duration-300",
                    activeSection === s.id
                      ? "bg-accent/10 text-accent dark:bg-accent/15"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  )}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="ml-3 flex items-center gap-0.5">
              <button
                onClick={toggleLocale}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/[0.06] dark:hover:text-neutral-100"
                aria-label="Toggle language"
              >
                <Globe size={15} />
              </button>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/[0.06] dark:hover:text-neutral-100"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-0.5 md:hidden">
            <button
              onClick={toggleLocale}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
            >
              <Globe size={15} />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400"
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
          <div className={cn(
            "mt-2 rounded-2xl border px-4 py-3",
            "border-neutral-200/40 bg-white/70 backdrop-blur-2xl",
            "dark:border-white/[0.06] dark:bg-[#0a0a0f]/80"
          )}>
            <div className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    activeSection === s.id
                      ? "bg-accent/10 text-accent"
                      : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/[0.04]"
                  )}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
