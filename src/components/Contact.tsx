"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send, Mail, ArrowUpRight, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "./AnimationProvider";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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
          {/* Form */}
          <Reveal variant="fade-right" delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="name" className="mb-2.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
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
                  <label htmlFor="email" className="mb-2.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
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
                <label htmlFor="message" className="mb-2.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Send size={16} />
                )}
                {status === "success" ? t("success") : t("send")}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`mt-2 min-h-5 text-sm ${
                  status === "error" ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {status === "error"
                  ? t("error")
                  : status === "success"
                    ? t("success")
                    : ""}
              </p>
            </form>
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
