"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#C7401A", "#E8A548", "#4A6B4E", "#F4C2C2", "#FFF8F0"];

/** Deterministic pseudo-random in [0,1) — pure (Math.sin/floor), SSR-stable. */
const seeded = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Lightweight celebratory confetti built entirely with framer-motion — no
 * external library. Scatter is deterministic (seeded by index) so it's pure at
 * render and hydration-safe; pieces fall and fade, then the layer is inert.
 */
export function Confetti({ count = 42 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seeded(i, 1) * 100,
        delay: seeded(i, 2) * 0.5,
        duration: 2.4 + seeded(i, 3) * 1.6,
        size: 6 + seeded(i, 4) * 8,
        rotate: seeded(i, 5) * 360,
        color: COLORS[i % COLORS.length],
        drift: (seeded(i, 6) - 0.5) * 120,
        round: seeded(i, 7) > 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10%", x: 0, opacity: 1, rotate: p.rotate }}
          animate={{ y: "115%", x: p.drift, opacity: [1, 1, 0], rotate: p.rotate + 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
          }}
        />
      ))}
    </div>
  );
}
