import { useTranslations, useMessages } from "next-intl";

type Capability = { k: string; v: string };

export function V2Capabilities() {
  const t = useTranslations("v2.capabilities");
  const messages = useMessages() as Record<string, any>;
  const items: Capability[] = messages?.v2?.capabilities?.items ?? [];

  return (
    <section className="border-t border-bone/10 bg-ink-soft px-5 py-24 text-bone sm:px-10 sm:py-32">
      <p className="v2-reveal v2-hud v2-hud-tick text-bone-dim">{t("label")}</p>

      <h2 className="v2-reveal v2-display mt-6 max-w-5xl text-[clamp(2rem,6vw,5rem)]">
        {t("statement1")}{" "}
        <em className="v2-serif normal-case text-azul-soft">{t("statementSerif")}</em>{" "}
        {t("statement2")}
      </h2>

      <div className="v2-reveal mt-16 grid gap-px border border-bone/10 bg-bone/10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cap, i) => (
          <div
            key={cap.k}
            className="group bg-ink-soft p-6 transition-colors duration-300 hover:bg-azul hover:text-bone sm:p-8"
          >
            <p className="v2-hud">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="v2-display mt-6 text-xl sm:text-2xl">{cap.k}</h3>
            <p className="mt-2 text-sm text-bone-dim transition-colors duration-300 group-hover:text-bone/90">
              {cap.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
