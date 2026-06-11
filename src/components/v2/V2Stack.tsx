/* Stack strip — monochrome logo marquee, bone-dim ink that lights up on
   hover. Mirrors the hero ticker so the system reads as one language. */

const STACK: { name: string; slug: string }[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Vue", slug: "vuedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Scala", slug: "scala" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Vercel", slug: "vercel" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Docker", slug: "docker" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Claude", slug: "claude" },
];

// bone-dim, URL-encoded for the simpleicons CDN
const TINT = "aaa698";

function LogoRun() {
  return (
    <>
      {STACK.map((tech) => (
        <span
          key={tech.slug}
          className="group flex shrink-0 items-center gap-3 px-7 sm:px-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://cdn.simpleicons.org/${tech.slug}/${TINT}`}
            alt=""
            width={22}
            height={22}
            loading="lazy"
            className="h-5 w-5 opacity-75 transition-opacity duration-300 group-hover:opacity-100 sm:h-[22px] sm:w-[22px]"
            aria-hidden="true"
          />
          <span className="v2-hud text-bone-dim transition-colors duration-300 group-hover:text-bone">
            {tech.name}
          </span>
        </span>
      ))}
    </>
  );
}

export function V2Stack() {
  return (
    <section
      aria-label="Stack"
      className="v2-ticker-frame overflow-hidden border-y border-bone/10 bg-ink py-6"
    >
      <div className="v2-ticker v2-ticker-slow items-center">
        <div className="flex items-center">
          <LogoRun />
        </div>
        <div className="flex items-center" aria-hidden="true">
          <LogoRun />
        </div>
      </div>
    </section>
  );
}
