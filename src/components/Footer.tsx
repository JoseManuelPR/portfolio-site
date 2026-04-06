"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8 lg:px-12">
        <p className="text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} José Manuel Puicón Rodas.{" "}
          {t("rights")}
        </p>
        <p className="text-sm text-neutral-400">
          {t("built")}
        </p>
      </div>
    </footer>
  );
}
