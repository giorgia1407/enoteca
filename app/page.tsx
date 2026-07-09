import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { HeroCarousel } from "@/components/enoteca/home/HeroCarousel";
import { BenefitsStrip } from "@/components/enoteca/home/BenefitsStrip";
import { CategoriesCarousel } from "@/components/enoteca/home/CategoriesCarousel";
import { HoReCaBanner } from "@/components/enoteca/home/HoReCaBanner";
import { GoogleReviewsSection } from "@/components/enoteca/home/GoogleReviewsSection";
import { OffersCarousel } from "@/components/enoteca/home/OffersCarousel";
import { BrandLogosRow } from "@/components/enoteca/home/BrandLogosRow";
import { BestsellersCarousel } from "@/components/enoteca/home/BestsellersCarousel";
import { EditorialTriptych } from "@/components/enoteca/home/EditorialTriptych";
import { AboutParagraph } from "@/components/enoteca/home/AboutParagraph";

/**
 * Homepage — 14 Doreca-style sections in order. Sections 1–10 render here;
 * sections 11–14 (social/payments, newsletter, 3-column footer, copyright) are
 * the site-wide <Footer/> mounted by SiteChrome, so they close every page.
 */
export default function HomePage() {
  return (
    <SiteChrome>
      <HeroCarousel />           {/* 1 */}
      <BenefitsStrip />          {/* 2 */}
      <CategoriesCarousel />     {/* 3 */}
      <HoReCaBanner />           {/* 4 */}
      <GoogleReviewsSection />   {/* 5 */}
      <OffersCarousel />         {/* 6 */}
      <BrandLogosRow />          {/* 7 */}
      <BestsellersCarousel />    {/* 8 */}
      <EditorialTriptych />      {/* 9 */}
      <AboutParagraph />         {/* 10 */}
      {/* 11–14 provided by SiteChrome's <Footer/> */}
    </SiteChrome>
  );
}

export const dynamic = "force-static";
