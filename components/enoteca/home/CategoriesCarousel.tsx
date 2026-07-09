import Link from "next/link";
import { CATEGORIES } from "@/data/productData";
import { BottleImage } from "../BottleImage";
import { Carousel, SectionTitle } from "./Carousel";

/** Section 3 — "Categorie più cercate": horizontal row of category tiles. */
export function CategoriesCarousel() {
  return (
    <section id="categorie" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 py-12 md:py-16">
      <SectionTitle>Categorie più cercate</SectionTitle>
      <Carousel ariaLabel="Categorie">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group w-[45%] shrink-0 snap-start sm:w-[240px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface shadow-card">
              <BottleImage
                src={cat.image}
                alt={cat.label}
                sizes="(max-width: 640px) 45vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-2 text-center text-[15px] font-semibold text-text transition-colors group-hover:text-primary-hover">
              {cat.label}
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
