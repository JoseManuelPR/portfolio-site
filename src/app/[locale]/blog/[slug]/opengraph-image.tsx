import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  const title = (post?.title ?? "Blog").toUpperCase();
  const tags = post?.tags?.slice(0, 3) ?? [];
  const kicker = locale === "es" ? "BITÁCORA" : "FIELD NOTES";
  const date = post
    ? new Date(post.date)
        .toLocaleDateString(locale, { year: "numeric", month: "short" })
        .toUpperCase()
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0d0e12",
          color: "#ece7dc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand color: solid ultramarine spine on the left */}
        <div style={{ width: 26, height: "100%", backgroundColor: "#2a4abf" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          {/* Top row: brand + kicker */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
              JM·26
            </span>
            <span
              style={{
                fontSize: 17,
                letterSpacing: 4,
                color: "#aaa698",
              }}
            >
              + {kicker} {date ? `· ${date}` : ""}
            </span>
          </div>

          {/* Title — uppercase display, ink-canvas editorial */}
          <div
            style={{
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -1,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>

          {/* Bottom row: sharp tag chips + author/site */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid rgba(236,231,220,0.25)",
              paddingTop: 28,
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    border: "1px solid rgba(159,179,248,0.6)",
                    color: "#9fb3f8",
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 700 }}>
                JOSÉ MANUEL PUICÓN
              </span>
              <span style={{ fontSize: 16, color: "#aaa698", letterSpacing: 1 }}>
                josepuicon-dev.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
