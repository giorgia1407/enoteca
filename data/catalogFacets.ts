/**
 * Derived catalogue facets — the single source of truth for everything the nav,
 * homepage tiles and category filters need that is NOT stored literally on a
 * product.
 *
 * IMPORTANT: this module never mutates `WINES`. It only *reads* the real
 * inventory and classifies it, so the 99 client products in `productData.ts`
 * stay byte-for-byte intact (see AGENTS/INVENTORY_AUDIT). Two things are
 * inferred here:
 *
 *   • `denominationTier(w)` — collapses messy label strings ("Offida Pecorino
 *     DOCG", "Sicilia DOC", …) into the canonical Italian tiers DOCG/DOC/IGT/IGP.
 *   • `productType(w)`      — infers Gin/Vodka/Rum/Limoncello/Amaro/Grappa from
 *     the product name, but ONLY when the type word appears as a whole word
 *     (so "Meera Ginger" is not a Gin).
 *
 * The desktop + mobile mega-menu and the homepage "Categorie più cercate" tiles
 * are BUILT from these functions, which guarantees — by construction — that no
 * nav link or tile can point at an empty destination.
 */

import {
  WINES,
  CATEGORIES,
  getWinesByCategory,
  type Wine,
  type WineCategory,
  type CategoryMeta,
} from "./productData";

/* ------------------------------------------------------------------ */
/* Classifiers (pure, read-only)                                       */
/* ------------------------------------------------------------------ */

export type DenominationTier = "DOCG" | "DOC" | "IGT" | "IGP";

/** Canonical Italian wine tier for a product, or undefined if unlabelled. */
export function denominationTier(w: Wine): DenominationTier | undefined {
  const d = (w.denomination ?? "").toUpperCase();
  if (d.includes("DOCG")) return "DOCG"; // must precede DOC — "DOCG" contains "DOC"
  if (d.includes("DOC")) return "DOC";
  if (d.includes("IGT")) return "IGT";
  if (d.includes("IGP")) return "IGP";
  return undefined;
}

export type ProductType = "Gin" | "Vodka" | "Rum" | "Limoncello" | "Amaro" | "Grappa";

/** Spirit / liqueur type inferred from the product name (whole-word match). */
export function productType(w: Wine): ProductType | undefined {
  const n = w.name.toLowerCase();
  if (/limoncello/.test(n)) return "Limoncello";
  if (/\bamaro\b|fernet/.test(n)) return "Amaro";
  if (/grappa/.test(n)) return "Grappa";
  if (/\bgin\b/.test(n)) return "Gin"; // "Grifu Gin" ✓  "Meera Ginger" ✗
  if (/\bvodka\b/.test(n)) return "Vodka";
  if (/\brum\b|\bron\b/.test(n)) return "Rum";
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Small counting helpers                                              */
/* ------------------------------------------------------------------ */

export function categoryCount(cat: WineCategory): number {
  return getWinesByCategory(cat).length;
}

/** Categories with ≥1 product, in the canonical CATEGORIES order. */
export function populatedCategories(): CategoryMeta[] {
  return CATEGORIES.filter((c) => categoryCount(c.id) > 0);
}

/** First featured product in a category, else first product (undefined if empty). */
export function representativeWine(cat: WineCategory): Wine | undefined {
  const list = getWinesByCategory(cat);
  return list.find((w) => w.featured) ?? list.find((w) => w.inStock) ?? list[0];
}

type Counted = { value: string; count: number };

function countBy(wines: Wine[], pick: (w: Wine) => string | undefined): Counted[] {
  const m = new Map<string, number>();
  for (const w of wines) {
    const v = pick(w);
    if (v && v.trim()) m.set(v, (m.get(v) ?? 0) + 1);
  }
  return [...m.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

/* ------------------------------------------------------------------ */
/* Nav model — built from the real inventory                          */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}
export interface NavColumn {
  header: string;
  links: NavLink[];
}
export interface NavMega {
  columns: NavColumn[];
  featuredCategory: WineCategory;
}
export interface NavItem {
  label: string;
  href: string;
  mega?: NavMega;
}

/** Wine-colour categories that feed the "Vini" dropdown, populated only. */
const WINE_COLOR_CATS: WineCategory[] = ["vini-rossi", "vini-bianchi", "rosati", "vini-dolci"];

const catLabel = (id: WineCategory): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

function q(slug: WineCategory, key: string, value: string): string {
  return `/categoria/${slug}?${key}=${encodeURIComponent(value)}`;
}

/**
 * For a facet value that spans several categories (e.g. region "Sicilia" is in
 * reds, whites and rosés) pick the category with the most matches, so the link
 * lands on the richest — never empty — result set.
 */
function bestCategoryFor(
  cats: WineCategory[],
  match: (w: Wine, cat: WineCategory) => boolean,
): { total: number; byCat: { cat: WineCategory; count: number }[] } {
  const byCat = cats
    .map((cat) => ({
      cat,
      count: getWinesByCategory(cat).filter((w) => match(w, cat)).length,
    }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count);
  const total = byCat.reduce((s, x) => s + x.count, 0);
  return { total, byCat };
}

/** "Per Regione" column — regions across all wine colours, top 6 by total. */
function regionColumn(colorCats: WineCategory[]): NavColumn | null {
  const regions = new Set<string>();
  for (const cat of colorCats)
    for (const w of getWinesByCategory(cat)) if (w.region?.trim()) regions.add(w.region);

  const ranked = [...regions]
    .map((region) => {
      const { total, byCat } = bestCategoryFor(colorCats, (w) => w.region === region);
      return { region, total, target: byCat[0]?.cat };
    })
    .filter((r) => r.target)
    .sort((a, b) => b.total - a.total || a.region.localeCompare(b.region))
    .slice(0, 6);

  if (!ranked.length) return null;
  return {
    header: "Per Regione",
    links: ranked.map((r) => ({ label: r.region, href: q(r.target!, "regione", r.region) })),
  };
}

/** "Denominazione" column — canonical tiers present, DOCG→DOC→IGT order. */
function denominationColumn(colorCats: WineCategory[]): NavColumn | null {
  const order: DenominationTier[] = ["DOCG", "DOC", "IGT"]; // IGP omitted from nav (see audit)
  const links: NavLink[] = [];
  for (const tier of order) {
    const { byCat } = bestCategoryFor(colorCats, (w) => denominationTier(w) === tier);
    const target = byCat[0]?.cat;
    if (target) links.push({ label: tier, href: q(target, "denominazione", tier) });
  }
  return links.length ? { header: "Denominazione", links } : null;
}

/** "Per Colore" column — populated wine-colour categories. */
function colorColumn(colorCats: WineCategory[]): NavColumn {
  return {
    header: "Per Colore",
    links: colorCats
      .filter((c) => categoryCount(c) > 0)
      .map((c) => ({ label: catLabel(c), href: `/categoria/${c}` })),
  };
}

/** "Tipo" links for a category, ordered by frequency, ≥1 product each. */
function typeLinks(cat: WineCategory, only?: ProductType[]): NavLink[] {
  const counted = countBy(getWinesByCategory(cat), (w) => productType(w));
  return counted
    .filter((c) => !only || only.includes(c.value as ProductType))
    .map((c) => ({ label: c.value, href: q(cat, "tipo", c.value) }));
}

/** Build the entire nav from the real inventory. */
export function buildNavItems(): NavItem[] {
  const items: NavItem[] = [{ label: "Chi Siamo", href: "/chi-siamo" }];

  // --- Vini (reds + whites + rosés; sweet omitted while empty) ---
  const colorCats = WINE_COLOR_CATS.filter((c) => categoryCount(c) > 0);
  if (colorCats.length) {
    const columns: NavColumn[] = [colorColumn(colorCats)];
    const region = regionColumn(colorCats);
    if (region) columns.push(region);
    const denom = denominationColumn(colorCats);
    if (denom) columns.push(denom);
    items.push({
      label: "Vini",
      href: `/categoria/${colorCats[0]}`,
      mega: { columns, featuredCategory: colorCats[0] },
    });
  }

  // --- Bollicine (simple single-column dropdown — matches the thin inventory) ---
  if (categoryCount("bollicine") > 0) {
    items.push({
      label: "Bollicine",
      href: "/categoria/bollicine",
      mega: {
        featuredCategory: "bollicine",
        columns: [
          { header: "Bollicine", links: [{ label: "Tutte le Bollicine", href: "/categoria/bollicine" }] },
        ],
      },
    });
  }

  // --- Distillati (largest category → real mega-menu; col.2 reaches Liquori) ---
  if (categoryCount("distillati") > 0) {
    const columns: NavColumn[] = [
      {
        header: "Distillati",
        links: [
          { label: "Tutti i Distillati", href: "/categoria/distillati" },
          ...typeLinks("distillati", ["Gin", "Vodka", "Rum"]),
        ],
      },
    ];
    if (categoryCount("liquori") > 0) {
      columns.push({
        header: "Liquori & Amari",
        links: [
          { label: "Tutti i Liquori & Amari", href: "/categoria/liquori" },
          ...typeLinks("liquori", ["Limoncello", "Amaro", "Grappa"]),
        ],
      });
    }
    items.push({
      label: "Distillati",
      href: "/categoria/distillati",
      mega: { columns, featuredCategory: "distillati" },
    });
  }

  items.push({ label: "Contatti", href: "/contatti" });
  return items;
}

/* ------------------------------------------------------------------ */
/* Homepage tiles                                                      */
/* ------------------------------------------------------------------ */

export interface CategoryTile {
  slug: WineCategory;
  label: string;
  href: string;
  /** Real product photo representing the category. */
  image: string;
  alt: string;
}

/** Display order requested by the client review. */
const TILE_ORDER: WineCategory[] = [
  "vini-rossi",
  "vini-bianchi",
  "bollicine",
  "distillati",
  "liquori",
  "rosati",
];

/** "Categorie più cercate" tiles — only populated categories, real photos. */
export function categoryTiles(): CategoryTile[] {
  const tiles: CategoryTile[] = [];
  for (const slug of TILE_ORDER) {
    const rep = representativeWine(slug);
    if (!rep) continue; // skip empty categories (vini-dolci, accessori)
    tiles.push({
      slug,
      label: catLabel(slug),
      href: `/categoria/${slug}`,
      image: rep.image,
      alt: `${catLabel(slug)} — ${rep.name}`,
    });
  }
  return tiles;
}

/* ------------------------------------------------------------------ */
/* Dev-only nav integrity check                                        */
/* ------------------------------------------------------------------ */

/**
 * How many products a catalogue nav href resolves to. Returns null for
 * non-catalogue links (/chi-siamo, /contatti, …). Used by a dev-mode warning so
 * future edits that introduce a 0-result link are caught immediately.
 */
export function resolveNavCount(href: string): number | null {
  if (!href.startsWith("/categoria/")) return null;
  const [path, query] = href.split("?");
  const slug = path.replace("/categoria/", "") as WineCategory;
  const params = new URLSearchParams(query ?? "");
  let list = getWinesByCategory(slug);
  const regione = params.get("regione");
  const denominazione = params.get("denominazione");
  const tipo = params.get("tipo");
  const vitigno = params.get("vitigno");
  if (regione) list = list.filter((w) => w.region === regione);
  if (denominazione) list = list.filter((w) => denominationTier(w) === denominazione);
  if (tipo) list = list.filter((w) => productType(w) === tipo);
  if (vitigno) list = list.filter((w) => (w.grapeVarieties ?? []).includes(vitigno));
  return list.length;
}

/** Flatten every href a nav item exposes (top-level + mega columns). */
export function navHrefs(items: NavItem[]): string[] {
  const out: string[] = [];
  for (const it of items) {
    out.push(it.href);
    for (const col of it.mega?.columns ?? []) for (const l of col.links) out.push(l.href);
  }
  return out;
}

// Total real inventory used by the WINES import above (keeps tree-shaking honest).
export const CATALOGUE_SIZE = WINES.length;
