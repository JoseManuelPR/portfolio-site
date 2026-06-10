import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GridBackground } from "@/components/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: `Jose Manuel Puicon Rodas — ${t("title")}`,
    description: t("pitch"),
    keywords: [
      "Software Engineer",
      "Full Stack Developer",
      "React",
      "Vue.js",
      "Node.js",
      "TypeScript",
      "AWS",
      "Portfolio",
      "Jose Manuel",
      "Puicon Rodas",
      "Peru",
      "Remote Engineer",
    ],
    authors: [{ name: "Jose Manuel Puicon Rodas" }],
    creator: "Jose Manuel Puicon Rodas",
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `Jose Manuel Puicon Rodas — ${t("title")}`,
      description: t("pitch"),
      url: `${SITE_URL}/${locale}`,
      siteName: "Jose Manuel Puicon Rodas",
      locale: locale === "es" ? "es_PE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Jose Manuel Puicon Rodas — ${t("title")}`,
      description: t("pitch"),
      creator: "@josemanuelpr23",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      // Locale-aware: each language version is its own canonical page.
      // Blog routes override this with their own per-page canonicals.
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        "x-default": SITE_URL,
      },
    },
  };
}

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jose Manuel Puicon Rodas",
    url: "https://josepuicon-dev.vercel.app",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Bunny Studio",
      url: "https://bunnystudio.com",
    },
    sameAs: [
      "https://github.com/JoseManuelPR",
      "https://www.linkedin.com/in/josemanuelpr23/",
      "https://torre.ai/josemanuelpr23",
    ],
    knowsLanguage: ["Spanish", "English", "Portuguese"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidad Catolica Santo Toribio de Mogrovejo",
    },
    knowsAbout: [
      "TypeScript",
      "React",
      "Vue.js",
      "Next.js",
      "Node.js",
      "Python",
      "AWS",
      "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Required for static rendering with next-intl v4 — without it, every
  // route under [locale] falls back to dynamic (on-demand) rendering.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <GridBackground />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
