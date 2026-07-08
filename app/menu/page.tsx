import type { Metadata } from "next";
import { BrandShell } from "@/components/restaurant/BrandShell";
import { MenuBrowser } from "@/components/restaurant/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu · Curry & Spice — Cucina Indiana a Roma",
  description:
    "Sfogli il menu completo di Curry & Spice — curry, biryani, piatti dal tandoor e altro, con i consigli di Bella.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <BrandShell>
      <MenuBrowser />
    </BrandShell>
  );
}
