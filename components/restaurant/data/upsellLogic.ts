/**
 * Curry & Spice — "AI" pairing engine.
 *
 * It is really a small rules + lookup system, but the UI presents it as an
 * intelligent chef's recommendation. Given the item a guest just added and the
 * ids already in their cart, `getUpsellSuggestion` returns the single best
 * pairing to surface (or null when nothing sensible is left to suggest).
 *
 * Guardrails (enforced by the calling component, values exported here):
 *   · one suggestion per cart addition
 *   · never suggest something already in the cart
 *   · stop after MAX_DECLINES ignored/declined prompts in a session
 */

import {
  getItem,
  MENU_ITEMS,
  type MenuItem,
  type CategoryId,
} from "./menuData";

export interface UpsellSuggestion {
  item: MenuItem;
  /** Warm, human reason shown in the popup body. */
  reason: string;
}

/** After this many declined prompts we stop upselling for the session. */
export const MAX_DECLINES = 3;

const MAIN_CATEGORIES: CategoryId[] = ["curries", "biryani-rice", "small-plates"];

/** First item in the list that exists and isn't already in the cart. */
function firstAvailable(ids: string[], inCart: Set<string>): MenuItem | null {
  for (const id of ids) {
    if (inCart.has(id)) continue;
    const item = getItem(id);
    if (item) return item;
  }
  return null;
}

function cartHasCategory(inCart: Set<string>, category: CategoryId): boolean {
  for (const id of inCart) {
    if (getItem(id)?.category === category) return true;
  }
  return false;
}

/**
 * Ordered list of candidate pairings, each with a reason. The first candidate
 * whose item is available (exists + not in cart) wins.
 */
export function getUpsellSuggestion(
  added: MenuItem,
  cartItemIds: string[],
): UpsellSuggestion | null {
  const inCart = new Set(cartItemIds);
  inCart.add(added.id);

  type Candidate = { ids: string[]; reason: string };
  const candidates: Candidate[] = [];

  const isMain = added.category === "curries" || added.category === "biryani-rice";
  const isStarter = added.category === "appetizers" || added.category === "small-plates";
  const hasMainInCart =
    cartHasCategory(inCart, "curries") || cartHasCategory(inCart, "biryani-rice");

  // 0. Ordering a main? Lead with a starter, then a sweet finish (top priority).
  if (isMain) {
    candidates.push({
      ids: ["samosa-chaat", "chicken-tikka", "paneer-65", "papdi-chaat", "onion-bhaji"],
      reason: `Start with something to share while your ${added.name} is prepared — our starters are a favourite.`,
    });
    candidates.push({
      ids: ["gulab-jamun", "mango-kulfi", "gajar-halwa", "kheer"],
      reason: `Save room for something sweet — the perfect finish to ${added.name}.`,
    });
  }

  // 0b. A starter on its own? Nudge toward a main to build the meal.
  if (isStarter && !hasMainInCart) {
    candidates.push({
      ids: ["butter-chicken", "dal-makhani", "palak-paneer", "chicken-biryani"],
      reason: `${added.name} is a lovely start — pair it with our most-loved Butter Chicken.`,
    });
  }

  // 0c. A dessert first? Offer a chai to sit with it.
  if (added.category === "desserts") {
    candidates.push({
      ids: ["masala-chai", "mango-lassi"],
      reason: `A cup of Masala Chai rounds off ${added.name} beautifully.`,
    });
  }

  // 1. Hand-picked pairings on the dish itself — strong signal.
  if (added.pairsWith?.length) {
    candidates.push({
      ids: added.pairsWith,
      reason: `Guests who order ${added.name} almost always add this. Chef's pick.`,
    });
  }

  // 2. A spicy dish begs for something cooling.
  if (added.spice >= 3) {
    candidates.push({
      ids: ["mango-lassi", "cucumber-raita", "salted-lassi"],
      reason: `${added.name} brings the heat — a Mango Lassi cools the palate beautifully.`,
    });
  }

  // 3. Biryanis are traditionally served with raita.
  if (added.category === "biryani-rice" && added.id !== "jeera-rice") {
    candidates.push({
      ids: ["cucumber-raita"],
      reason: `A Cucumber Raita is the classic partner for ${added.name} — cool, creamy, perfect.`,
    });
  }

  // 4. Any curry wants bread to scoop with, then rice.
  if (added.category === "curries") {
    if (!cartHasCategory(inCart, "breads")) {
      candidates.push({
        ids: ["garlic-naan", "butter-naan"],
        reason: `Fresh Garlic Naan is made for scooping up every drop of ${added.name}.`,
      });
    }
    if (!cartHasCategory(inCart, "biryani-rice")) {
      candidates.push({
        ids: ["jeera-rice", "steamed-basmati"],
        reason: `A side of fragrant Jeera Rice rounds out ${added.name} nicely.`,
      });
    }
  }

  // 5. A bread on its own hints at a curry to go with it.
  if (added.category === "breads" && !cartHasCategory(inCart, "curries")) {
    candidates.push({
      ids: ["butter-chicken", "dal-makhani", "palak-paneer"],
      reason: `${added.name} deserves a curry to dip into — Butter Chicken is our most-loved.`,
    });
  }

  // 6. Vegetarian mains pair with another veg favourite.
  if (added.tags.veg && MAIN_CATEGORIES.includes(added.category)) {
    candidates.push({
      ids: ["chana-masala", "palak-paneer", "dal-makhani"],
      reason: `Round out the table with another plant-forward favourite alongside ${added.name}.`,
    });
  }

  // 7. Any main course earns a sweet finish.
  if (MAIN_CATEGORIES.includes(added.category)) {
    candidates.push({
      ids: ["gulab-jamun", "mango-kulfi", "gajar-halwa"],
      reason: `Finish on a high note — warm Gulab Jamun is the perfect ending to ${added.name}.`,
    });
  }

  // 8. Nothing to drink yet? Offer the house favourite.
  if (!cartHasCategory(inCart, "drinks")) {
    candidates.push({
      ids: ["mango-lassi", "rose-lemonade", "masala-chai"],
      reason: `A Mango Lassi is the house favourite to sip alongside ${added.name}.`,
    });
  }

  for (const candidate of candidates) {
    const item = firstAvailable(candidate.ids, inCart);
    if (item) return { item, reason: candidate.reason };
  }

  // 9. Absolute fallback — any popular item not yet in the cart.
  const fallback = MENU_ITEMS.find(
    (item) => item.popular && !inCart.has(item.id),
  );
  if (fallback) {
    return {
      item: fallback,
      reason: `One of our guests' favourites — a lovely addition to ${added.name}.`,
    };
  }

  return null;
}
