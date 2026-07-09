"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal scroll-snap carousel with left/right arrows + dot pagination.
 * Reused by the categories / offers / bestsellers rows. Children are the items
 * (each should be `shrink-0 snap-start` with its own width).
 */
export function Carousel({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const pages = Math.max(1, Math.ceil((el.scrollWidth - 2) / el.clientWidth));
    setCount(pages);
    setActive(Math.min(pages - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          aria-label={ariaLabel}
          className="curry-no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {children}
        </div>

        <button
          type="button"
          onClick={() => page(-1)}
          aria-label="Precedente"
          className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg text-text shadow-card transition-colors hover:bg-surface md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          aria-label="Successivo"
          className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg text-text shadow-card transition-colors hover:bg-surface md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Left-aligned section title used across the homepage. */
export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-6 font-[family-name:var(--font-display)] text-[26px] font-bold text-text md:text-[30px]"
    >
      {children}
    </h2>
  );
}
