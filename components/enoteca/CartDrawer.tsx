"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import { useI18n } from "./i18n";
import { BottleImage } from "./BottleImage";
import { PlusIcon, MinusIcon, TrashIcon, CloseIcon, WhatsAppIcon, BagIcon } from "./Icons";
import { formatEuro, getWhatsAppOrderUrl, SHOP_INFO } from "@/lib/constants";

/** Slide-in WhatsApp order basket. Repurposed from the template's cart sidebar. */
export function CartDrawer() {
  const { lines, count, subtotal, addItem, decrementItem, removeItem, clearCart } = useCart();
  const { cartOpen, closeCart } = useUI();
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  const threshold = SHOP_INFO.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  const orderUrl = getWhatsAppOrderUrl(
    lines.map((l) => ({
      name: l.item.name,
      vintage: l.item.vintage,
      qty: l.qty,
      price: l.item.price,
      lineTotal: l.lineTotal,
    })),
    subtotal,
  );

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-wine-deep/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[81] flex h-[100dvh] w-full max-w-md flex-col bg-cream shadow-wine-lg"
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <BagIcon className="h-5 w-5 text-wine" />
                <h2 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-wine">
                  {t("cart.title")}
                </h2>
                {count > 0 && (
                  <span className="rounded-full bg-wine px-2 py-0.5 text-[12px] font-bold text-white">
                    {count}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label={t("nav.close")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-wine hover:text-wine"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep text-wine">
                  <BagIcon className="h-8 w-8" />
                </div>
                <p className="text-[17px] font-semibold text-charcoal">{t("cart.empty")}</p>
                <p className="text-[14px] text-charcoal-soft">{t("cart.emptyHint")}</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-wine px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-wine-deep"
                >
                  {t("cart.continue")}
                </button>
              </div>
            ) : (
              <>
                {/* Free-shipping progress */}
                <div className="shrink-0 border-b border-line bg-white px-5 py-3">
                  <p className="text-[12.5px] font-medium text-charcoal">
                    {remaining > 0
                      ? t("cart.freeShippingLeft", { x: formatEuro(remaining) })
                      : t("cart.freeShippingReached")}
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-deep">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lines */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {lines.map((l) => (
                      <li key={l.item.id} className="flex gap-3">
                        <Link
                          href={`/prodotto/${l.item.slug}`}
                          onClick={closeCart}
                          className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-deep"
                        >
                          <BottleImage
                            src={l.item.images[0]}
                            alt={l.item.name}
                            sizes="64px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <Link
                            href={`/prodotto/${l.item.slug}`}
                            onClick={closeCart}
                            className="text-[14px] font-semibold leading-snug text-charcoal hover:text-wine"
                          >
                            {l.item.name}
                          </Link>
                          <p className="text-[12px] text-charcoal-soft">{l.item.producer}</p>
                          <div className="mt-auto flex items-center justify-between pt-1.5">
                            <div className="flex items-center rounded-full border border-line">
                              <button
                                type="button"
                                onClick={() => decrementItem(l.item.id)}
                                aria-label="-"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:text-wine"
                              >
                                <MinusIcon className="h-3.5 w-3.5" />
                              </button>
                              <span className="min-w-[24px] text-center text-[14px] font-bold text-charcoal">
                                {l.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => addItem(l.item.id)}
                                aria-label="+"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:text-wine"
                              >
                                <PlusIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-[15px] font-bold text-charcoal">
                              {formatEuro(l.lineTotal)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(l.item.id)}
                          aria-label={t("cart.remove")}
                          className="self-start p-1 text-charcoal-soft transition-colors hover:text-wine-soft"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-line bg-white px-5 py-4">
                  <div className="flex items-center justify-between text-[17px] font-bold text-charcoal">
                    <span>{t("cart.total")}</span>
                    <span>{formatEuro(subtotal)}</span>
                  </div>
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[16px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#128C4A]"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> {t("cart.order")}
                  </a>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[12.5px] font-medium text-charcoal-soft underline-offset-2 hover:text-wine-soft hover:underline"
                    >
                      {t("cart.clear")}
                    </button>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="text-[12.5px] font-medium text-charcoal-soft underline-offset-2 hover:text-wine hover:underline"
                    >
                      {t("cart.continue")}
                    </button>
                  </div>
                  <p className="mt-2.5 text-center text-[11.5px] leading-snug text-charcoal-soft">
                    {t("cart.note")}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
