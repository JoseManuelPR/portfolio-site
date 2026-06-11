import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { BlogPost } from "@/lib/blog";

export function V2Notes({
  posts,
  locale,
}: {
  posts: Omit<BlogPost, "content">[];
  locale: string;
}) {
  const t = useTranslations("v2.notes");

  return (
    <section id="notes" className="border-t border-bone/10 bg-ink px-5 py-24 text-bone sm:px-10 sm:py-32">
      <div className="v2-reveal flex items-baseline justify-between">
        <p className="v2-hud v2-hud-tick text-bone-dim">{t("label")}</p>
        <Link href="/blog" className="v2-hud underline-offset-4 hover:underline">
          {t("readAll")} ↗
        </Link>
      </div>

      <div className="v2-reveal mt-12 border-t border-bone/15">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="v2-row group grid grid-cols-1 items-baseline gap-x-8 gap-y-1 border-b border-bone/15 px-1 py-6 transition-colors duration-300 sm:grid-cols-[8rem_1fr_auto] sm:px-3"
          >
            <span className="v2-hud v2-row-dim text-bone-dim">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
              })}
            </span>
            <span className="v2-display text-lg leading-tight sm:text-2xl">
              {post.title}
            </span>
            <span className="v2-hud v2-row-dim text-bone-dim">
              {post.readingTime} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
