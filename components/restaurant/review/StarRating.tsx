"use client";

import { useState } from "react";
import { ChevronDown } from "../Icons";
import { useContent } from "../ContentContext";
import { reviewCopy } from "./curryReviewContent";

function Star({ filled, active }: { filled: boolean; active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-7 w-7 transition-all duration-300 sm:h-8 sm:w-8 ${active ? "scale-110" : ""} ${
        filled ? "text-[#C7401A] drop-shadow-[0_2px_8px_rgba(199,64,26,0.35)]" : "text-[#C4B7A8]"
      }`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.9 6.6.95-4.8 4.66 1.13 6.55L12 17.4l-5.9 3.1 1.13-6.54L2.43 9.35l6.6-.96L12 2.5z" />
    </svg>
  );
}

/** Step 1 — the heading + five interactive star buttons. */
export function StarRating({ onRate }: { onRate: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const copy = reviewCopy("it");
  const { r } = useContent();

  return (
    <div className="mt-6 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C7401A]">
        {copy.eyebrow}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-curry-display)] text-[26px] font-bold italic leading-tight text-[#2A2420] sm:text-[32px]">
        {copy.starTitle.replace("{name}", r.name)}
      </h1>
      <p className="mt-1.5 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
        {copy.starSubtitle}
      </p>

      <div className="mt-6 flex items-start justify-center gap-1.5 sm:gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => onRate(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              aria-label={(n > 1 ? copy.rateAriaMany : copy.rateAriaOne).replace("{n}", String(n))}
              className="flex h-11 w-11 items-center justify-center rounded-2xl transition-colors hover:bg-[#FBE9E1] focus:bg-[#FBE9E1] focus:outline-none sm:h-14 sm:w-14"
            >
              <Star filled={n <= hover} active={n === hover} />
            </button>
            <span className="text-[11px] text-[#B4A798]">{n}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] text-[#8A7D71]">{copy.tapToRate}</p>
      <ChevronDown className="curry-bounce-up mx-auto mt-1 h-5 w-5 rotate-180 text-[#E8A548]" />
    </div>
  );
}
