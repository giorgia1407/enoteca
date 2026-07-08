"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DishImage } from "./DishImage";
import { useContent } from "./ContentContext";

/**
 * "Loved by our guests" — four big pure-photo dish tiles. The first four are
 * always shown on load; after an 8s settle, one tile at a time cross-fades to a
 * different dish from a pool of ten, giving a subtle "always fresh" feel. No
 * text/price/CTA overlay — the photos carry the message on their own.
 */

const INITIAL_IDS = ["butter-chicken", "chicken-tikka", "chicken-biryani", "palak-paneer"];
const POOL_IDS = [
  ...INITIAL_IDS,
  "rogan-josh",
  "chana-masala",
  "samosa-chaat",
  "garlic-naan",
  "kadhai-prawns",
  "gulab-jamun",
];

const SETTLE_MS = 8000;
const ROTATE_MS = 5000;

export function TopDishes() {
  const { getItem } = useContent();
  const [slots, setSlots] = useState<string[]>(INITIAL_IDS);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const settle = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setSlots((prev) => {
          const visible = new Set(prev);
          const available = POOL_IDS.filter((id) => !visible.has(id));
          if (available.length === 0) return prev;
          const slot = Math.floor(Math.random() * prev.length);
          const pick = available[Math.floor(Math.random() * available.length)];
          const next = [...prev];
          next[slot] = pick;
          return next;
        });
      }, ROTATE_MS);
    }, SETTLE_MS);
    return () => {
      window.clearTimeout(settle);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="curry-no-scrollbar flex gap-4 overflow-x-auto sm:overflow-visible"
      role="list"
      aria-label="A taste of our dishes"
    >
      {slots.map((id, i) => {
        const item = getItem(id);
        if (!item) return null;
        return (
          <div
            key={i}
            role="listitem"
            className="relative h-[160px] w-[42vw] shrink-0 overflow-hidden rounded-[20px] shadow-[0_12px_32px_-8px_rgba(42,36,32,0.15)] sm:h-[190px] sm:w-auto sm:flex-1 lg:h-[220px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <DishImage
                  src={item.image}
                  alt={item.name}
                  sizes="(max-width: 640px) 42vw, 24vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
