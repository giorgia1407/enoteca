/**
 * Curry & Spice (Roma) — copy for the standalone /menu route (the MenuBrowser +
 * MenuItemCard surfaces).
 *
 * These are the UI-chrome strings unique to that page and not already present
 * on the shared `t` object from `useContent()`. Native Italian, formal "Lei".
 */

export interface MenuPageCopy {
  menuTagline: string;
  menuTitle: string;
  filterVeg: string;
  filterVegan: string;
  filterGf: string;
  spiceMild: string;
  spiceMedium: string;
  spiceSpicy: string;
  clearFilters: string;
  lovedBadge: string;
}

const IT: MenuPageCopy = {
  menuTagline: "Freschi dal tandoor, ricette di famiglia",
  menuTitle: "Il Nostro Menu",
  filterVeg: "Vegetariano",
  filterVegan: "Vegano",
  filterGf: "Senza glutine",
  spiceMild: "Delicato",
  spiceMedium: "Medio",
  spiceSpicy: "Piccante",
  clearFilters: "Cancella filtri",
  lovedBadge: "★ Amato",
};

/** Single Italian dictionary; the `en` key aliases it so consumers stay simple. */
export const MENU_PAGE_COPY: Record<"en" | "it", MenuPageCopy> = { en: IT, it: IT };
