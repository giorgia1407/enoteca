import { ImageResponse } from "next/og";
import { amphoraSvgMarkup, BRAND_RED } from "@/components/amphora";

/**
 * Apple touch icon — 180×180, the red amphora centred on a white rounded-square
 * tile (iOS masks to a rounded rect; the white field keeps the red glyph
 * legible on any home-screen wallpaper).
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const svg = amphoraSvgMarkup(BRAND_RED, 2);
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 40,
        }}
      >
        <img src={dataUri} alt="" width={104} height={120} />
      </div>
    ),
    { ...size },
  );
}
