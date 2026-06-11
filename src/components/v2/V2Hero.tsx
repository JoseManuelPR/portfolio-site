import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/routing";
import { V2Log } from "./V2Log";

function CoordinateRing({ text }: { text: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="v2-ring h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <path
          id="v2-ring-path"
          d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          fill="none"
        />
      </defs>
      <text className="font-mono" fontSize="10.4" fill="currentColor">
        {/* textLength = ring circumference (2π·80) so the text closes the
            loop exactly, without overlapping at the seam */}
        <textPath href="#v2-ring-path" textLength="502" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
      <circle cx="100" cy="100" r="2.5" fill="currentColor" />
      <circle
        cx="100"
        cy="100"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />
    </svg>
  );
}

export function V2Hero({ locale }: { locale: string }) {
  const t = useTranslations("v2.hero");
  const nav = useTranslations("v2.nav");
  const messages = useMessages() as Record<string, any>;
  const logLines = messages?.v2?.hero?.log ?? [];

  const ticker = t("ticker");

  return (
    <header className="relative flex min-h-dvh flex-col overflow-hidden bg-azul text-bone">
      {/* Cinematic edge darkening */}
      <div className="v2-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Top bar */}
      <nav className="relative z-10 flex items-baseline justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <a href="#top" className="v2-display text-xl sm:text-2xl">
          JM<span className="align-super text-[0.5em]">·26</span>
        </a>

        <div className="flex items-baseline gap-6 sm:gap-10">
          <a href="#work" className="v2-hud hidden hover:underline sm:inline">
            {nav("work")}
          </a>
          <Link href="/blog" className="v2-hud hidden hover:underline sm:inline">
            {nav("notes")}
          </Link>
          <a href="#contact" className="v2-hud hover:underline">
            {nav("contact")}
          </a>
          <span className="v2-hud flex gap-2" aria-label="Language">
            <Link
              href="/"
              locale="es"
              className={locale === "es" ? "underline" : "opacity-50 hover:opacity-100"}
            >
              ES
            </Link>
            <span className="opacity-40">/</span>
            <Link
              href="/"
              locale="en"
              className={locale === "en" ? "underline" : "opacity-50 hover:opacity-100"}
            >
              EN
            </Link>
          </span>
        </div>
      </nav>

      {/* HUD annotations — instrument-panel column, top right */}
      <div className="absolute right-5 top-20 z-10 hidden space-y-2 text-right sm:right-10 sm:block">
        <p className="v2-hud v2-hud-tick v2-fade" style={{ animationDelay: "1.1s" }}>
          UTC−5 · CHICLAYO, PE
        </p>
        <p className="v2-hud v2-hud-tick v2-fade" style={{ animationDelay: "1.25s" }}>
          +83% CWV
        </p>
        <p className="v2-hud v2-hud-tick v2-fade" style={{ animationDelay: "1.4s" }}>
          ES · EN · PT
        </p>
      </div>

      {/* Field log — typing animation, mounts well after first paint */}
      <div className="absolute bottom-40 right-5 z-10 hidden w-72 sm:right-10 lg:block">
        <V2Log lines={logLines} />
      </div>

      {/* Main composition */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-10 pt-14 sm:px-10">
        <p className="v2-hud v2-hud-tick v2-fade mb-6 sm:mb-10" style={{ animationDelay: "0.9s" }}>
          {t("kicker")}
        </p>

        {/* Name — the LCP. Transform-only entrance: visible from first paint.
            Clip wrappers get top padding (pulled back with negative margin) so
            the uppercase accents of É/Ó aren't sheared off by overflow-hidden. */}
        <h1 className="v2-display relative text-[clamp(3.4rem,14.5vw,12.5rem)]">
          <span className="block overflow-hidden pt-[0.14em] -mb-[0.14em]">
            <span className="v2-rise block">JOSÉ</span>
          </span>
          <span className="block overflow-hidden pt-[0.14em] -mb-[0.14em]">
            <span className="v2-rise block pl-[0.55em]" style={{ animationDelay: "0.07s" }}>
              MANUEL
            </span>
          </span>
          <span className="block overflow-hidden pt-[0.14em] -mb-[0.14em]">
            <span className="v2-rise block" style={{ animationDelay: "0.14s" }}>
              PUICÓN
            </span>
          </span>

          {/* Rotating coordinate ring, overlapping the name */}
          <span
            className="v2-fade pointer-events-none absolute -right-2 top-1/2 hidden h-44 w-44 -translate-y-1/2 lg:block xl:h-56 xl:w-56"
            style={{ animationDelay: "0.8s" }}
            aria-hidden="true"
          >
            <CoordinateRing text={t("ring")} />
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 sm:mt-12">
          <p className="v2-serif v2-fade max-w-md text-2xl leading-snug sm:max-w-xl sm:text-3xl" style={{ animationDelay: "0.5s" }}>
            {t("tagline")}
          </p>

          <p className="v2-hud v2-fade flex items-center gap-2.5" style={{ animationDelay: "0.7s" }}>
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75"
                style={{ animationDuration: "2s" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            REC — {t("status")}
          </p>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="v2-ticker-frame relative z-10 overflow-hidden border-t border-bone/25 py-3">
        <div className="v2-ticker v2-hud gap-0">
          <span className="whitespace-nowrap">{ticker.repeat(3)}</span>
          <span className="whitespace-nowrap" aria-hidden="true">
            {ticker.repeat(3)}
          </span>
        </div>
      </div>
    </header>
  );
}
