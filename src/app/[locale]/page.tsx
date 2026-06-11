import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2FloatNav } from "@/components/v2/V2FloatNav";
import { V2Work } from "@/components/v2/V2Work";
import { V2Capabilities } from "@/components/v2/V2Capabilities";
import { V2Stack } from "@/components/v2/V2Stack";
import { V2Numbers } from "@/components/v2/V2Numbers";
import { V2Notes } from "@/components/v2/V2Notes";
import { V2Contact } from "@/components/v2/V2Contact";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Grain } from "@/components/v2/V2Grain";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale).slice(0, 3);

  return (
    <main id="main-content" className="bg-ink text-bone" style={{ scrollBehavior: "smooth" }}>
      <span id="top" />
      <V2FloatNav locale={locale} />
      <V2Hero locale={locale} />
      <V2Work />
      <V2Capabilities />
      <V2Stack />
      <V2Numbers />
      <V2Notes posts={posts} locale={locale} />
      <V2Contact />
      <V2Footer />
      <V2Grain />
    </main>
  );
}
