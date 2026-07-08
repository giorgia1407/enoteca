"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "./UIContext";
import { useContent } from "./ContentContext";
import { CloseIcon, ArrowRight } from "./Icons";

const BASE = "";

/**
 * "How would you like your order?" modal, opened by any ORDER ONLINE trigger.
 * Delivery/Pickup cards deep-link into the order flow with a `?mode=` hint.
 * Traps focus, closes on Esc / backdrop, and locks body scroll while open.
 */
export function OrderModePicker() {
  const { orderPickerOpen, closeOrderPicker } = useUI();
  const { t } = useContent();
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!orderPickerOpen) return;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeOrderPicker();
      } else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
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
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [orderPickerOpen, closeOrderPicker]);

  const go = (mode: "delivery" | "pickup") => {
    closeOrderPicker();
    router.push(`${BASE}/order?mode=${mode}`);
  };

  return (
    <AnimatePresence>
      {orderPickerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[#2A2420]/70 p-4 backdrop-blur-sm"
          onClick={closeOrderPicker}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="curry-mode-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] rounded-2xl bg-[#FFF8F0] p-8 shadow-[0_30px_80px_-20px_rgba(42,36,32,0.55)]"
          >
            <button
              type="button"
              onClick={closeOrderPicker}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#5A4F47] transition-colors hover:bg-[#F3E6D6] hover:text-[#2A2420]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <h2
              id="curry-mode-title"
              className="font-[family-name:var(--font-curry-display)] text-[26px] font-bold leading-tight text-[#2A2420] sm:text-[28px]"
            >
              {t.pickerTitle}
            </h2>
            <p className="mt-1 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
              {t.pickerSub}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                ref={firstRef}
                type="button"
                onClick={() => go("delivery")}
                className="group rounded-2xl border-2 border-[#E4D5C3] bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#C7401A] hover:bg-[#FBE9E1]"
              >
                <span className="text-3xl" aria-hidden="true">🛵</span>
                <span className="mt-2 block font-[family-name:var(--font-curry-display)] text-[22px] font-bold text-[#2A2420]">
                  {t.orderModeDelivery}
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-[#6A5F55]">
                  {t.pickerDeliveryDesc}
                </span>
                <span className="mt-2 block text-[12px] font-semibold text-[#C7401A]">
                  {t.pickerDeliveryInfo}
                </span>
              </button>

              <button
                type="button"
                onClick={() => go("pickup")}
                className="group rounded-2xl border-2 border-[#E4D5C3] bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#C7401A] hover:bg-[#FBE9E1]"
              >
                <span className="text-3xl" aria-hidden="true">🛍️</span>
                <span className="mt-2 block font-[family-name:var(--font-curry-display)] text-[22px] font-bold text-[#2A2420]">
                  {t.orderModePickup}
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-[#6A5F55]">
                  {t.pickerPickupDesc}
                </span>
                <span className="mt-2 block text-[12px] font-semibold text-[#4A6B4E]">
                  {t.pickerPickupInfo}
                </span>
              </button>
            </div>

            <p className="mt-5 text-center text-[13.5px] text-[#5A4F47]">
              {t.pickerPrefer}
              <Link
                href={`${BASE}/reserve`}
                onClick={closeOrderPicker}
                className="inline-flex items-center gap-1 font-semibold text-[#C7401A] hover:text-[#A5330F]"
              >
                {t.pickerReserveLink} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
