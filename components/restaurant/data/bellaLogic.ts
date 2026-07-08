/**
 * Curry & Spice — "Bella" the AI waiter: recommendation logic.
 *
 * Pure, dependency-free helpers that turn a guest's stated preferences (diet,
 * spice, mood) into a menu recommendation list. There is no real AI — this is a
 * deterministic filter presented conversationally by BellaAssistant.
 */

import { MENU_ITEMS, type MenuItem } from "./menuData";

export type Diet = "none" | "vegetarian" | "vegan" | "gf" | "nut";
export type Spice = "mild" | "medium" | "spicy" | "any";
export type Mood = "chef" | "light" | "feast" | "curries" | "biryanis" | "browse";

export interface BellaPrefs {
  orderType: "dine-in" | "pickup" | "delivery" | null;
  partySize: string | null;
  diet: Diet;
  spice: Spice;
  mood: Mood | null;
}

/** Dishes that contain nuts (cashew/almond/pistachio) — hidden for nut allergy. */
export const NUT_ITEMS = new Set<string>([
  "peshawari-naan",
  "mango-kulfi",
  "kheer",
  "gajar-halwa",
  "chicken-korma",
  "veg-biryani",
  "chicken-biryani",
  "lamb-biryani",
]);

export function matchesDiet(item: MenuItem, diet: Diet): boolean {
  if (diet === "vegetarian") return item.tags.veg;
  if (diet === "vegan") return item.tags.vegan;
  if (diet === "gf") return item.tags.gf;
  if (diet === "nut") return !NUT_ITEMS.has(item.id);
  return true;
}

export function matchesSpice(item: MenuItem, spice: Spice): boolean {
  if (spice === "mild") return item.spice <= 1;
  if (spice === "medium") return item.spice <= 2;
  return true; // spicy / anything → no ceiling
}

/**
 * Ordered list of recommended item ids for the given preferences. The caller
 * pages through this in groups of three.
 */
export function buildRecommendations(prefs: BellaPrefs): string[] {
  const pool = MENU_ITEMS.filter(
    (i) => matchesDiet(i, prefs.diet) && matchesSpice(i, prefs.spice),
  );

  const isMain = (i: MenuItem) => i.category === "curries" || i.category === "biryani-rice";
  let focus: MenuItem[];
  switch (prefs.mood) {
    case "curries":
      focus = pool.filter((i) => i.category === "curries");
      break;
    case "biryanis":
      focus = pool.filter((i) => i.category === "biryani-rice");
      break;
    case "light":
      focus = pool.filter(
        (i) =>
          i.tags.veg &&
          i.spice <= 1 &&
          (isMain(i) || i.category === "small-plates" || i.category === "appetizers"),
      );
      break;
    case "feast":
      focus = pool.filter(isMain);
      break;
    default: // chef / browse fallback
      focus = pool.filter((i) => i.popular && (isMain(i) || i.category === "small-plates"));
  }

  // Backfill so we always have at least three suggestions.
  const seen = new Set(focus.map((i) => i.id));
  const backfill = pool.filter((i) => isMain(i) && !seen.has(i.id));
  focus = focus.concat(backfill);
  for (const i of pool) {
    if (focus.length >= 6) break;
    if (!focus.some((f) => f.id === i.id)) focus.push(i);
  }

  const popRank = (i: MenuItem) => (i.popular ? 1 : 0);
  if (prefs.spice === "spicy") {
    focus.sort((a, b) => b.spice - a.spice || popRank(b) - popRank(a));
  } else {
    focus.sort((a, b) => popRank(b) - popRank(a));
  }

  // Dedup, preserving order.
  const out: string[] = [];
  const added = new Set<string>();
  for (const i of focus) {
    if (!added.has(i.id)) {
      added.add(i.id);
      out.push(i.id);
    }
  }
  return out;
}

/** Diet-aware starter suggestion id for the appetizer upsell. */
export function pickStarter(diet: Diet): string {
  if (diet === "vegan" || diet === "gf") return "onion-bhaji"; // vegan + gluten-free
  return "samosa-chaat";
}

/** Diet-aware dessert suggestion id, or null when nothing fits (e.g. vegan). */
export function pickDessert(diet: Diet): string | null {
  if (diet === "vegan") return null; // all desserts contain dairy
  if (diet === "gf") return "mango-kulfi"; // gluten-free
  return "gulab-jamun";
}

/** Diet-aware drink options for Bella's drinks upsell. */
export function drinkOptions(diet: Diet): string[] {
  if (diet === "vegan") return ["rose-lemonade", "sparkling-water"];
  return ["rose-lemonade", "mango-lassi", "masala-chai"];
}
