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

      <h2 className="v2-reveal v2-display mt-4 text-[clamp(2.8rem,9.5vw,9rem)]">
        <button
          onClick={openForm}
          className="v2-mail cursor-pointer text-left uppercase text-bone transition-colors duration-300 hover:text-verm"
        >
          {t("title")}
        </button>
      </h2>

      <div className="v2-reveal mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-4">
        <button
          onClick={openForm}
          className="v2-hud cursor-pointer border border-bone/30 px-5 py-3 text-bone transition-colors duration-300 hover:border-verm hover:bg-verm hover:text-ink"
        >
          {t("formCta")} ↗
        </button>
        <span className="v2-hud text-bone-dim">{t("or")}</span>
        <a
          href="mailto:josemanuelpr23@gmail.com"
          className="v2-mail font-mono text-sm tracking-wide sm:text-base"
        >
          josemanuelpr23@gmail.com
        </a>
      </div>

      <div className="v2-reveal mt-20 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-bone/15 pt-6">
        <span className="v2-hud text-bone-dim">{t("socials")}</span>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-hud underline-offset-4 hover:text-verm hover:underline"
          >
            {s.label} ↗
          </a>
        ))}
      </div>
    </section>
  );
}
