import type { Metadata } from "next";
import { BrandShell } from "@/components/restaurant/BrandShell";
import { ReservationFlow } from "@/components/restaurant/ReservationFlow";

export const metadata: Metadata = {
  title: "Prenoti un Tavolo · Curry & Spice",
  description:
    "Prenoti il Suo tavolo da Curry & Spice a Roma — scelga data, ora e numero di coperti in pochi secondi.",
  alternates: { canonical: "/reserve" },
};

export default function ReservePage() {
  return (
    <BrandShell>
      <ReservationFlow />
    </BrandShell>
  );
}
