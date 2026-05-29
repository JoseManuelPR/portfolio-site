import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Showcase } from "@/components/Showcase";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Recommendations } from "@/components/Recommendations";
import { Contact } from "@/components/Contact";
import { getGitHubStats } from "@/lib/github";

export default async function Home() {
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
