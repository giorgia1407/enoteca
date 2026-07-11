import { getOnOffer, type Wine } from "@/data/productData";
import { ProductCard } from "../ProductCard";
import { Carousel, SectionTitle } from "./Carousel";

/**
 * Section 6 — "Le nostre offerte".
 * Offers are the REAL discounted wines from the catalogue — every bottle whose
 * `originalPrice` (list) exceeds its current `price`, read off the shop's
 * handwritten "con sconto" price tags. No display-only/fabricated discounts.
 */
const OFFERS: Wine[] = getOnOffer();

export function OffersCarousel() {
  return (
    <section id="offerte" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 py-12 md:py-16">
      <SectionTitle>Le nostre offerte</SectionTitle>
      <Carousel ariaLabel="Offerte">
        {OFFERS.map((wine) => (
          <div key={wine.id} className="w-[70%] shrink-0 snap-start sm:w-[260px]">
            <ProductCard wine={wine} variant="offer" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
