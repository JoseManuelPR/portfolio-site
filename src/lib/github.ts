const GITHUB_USERNAME = "JoseManuelPR";
const GITHUB_API = "https://api.github.com";

export type GitHubStats = {
  publicRepos: number;
  contributions: number;
};

const FALLBACK: GitHubStats = {
  publicRepos: 19,
  contributions: 1000,
};

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, eventsRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }, // ISR: revalidate every hour
      }),
      // Contributions approximation via events (last 90 days, max 300)
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) return FALLBACK;

    const user = await userRes.json();
    const publicRepos: number = user.public_repos ?? FALLBACK.publicRepos;

    // For contributions, the events API gives a rough signal.
    // The exact number requires the GraphQL API + auth token,
    // so we estimate from the contribution graph via a scraping approach.
    let contributions = FALLBACK.contributions;

    try {
      // Use the contribution calendar SVG (public, no auth needed)
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        { next: { revalidate: 3600 } }
      );
      if (contribRes.ok) {
        const data = await contribRes.json();
        contributions = data.total?.lastYear ?? data.total?.["lastYear"] ?? FALLBACK.contributions;
      }
    } catch {
      // Fallback silently — the contribution API is third-party
    }

    return { publicRepos, contributions };
  } catch {
    return FALLBACK;
  }
}
