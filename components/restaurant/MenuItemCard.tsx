"use client";

import { motion } from "framer-motion";
import { DishImage } from "./DishImage";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { MENU_PAGE_COPY } from "./data/curryMenuPageContent";
import { DietaryTags } from "./Tags";
import { PlusIcon, MinusIcon } from "./Icons";
import type { MenuItem } from "./data/menuData";

/**
 * A single menu card. When the item isn't in the cart it shows a saffron "Add"
 * button; once added it flips to a compact quantity stepper. The very first add
 * (0 → 1) fires `onAdd`, which the browser uses to trigger the upsell popup.
 */
export function MenuItemCard({
  item,
  onAdd,
  dimmed = false,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  dimmed?: boolean;
}) {
  const { quantities, addItem, decrementItem, money } = useCart();
  const { t } = useContent();
  const locale: "en" | "it" = "it";
  const copy = MENU_PAGE_COPY[locale === "it" ? "it" : "en"];
  const qty = quantities[item.id] ?? 0;

  return (
    <motion.article
      layout
      animate={{ opacity: dimmed ? 0.38 : 1 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-[#EADFD0] bg-white transition-shadow duration-300 ${
        dimmed ? "pointer-events-none" : "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(42,36,32,0.35)]"
      }`}
      style={{ transitionProperty: "transform, box-shadow, opacity" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7EBDD]">
        <DishImage
          src={item.image}
          alt={item.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-[#E8A548] px-2.5 py-1 text-[11px] font-bold text-[#2A2420] shadow-sm">
            {copy.lovedBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-curry-display)] text-[19px] font-bold leading-tight text-[#2A2420]">
            {item.name}
          </h3>
          <span className="shrink-0 pt-0.5 text-[17px] font-bold text-[#C7401A]">
            {money(item.price)}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-snug text-[#6A5F55]">
          {item.description}
        </p>

        <div className="mt-3">
          <DietaryTags item={item} />
        </div>

        <div className="mt-4 flex items-center justify-end">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C7401A] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
            >
              <PlusIcon className="h-4 w-4" />
              {t.add}
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 rounded-full border border-[#C7401A]/30 bg-[#FBE9E1] px-1.5 py-1">
              <button
                type="button"
                onClick={() => decrementItem(item.id)}
                aria-label={`${t.removeOne} ${item.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C7401A] transition-colors hover:bg-[#C7401A] hover:text-white"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-5 text-center text-[15px] font-bold text-[#2A2420]" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => addItem(item.id)}
                aria-label={`${t.addOne} ${item.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#C7401A] text-white transition-colors hover:bg-[#A5330F]"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
