/**
 * Il Tempio di Vino — shared amphora geometry.
 *
 * A stylised Roman wine amphora (classical vessel — evokes both "tempio" and
 * "vino"): flared rim, narrow neck, two curved handles, a full rounded body and
 * a tapered base. Drawn once here so the nav logo (<BrandLogo/>), the browser
 * favicon (app/icon.tsx) and the Apple touch icon (app/apple-icon.tsx) all use
 * the exact same silhouette.
 *
 * Native coordinate space: viewBox "0 0 44 58".
 */

/** Flared rim (mouth) of the amphora. */
export const AMPHORA_RIM = "M16 3 H28 L26 8 H18 Z";

/** Neck + bulbous body + tapered base as one filled silhouette. */
export const AMPHORA_BODY =
  "M18 7 C13 10 11 17 12 25 C6 31 6 43 16 52 C19 55 22 56 22 56 " +
  "C22 56 25 55 28 52 C38 43 38 31 32 25 C33 17 31 10 26 7 Z";

/** Left handle (stroked arc, neck → shoulder). */
export const AMPHORA_HANDLE_L = "M14 10 C6 12 5 22 13 26";
/** Right handle (mirror of the left). */
export const AMPHORA_HANDLE_R = "M30 10 C38 12 39 22 31 26";

/** Deep Italian red — the brand colour for the amphora and wordmark. */
export const BRAND_RED = "#B71C1C";
/** Warm charcoal — never pure black (site brand rule). */
export const BRAND_CHARCOAL = "#1A1A1A";

/**
 * Full standalone amphora SVG markup as a string, for embedding as a data URI
 * inside an <img> (used by the ImageResponse-generated app icons, where Satori
 * renders an <img> data URI far more reliably than inline vector paths).
 *
 * @param color   fill/stroke colour of the amphora
 * @param padding transparent padding around the glyph, in native units
 */
export function amphoraSvgMarkup(color: string, padding = 2): string {
  const size = 44 + padding * 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + 14}" width="${size}" height="${size + 14}">` +
    `<g transform="translate(${padding},${padding})">` +
    `<g fill="${color}"><path d="${AMPHORA_RIM}"/><path d="${AMPHORA_BODY}"/></g>` +
    `<g fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="${AMPHORA_HANDLE_L}"/><path d="${AMPHORA_HANDLE_R}"/></g>` +
    `</g></svg>`
  );
}
