// Social link preview (og:image) — generated at build time via next/og.
// Charcoal card in the site's design: giant wordmark, name, role, accent bar.

import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111210",
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        {/* Accent bar */}
        <div style={{ display: "flex", gap: 0, height: 6, width: 320 }}>
          <div style={{ flex: 1, background: "#a78bfa" }} />
          <div style={{ flex: 1, background: "#f7c34c" }} />
          <div style={{ flex: 1, background: "#2fe2a8" }} />
          <div style={{ flex: 1, background: "#f472b6" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 200, fontWeight: 700, color: "#f2efe1", letterSpacing: -8 }}>
            moe.
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#eceae2", marginTop: 8 }}>
            {site.fullName}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a09f97", marginTop: 10 }}>
            {site.role} — {site.location}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#66655e" }}>
          <div style={{ display: "flex" }}>{"// Creating with code. Small details matter."}</div>
          <div style={{ display: "flex" }}>malotaibi.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
