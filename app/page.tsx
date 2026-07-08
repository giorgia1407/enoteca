import { BrandShell } from "@/components/restaurant/BrandShell";
import { Masthead } from "@/components/restaurant/Masthead";
import { Hero } from "@/components/restaurant/Hero";
import { FullMenu } from "@/components/restaurant/FullMenu";
import { StorySection } from "@/components/restaurant/StorySection";
import { Gallery } from "@/components/restaurant/Gallery";
import { ReviewsSection } from "@/components/restaurant/ReviewsSection";
import { LocationSection } from "@/components/restaurant/LocationSection";
import { Newsletter } from "@/components/restaurant/Newsletter";

export default function HomePage() {
  return (
    <BrandShell>
      <Masthead />
      <Hero />
      <FullMenu />
      <div id="reviews" className="scroll-mt-[80px]">
        <ReviewsSection />
      </div>
      <StorySection />
      <div id="gallery" className="scroll-mt-[80px]">
        <Gallery />
      </div>
      <LocationSection />
      <div id="newsletter" className="scroll-mt-[80px]">
        <Newsletter />
      </div>
    </BrandShell>
  );
}
