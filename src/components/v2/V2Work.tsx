import { useTranslations, useMessages } from "next-intl";

type WorkItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  place: string;
  desc: string;
  tags: string[];
};

const LINKS: Record<string, string> = {
  "Bunny Studio": "https://bunnystudio.com",
  Aurant: "https://aurant.lat",
  "Torre.ai": "https://torre.ai",
};

export function V2Work() {
  const t = useTranslations("v2.work");
  const nav = useTranslations("v2.nav");
  const messages = useMessages() as Record<string, any>;
  const items: WorkItem[] = messages?.v2?.work?.items ?? [];

  return (
    <section id="work" className="bg-ink px-5 py-24 text-bone sm:px-10 sm:py-32">
      <p className="v2-reveal v2-hud v2-hud-tick text-bone-dim">{t("label")}</p>
      <h2 className="v2-reveal v2-display mt-6 text-[clamp(2.6rem,8vw,7rem)]">
        {t("title1")}{" "}
        <em className="v2-serif normal-case text-azul-soft">{t("titleSerif")}</em>
      </h2>

      <div className="mt-16 border-t border-bone/15 sm:mt-24">
        {items.map((item) => {
          const href = LINKS[item.company];
          return (
            <article
              key={item.id}
              className={`v2-reveal border-b border-bone/15 px-1 py-7 sm:px-3 sm:py-9 ${
                href ? "v2-row transition-colors duration-300" : ""
              }`}
            >
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8">
                <span className="v2-hud v2-row-dim text-bone-dim">{item.id}</span>

                <h3 className="v2-display relative text-3xl sm:text-5xl lg:text-6xl">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {item.company}
                      <span aria-hidden="true" className="ml-3 align-super text-[0.35em] tracking-widest">
                        ↗
                      </span>
                      <span className="sr-only"> {nav("newTab")}</span>
                    </a>
                  ) : (
                    item.company
                  )}
                </h3>

                <p className="v2-hud v2-row-dim col-start-2 text-bone-dim sm:col-start-3 sm:text-right">
                  {item.period}
                  <span className="mx-2 opacity-70" aria-hidden="true">·</span>
                  {item.place}
                </p>

                <div className="col-start-2 sm:col-span-2">
                  <p className="v2-hud mb-2">{item.role}</p>
                  <p className="v2-row-dim max-w-[65ch] text-sm leading-relaxed text-bone-dim sm:text-base">
                    {item.desc}
                  </p>
                  <p className="v2-hud v2-row-dim mt-3 text-bone-dim">
                    {item.tags.join("  /  ")}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
