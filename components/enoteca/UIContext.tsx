"use client";

/**
 * Il Tempio di Vino — shared UI overlay state.
 *
 * The cart drawer can be opened from many places (nav, product card, product
 * page, "added to cart" toast), so its open/close lives here to avoid
 * prop-drilling. Kept separate from the cart data so cart re-renders don't
 * churn overlay state.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

interface UIValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const UIContext = createContext<UIValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const value = useMemo<UIValue>(
    () => ({ cartOpen, openCart, closeCart }),
    [cartOpen, openCart, closeCart],
  );

  // `reducedMotion="user"` makes every Framer Motion animation on the site honour
  // the OS prefers-reduced-motion setting (transforms/opacity are neutralised),
  // complementing the CSS @media reduced-motion rules in globals.css.
  return (
    <UIContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </UIContext.Provider>
  );
}

export function useUI(): UIValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
