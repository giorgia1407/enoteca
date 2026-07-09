import { WINES, getOnOffer, type Wine } from "@/data/productData";
import { ProductCard } from "../ProductCard";
import { Carousel, SectionTitle } from "./Carousel";

/**
 * Section 6 — "Le nostre offerte".
 * productData.ts is out of scope for edits, so offers are assembled at render
 * time: the real discounted wines first, then a deterministic set of featured
 * wines given a DISPLAY-ONLY discount (the source objects are never mutated —
 * we render shallow clones with an added `originalPrice`).
 */
const DISCOUNTS = [0.1, 0.15, 0.2, 0.25];
const withDisplayDiscount = (w: Wine, i: number): Wine => {
  const pct = DISCOUNTS[i % DISCOUNTS.length];
  return { ...w, originalPrice: Math.round((w.price / (1 - pct)) * 100) / 100 };
};

const real = getOnOffer();
const fillers = WINES.filter((w) => w.featured && !w.originalPrice)
  .slice(0, Math.max(0, 12 - real.length))
  .map(withDisplayDiscount);
const OFFERS: Wine[] = [...real, ...fillers];

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
