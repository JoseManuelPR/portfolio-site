import { getAllPosts } from "@/lib/blog";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        es: `${SITE_URL}/es/blog`,
        "x-default": `${SITE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `${SITE_URL}/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const tNotes = await getTranslations({ locale, namespace: "v2.notes" });
  const posts = getAllPosts(locale);

  return (
    <div className="px-5 py-20 sm:px-10 sm:py-28">
      {/* Header */}
      <p className="v2-reveal v2-hud v2-hud-tick text-bone-dim">
        {tNotes("label")} — {String(posts.length).padStart(2, "0")}
      </p>
      <h1 className="v2-reveal v2-display mt-6 text-[clamp(3rem,11vw,9.5rem)]">
        {t("title")}
        <span className="text-azul-soft">.</span>
      </h1>
      <p className="v2-reveal v2-serif mt-6 max-w-2xl text-2xl text-bone-dim sm:text-3xl">
        {t("subtitle")}
      </p>

      {/* Records */}
      <div className="mt-16 border-t border-bone/15 sm:mt-24">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="v2-reveal v2-row group block border-b border-bone/15 px-1 py-7 transition-colors duration-300 sm:px-3 sm:py-8"
          >
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 sm:grid-cols-[3.5rem_8rem_1fr_auto] sm:gap-x-8">
              <span className="v2-hud v2-row-dim text-bone-dim">
                {String(posts.length - i).padStart(2, "0")}
              </span>
              <span className="v2-hud v2-row-dim hidden text-bone-dim sm:block">
                {new Date(post.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                })}
              </span>
              <span className="v2-display text-xl leading-tight sm:text-3xl">
                {post.title}
              </span>
              <span className="v2-hud v2-row-dim text-bone-dim sm:text-right">
                {post.readingTime} →
              </span>
              <p className="v2-row-dim col-start-2 max-w-3xl text-sm leading-relaxed text-bone-dim sm:col-start-3">
                {post.description}
              </p>
              <p className="v2-hud v2-row-dim col-start-2 text-bone-dim sm:col-start-3">
                {post.tags.join("  /  ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
