import { Inter } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { V2Footer } from "@/components/v2/V2Footer";

// Inter lives here, not in the root layout: the blog is the only surface
// using it for long-form body text, and a root-level preload would drag
// its woff2 into the home's pre-LCP critical graph for nothing.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

// Blog chrome, aligned to the v2 "Field Notes" system: ink canvas, mono
// HUD labels, Archivo display, the same footer as the home.
export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "v2.nav" });

  return (
    <div className={`${inter.variable} min-h-dvh bg-ink text-bone`}>
      <nav className="flex items-baseline justify-between border-b border-bone/10 px-5 py-4 sm:px-10">
        <Link href="/" className="v2-display text-lg">
          JM<span className="align-super text-[0.5em]">·26</span>
        </Link>
        <div className="flex items-baseline gap-6 sm:gap-9">
          <Link href="/#work" className="v2-hud text-bone-dim hover:text-bone">
            {nav("work")}
          </Link>
          <Link href="/blog" className="v2-hud text-bone underline underline-offset-4">
            {nav("notes")}
          </Link>
          <Link href="/#contact" className="v2-hud text-bone-dim hover:text-bone">
            {nav("contact")}
          </Link>
          <span className="v2-hud flex gap-2 text-bone-dim">
            <Link
              href="/blog"
              locale="es"
              className={locale === "es" ? "text-bone underline" : "hover:text-bone"}
            >
              ES
            </Link>
            <span className="opacity-40">/</span>
            <Link
              href="/blog"
              locale="en"
              className={locale === "en" ? "text-bone underline" : "hover:text-bone"}
            >
              EN
            </Link>
          </span>
        </div>
      </nav>
      <main id="main-content">{children}</main>
      <V2Footer />
    </div>
  );
}
