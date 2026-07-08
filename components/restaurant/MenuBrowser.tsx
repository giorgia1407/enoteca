"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { MENU_PAGE_COPY } from "./data/curryMenuPageContent";
import { MenuItemCard } from "./MenuItemCard";
import { UpsellPopup } from "./UpsellPopup";
import { CartPanel, MobileCartBar } from "./Cart";
import { type CategoryId, type MenuItem } from "./data/menuData";
import { getUpsellSuggestion, type UpsellSuggestion } from "./data/upsellLogic";

interface DietaryFilter {
  key: "veg" | "vegan" | "gf";
  labelKey: "filterVeg" | "filterVegan" | "filterGf";
  emoji?: string;
}
const DIETARY_FILTERS: DietaryFilter[] = [
  { key: "veg", labelKey: "filterVeg", emoji: "🌱" },
  { key: "vegan", labelKey: "filterVegan" },
  { key: "gf", labelKey: "filterGf" },
];
const SPICE_FILTERS: {
  key: 1 | 2 | 3;
  labelKey: "spiceMild" | "spiceMedium" | "spiceSpicy";
  chili: string;
}[] = [
  { key: 1, labelKey: "spiceMild", chili: "🌶" },
  { key: 2, labelKey: "spiceMedium", chili: "🌶🌶" },
  { key: 3, labelKey: "spiceSpicy", chili: "🌶🌶🌶" },
];

export function MenuBrowser() {
  const { addItem, registerUpsellDecline, canUpsell, quantities } = useCart();
  const { categories, itemsByCategory: getItemsByCategory } = useContent();
  const locale: "en" | "it" = "it";
  const copy = MENU_PAGE_COPY[locale === "it" ? "it" : "en"];

  const [activeDietary, setActiveDietary] = useState<Set<string>>(new Set());
  const [activeSpice, setActiveSpice] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<CategoryId>(categories[0].id);
  const [upsell, setUpsell] = useState<UpsellSuggestion | null>(null);

  const sectionRefs = useRef<Partial<Record<CategoryId, HTMLElement | null>>>({});
  const upsellTimer = useRef<number | null>(null);

  const hasFilters = activeDietary.size > 0 || activeSpice.size > 0;

  const matches = useCallback(
    (item: MenuItem) => {
      for (const key of activeDietary) {
        if (!item.tags[key as "veg" | "vegan" | "gf"]) return false;
      }
      if (activeSpice.size > 0 && !activeSpice.has(item.spice)) return false;
      return true;
    },
    [activeDietary, activeSpice],
  );

  const toggleDietary = (key: string) =>
    setActiveDietary((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const toggleSpice = (key: number) =>
    setActiveSpice((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const clearFilters = () => {
    setActiveDietary(new Set());
    setActiveSpice(new Set());
  };

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveCategory(visible[0].target.id.replace("cat-", "") as CategoryId);
        }
      },
      { rootMargin: "-150px 0px -65% 0px", threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: CategoryId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = useCallback(
    (item: MenuItem) => {
      addItem(item.id);
      if (!canUpsell || upsell) return;
      const suggestion = getUpsellSuggestion(item, Object.keys(quantities));
      if (!suggestion) return;
      if (upsellTimer.current) window.clearTimeout(upsellTimer.current);
      upsellTimer.current = window.setTimeout(() => setUpsell(suggestion), 1500);
    },
    [addItem, canUpsell, upsell, quantities],
  );

  useEffect(() => {
    return () => {
      if (upsellTimer.current) window.clearTimeout(upsellTimer.current);
    };
  }, []);

  const acceptUpsell = () => {
    if (upsell) addItem(upsell.item.id);
    setUpsell(null);
  };
  const dismissUpsell = useCallback(() => {
    registerUpsellDecline();
    setUpsell(null);
  }, [registerUpsellDecline]);

  const itemsByCategory = useMemo(() => {
    const map = new Map<CategoryId, MenuItem[]>();
    for (const cat of categories) map.set(cat.id, getItemsByCategory(cat.id));
    return map;
  }, [categories, getItemsByCategory]);

  return (
    <div className="bg-[#FFF8F0]">
      {/* Menu header */}
      <div className="mx-auto max-w-6xl px-5 pb-2 pt-8 sm:px-8 sm:pt-10">
        <p className="font-[family-name:var(--font-curry-accent)] text-[18px] italic text-[#C7401A]">
          {copy.menuTagline}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-curry-display)] text-[34px] font-bold leading-none text-[#2A2420] sm:text-[44px]">
          {copy.menuTitle}
        </h1>
      </div>

      {/* Sticky category tabs */}
      <div className="sticky top-14 z-30 border-y border-[#EADFD0] bg-[#FFF8F0]/95 backdrop-blur md:top-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-8">
          <div className="curry-no-scrollbar flex gap-1 overflow-x-auto py-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#C7401A] text-white"
                    : "text-[#5A4F47] hover:bg-[#F3E6D6]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <div className="curry-no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          {DIETARY_FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              active={activeDietary.has(f.key)}
              onClick={() => toggleDietary(f.key)}
              label={`${f.emoji ? f.emoji + " " : ""}${copy[f.labelKey]}`}
            />
          ))}
          <span className="mx-1 h-5 w-px shrink-0 bg-[#E4D5C3]" aria-hidden="true" />
          {SPICE_FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              active={activeSpice.has(f.key)}
              onClick={() => toggleSpice(f.key)}
              label={`${copy[f.labelKey]} ${f.chili}`}
            />
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold text-[#C7401A] underline underline-offset-4 transition-colors hover:text-[#A5330F]"
            >
              {copy.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Main grid + desktop cart */}
      {/* Extra bottom padding on mobile/tablet so the fixed cart tray never
          covers the last row of dishes. */}
      <div className="mx-auto flex max-w-6xl gap-8 px-5 pb-32 sm:px-8 lg:pb-16">
        <div className="min-w-0 flex-1">
          {categories.map((cat) => {
            const items = itemsByCategory.get(cat.id) ?? [];
            if (items.length === 0) return null;
            return (
              <section
                key={cat.id}
                id={`cat-${cat.id}`}
                ref={(el) => {
                  sectionRefs.current[cat.id] = el;
                }}
                className="scroll-mt-[132px] pt-8 first:pt-2 md:scroll-mt-[140px]"
              >
                <div className="flex items-baseline gap-3">
                  <h2 className="font-[family-name:var(--font-curry-display)] text-[26px] font-bold text-[#2A2420]">
                    <span aria-hidden="true">{cat.emoji}</span> {cat.label}
                  </h2>
                </div>
                <p className="mt-0.5 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
                  {cat.blurb}
                </p>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAdd={handleAdd}
                      dimmed={hasFilters && !matches(item)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <CartPanel />
        </div>
      </div>

      <MobileCartBar />

      <AnimatePresence>
        {upsell && (
          <UpsellPopup
            suggestion={upsell}
            onAccept={acceptUpsell}
            onDismiss={dismissUpsell}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? "border-[#C7401A] bg-[#C7401A] text-white"
          : "border-[#E4D5C3] bg-white text-[#5A4F47] hover:border-[#C7401A]"
      }`}
    >
      {label}
    </button>
  );
}
