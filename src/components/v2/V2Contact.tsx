"use client";

import { useTranslations } from "next-intl";
import Script from "next/script";

const TALLY_FORM_ID = "rjvKBL";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/JoseManuelPR" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/josemanuelpr23/" },
  { label: "Torre", href: "https://torre.ai/josemanuelpr23" },
  { label: "CV / Resume", href: "/resume.pdf" },
];

export function V2Contact() {
  const t = useTranslations("v2.contact");
  const nav = useTranslations("v2.nav");

  const openForm = () => {
    const tally = (window as any).Tally;
    if (tally?.openPopup) {
      tally.openPopup(TALLY_FORM_ID, { layout: "modal", width: 540 });
    } else {
      window.open(`https://tally.so/r/${TALLY_FORM_ID}`, "_blank", "noopener");
    }
  };

  return (
    <section id="contact" className="border-t border-bone/10 bg-ink px-5 py-28 text-bone sm:px-10 sm:py-40">
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <p className="v2-reveal v2-hud v2-hud-tick text-bone-dim">{t("label")}</p>

      <p className="v2-reveal v2-serif mt-8 text-2xl text-bone-dim sm:text-3xl">
        {t("kicker")}
      </p>

      <h2 className="v2-reveal v2-display mt-4 text-[clamp(2.4rem,9.5vw,9rem)]">
        <button
          type="button"
          onClick={openForm}
          aria-haspopup="dialog"
          aria-label={t("formCta")}
          className="v2-mail cursor-pointer text-left uppercase text-bone transition-colors duration-300 hover:text-azul-soft"
        >
          {t("title")}
        </button>
      </h2>

      <div className="v2-reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
        <button
          type="button"
          onClick={openForm}
          aria-haspopup="dialog"
          className="v2-hud v2-hud-cta cursor-pointer border border-bone/50 px-6 py-3.5 text-bone transition-colors duration-300 hover:border-azul-soft hover:bg-azul"
        >
          {t("formCta")} <span aria-hidden="true">↗</span>
        </button>
        <span className="v2-hud text-bone-dim">{t("or")}</span>
        <a
          href="mailto:josemanuelpr23@gmail.com"
          className="v2-mail font-mono text-base underline decoration-bone/40 underline-offset-4 tracking-wide sm:text-lg"
        >
          josemanuelpr23@gmail.com
        </a>
      </div>

      <div className="v2-reveal mt-20 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-bone/15 pt-6">
        <span className="v2-hud text-bone-dim">{t("socials")}</span>
        {SOCIALS.map((s) => {
          const external = s.href.startsWith("http");
          return (
            <a
              key={s.label}
              href={s.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="v2-hud v2-tap underline-offset-4 hover:text-azul-soft hover:underline"
            >
              {s.label} <span aria-hidden="true">↗</span>
              {external && <span className="sr-only"> {nav("newTab")}</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}
