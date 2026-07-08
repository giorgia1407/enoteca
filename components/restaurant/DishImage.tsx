"use client";

import Image from "next/image";
import { useState } from "react";
import { DishIcon } from "./Icons";

/**
 * A `fill` image with two safety nets for the demo's remote Unsplash photos:
 *   1. a warm cream blur placeholder while loading (no flash of empty box), and
 *   2. an onError fallback that swaps a broken image for a branded cream tile
 *      with a saffron dish glyph — so a stray 404 never shows a broken icon.
 *
 * Always used inside a positioned, fixed-aspect parent (the card supplies the
 * box), so there is no layout shift regardless of load outcome.
 */

// Tiny cream SVG — the blur-up placeholder colour (#f7ebdd).
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4IDYnPjxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzYnIGZpbGw9JyNmN2ViZGQnLz48L3N2Zz4=";

export function DishImage({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#F7EBDD] text-[#C7401A]">
        <DishIcon className="h-8 w-8 opacity-80" />
        <span className="px-2 text-center text-[11px] font-semibold text-[#B4886A]">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
