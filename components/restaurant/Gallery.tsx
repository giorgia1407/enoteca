"use client";

import { IMAGES } from "./data/menuData";
import { DishImage } from "./DishImage";
import { Reveal, RevealItem } from "./Reveal";
import { useContent } from "./ContentContext";

const GALLERY = IMAGES.gallery;

/** Instagram-style photo grid with hover captions. */
export function Gallery() {
  const { t } = useContent();
  return (
    <section className="bg-[#F7EBDD]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="font-[family-name:var(--font-curry-accent)] text-[18px] italic text-[#C7401A]">
            {t.galleryEyebrow}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-curry-display)] text-[32px] font-bold text-[#2A2420] sm:text-[40px]">
            {t.galleryHeading}
          </h2>
        </div>

        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((photo, i) => {
            const caption = t.galleryCaptions[i] ?? photo.caption;
            return (
            <RevealItem key={i}>
              <figure className="group relative aspect-square overflow-hidden rounded-xl bg-[#EADFD0]">
                <DishImage
                  src={photo.src}
                  alt={caption}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-[#C7401A]/85 via-[#C7401A]/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-[family-name:var(--font-curry-display)] text-[15px] font-bold text-white">
                    {caption}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
