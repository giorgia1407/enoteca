"use client";

/**
 * Il Tempio di Vino — WhatsApp order cart.
 *
 * A small in-memory cart shared across the catalogue, cart drawer and product
 * pages. Phase 1 has no real checkout: the cart's primary action builds a
 * pre-filled WhatsApp order message (see lib/constants). It persists to
 * sessionStorage so a refresh or navigation keeps the order, but clears when
 * the tab closes.
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
import { WINES, type Wine } from "@/data/productData";

const STORAGE_KEY = "enoteca-cart-v1";

const BY_ID = new Map<string, Wine>(WINES.map((w) => [w.id, w]));

export interface CartLine {
  item: Wine;
  qty: number;
  lineTotal: number;
}

interface CartContextValue {
  quantities: Record<string, number>;
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (id: string) => void;
  decrementItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  has: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const hydrated = useRef(false);

  // One-time hydration from sessionStorage (client-only external store).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const clean: Record<string, number> = {};
        for (const [id, qty] of Object.entries(parsed)) {
          if (BY_ID.has(id) && qty > 0) clean[id] = qty;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from external store
        setQuantities(clean);
      }
    } catch {
      /* ignore malformed storage */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      /* storage may be unavailable — cart still works in-memory */
    }
  }, [quantities]);

  const addItem = useCallback((id: string) => {
    if (!BY_ID.has(id)) return;
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

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    for (const [id, qty] of Object.entries(quantities)) {
      const item = BY_ID.get(id);
      if (!item || qty <= 0) continue;
      lines.push({ item, qty, lineTotal: item.price * qty });
    }
    lines.sort((a, b) => a.item.name.localeCompare(b.item.name));

    const subtotal = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100;
    const count = lines.reduce((s, l) => s + l.qty, 0);

    return {
      quantities,
      lines,
      count,
      subtotal,
      addItem,
      decrementItem,
      setQty,
      removeItem,
      clearCart,
      has: (id: string) => (quantities[id] ?? 0) > 0,
    };
  }, [quantities, addItem, decrementItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
