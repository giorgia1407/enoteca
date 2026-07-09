import { ImageResponse } from "next/og";
import { amphoraSvgMarkup, BRAND_RED } from "@/components/amphora";

/**
 * Browser-tab favicon — the amphora glyph alone, deep Italian red on a
 * transparent background, rendered at 32×32. The amphora is embedded as an
 * <img> data URI (Satori renders that far more reliably than inline vector
 * paths).
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          background: "transparent",
        }}
      >
        <img src={dataUri} alt="" width={28} height={32} />
      </div>
    ),
    { ...size },
  );
}
