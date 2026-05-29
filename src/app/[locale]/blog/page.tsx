import { getAllPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";

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
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="section-container pb-12">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent dark:text-neutral-400"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          {t("backHome")}
        </Link>

        <div className="section-label mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("label")}
        </div>

        <h1 className="section-title mb-4">
          {t("title")}
          <span className="text-accent">.</span>
        </h1>
        <p className="section-subtitle">{t("subtitle")}</p>
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-8 lg:px-12">
        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              {t("noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass-card flex flex-col overflow-hidden p-6 sm:p-8"
              >
                {/* Top beam */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <h2 className="mb-3 text-xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-accent dark:text-white">
                  {post.title}
                </h2>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readingTime}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-accent/[0.08] px-2.5 py-1 text-[11px] font-semibold text-accent dark:bg-accent/[0.15] dark:text-accent-light"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {t("readMore")}
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
