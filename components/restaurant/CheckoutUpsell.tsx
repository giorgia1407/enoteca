"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { DishImage } from "./DishImage";
import type { UpsellSuggestion } from "./data/upsellLogic";

/**
 * Subtle bottom slide-up shown once when the guest heads to checkout. Offers a
 * complementary dish (usually a dessert or drink) before continuing.
 */
export function CheckoutUpsell({
  suggestion,
  onAddAndContinue,
  onContinue,
}: {
  suggestion: UpsellSuggestion;
  onAddAndContinue: () => void;
  onContinue: () => void;
}) {
  const { money } = useCart();
  const { t } = useContent();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onContinue();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onContinue]);

  const { item, reason } = suggestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#2A2420]/45 backdrop-blur-sm"
      onClick={onContinue}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="curry-checkout-upsell-title"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-3xl border-t-2 border-[#C7401A] bg-[#FFF8F0] p-5 sm:mb-6 sm:rounded-3xl"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#E4D5C3] sm:hidden" />
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#C7401A]">
          ✨ {t.completeMeal}
        </p>
        <h2
          id="curry-checkout-upsell-title"
          className="mt-1 font-[family-name:var(--font-curry-display)] text-[20px] font-bold leading-snug text-[#2A2420]"
        >
          {reason}
        </h2>

        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#EADFD0] bg-white p-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7EBDD]">
            <DishImage src={item.image} alt={item.name} sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-[family-name:var(--font-curry-display)] text-[16px] font-bold text-[#2A2420]">
              {item.name}
            </p>
            <p className="line-clamp-1 text-[12.5px] text-[#8A7D71]">{item.description}</p>
          </div>
          <span className="shrink-0 text-[15px] font-bold text-[#C7401A]">{money(item.price)}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 rounded-full border border-[#E4D5C3] bg-white px-4 py-3 text-[14px] font-semibold text-[#5A4F47] transition-colors hover:border-[#C7401A] hover:text-[#2A2420]"
          >
            {t.continueToCheckout}
          </button>
          <button
            type="button"
            onClick={onAddAndContinue}
            className="flex-[1.3] rounded-full bg-[#C7401A] px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
          >
            {t.addAndContinue} ({money(item.price)})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
