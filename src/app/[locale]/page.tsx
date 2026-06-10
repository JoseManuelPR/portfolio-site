import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Showcase } from "@/components/Showcase";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Recommendations } from "@/components/Recommendations";
import { Contact } from "@/components/Contact";
import { getGitHubStats } from "@/lib/github";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const githubStats = await getGitHubStats();

  return (
    <>
      <Hero />
      <About />
      <Projects githubStats={githubStats} />
      <Showcase />
      <TechStack />
      <Experience />
      <Recommendations />
      <Contact />
    </>
  );
}
