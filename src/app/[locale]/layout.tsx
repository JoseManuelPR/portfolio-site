import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Archivo_Black, Instrument_Serif } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

// Inter moved to the blog layout — it's the only surface that uses it, and
// every preloaded font sits in the simulated pre-LCP critical graph.

// v2 display face — wide, loud, editorial. The static Black cut weighs a
// third of the variable wdth file (~35KB vs 88KB), which matters because
// every preloaded font sits in the simulated pre-LCP critical graph.
const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "optional",
});

// Serif italic accent for the "human" words inside the brutalist system.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "optional",
});

// Mono text (terminal mockup, labels, code) uses the system mono stack — see
// --font-mono in globals.css. A mono webfont cost 48KB on every load and sat
// in the pre-LCP critical graph for purely decorative text.

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

  // Only client components need messages in the browser (Navbar, Hero,
  // Experience). Server-rendered sections read translations on the
  // server — shipping their namespaces too would duplicate them into the
  // HTML payload and the hydration data for nothing.
  const clientMessages = {
    nav: messages.nav,
    hero: messages.hero,
    experience: messages.experience,
    // v2 home: only the contact section runs on the client (Tally popup)
    v2: { contact: (messages as Record<string, any>).v2?.contact },
  } as typeof messages;

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-hidden"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider messages={clientMessages}>
            {/* Section chrome lives with each surface: the blog keeps the v1
                Navbar/Footer via its own layout; the v2 home brings its own. */}
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
