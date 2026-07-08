"use client";

/**
 * Curry & Spice — cart state.
 *
 * A tiny in-memory cart shared across the menu, cart panel, checkout and
 * upsell popup. It persists to sessionStorage so a page refresh (or navigating
 * menu → checkout) keeps the order, but the cart naturally clears when the tab
 * closes — appropriate for a demo. No backend, no localStorage cross-session
 * leakage.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getItem, TAX_RATE, type MenuItem } from "./data/menuData";
import { MENU_IT } from "./data/menuData.it";
import { formatMoney } from "./data/curryContent";
import { MAX_DECLINES } from "./data/upsellLogic";

/** Apply Italian name/description/price overrides to a menu item. */
function localizeItem(item: MenuItem, locale: string): MenuItem {
  if (locale !== "it") return item;
  const o = MENU_IT[item.id];
  return o ? { ...item, name: o.name ?? item.name, description: o.description, price: o.price } : item;
}

const STORAGE_KEY = "curry-kin-cart-v1";

export interface CartLine {
  item: MenuItem;
  qty: number;
  lineTotal: number;
}

interface CartContextValue {
  quantities: Record<string, number>;
  lines: CartLine[];
  count: number;
  subtotal: number;
  tax: number;
  total: number;
  /** Locale-aware currency formatter ($ for en, € for it). */
  money: (amount: number) => string;
  addItem: (id: string) => void;
  decrementItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  /** Upsell throttling — the menu records each declined/ignored suggestion. */
  registerUpsellDecline: () => void;
  canUpsell: boolean;
  /**
   * One-shot upsell gates for the redesigned homepage. Both are in-memory only
   * (reset on reload): the homepage upsell fires once after the first add, the
   * checkout upsell fires once when the guest heads to checkout.
   */
  homepageUpsellShown: boolean;
  markHomepageUpsellShown: () => void;
  checkoutUpsellShown: boolean;
  markCheckoutUpsellShown: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const locale: "en" | "it" = "it";
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [declines, setDeclines] = useState(0);
  const [homepageUpsellShown, setHomepageUpsellShown] = useState(false);
  const [checkoutUpsellShown, setCheckoutUpsellShown] = useState(false);
  const hydrated = useRef(false);

  // Hydrate the cart from sessionStorage once on mount. This is a deliberate
  // client-only external-sync effect (sessionStorage is unavailable during SSR,
  // so a lazy initializer would cause a hydration mismatch on the cart badge).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        // Drop any ids that no longer exist in the menu.
        const clean: Record<string, number> = {};
        for (const [id, qty] of Object.entries(parsed)) {
          if (getItem(id) && qty > 0) clean[id] = qty;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from external store
        setQuantities(clean);
      }
    } catch {
      /* ignore malformed storage */
    }
    hydrated.current = true;
  }, []);

  // Persist on change (only after the initial load, so we never clobber).
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      /* storage may be unavailable — cart still works in-memory */
    }
  }, [quantities]);

  const addItem = useCallback((id: string) => {
    if (!getItem(id)) return;
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const decrementItem = useCallback((id: string) => {
    setQuantities((prev) => {
      const next = { ...prev };
      const current = next[id] ?? 0;
      if (current <= 1) delete next[id];
      else next[id] = current - 1;
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setQuantities((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setQuantities({}), []);

  const registerUpsellDecline = useCallback(
    () => setDeclines((d) => d + 1),
    [],
  );

  const markHomepageUpsellShown = useCallback(() => setHomepageUpsellShown(true), []);
  const markCheckoutUpsellShown = useCallback(() => setCheckoutUpsellShown(true), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    for (const [id, qty] of Object.entries(quantities)) {
      const base = getItem(id);
      if (!base || qty <= 0) continue;
      const item = localizeItem(base, locale);
      lines.push({ item, qty, lineTotal: item.price * qty });
    }
    lines.sort((a, b) => a.item.name.localeCompare(b.item.name));

    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const count = lines.reduce((sum, l) => sum + l.qty, 0);

    return {
      quantities,
      lines,
      count,
      subtotal,
      tax,
      total: subtotal + tax,
      money: (amount: number) => formatMoney(locale === "it" ? "it" : "en", amount),
      addItem,
      decrementItem,
      setQty,
      removeItem,
      clearCart,
      registerUpsellDecline,
      canUpsell: declines < MAX_DECLINES,
      homepageUpsellShown,
      markHomepageUpsellShown,
      checkoutUpsellShown,
      markCheckoutUpsellShown,
    };
  }, [
    quantities,
    declines,
    locale,
    addItem,
    decrementItem,
    setQty,
    removeItem,
    clearCart,
    registerUpsellDecline,
    homepageUpsellShown,
    markHomepageUpsellShown,
    checkoutUpsellShown,
    markCheckoutUpsellShown,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

/** Shared currency formatter used across the demo. */
export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
