import Link from "next/link";
import { categoryTiles } from "@/data/catalogFacets";
import { BottleImage } from "../BottleImage";
import { Carousel, SectionTitle } from "./Carousel";

/**
 * Section 3 — "Categorie più cercate".
 *
 * One tile per POPULATED category (empty vini-dolci / accessori are skipped),
 * each showing a REAL bottle photo from that category — a featured product when
 * one exists, otherwise the first in-stock bottle. The bottle sits `object-
 * contain` on a warm surface so it is never cropped, with the category name in
 * a white bar beneath. See `categoryTiles()` in data/catalogFacets.ts.
 */
export function CategoriesCarousel() {
  const tiles = categoryTiles();
  return (
    <section id="categorie" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 py-12 md:py-16">
      <SectionTitle>Categorie più cercate</SectionTitle>
      <Carousel ariaLabel="Categorie">
        {tiles.map((tile) => (
          <Link
            key={tile.slug}
            href={tile.href}
            className="group w-[45%] shrink-0 snap-start sm:w-[220px]"
          >
            <div className="overflow-hidden rounded-lg border border-border shadow-card transition-shadow duration-300 group-hover:shadow-[0_12px_28px_rgba(26,26,26,0.12)]">
              <div className="relative aspect-square bg-[#f6f2ea]">
                <BottleImage
                  src={tile.image}
                  alt={tile.alt}
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="object-contain p-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]"
                />
              </div>
              <div className="border-t border-border bg-white py-2.5 text-center text-[15px] font-semibold text-text transition-colors group-hover:text-primary-hover">
                {tile.label}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
