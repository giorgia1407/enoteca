"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, type CartLine } from "./CartContext";
import { PlusIcon, MinusIcon, BagIcon, CloseIcon, ArrowRight } from "./Icons";
import { TAX_RATE } from "./data/menuData";
import { ORDER_COPY } from "./data/curryOrderContent";

const CHECKOUT_HREF = "/order";

/** Line row shared by the desktop panel and the mobile sheet. */
function CartLineRow({ line }: { line: CartLine }) {
  const { addItem, decrementItem, money } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="flex items-center gap-3 py-3"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[#2A2420]">{line.item.name}</p>
        <p className="text-[13px] text-[#8A7D71]">{money(line.item.price)} {copy.each}</p>
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#EADFD0] px-1 py-0.5">
        <button
          type="button"
          onClick={() => decrementItem(line.item.id)}
          aria-label={copy.removeOne.replace("{name}", line.item.name)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#C7401A] transition-colors hover:bg-[#FBE9E1]"
        >
          <MinusIcon className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-4 text-center text-[14px] font-bold text-[#2A2420]">{line.qty}</span>
        <button
          type="button"
          onClick={() => addItem(line.item.id)}
          aria-label={copy.addOne.replace("{name}", line.item.name)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#C7401A] transition-colors hover:bg-[#FBE9E1]"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      <span className="w-16 shrink-0 text-right text-[14px] font-bold text-[#2A2420]">
        {money(line.lineTotal)}
      </span>
    </motion.li>
  );
}

function Totals() {
  const { subtotal, tax, total, money } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <dl className="space-y-1.5 text-[14px]">
      <div className="flex justify-between text-[#5A4F47]">
        <dt>{copy.subtotal}</dt>
        <dd>{money(subtotal)}</dd>
      </div>
      <div className="flex justify-between text-[#5A4F47]">
        <dt>{copy.taxLabel.replace("{pct}", (TAX_RATE * 100).toFixed(2))}</dt>
        <dd>{money(tax)}</dd>
      </div>
      <div className="mt-1 flex justify-between border-t border-[#EADFD0] pt-2 text-[16px] font-bold text-[#2A2420]">
        <dt>{copy.total}</dt>
        <dd className="text-[#C7401A]">{money(total)}</dd>
      </div>
    </dl>
  );
}

function EmptyState() {
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7EBDD] text-[#C7401A]">
        <BagIcon className="h-7 w-7" />
      </span>
      <p className="text-[15px] font-semibold text-[#2A2420]">{copy.cartEmptyTitle}</p>
      <p className="text-[13.5px] text-[#8A7D71]">{copy.cartEmptyHint}</p>
    </div>
  );
}

/** Desktop sticky cart panel (shown ≥ lg in the menu browser). */
export function CartPanel() {
  const { lines, count } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <aside className="sticky top-20 w-[340px] shrink-0 self-start rounded-2xl border border-[#EADFD0] bg-white p-5 shadow-[0_10px_30px_-20px_rgba(42,36,32,0.4)]">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-curry-display)] text-[20px] font-bold text-[#2A2420]">
          {copy.yourOrder}
        </h2>
        {count > 0 && (
          <span className="rounded-full bg-[#FBE9E1] px-2.5 py-1 text-[12px] font-bold text-[#C7401A]">
            {count} {count === 1 ? copy.itemSingular : copy.itemPlural}
          </span>
        )}
      </div>

      {lines.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ul className="mt-2 divide-y divide-[#F1E7DA]">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <CartLineRow key={line.item.id} line={line} />
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4 border-t border-[#EADFD0] pt-4">
            <Totals />
            <Link
              href={CHECKOUT_HREF}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#C7401A] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
            >
              {copy.proceedToCheckout}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}

/** Mobile bottom tray — collapsed bar that expands into a full sheet (< lg). */
export function MobileCartBar() {
  const { lines, count, total, money } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EADFD0] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-full bg-[#C7401A] px-5 py-3.5 text-white"
        >
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/25 px-1.5 text-[12px] font-bold">
              {count}
            </span>
            {copy.viewCart}
          </span>
          <span className="text-[15px] font-bold">{money(total)}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-[#2A2420]/45 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-[#FFF8F0] p-5"
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#E4D5C3]" />
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-curry-display)] text-[21px] font-bold text-[#2A2420]">
                  {copy.yourOrder}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={copy.closeCart}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4D5C3] text-[#5A4F47]"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <ul className="mt-2 divide-y divide-[#F1E7DA]">
                <AnimatePresence initial={false}>
                  {lines.map((line) => (
                    <CartLineRow key={line.item.id} line={line} />
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-4 border-t border-[#EADFD0] pt-4">
                <Totals />
                <Link
                  href={CHECKOUT_HREF}
                  onClick={() => setOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#C7401A] px-5 py-3.5 text-[15px] font-semibold text-white"
                >
                  {copy.proceedToCheckout}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
