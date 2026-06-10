import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: `${SITE_URL}/en`, es: `${SITE_URL}/es` },
      },
    },
    {
      url: `${SITE_URL}/es`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: `${SITE_URL}/en`, es: `${SITE_URL}/es` },
      },
    },
    {
      url: `${SITE_URL}/en/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { en: `${SITE_URL}/en/blog`, es: `${SITE_URL}/es/blog` },
      },
    },
    {
      url: `${SITE_URL}/es/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { en: `${SITE_URL}/en/blog`, es: `${SITE_URL}/es/blog` },
      },
    },
  ];

  for (const locale of ["en", "es"] as const) {
    const otherLocale = locale === "en" ? "es" : "en";
    for (const post of getAllPosts(locale)) {
      const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
      entries.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: post.altSlug
          ? {
              languages: {
                [locale]: url,
                [otherLocale]: `${SITE_URL}/${otherLocale}/blog/${post.altSlug}`,
              },
            }
          : undefined,
      });
    }
  }

  return entries;
}
