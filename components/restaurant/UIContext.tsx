"use client";

/**
 * Curry & Spice — shared UI overlay state.
 *
 * Two site-wide overlays (the AI-waiter "Bella" panel and the order-mode picker
 * modal) can be opened from many places — the hero, the nav, the menu, the
 * cart. This tiny context exposes open/close controls so any component in the
 * Curry subtree can trigger them without prop-drilling. Kept separate from the
 * cart so cart re-renders don't churn overlay state.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface UIValue {
  bellaOpen: boolean;
  openBella: () => void;
  closeBella: () => void;
  orderPickerOpen: boolean;
  openOrderPicker: () => void;
  closeOrderPicker: () => void;
}

const UIContext = createContext<UIValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [bellaOpen, setBellaOpen] = useState(false);
  const [orderPickerOpen, setOrderPickerOpen] = useState(false);

  const openBella = useCallback(() => setBellaOpen(true), []);
  const closeBella = useCallback(() => setBellaOpen(false), []);
  const openOrderPicker = useCallback(() => setOrderPickerOpen(true), []);
  const closeOrderPicker = useCallback(() => setOrderPickerOpen(false), []);

  const value = useMemo<UIValue>(
    () => ({
      bellaOpen,
      openBella,
      closeBella,
      orderPickerOpen,
      openOrderPicker,
      closeOrderPicker,
    }),
    [bellaOpen, orderPickerOpen, openBella, closeBella, openOrderPicker, closeOrderPicker],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
