"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import type { Wine } from "@/data/productData";
import { discountPct } from "@/data/productData";
import { formatEuro } from "@/lib/constants";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import { BottleImage } from "./BottleImage";

/**
 * Doreca-spec product card.
 *
 * Structure (top → bottom): OFFERTA ribbon + discount / multipack badges →
 * product name → image → price (struck original + mustard sale) → full-width
 * mustard "AGGIUNGI ›" button wired to the cart + WhatsApp cart drawer.
 *
 * `variant` only affects the badges/ribbon; a wine that carries an
 * `originalPrice` always renders as an offer regardless of variant so the
 * category/search grids stay consistent. Note: our catalogue imagery is
 * lifestyle photography (not transparent bottle cut-outs like Doreca), so the
 * image uses `object-cover` in a fixed box rather than `object-contain`.
 */
export function ProductCard({
  wine,
  variant = "standard",
  priority,
  pack,
}: {
  wine: Wine;
  variant?: "standard" | "offer" | "bestseller";
  priority?: boolean;
  /** Multi-pack size (e.g. 3, 6). Wines are single-bottle by default → omitted. */
  pack?: number;
}) {
  const { addItem } = useCart();
  const { openCart } = useUI();
  const [justAdded, setJustAdded] = useState(false);

  const off = discountPct(wine);
  const isOffer = variant === "offer" || off !== null;
  const href = `/prodotto/${wine.slug}`;
  const title = wine.name; // product names already include the vintage in the data

  const handleAdd = () => {
    addItem(wine.id);
    setJustAdded(true);
    openCart();
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col rounded-lg border border-border bg-bg p-4 shadow-card transition-shadow hover:shadow-cta"
    >
      {/* Badges (top-right): multipack + discount */}
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1">
        {pack && pack > 1 && (
          <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-bold text-text-muted">
            x{pack}
          </span>
        )}
        {off !== null && (
          <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary-hover">
            -{off}%
          </span>
        )}
        {variant === "bestseller" && off === null && (
          <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Best Seller
          </span>
        )}
      </div>

      {/* Product name — TOP of card content */}
      <Link href={href} className="pr-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          {wine.producer}
        </p>
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] text-[15px] font-semibold leading-snug text-text transition-colors group-hover:text-primary-hover">
          {title}
        </h3>
      </Link>

      {/* Image */}
      <Link
        href={href}
        className="relative my-3 block h-[180px] overflow-hidden rounded-md bg-surface"
      >
        {/* OFFERTA diagonal ribbon (top-left of the product visual) */}
        {isOffer && (
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 overflow-hidden">
            <span className="absolute left-[-34px] top-[14px] w-[130px] -rotate-45 bg-primary py-1 text-center text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Offerta
            </span>
          </div>
        )}
        <BottleImage
          src={wine.image}
          alt={wine.alt || `${wine.name} — ${wine.producer}`}
          sizes="(max-width: 640px) 60vw, 260px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </Link>

      {/* Price */}
      <div className="mt-auto">
        <div className="flex items-end gap-2">
          {wine.originalPrice && (
            <span className="text-[13px] text-text-muted line-through">
              {formatEuro(wine.originalPrice)}
            </span>
          )}
          <span className="text-[22px] font-extrabold leading-none text-primary-hover">
            {formatEuro(wine.price)}
          </span>
          <span className="pb-0.5 text-[12px] font-medium text-text-muted">/pz</span>
        </div>

        {/* AGGIUNGI button */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Aggiungi ${wine.name} al carrello`}
          className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[14px] font-bold uppercase tracking-wide text-text shadow-cta transition-colors hover:bg-primary-hover"
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} /> Aggiunto
            </>
          ) : (
            <>
              Aggiungi <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
