import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const locales = ["en", "es"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) return { title: "Not Found" };

  const otherLocale = locale === "es" ? "en" : "es";
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const languages: Record<string, string> = { [locale]: url };
  if (post.altSlug) {
    languages[otherLocale] = `${SITE_URL}/${otherLocale}/blog/${post.altSlug}`;
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: ["Jose Manuel Puicon Rodas"],
      tags: post.tags,
      locale: locale === "es" ? "es_PE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="v2-display mb-4 mt-12 text-xl text-bone sm:text-2xl" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="v2-hud v2-hud-cta mb-3 mt-9 text-bone" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-relaxed text-bone/80" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 list-disc space-y-2 pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-bone/80 marker:text-azul-soft" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-bone" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Shiki blocks pass token <span>s as children — leave those untouched.
    // Only style plain inline code (`like this`), whose children is a string.
    if (typeof props.children !== "string") {
      return <code {...props} />;
    }
    return (
      <code
        className="rounded-md bg-bone/8 px-1.5 py-0.5 font-mono text-sm text-azul-soft"
        {...props}
      />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    // tabIndex: keyboard users must be able to scroll long code lines
    <pre
      tabIndex={0}
      className="mb-6 overflow-x-auto border border-bone/10 bg-ink-soft p-5 text-sm"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="v2-serif mb-5 border-l-2 border-azul-soft/50 pl-4 text-lg text-bone-dim"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = props.href?.startsWith("http");
    return (
      <a
        className="font-medium text-azul-soft underline decoration-azul-soft/60 underline-offset-2 transition-colors hover:text-bone"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: locale,
    keywords: post.tags.join(", "),
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "Jose Manuel Puicon Rodas",
      url: SITE_URL,
    },
  };

  const otherLocale = locale === "es" ? "en" : "es";

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        {/* Back + translation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="v2-hud v2-tap text-bone-dim transition-colors hover:text-bone"
          >
            ← {t("backToBlog")}
          </Link>
          {post.altSlug && (
            <Link
              href={`/blog/${post.altSlug}`}
              locale={otherLocale}
              className="v2-hud v2-tap text-bone-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              {otherLocale === "en" ? "Read in English" : "Leer en español"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>

        {/* Header */}
        <header className="mb-12 mt-10">
          <p className="v2-hud v2-hud-tick mb-5 text-bone-dim">
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="mx-2 opacity-70" aria-hidden="true">·</span>
            {post.minutes} min
          </p>

          <h1 className="v2-display text-3xl leading-[1.06] text-bone sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="v2-serif mt-6 text-xl text-bone-dim sm:text-2xl">
            {post.description}
          </p>

          <p className="v2-hud mt-6 text-bone-dim">{post.tags.join("  /  ")}</p>

          <div className="mt-9 h-px w-full bg-bone/15" />
        </header>

        {/* Content — capped at ~70ch so long-form lines stay scannable */}
        <div className="prose-custom max-w-[68ch]">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      // Single theme: the site is ink-only, and the dual-theme
                      // output doubled the inline styles per token for nothing.
                      theme: "github-dark-dimmed",
                      keepBackground: false,
                      // Block-only: a plain string here would also process
                      // inline `code`, stripping its pill styling.
                      defaultLang: { block: "plaintext" },
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Footer divider */}
        <div className="mt-16 h-px w-full bg-bone/15" />

        <div className="mt-8">
          <Link
            href="/blog"
            className="v2-hud v2-tap text-bone-dim transition-colors hover:text-bone"
          >
            ← {t("backToBlog")}
          </Link>
        </div>
      </article>
    </div>
  );
}
