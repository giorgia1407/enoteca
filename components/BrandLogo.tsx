/**
 * Il Tempio di Vino — inline SVG brand logo.
 *
 * Arrangement: stylised Roman amphora on the LEFT, two-line serif wordmark
 * ("Il Tempio" / "di Vino") on the RIGHT, vertically centred — this reads
 * cleaner than a stacked layout at the ~44px nav-bar height while still scaling
 * crisply to 200px on landing sections.
 *
 * Colour: everything is drawn in `currentColor`, defaulting to deep Italian red
 * #B71C1C. Pass `color` to recolour the whole lockup — e.g. `color="#fff"` for
 * the dark newsletter band (an inline colour is used so it always wins over
 * inherited text styles).
 *
 * Props:
 *   size    — 'sm' | 'md' | 'lg' (nav uses 'md')
 *   variant — 'full' (amphora + wordmark) | 'icon-only' (amphora glyph alone)
 *   color   — any CSS colour (default #B71C1C)
 */

import {
  AMPHORA_RIM,
  AMPHORA_BODY,
  AMPHORA_HANDLE_L,
  AMPHORA_HANDLE_R,
  BRAND_RED,
} from "./amphora";

type LogoSize = "sm" | "md" | "lg";
type LogoVariant = "full" | "icon-only";

/** Rendered pixel height per size token (width scales with the viewBox ratio). */
const HEIGHTS: Record<LogoSize, number> = { sm: 32, md: 44, lg: 96 };

function Amphora() {
  return (
    <g transform="translate(6,3) scale(0.9)">
      <g fill="currentColor">
        <path d={AMPHORA_RIM} />
        <path d={AMPHORA_BODY} />
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={AMPHORA_HANDLE_L} />
        <path d={AMPHORA_HANDLE_R} />
      </g>
    </g>
  );
}

export function BrandLogo({
  size = "md",
  variant = "full",
  className = "",
  title = "Il Tempio di Vino",
  color = BRAND_RED,
}: {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  title?: string;
  color?: string;
}) {
  const height = HEIGHTS[size];

  if (variant === "icon-only") {
    // Native amphora box is 44×58 (+ translate padding) → viewBox 0 0 56 64.
    const width = Math.round((height * 56) / 64);
    return (
      <svg
        viewBox="0 0 56 64"
        width={width}
        height={height}
        role="img"
        aria-label={title}
        className={className}
        style={{ color }}
      >
        <Amphora />
      </svg>
    );
  }

  // Full lockup: amphora (left) + two-line wordmark (right). viewBox 0 0 240 60.
  const width = Math.round((height * 240) / 60);
  return (
    <svg
      viewBox="0 0 240 60"
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={className}
      style={{ color }}
    >
      <Amphora />
      <text
        x={72}
        y={27}
        fill="currentColor"
        style={{
          fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
          fontSize: "26px",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        Il Tempio
      </text>
      <text
        x={72}
        y={51}
        fill="currentColor"
        style={{
          fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
          fontSize: "26px",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        di Vino
      </text>
    </svg>
  );
}
