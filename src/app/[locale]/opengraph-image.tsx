import { ImageResponse } from "next/og";

export const alt = "Jose Manuel Puicon Rodas — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  en: {
    title: "Software Engineer",
    pitch: "Building scalable products with impact",
    stack: "TypeScript · React · Vue · Node.js · AWS",
  },
  es: {
    title: "Ingeniero de Software",
    pitch: "Construyendo productos escalables con impacto",
    stack: "TypeScript · React · Vue · Node.js · AWS",
  },
} as const;

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = copy[locale as keyof typeof copy] ?? copy.en;

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
          background: "#0a0a0f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Top: Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -1,
            }}
          >
            jm
            <span style={{ color: "#6366f1" }}>.</span>
          </span>
        </div>

        {/* Middle: Name + Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            José Manuel
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t.title}
            <span style={{ color: "#6366f1" }}>.</span>
          </span>
        </div>

        {/* Bottom: Pitch + Stack */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontSize: 22,
                color: "#a1a1aa",
                fontWeight: 400,
              }}
            >
              {t.pitch}
            </span>
            <span
              style={{
                fontSize: 16,
                color: "#6366f1",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {t.stack}
            </span>
          </div>
          <span
            style={{
              fontSize: 16,
              color: "#52525b",
              fontWeight: 500,
            }}
          >
            josepuicon-dev.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
