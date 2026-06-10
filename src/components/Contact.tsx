import { useTranslations } from "next-intl";
import { Mail, ArrowUpRight, Sparkles } from "lucide-react";
import Script from "next/script";
import { Reveal } from "./AnimationProvider";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";

// Published Tally form (Name / Email / Message, all required, email
// notifications on). Submissions land in the Tally inbox + email.
const TALLY_FORM_ID = "rjvKBL";

export function Contact() {
  const t = useTranslations("contact");

  const links = [
    { icon: Mail, label: "josemanuelpr23@gmail.com", href: "mailto:josemanuelpr23@gmail.com", external: false },
    { icon: GithubIcon, label: "github.com/JoseManuelPR", href: "https://github.com/JoseManuelPR", external: true },
    { icon: LinkedinIcon, label: "linkedin.com/in/josemanuelpr23", href: "https://www.linkedin.com/in/josemanuelpr23/", external: true },
  ];

  return (
    <section id="contact" className="relative">
      <div className="section-divider" />

      <div className="section-container">
        <Reveal variant="fade-up">
          <div className="section-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("title")}
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <h2 className="section-title mb-4">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.15}>
          <p className="section-subtitle mb-12">{t("subtitle")}</p>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Tally form — white "paper" card on purpose: the embedded form is
              light-themed, so we frame it instead of fighting the dark theme */}
          <Reveal variant="fade-right" delay={0.2} className="lg:col-span-3">
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-soft sm:p-6 dark:border-white/10">
              <iframe
                data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
                loading="lazy"
                width="100%"
                height={420}
                title={t("title")}
                className="border-0"
              />
            </div>
            <Script
              src="https://tally.so/widgets/embed.js"
              strategy="afterInteractive"
            />
          </Reveal>

          {/* Sidebar info */}
          <Reveal variant="fade-left" delay={0.3} className="lg:col-span-2">
            <div className="space-y-8">
              {/* Links */}
              <div>
                <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-accent/60">
                  {t("connect")}
                </h3>
                <div className="space-y-4">
                  {links.map(({ icon: Icon, label, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group/link flex items-center gap-3.5 text-sm text-neutral-500 transition-all duration-300 hover:text-accent dark:text-neutral-400"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100/80 transition-all duration-300 group-hover/link:bg-accent/10 dark:bg-white/4 dark:group-hover/link:bg-accent/10">
                        <Icon size={16} />
                      </div>
                      <span className="truncate">{label}</span>
                      {external && (
                        <ArrowUpRight size={12} className="shrink-0 opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Status card */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} className="text-accent" />
                  <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">Status</p>
                </div>
                <p className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" style={{ animationDuration: "2s" }} />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  {t("status")}
                </p>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {t("availability")}
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-100/80 dark:border-white/4">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    {t("location")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
