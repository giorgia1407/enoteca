"use client";

import { IMAGES } from "./data/menuData";
import { DishImage } from "./DishImage";
import { useContent } from "./ContentContext";

/** Wide cinematic masthead band below the nav — headline over a food photo. */
export function Masthead() {
  const { t } = useContent();
  return (
    <section className="relative h-[96px] w-full overflow-hidden md:h-[120px]">
      <DishImage
        src={IMAGES.hero}
        alt="A vibrant spread of authentic Indian dishes"
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(42,36,32,0.75) 0%, rgba(42,36,32,0.55) 50%, rgba(42,36,32,0.75) 100%)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E8A548]">
          {t.mastheadTag}
        </p>
        <h2 className="mt-1 max-w-3xl font-[family-name:var(--font-curry-display)] text-[24px] font-bold italic leading-tight text-[#FFF8F0] md:text-[40px]">
          {t.mastheadHeadline}
        </h2>
      </div>
    </section>
  );
}
