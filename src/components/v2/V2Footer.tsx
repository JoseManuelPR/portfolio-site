import { useTranslations } from "next-intl";

export function V2Footer() {
  const t = useTranslations("v2.footer");

  return (
    <footer className="border-t border-bone/15 bg-ink px-5 py-8 text-bone sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="v2-hud text-bone-dim">
          © 2026 José Manuel Puicón Rodas — {t("built")}
        </p>
        <p className="v2-hud text-bone-dim">6°46′S 79°50′W · UTC−5</p>
        <div className="flex items-center gap-6">
          <p className="v2-hud text-bone-dim">{t("stack")}</p>
          <a
            href="#top"
            className="v2-hud v2-tap underline-offset-4 hover:text-azul-soft hover:underline"
          >
            {t("top")} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
