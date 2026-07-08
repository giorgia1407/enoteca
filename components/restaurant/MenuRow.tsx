"use client";

import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { DishImage } from "./DishImage";
import { DietaryTags } from "./Tags";
import { PlusIcon, MinusIcon } from "./Icons";
import type { MenuItem } from "./data/menuData";

/**
 * Deliveroo/Uber-Eats-style horizontal menu row: info on the left, a square
 * photo on the right with a floating add control. First add (0 → 1) fires
 * `onAdd` so the section can run its one-per-visit upsell.
 */
export function MenuRow({
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
  const qty = quantities[item.id] ?? 0;

  return (
    <div
      className={`flex items-stretch justify-between gap-4 border-b border-[#EADFD0] px-1 py-5 transition-colors sm:px-3 ${
        dimmed ? "opacity-40" : "hover:bg-[#FBE9E1]/40"
      }`}
    >
      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-[family-name:var(--font-curry-display)] text-[19px] font-bold leading-tight text-[#2A2420]">
            {item.name}
          </h3>
          {item.popular && (
            <span className="rounded-full bg-[#E8A548] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2A2420]">
              {t.chefsPick}
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 max-w-prose text-[14px] leading-snug text-[#6A5F55]">
          {item.description}
        </p>
        <p className="mt-2 text-[18px] font-bold text-[#C7401A]">{money(item.price)}</p>
        <div className="mt-2">
          <DietaryTags item={item} />
        </div>
      </div>

      {/* Photo + add control */}
      <div className="relative h-[100px] w-[100px] shrink-0 self-center sm:h-[140px] sm:w-[140px]">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#F7EBDD]">
          <DishImage
            src={item.image}
            alt={item.name}
            sizes="140px"
            className="object-cover"
          />
        </div>

        {qty === 0 ? (
          <button
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`${t.add} ${item.name}`}
            disabled={dimmed}
            className="absolute -bottom-2 -right-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#C7401A] text-white shadow-[0_6px_16px_-4px_rgba(199,64,26,0.6)] transition-transform hover:scale-105 disabled:opacity-40"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        ) : (
          <div className="absolute -bottom-2 -right-2 inline-flex items-center gap-1.5 rounded-full bg-white p-1 shadow-[0_6px_16px_-4px_rgba(42,36,32,0.4)] ring-1 ring-[#EADFD0]">
            <button
              type="button"
              onClick={() => decrementItem(item.id)}
              aria-label={`${t.removeOne} ${item.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#C7401A] transition-colors hover:bg-[#FBE9E1]"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-4 text-center text-[14px] font-bold text-[#2A2420]">{qty}</span>
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
  );
}
