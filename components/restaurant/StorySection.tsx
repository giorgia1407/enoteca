"use client";

import { IMAGES } from "./data/menuData";
import { DishImage } from "./DishImage";
import { Reveal, RevealItem } from "./Reveal";
import { useContent } from "./ContentContext";

/** Chef's story — split layout, photo left / copy right (stacks on mobile). */
export function StorySection() {
  const { t } = useContent();
  return (
    <section id="story" className="scroll-mt-20 bg-[#F7EBDD]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal stagger={false}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#EADFD0] shadow-[0_24px_60px_-30px_rgba(42,36,32,0.5)]">
            <DishImage
              src={IMAGES.chef}
              alt={t.storyChef}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal>
          <RevealItem>
            <p className="font-[family-name:var(--font-curry-accent)] text-[18px] italic text-[#C7401A]">
              {t.storyEyebrow}
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-1 font-[family-name:var(--font-curry-display)] text-[32px] font-bold text-[#2A2420] sm:text-[40px]">
              {t.storyHeading}
            </h2>
          </RevealItem>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-[#5A4F47]">
            <RevealItem>
              <p>{t.storyP1}</p>
            </RevealItem>
            <RevealItem>
              <p>{t.storyP2}</p>
            </RevealItem>
            <RevealItem>
              <p>{t.storyP3}</p>
            </RevealItem>
            <RevealItem>
              <p className="font-[family-name:var(--font-curry-accent)] text-[24px] italic text-[#C7401A]">
                {t.storySignature}
              </p>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
