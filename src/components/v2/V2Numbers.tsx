import { useTranslations, useMessages } from "next-intl";

type NumberItem = { value: number; suffix: string; caption: string };

export function V2Numbers() {
  const t = useTranslations("v2.numbers");
  const messages = useMessages() as Record<string, any>;
  const items: NumberItem[] = messages?.v2?.numbers?.items ?? [];

  return (
    <section className="bg-verm px-5 py-24 text-ink sm:px-10 sm:py-32">
      <p className="v2-reveal v2-hud v2-hud-tick">{t("label")}</p>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 sm:mt-20 lg:grid-cols-4">
        {items.map((n) => (
          <div key={n.caption} className="v2-reveal border-t border-ink/30 pt-5">
            <p className="v2-display text-[clamp(3.2rem,9vw,7.5rem)]">
              {n.value}
              {n.suffix}
            </p>
            <p className="v2-hud mt-3 max-w-[16ch]">{n.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
