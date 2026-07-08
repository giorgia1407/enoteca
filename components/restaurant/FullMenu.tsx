"use client";

/**
 * Curry & Spice — Deliveroo/Uber-Eats-style ordering centerpiece.
 *
 * Left: sticky category sidebar. Center: searchable/filterable menu grouped by
 * category. Right: sticky cart with order-mode-aware totals + tip. Mobile falls
 * back to sticky category pills + a bottom cart bar/drawer.
 *
 * Upsell etiquette (redesign): the homepage upsell fires at most ONCE per visit
 * (first add here), and the checkout upsell fires at most ONCE (on proceed).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, type CartLine } from "./CartContext";
import { useUI } from "./UIContext";
import { useContent } from "./ContentContext";
import type { CopyContent } from "./data/curryContent";
import { MenuRow } from "./MenuRow";
import { UpsellPopup } from "./UpsellPopup";
import { CheckoutUpsell } from "./CheckoutUpsell";
import { getUpsellSuggestion, type UpsellSuggestion } from "./data/upsellLogic";
import {
  getItem,
  TAX_RATE,
  type CategoryId,
  type MenuItem,
} from "./data/menuData";
import {
  Star,
  PinIcon,
  TimerIcon,
  SearchIcon,
  BagIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  ArrowRight,
} from "./Icons";

const BASE = "";

type OrderMode = "delivery" | "pickup" | "dine-in";

function modeLabel(mode: OrderMode, t: CopyContent): string {
  return mode === "delivery" ? t.modeDelivery : mode === "pickup" ? t.modePickup : t.modeDineInTab;
}
function modeIndicator(mode: OrderMode, t: CopyContent): string {
  return mode === "delivery" ? t.indicatorDelivery : mode === "pickup" ? t.indicatorPickup : t.indicatorDineIn;
}

interface FilterDef {
  key: string;
  labelKey: keyof CopyContent;
  test: (i: MenuItem) => boolean;
}
/** Dietary/price/pick filters — combined with AND. */
const FILTERS: FilterDef[] = [
  { key: "veg", labelKey: "filterVeg", test: (i) => i.tags.veg },
  { key: "vegan", labelKey: "filterVegan", test: (i) => i.tags.vegan },
  { key: "gf", labelKey: "filterGf", test: (i) => i.tags.gf },
  { key: "under15", labelKey: "filterUnder", test: (i) => i.price < 15 },
  { key: "chef", labelKey: "filterChef", test: (i) => !!i.popular },
];
/** Spice filters — combined with OR among themselves (AND with the rest). */
const SPICE_FILTERS: FilterDef[] = [
  { key: "mild", labelKey: "filterMild", test: (i) => i.spice <= 1 },
  { key: "medium", labelKey: "filterMedium", test: (i) => i.spice === 2 },
  { key: "spicy", labelKey: "filterSpicy", test: (i) => i.spice === 3 },
];

const TIP_PERCENTS = [18, 20, 22] as const;

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
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

export function FullMenu() {
  const cart = useCart();
  const router = useRouter();
  const { openBella } = useUI();
  const { t, r, categories, menuItems, itemsByCategory } = useContent();

  const [mode, setMode] = useState<OrderMode>("pickup");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [activeCat, setActiveCat] = useState<CategoryId>(categories[0].id);

  const [homeUpsell, setHomeUpsell] = useState<UpsellSuggestion | null>(null);
  const [checkoutUpsell, setCheckoutUpsell] = useState<UpsellSuggestion | null>(null);

  const sectionRefs = useRef<Partial<Record<CategoryId, HTMLElement | null>>>({});
  const upsellTimer = useRef<number | null>(null);

  const toggleFilter = (key: string) =>
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const query = search.trim().toLowerCase();

  const matches = useCallback(
    (item: MenuItem) => {
      if (query && !`${item.name} ${item.description}`.toLowerCase().includes(query)) return false;
      // Diet/price/pick filters are AND.
      for (const f of FILTERS) if (filters.has(f.key) && !f.test(item)) return false;
      // Spice filters are OR among themselves.
      const activeSpice = SPICE_FILTERS.filter((f) => filters.has(f.key));
      if (activeSpice.length > 0 && !activeSpice.some((f) => f.test(item))) return false;
      return true;
    },
    [query, filters],
  );

  // Visible items per category (respecting search + filters).
  const visibleByCategory = useMemo(() => {
    const map = new Map<CategoryId, MenuItem[]>();
    for (const cat of categories) {
      map.set(cat.id, itemsByCategory(cat.id).filter(matches));
    }
    return map;
  }, [matches, categories, itemsByCategory]);

  const hasResults = menuItems.some(matches);
  const filtering = query.length > 0 || filters.size > 0;

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveCat(visible[0].target.id.replace("cat-", "") as CategoryId);
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [visibleByCategory]);

  const scrollToCat = (id: CategoryId) =>
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Homepage upsell — fires once per visit after the first add here.
  const handleAdd = useCallback(
    (item: MenuItem) => {
      cart.addItem(item.id);
      if (cart.homepageUpsellShown || !cart.canUpsell) return;
      const suggestion = getUpsellSuggestion(item, Object.keys(cart.quantities));
      if (!suggestion) return;
      cart.markHomepageUpsellShown();
      if (upsellTimer.current) window.clearTimeout(upsellTimer.current);
      upsellTimer.current = window.setTimeout(() => setHomeUpsell(suggestion), 1500);
    },
    [cart],
  );

  useEffect(
    () => () => {
      if (upsellTimer.current) window.clearTimeout(upsellTimer.current);
    },
    [],
  );

  const acceptHomeUpsell = () => {
    if (homeUpsell) cart.addItem(homeUpsell.item.id);
    setHomeUpsell(null);
  };
  const dismissHomeUpsell = useCallback(() => {
    cart.registerUpsellDecline();
    setHomeUpsell(null);
  }, [cart]);

  // Checkout upsell — fires once, then routes to /order.
  const goToCheckout = () => router.push(`${BASE}/order`);

  const buildCheckoutSuggestion = (): UpsellSuggestion | null => {
    if (cart.lines.length === 0) return null;
    const ids = cart.lines.map((l) => l.item.id);
    const names = cart.lines.slice(0, 2).map((l) => l.item.name).join(" & ");
    const hasDessert = cart.lines.some((l) => l.item.category === "desserts");
    const hasDrink = cart.lines.some((l) => l.item.category === "drinks");
    const pick = (id: string, why: string): UpsellSuggestion | null => {
      const item = getItem(id);
      return item && !ids.includes(id) ? { item, reason: why } : null;
    };
    if (!hasDessert) {
      const s = pick("gulab-jamun", t.upsellDessert.replace("{names}", names));
      if (s) return s;
    }
    if (!hasDrink) {
      const s = pick("mango-lassi", t.upsellDrink.replace("{names}", names));
      if (s) return s;
    }
    const fallback = getUpsellSuggestion(cart.lines[cart.lines.length - 1].item, ids);
    return fallback
      ? { item: fallback.item, reason: t.upsellAlso.replace("{names}", names).replace("{item}", fallback.item.name) }
      : null;
  };

  const proceedToCheckout = () => {
    if (!cart.checkoutUpsellShown) {
      const suggestion = buildCheckoutSuggestion();
      if (suggestion) {
        cart.markCheckoutUpsellShown();
        setCheckoutUpsell(suggestion);
        return;
      }
    }
    goToCheckout();
  };

  return (
    <section id="order" className="scroll-mt-[80px] bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
        {/* Section header */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C7401A]">
          {t.orderFromKitchen}
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-curry-display)] text-[32px] font-bold text-[#2A2420] sm:text-[40px]">
          {t.fullMenu}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-[#5A4F47]">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 text-[#E8A548]" /> {r.rating} ({r.reviewCount})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="h-4 w-4 text-[#C7401A]" /> {r.neighborhood}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TimerIcon className="h-4 w-4 text-[#4A6B4E]" /> {t.avgWait}: {r.avgWaitMinutes} min
          </span>
          <span className="inline-flex items-center gap-1.5">💳 {t.acceptsCards}</span>
        </div>

        {/* Order mode tabs */}
        <div className="mt-6 flex gap-1 border-b border-[#EADFD0]" role="tablist" aria-label={t.orderTypeAria}>
          {(["delivery", "pickup", "dine-in"] as OrderMode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`relative px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                mode === m ? "text-[#C7401A]" : "text-[#8A7D71] hover:text-[#2A2420]"
              }`}
            >
              {modeLabel(m, t)}
              {mode === m && (
                <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-[#C7401A]" />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-5">
          <label htmlFor="menu-search" className="sr-only">
            {t.searchLabel}
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B4A798]" />
            <input
              id="menu-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchDishes}
              className="w-full rounded-full border border-[#E4D5C3] bg-[#FFF8F0] py-3 pl-12 pr-4 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A]"
            />
          </div>
        </div>

        {/* Filter chips (dietary + spice) */}
        <div className="curry-no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <FilterChip key={f.key} label={t[f.labelKey] as string} active={filters.has(f.key)} onClick={() => toggleFilter(f.key)} />
          ))}
          <span className="mx-1 h-5 w-px shrink-0 bg-[#E4D5C3]" aria-hidden="true" />
          {SPICE_FILTERS.map((f) => (
            <FilterChip key={f.key} label={t[f.labelKey] as string} active={filters.has(f.key)} onClick={() => toggleFilter(f.key)} />
          ))}
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilters(new Set());
              }}
              className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold text-[#C7401A] underline underline-offset-4"
            >
              {t.clear}
            </button>
          )}
        </div>

        {/* Bella entry point */}
        <button
          type="button"
          onClick={openBella}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C7401A]/30 bg-[#FBE9E1] px-4 py-2 text-[13.5px] font-semibold text-[#C7401A] transition-colors hover:bg-[#F6D9CC]"
        >
          <span aria-hidden="true">🌸</span> {t.bellaChip}
        </button>

        {/* Mobile category pills */}
        <nav
          aria-label="Menu categories"
          className="curry-no-scrollbar sticky top-[64px] z-20 -mx-4 mt-5 flex gap-1.5 overflow-x-auto border-y border-[#EADFD0] bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden"
        >
          {categories.map((cat) => {
            const n = visibleByCategory.get(cat.id)?.length ?? 0;
            if (filtering && n === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCat(cat.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  activeCat === cat.id ? "bg-[#C7401A] text-white" : "bg-[#F3E6D6] text-[#5A4F47]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Three-column body */}
        <div className="mt-6 flex gap-8">
          {/* Left sidebar */}
          <nav
            aria-label="Menu categories"
            className="sticky top-[88px] hidden h-fit w-[240px] shrink-0 self-start lg:block"
          >
            <ul className="space-y-0.5">
              {categories.map((cat) => {
                const n = visibleByCategory.get(cat.id)?.length ?? 0;
                if (filtering && n === 0) return null;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => scrollToCat(cat.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-[14px] font-semibold transition-colors ${
                        activeCat === cat.id
                          ? "bg-[#C7401A] text-white"
                          : "text-[#5A4F47] hover:bg-[#FBE9E1]"
                      }`}
                    >
                      <span className="uppercase tracking-wide">{cat.label}</span>
                      <span className={activeCat === cat.id ? "text-white/80" : "text-[#B4A798]"}>
                        {itemsByCategory(cat.id).length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Center menu list */}
          <div className="min-w-0 flex-1">
            {!hasResults ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#E4D5C3] py-16 text-center">
                <SearchIcon className="h-8 w-8 text-[#C9A78F]" />
                <p className="text-[15px] font-semibold text-[#2A2420]">{t.noResults}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setFilters(new Set());
                  }}
                  className="text-[14px] font-semibold text-[#C7401A] underline underline-offset-4"
                >
                  {t.clearSearch}
                </button>
              </div>
            ) : (
              categories.map((cat) => {
                const items = visibleByCategory.get(cat.id) ?? [];
                if (items.length === 0) return null;
                return (
                  <section
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    ref={(el) => {
                      sectionRefs.current[cat.id] = el;
                    }}
                    className="scroll-mt-[128px] pt-8 first:pt-0 lg:scroll-mt-[96px]"
                  >
                    <h3 className="font-[family-name:var(--font-curry-display)] text-[28px] font-bold text-[#2A2420] sm:text-[32px]">
                      <span aria-hidden="true">{cat.emoji}</span> {cat.label}
                    </h3>
                    <p className="mt-0.5 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
                      {cat.blurb}
                    </p>
                    <div className="mt-3">
                      {items.map((item) => (
                        <MenuRow key={item.id} item={item} onAdd={handleAdd} />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {/* Right cart */}
          <div className="hidden lg:block">
            <FullMenuCart mode={mode} onCheckout={proceedToCheckout} />
          </div>
        </div>
      </div>

      {/* Mobile cart bar + drawer */}
      <MobileCartBar mode={mode} onCheckout={proceedToCheckout} />

      {/* Upsells */}
      <AnimatePresence>
        {homeUpsell && (
          <UpsellPopup
            suggestion={homeUpsell}
            onAccept={acceptHomeUpsell}
            onDismiss={dismissHomeUpsell}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkoutUpsell && (
          <CheckoutUpsell
            suggestion={checkoutUpsell}
            onAddAndContinue={() => {
              cart.addItem(checkoutUpsell.item.id);
              setCheckoutUpsell(null);
              goToCheckout();
            }}
            onContinue={() => {
              setCheckoutUpsell(null);
              goToCheckout();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cart (shared inner used by desktop panel + mobile drawer)           */
/* ------------------------------------------------------------------ */

function useTip(subtotal: number) {
  const [tip, setTip] = useState<number | "custom" | null>(null);
  const [customTip, setCustomTip] = useState("");
  const amount = useMemo(() => {
    if (tip === "custom") {
      const v = parseFloat(customTip);
      return Number.isFinite(v) && v > 0 ? v : 0;
    }
    if (typeof tip === "number") return Math.round(subtotal * (tip / 100) * 100) / 100;
    return 0;
  }, [tip, customTip, subtotal]);
  return { tip, setTip, customTip, setCustomTip, amount };
}

function CartInner({
  mode,
  onCheckout,
  onClose,
}: {
  mode: OrderMode;
  onCheckout: () => void;
  onClose?: () => void;
}) {
  const { lines, subtotal, tax, money } = useCart();
  const { openBella } = useUI();
  const { r, t } = useContent();
  const { tip, setTip, customTip, setCustomTip, amount: tipAmount } = useTip(subtotal);
  const deliveryFee = mode === "delivery" ? r.deliveryFee : 0;
  const total = subtotal + tax + deliveryFee + tipAmount;

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#FFF8F0] p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7EBDD] text-[#C7401A]">
          <BagIcon className="h-7 w-7" />
        </span>
        <p className="text-[15px] font-semibold text-[#2A2420]">{t.basketEmpty}</p>
        <p className="text-[13.5px] text-[#8A7D71]">
          {t.basketEmptyHint}
        </p>
        <button
          type="button"
          onClick={openBella}
          className="mt-1 text-[13.5px] font-semibold text-[#C7401A] underline underline-offset-4 hover:text-[#A5330F]"
        >
          {t.askBella}
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="rounded-lg bg-[#F7EBDD] px-3 py-2 text-[13px] font-semibold text-[#5A4F47]">
        {modeIndicator(mode, t)}
      </p>

      {lines.length <= 2 && (
        <button
          type="button"
          onClick={openBella}
          className="mt-2 w-full rounded-lg border border-[#C7401A]/25 bg-[#FBE9E1] px-3 py-2 text-[12.5px] font-semibold text-[#C7401A] transition-colors hover:bg-[#F6D9CC]"
        >
          {t.askBellaSuggestion}
        </button>
      )}

      <ul className="mt-3 divide-y divide-[#F1E7DA]">
        {lines.map((line) => (
          <CartRow key={line.item.id} line={line} />
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-[#EADFD0] pt-4 text-[14px]">
        <div className="flex justify-between text-[#5A4F47]">
          <dt>{t.subtotal}</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-[#5A4F47]">
          <dt>{t.tax} ({(TAX_RATE * 100).toFixed(2)}%)</dt>
          <dd>{money(tax)}</dd>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between text-[#5A4F47]">
            <dt>{t.deliveryFeeLabel}</dt>
            <dd>{money(deliveryFee)}</dd>
          </div>
        )}
        {tipAmount > 0 && (
          <div className="flex justify-between text-[#5A4F47]">
            <dt>{t.tip}</dt>
            <dd>{money(tipAmount)}</dd>
          </div>
        )}
        <div className="mt-1 flex justify-between border-t border-[#EADFD0] pt-2 text-[22px] font-bold text-[#2A2420]">
          <dt>{t.total}</dt>
          <dd className="text-[#C7401A]">{money(total)}</dd>
        </div>
      </dl>

      {/* Tip */}
      <div className="mt-4">
        <p className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-[#8A7D71]">{t.addTip}</p>
        <div className="flex flex-wrap gap-2">
          {TIP_PERCENTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setTip((cur) => (cur === p ? null : p))}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                tip === p ? "border-[#C7401A] bg-[#C7401A] text-white" : "border-[#E4D5C3] text-[#5A4F47] hover:border-[#C7401A]"
              }`}
            >
              {p}%
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTip("custom")}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              tip === "custom" ? "border-[#C7401A] bg-[#C7401A] text-white" : "border-[#E4D5C3] text-[#5A4F47] hover:border-[#C7401A]"
            }`}
          >
            {t.custom}
          </button>
          {tip === "custom" && (
            <input
              type="number"
              min="0"
              step="1"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder={t.tipPlaceholder}
              aria-label={t.customTipAria}
              className="w-20 rounded-full border border-[#E4D5C3] px-3 py-1.5 text-[13px] outline-none focus:border-[#C7401A]"
            />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onClose?.();
          onCheckout();
        }}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#C7401A] text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
      >
        {t.proceedToCheckout}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function CartRow({ line }: { line: CartLine }) {
  const { addItem, decrementItem, money } = useCart();
  const { t } = useContent();
  return (
    <li className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[#2A2420]">{line.item.name}</p>
        <p className="text-[12.5px] text-[#8A7D71]">{money(line.item.price)} {t.eachLabel}</p>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#EADFD0] px-1 py-0.5">
        <button
          type="button"
          onClick={() => decrementItem(line.item.id)}
          aria-label={`${t.removeOne} ${line.item.name}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#C7401A] hover:bg-[#FBE9E1]"
        >
          <MinusIcon className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-4 text-center text-[14px] font-bold text-[#2A2420]">{line.qty}</span>
        <button
          type="button"
          onClick={() => addItem(line.item.id)}
          aria-label={`${t.addOne} ${line.item.name}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#C7401A] hover:bg-[#FBE9E1]"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      <span className="w-16 shrink-0 text-right text-[14px] font-bold text-[#C7401A]">
        {money(line.lineTotal)}
      </span>
    </li>
  );
}

function FullMenuCart({ mode, onCheckout }: { mode: OrderMode; onCheckout: () => void }) {
  const { count } = useCart();
  const { t } = useContent();
  return (
    <aside className="sticky top-[88px] w-[320px] shrink-0 self-start rounded-2xl border border-[#EADFD0] bg-white p-5 shadow-[0_10px_30px_-20px_rgba(42,36,32,0.4)]">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-curry-display)] text-[24px] font-bold text-[#2A2420]">
          {t.yourOrder}
        </h2>
        {count > 0 && (
          <span className="rounded-full bg-[#FBE9E1] px-2.5 py-1 text-[12px] font-bold text-[#C7401A]">
            {count}
          </span>
        )}
      </div>
      <div className="mt-3">
        <CartInner mode={mode} onCheckout={onCheckout} />
      </div>
    </aside>
  );
}

function MobileCartBar({ mode, onCheckout }: { mode: OrderMode; onCheckout: () => void }) {
  const { count, total, money } = useCart();
  const { t } = useContent();
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
            {t.viewCart}
          </span>
          <span className="text-[15px] font-bold">{money(total)}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <MobileCartDrawer mode={mode} onCheckout={onCheckout} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileCartDrawer({
  mode,
  onCheckout,
  onClose,
}: {
  mode: OrderMode;
  onCheckout: () => void;
  onClose: () => void;
}) {
  const { t } = useContent();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end bg-[#2A2420]/45 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-5"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#E4D5C3]" />
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-curry-display)] text-[22px] font-bold text-[#2A2420]">
            {t.yourOrder}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeCart}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E4D5C3] text-[#5A4F47]"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3">
          <CartInner mode={mode} onCheckout={onCheckout} onClose={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
}
