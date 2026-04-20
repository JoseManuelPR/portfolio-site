import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GridBackground } from "@/components/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

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
    title: `José Manuel Puicón Rodas — ${t("title")}`,
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
      "José Manuel",
      "Puicón Rodas",
      "Peru",
      "Remote Engineer",
    ],
    authors: [{ name: "José Manuel Puicón Rodas" }],
    creator: "José Manuel Puicón Rodas",
    metadataBase: new URL("https://josepuicon-dev.vercel.app"),
    openGraph: {
      title: `José Manuel Puicón Rodas — ${t("title")}`,
      description: t("pitch"),
      url: "https://josepuicon-dev.vercel.app",
      siteName: "José Manuel Puicón Rodas",
      locale: locale === "es" ? "es_PE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `José Manuel Puicón Rodas — ${t("title")}`,
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
      canonical: "https://josepuicon-dev.vercel.app",
      languages: {
        en: "https://josepuicon-dev.vercel.app/en",
        es: "https://josepuicon-dev.vercel.app/es",
      },
    },
  };
}

/* JSON-LD structured data for rich search results */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "José Manuel Puicón Rodas",
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
      name: "Universidad Católica Santo Toribio de Mogrovejo",
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

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {/* Skip link — keyboard-nav accessibility (ui-ux-pro-max rule: skip-links) */}
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
