"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send, Mail, Github, Linkedin } from "lucide-react";
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
    <section
      id="contact"
      className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="section-container">
        <Reveal variant="fade-up">
          <h2 className="section-title mb-2">
            {t("title")}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.1}>
          <p className="mb-12 text-neutral-500 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal variant="fade-right" delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-700 dark:bg-neutral-900"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-700 dark:bg-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-700 dark:bg-neutral-900"
                />
              </div>

              <button type="submit" className="btn-primary">
                <Send size={16} />
                {t("send")}
              </button>
            </form>
          </Reveal>

          <Reveal variant="fade-left" delay={0.3} className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
                  Connect
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:josemanuelpr23@gmail.com"
                    className="flex items-center gap-3 text-sm text-neutral-600 transition-colors hover:text-accent dark:text-neutral-400"
                  >
                    <Mail size={16} />
                    josemanuelpr23@gmail.com
                  </a>
                  <a
                    href="https://github.com/JoseManuelPR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-neutral-600 transition-colors hover:text-accent dark:text-neutral-400"
                  >
                    <Github size={16} />
                    github.com/JoseManuelPR
                  </a>
                  <a
                    href="https://www.linkedin.com/in/josemanuelpr23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-neutral-600 transition-colors hover:text-accent dark:text-neutral-400"
                  >
                    <Linkedin size={16} />
                    linkedin.com/in/josemanuelpr23
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <p className="font-mono text-xs text-neutral-400">// status</p>
                <p className="mt-2 text-sm">
                  <span className="relative mr-2 inline-block h-2 w-2 rounded-full bg-green-500">
                    <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" style={{ animationDuration: "2s" }} />
                  </span>
                  Open to opportunities
                </p>
                <p className="mt-1 text-xs text-neutral-500">
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
