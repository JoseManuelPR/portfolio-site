"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Slim bar that slides in once the hero scrolls away: brand → back to top,
// section links, language. Paired with the scroll-progress hairline.
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
        className="v2-floatnav fixed inset-x-0 top-0 z-50 flex items-baseline justify-between border-b border-bone/10 bg-ink/85 px-5 py-3.5 backdrop-blur-md sm:px-10"
        aria-label="Sticky navigation"
      >
        <a href="#top" className="v2-display text-lg text-bone">
          JM<span className="align-super text-[0.5em]">·26</span>
        </a>

        <div className="flex items-baseline gap-5 sm:gap-9">
          <a href="#work" className="v2-hud text-bone-dim hover:text-bone">
            {nav("work")}
          </a>
          <Link href="/blog" className="v2-hud hidden text-bone-dim hover:text-bone sm:inline">
            {nav("notes")}
          </Link>
          <a href="#contact" className="v2-hud text-bone-dim hover:text-bone">
            {nav("contact")}
          </a>
          <span className="v2-hud hidden gap-2 text-bone-dim sm:flex">
            <Link
              href="/"
              locale="es"
              className={locale === "es" ? "text-bone underline" : "hover:text-bone"}
            >
              ES
            </Link>
            <span className="opacity-40">/</span>
            <Link
              href="/"
              locale="en"
              className={locale === "en" ? "text-bone underline" : "hover:text-bone"}
            >
              EN
            </Link>
          </span>
          <a
            href="#top"
            className="v2-hud border border-bone/25 px-3 py-1.5 text-bone transition-colors duration-300 hover:border-azul-soft hover:bg-azul"
            aria-label="Back to top"
          >
            ↑
          </a>
        </div>
      </nav>
    </>
  );
}
