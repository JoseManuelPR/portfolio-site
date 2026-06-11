import { ImageResponse } from "next/og";

export const alt = "José Manuel Puicón — Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  en: {
    kicker: "FIELD NOTES OF A PRODUCT ENGINEER",
    role: "PRODUCT ENGINEER",
    hud: "UTC−5 · CHICLAYO, PE · +83% CWV · ES · EN · PT",
  },
  es: {
    kicker: "BITÁCORA DE UN PRODUCT ENGINEER",
    role: "PRODUCT ENGINEER",
    hud: "UTC−5 · CHICLAYO, PE · +83% CWV · ES · EN · PT",
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
          padding: "64px 72px",
          backgroundColor: "#2a4abf",
          color: "#ece7dc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand + HUD */}
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
          <span style={{ fontSize: 17, letterSpacing: 3, opacity: 0.85 }}>
            + {t.kicker}
          </span>
        </div>

        {/* Name block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 124,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            JOSÉ MANUEL
          </span>
          <span
            style={{
              fontSize: 124,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
              marginLeft: 90,
            }}
          >
            PUICÓN
          </span>
        </div>

        {/* Bottom: role chip + hud + site */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(236,231,220,0.35)",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 21, letterSpacing: 4, fontWeight: 700 }}>
            {t.role}
          </span>
          <span style={{ fontSize: 16, letterSpacing: 2, opacity: 0.8 }}>
            {t.hud}
          </span>
          <span style={{ fontSize: 17, letterSpacing: 1, opacity: 0.9 }}>
            josepuicon-dev.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
