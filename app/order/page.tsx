import type { Metadata } from "next";
import { BrandShell } from "@/components/restaurant/BrandShell";
import { OrderCheckout } from "@/components/restaurant/OrderCheckout";

export const metadata: Metadata = {
  title: "Ordina Online · Curry & Spice",
  description:
    "In ristorante, ritiro o consegna — ordini da Curry & Spice in pochi tap.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <BrandShell>
      <OrderCheckout />
    </BrandShell>
  );
}
