import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    ],
    authors: [{ name: "José Manuel Puicón Rodas" }],
    creator: "José Manuel Puicón Rodas",
    openGraph: {
      title: `José Manuel Puicón Rodas — ${t("title")}`,
      description: t("pitch"),
      url: "https://josemanuelpr.vercel.app",
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
      canonical: "https://josemanuelpr.vercel.app",
      languages: {
        en: "https://josemanuelpr.vercel.app/en",
        es: "https://josemanuelpr.vercel.app/es",
      },
    },
  };
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
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
