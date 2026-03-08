"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8 lg:px-12">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} José Manuel Puicón Rodas.{" "}
          {t("rights")}
        </p>
        <p className="flex items-center gap-1 text-sm text-neutral-500">
          {t("built")}
          <Heart size={12} className="text-accent" />
        </p>
      </div>
    </footer>
  );
}
