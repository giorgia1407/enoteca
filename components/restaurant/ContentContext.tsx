"use client";

/**
 * Curry & Spice — locale-aware content provider.
 *
 * Resolves the active locale to the right brand identity, UI copy,
 * localized menu (Italian descriptions + euro prices merged over the shared
 * item ids/images) and a money formatter. Components read everything through
 * `useContent()` so English output is unchanged and Italian is native.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MENU_ITEMS, type MenuItem, type CategoryId } from "./data/menuData";
import { MENU_IT } from "./data/menuData.it";
import { REVIEWS, type Review } from "./data/reviewsData";
import { REVIEWS_IT } from "./data/reviewsData.it";
import {
  getContent,
  formatMoney,
  type Content,
  type Locale,
} from "./data/curryContent";

interface ContentValue extends Content {
  money: (amount: number) => string;
  menuItems: MenuItem[];
  getItem: (id: string) => MenuItem | undefined;
  itemsByCategory: (cat: CategoryId) => MenuItem[];
  popularItems: MenuItem[];
  reviews: Review[];
}

const ContentContext = createContext<ContentValue | null>(null);

function buildValue(locale: Locale): ContentValue {
  const content = getContent(locale);
  const items: MenuItem[] =
    locale === "it"
      ? MENU_ITEMS.map((it) => {
          const o = MENU_IT[it.id];
          return o ? { ...it, name: o.name ?? it.name, description: o.description, price: o.price } : it;
        })
      : MENU_ITEMS;

  const byId = new Map(items.map((i) => [i.id, i]));

  return {
    ...content,
    money: (amount: number) => formatMoney(locale, amount),
    menuItems: items,
    getItem: (id: string) => byId.get(id),
    itemsByCategory: (cat: CategoryId) => items.filter((i) => i.category === cat),
    popularItems: items.filter((i) => i.popular),
    reviews: locale === "it" ? REVIEWS_IT : REVIEWS,
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const locale: "en" | "it" = "it";
  const value = useMemo(() => buildValue(locale === "it" ? "it" : "en"), [locale]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
