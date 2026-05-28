import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          jm
          <span style={{ color: "#6366f1" }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
