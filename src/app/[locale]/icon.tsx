import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: -1,
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
