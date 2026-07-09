import { SocialPaymentsBar } from "./home/SocialPaymentsBar";
import { NewsletterBand } from "./home/NewsletterBand";
import { Footer3Column } from "./home/Footer3Column";
import { CopyrightLine } from "./home/CopyrightLine";

/**
 * Site-wide footer = homepage sections 11–14, composed here so they appear at
 * the bottom of every page (the homepage renders sections 1–10, then SiteChrome
 * appends this footer → all 14 sections in order).
 */
export function Footer() {
  return (
    <footer>
      <SocialPaymentsBar />
      <NewsletterBand />
      <Footer3Column />
      <CopyrightLine />
    </footer>
  );
}
