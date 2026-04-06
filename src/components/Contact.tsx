"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./AnimationProvider";

export function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:josemanuelpr23@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <section id="contact" className="relative">
      <div className="section-divider" />

      <div className="section-container">
        <Reveal variant="fade-up">
          <h2 className="section-title mb-3">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.1}>
          <p className="section-subtitle mb-14">{t("subtitle")}</p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-5">
          <Reveal variant="fade-right" delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-primary">
                <Send size={16} />
                {t("send")}
              </button>
            </form>
          </Reveal>

          <Reveal variant="fade-left" delay={0.3} className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-accent/60">
                  Connect
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "josemanuelpr23@gmail.com", href: "mailto:josemanuelpr23@gmail.com", external: false },
                    { icon: Github, label: "github.com/JoseManuelPR", href: "https://github.com/JoseManuelPR", external: true },
                    { icon: Linkedin, label: "linkedin.com/in/josemanuelpr23", href: "https://www.linkedin.com/in/josemanuelpr23/", external: true },
                  ].map(({ icon: Icon, label, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 text-sm text-neutral-500 transition-colors duration-300 hover:text-accent dark:text-neutral-400"
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="truncate">{label}</span>
                      {external && (
                        <ArrowUpRight size={12} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="card">
                <p className="font-mono text-[11px] tracking-wider text-neutral-400">// status</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" style={{ animationDuration: "2s" }} />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to opportunities
                </p>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Remote &middot; Full-time &middot; Contract
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
