"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DishImage } from "./DishImage";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { DietaryTags } from "./Tags";
import { CloseIcon } from "./Icons";
import type { UpsellSuggestion } from "./data/upsellLogic";

const AUTO_DISMISS_MS = 8000;

/**
 * The "Chef's Pairing Suggestion" modal. Presented as an intelligent
 * recommendation (it's really upsellLogic's lookup). Warm cream card, saffron
 * border, scale+fade in. Traps focus, closes on Esc, and auto-dismisses after
 * 8 seconds with a visible countdown bar.
 */
export function UpsellPopup({
  suggestion,
  onAccept,
  onDismiss,
}: {
  suggestion: UpsellSuggestion;
  onAccept: () => void;
  onDismiss: () => void;
}) {
  const { money } = useCart();
  const { t } = useContent();
  const dialogRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  // Auto-dismiss timer.
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  // Focus management + Esc + focus trap.
  useEffect(() => {
    acceptRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onDismiss();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  const { item, reason } = suggestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#2A2420]/45 p-4 backdrop-blur-sm sm:items-center"
      onClick={onDismiss}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="curry-upsell-title"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-[#C7401A] bg-[#FFF8F0] shadow-[0_30px_80px_-20px_rgba(42,36,32,0.55)]"
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label={t.dismissSuggestion}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#5A4F47] transition-colors hover:bg-white hover:text-[#2A2420]"
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>

        <div className="px-5 pt-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#C7401A]">
            {t.chefPairing}
          </p>
          <h2
            id="curry-upsell-title"
            className="mt-1 font-[family-name:var(--font-curry-display)] text-[22px] font-bold leading-tight text-[#2A2420]"
          >
            {reason}
          </h2>
        </div>

        <div className="mx-5 mt-4 flex gap-4 rounded-2xl border border-[#EADFD0] bg-white p-3">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F7EBDD]">
            <DishImage
              src={item.image}
              alt={item.name}
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-[family-name:var(--font-curry-display)] text-[17px] font-bold leading-tight text-[#2A2420]">
                {item.name}
              </h3>
              <span className="shrink-0 text-[15px] font-bold text-[#C7401A]">
                {money(item.price)}
              </span>
            </div>
            <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-[#6A5F55]">
              {item.description}
            </p>
            <div className="mt-1.5">
              <DietaryTags item={item} size="xs" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5">
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 rounded-full border border-[#E4D5C3] bg-white px-4 py-3 text-[14px] font-semibold text-[#5A4F47] transition-colors hover:border-[#C7401A] hover:text-[#2A2420]"
          >
            {t.maybeLater}
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={onAccept}
            className="flex-[1.4] rounded-full bg-[#C7401A] px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
          >
            {t.yesAdd.replace("{price}", money(item.price))}
          </button>
        </div>

        {/* 8-second countdown bar */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
          className="h-1 origin-left bg-[#E8A548]"
        />
      </motion.div>
    </motion.div>
  );
}
