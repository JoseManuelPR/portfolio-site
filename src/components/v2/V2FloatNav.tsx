"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Slim bar that slides in once the hero scrolls away: brand → back to top,
// section links, language. Paired with the scroll-progress hairline.
// While hidden it is visibility:hidden (see .v2-floatnav) so its links
// never enter the tab order off-screen.
export function V2FloatNav({ locale }: { locale: string }) {
  const nav = useTranslations("v2.nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="v2-progress" aria-hidden="true" />
      <nav
        data-visible={visible}
        className="v2-floatnav fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-bone/20 bg-ink/85 px-5 py-2 backdrop-blur-md sm:px-10"
        aria-label={nav("stickyLabel")}
      >
        <a href="#top" className="v2-display v2-tap text-lg text-bone">
          JM<span className="align-super text-[0.5em]">·26</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <a href="#work" className="v2-hud v2-tap text-bone-dim hover:text-bone">
            {nav("work")}
          </a>
          <Link href="/blog" className="v2-hud v2-tap hidden text-bone-dim hover:text-bone sm:inline-flex">
            {nav("notes")}
          </Link>
          <a href="#contact" className="v2-hud v2-tap text-bone-dim hover:text-bone">
            {nav("contact")}
          </a>
          <span
            role="group"
            aria-label={nav("langLabel")}
            className="v2-hud hidden items-center gap-1 text-bone-dim sm:flex"
          >
            <Link
              href="/"
              locale="es"
              className={`v2-tap ${locale === "es" ? "text-bone underline" : "hover:text-bone"}`}
            >
              ES
            </Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <Link
              href="/"
              locale="en"
              className={`v2-tap ${locale === "en" ? "text-bone underline" : "hover:text-bone"}`}
            >
              EN
            </Link>
          </span>
          <a
            href="#top"
            className="v2-hud inline-flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors duration-300 hover:border-azul-soft hover:bg-azul"
            aria-label={nav("backToTop")}
          >
            ↑
          </a>
        </div>
      </nav>
    </>
  );
}
