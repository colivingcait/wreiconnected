import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgImage({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B2A4A",
          color: "#FBF6EE",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 600 }}>WREI Connected</div>
          <div
            style={{
              background: "#F2A98A",
              color: "#1B2A4A",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {kicker}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 600, letterSpacing: -1, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#F2A98A", maxWidth: 900 }}>{subtitle}</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
