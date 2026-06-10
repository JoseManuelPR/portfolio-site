import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
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
    <h2
      className="mb-4 mt-10 text-2xl font-bold text-neutral-900 dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 text-xl font-semibold text-neutral-900 dark:text-white"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-5 leading-relaxed text-neutral-600 dark:text-neutral-300"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 space-y-2 pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 space-y-2 pl-5 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-neutral-600 dark:text-neutral-300 marker:text-accent"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-semibold text-neutral-900 dark:text-white"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Shiki blocks pass token <span>s as children — leave those untouched.
    // Only style plain inline code (`like this`), whose children is a string.
    if (typeof props.children !== "string") {
      return <code {...props} />;
    }
    return (
      <code
        className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-accent dark:bg-white/6 dark:text-accent-light"
        {...props}
      />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-neutral-200/50 bg-neutral-50 p-5 text-sm dark:border-white/6 dark:bg-white/3"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-5 border-l-2 border-accent/40 pl-4 italic text-neutral-500 dark:text-neutral-400"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-dark dark:hover:text-accent-light"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
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

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="section-container max-w-3xl pb-16">
        {/* Back */}
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent dark:text-neutral-400"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          {t("backToBlog")}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-6 text-lg text-neutral-500 dark:text-neutral-400">
            {post.description}
          </p>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400 dark:text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent/8 px-3 py-1.5 text-xs font-semibold text-accent dark:bg-accent/15 dark:text-accent-light"
              >
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-white/10" />
        </header>

        {/* Content */}
        <div className="prose-custom">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark-dimmed",
                        light: "github-light",
                      },
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
        <div className="mt-16 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-white/10" />

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent dark:text-neutral-400"
          >
            <ArrowLeft size={14} />
            {t("backToBlog")}
          </Link>
        </div>
      </article>
    </main>
  );
}
