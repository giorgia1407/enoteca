import type { Metadata } from "next";
import { ReviewExperience } from "@/components/restaurant/review/ReviewExperience";

export const metadata: Metadata = {
  title: "Com'è stata la Sua visita? · Curry & Spice",
  description:
    "Condivida la Sua esperienza da Curry & Spice — valuti la visita e ci aiuti a migliorare.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return <ReviewExperience />;
}
