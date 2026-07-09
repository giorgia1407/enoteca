import { getFeatured } from "@/data/productData";
import { ProductCard } from "../ProductCard";
import { Carousel, SectionTitle } from "./Carousel";

/** Section 8 — "I più venduti": featured wines, standard (no OFFERTA ribbon). */
const BESTSELLERS = getFeatured(12);

export function BestsellersCarousel() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
      <SectionTitle>I più venduti</SectionTitle>
      <Carousel ariaLabel="I più venduti">
        {BESTSELLERS.map((wine) => (
          <div key={wine.id} className="w-[70%] shrink-0 snap-start sm:w-[260px]">
            <ProductCard wine={wine} variant="bestseller" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
