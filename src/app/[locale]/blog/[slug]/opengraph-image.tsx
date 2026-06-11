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

  const title = post?.title ?? "Blog";
  const description = post?.description ?? "";
  const tags = post?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0d0e12",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(42,74,191,0.45), transparent), radial-gradient(ellipse 60% 40% at 90% 100%, rgba(159,179,248,0.18), transparent)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            jm
            <span style={{ color: "#9fb3f8" }}>.</span>
          </div>
          <div
            style={{
              width: 1,
              height: 26,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          />
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
            {locale === "es" ? "Blog" : "Blog"}
          </div>
        </div>

        {/* Title + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 50 ? 54 : 64,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 950,
              }}
            >
              {description.length > 140
                ? `${description.slice(0, 140)}…`
                : description}
            </div>
          )}
        </div>

        {/* Footer: tags + author */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 10,
                  backgroundColor: "rgba(42,74,191,0.5)",
                  border: "1px solid rgba(159,179,248,0.5)",
                  color: "#cdd8fb",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              José Manuel Puicón
            </div>
            <div style={{ fontSize: 19, color: "rgba(255,255,255,0.45)" }}>
              josepuicon-dev.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
