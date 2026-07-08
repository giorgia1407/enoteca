/**
 * Curry & Spice — menu data (Curry & Spice).
 *
 * The single source of truth for every dish, category, price and tag rendered
 * across the demo. Prices are plain numbers (USD); formatting lives in the UI.
 * Images are Unsplash URLs sized for the card they appear in — the domain is
 * allow-listed in next.config.ts so next/image can optimise them.
 *
 * This file is intentionally self-contained: no imports, no runtime state.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type CategoryId =
  | "appetizers"
  | "small-plates"
  | "curries"
  | "biryani-rice"
  | "breads"
  | "sides"
  | "desserts"
  | "drinks"
  | "kids";

/** 0 = no heat · 1 = mild · 2 = medium · 3 = spicy. */
export type SpiceLevel = 0 | 1 | 2 | 3;

export interface DietaryTags {
  veg: boolean;
  vegan: boolean;
  gf: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  spice: SpiceLevel;
  tags: DietaryTags;
  image: string;
  /** Surfaced in the "Chef's Recommendations" grid on the landing page. */
  popular?: boolean;
  /** Explicit hand-picked pairings, consumed by upsellLogic. */
  pairsWith?: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
  /** Short line shown under the section heading in the menu browser. */
  blurb: string;
  emoji: string;
}

/* ------------------------------------------------------------------ */
/* Categories (ordered as they appear in the menu)                     */
/* ------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  { id: "appetizers", label: "Antipasti", blurb: "Stuzzichini da condividere", emoji: "🥟" },
  { id: "small-plates", label: "Piatti Piccoli", blurb: "Dal tandoor e alla griglia", emoji: "🍢" },
  { id: "curries", label: "Curry", blurb: "A cottura lenta, il cuore della nostra cucina", emoji: "🍛" },
  { id: "biryani-rice", label: "Biryani e Riso", blurb: "Basmati a strati, zafferano e spezie", emoji: "🍚" },
  { id: "breads", label: "Pane", blurb: "Appena sfornato dal tandoor", emoji: "🫓" },
  { id: "sides", label: "Contorni", blurb: "I piccoli tocchi che completano il pasto", emoji: "🥗" },
  { id: "desserts", label: "Dolci", blurb: "Un finale dolce, come faceva la nonna", emoji: "🍮" },
  { id: "drinks", label: "Bevande", blurb: "Freschezze, chai e qualcosa di più", emoji: "🥤" },
  { id: "kids", label: "Menu Bimbi", blurb: "Spezie delicate, piatti felici", emoji: "🧒" },
];

/* ------------------------------------------------------------------ */
/* Image pool — Unsplash food & restaurant photography                 */
/* ------------------------------------------------------------------ */

const U = (id: string, w = 640) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  hero: U("1588166524941-3bf61a9c41db", 1920),
  interior: U("1552566626-52f8b828add9", 1600),
  chef: U("1577219491135-ce391730fb2c", 1000),
  gallery: [
    { src: U("1589302168068-964664d93dc0"), caption: "Biryani di Hyderabad" },
    { src: U("1615937722923-67f6deaf2cc9"), caption: "Il Tavolo dello Chef" },
    { src: U("1414235077428-338989a2e8c0"), caption: "Una Serata da Curry & Spice" },
    { src: U("1543826173-70651703c5a4"), caption: "Impiattato con Cura" },
    { src: U("1604908176997-125f25cc6f3d"), caption: "Paneer Tikka" },
    { src: U("1552566626-52f8b828add9"), caption: "La Nostra Sala" },
    { src: U("1617093727343-374698b1b08d"), caption: "Curry al Cocco" },
    { src: U("1476224203421-9ac39bcb3327"), caption: "Dal Tandoor" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Menu items                                                          */
/* ------------------------------------------------------------------ */

const veg: DietaryTags = { veg: true, vegan: false, gf: false };
const vegan: DietaryTags = { veg: true, vegan: true, gf: false };
const veganGf: DietaryTags = { veg: true, vegan: true, gf: true };
const vegGf: DietaryTags = { veg: true, vegan: false, gf: true };
const meatGf: DietaryTags = { veg: false, vegan: false, gf: true };

export const MENU_ITEMS: MenuItem[] = [
  /* ---------------------------- Appetizers ---------------------------- */
  {
    id: "samosa-chaat",
    name: "Samosa Chaat",
    description:
      "Crispy potato samosas crushed under chickpeas, yogurt, tamarind and mint chutneys.",
    price: 9,
    category: "appetizers",
    spice: 2,
    tags: veg,
    image: U("1601050690597-df0568f70950"),
    popular: true,
    pairsWith: ["mango-lassi"],
  },
  {
    id: "vegetable-samosa",
    name: "Vegetable Samosa (2)",
    description: "Flaky pastry filled with spiced potato and peas, served with tamarind chutney.",
    price: 7,
    category: "appetizers",
    spice: 1,
    tags: vegan,
    image: U("1606491956689-2ea866880c84"),
  },
  {
    id: "onion-bhaji",
    name: "Onion Bhaji",
    description: "Sweet onions in a crisp chickpea batter, lightly spiced, fried golden.",
    price: 8,
    category: "appetizers",
    spice: 1,
    tags: veganGf,
    image: U("1619221882220-947b3d3c8861"),
  },
  {
    id: "papdi-chaat",
    name: "Papdi Chaat",
    description: "Crisp wafers, chickpeas, potato, whisked yogurt and three house chutneys.",
    price: 10,
    category: "appetizers",
    spice: 2,
    tags: veg,
    image: U("1630383249896-424e482df921"),
  },
  {
    id: "gobi-manchurian",
    name: "Gobi Manchurian",
    description: "Crispy cauliflower tossed in a tangy Indo-Chinese garlic-chili glaze.",
    price: 11,
    category: "appetizers",
    spice: 2,
    tags: vegan,
    image: U("1628294895950-9805252327bc"),
  },

  /* --------------------------- Small Plates --------------------------- */
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    description: "Marinated chicken breast, tandoor-charred, served with mint chutney.",
    price: 14,
    category: "small-plates",
    spice: 2,
    tags: meatGf,
    image: U("1599487488170-d11ec9c172f0"),
    popular: true,
    pairsWith: ["garlic-naan", "mango-lassi"],
  },
  {
    id: "paneer-65",
    name: "Paneer 65",
    description: "Crispy cottage cheese tossed in a curry-leaf and chili glaze.",
    price: 12,
    category: "small-plates",
    spice: 3,
    tags: vegGf,
    image: U("1567188040759-fb8a883dc6d8"),
    pairsWith: ["mango-lassi"],
  },
  {
    id: "seekh-kebab",
    name: "Lamb Seekh Kebab",
    description: "Hand-minced lamb, ginger, green chili and warm spices grilled on skewers.",
    price: 15,
    category: "small-plates",
    spice: 2,
    tags: meatGf,
    image: U("1603360946369-dc9bb6258143"),
    pairsWith: ["garlic-naan", "cucumber-raita"],
  },
  {
    id: "tandoori-wings",
    name: "Tandoori Wings",
    description: "Yogurt-marinated wings blistered in the tandoor, finished with lime.",
    price: 13,
    category: "small-plates",
    spice: 2,
    tags: meatGf,
    image: U("1626074353765-517a681e40be"),
  },
  {
    id: "malai-tikka",
    name: "Chicken Malai Tikka",
    description: "Creamy cashew and cheese marinade, mild and smoky off the coals.",
    price: 15,
    category: "small-plates",
    spice: 1,
    tags: meatGf,
    image: U("1555939594-58d7cb561ad1"),
  },
  {
    id: "tandoori-broccoli",
    name: "Tandoori Broccoli",
    description: "Charred broccoli florets, honey-chili glaze, toasted almonds.",
    price: 12,
    category: "small-plates",
    spice: 1,
    tags: vegGf,
    image: U("1512621776951-a57141f2eefd"),
  },

  /* ----------------------------- Curries ----------------------------- */
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    description:
      "Our most-loved dish. Slow-simmered tomato-cream gravy, fenugreek, tender chicken thighs.",
    price: 22,
    category: "curries",
    spice: 1,
    tags: meatGf,
    image: U("1631452180519-c014fe946bc7"),
    popular: true,
    pairsWith: ["garlic-naan", "mango-lassi", "jeera-rice"],
  },
  {
    id: "rogan-josh",
    name: "Lamb Rogan Josh",
    description: "Kashmiri-style lamb shoulder, slow-braised with aromatic whole spices.",
    price: 28,
    category: "curries",
    spice: 2,
    tags: meatGf,
    image: U("1631292784640-2b24be784d5d"),
    popular: true,
    pairsWith: ["garlic-naan", "jeera-rice"],
  },
  {
    id: "palak-paneer",
    name: "Palak Paneer",
    description: "Fresh spinach, garlic and homemade paneer, gently spiced.",
    price: 18,
    category: "curries",
    spice: 1,
    tags: vegGf,
    image: U("1589647363585-f4a7d3877b10"),
    popular: true,
    pairsWith: ["butter-naan", "jeera-rice"],
  },
  {
    id: "chana-masala",
    name: "Chana Masala",
    description: "Chickpeas simmered in a bright ginger-tomato masala.",
    price: 16,
    category: "curries",
    spice: 2,
    tags: veganGf,
    image: U("1517244683847-7456b63c5969"),
    pairsWith: ["garlic-naan", "jeera-rice"],
  },
  {
    id: "kadhai-prawns",
    name: "Kadhai Prawns",
    description: "Prawns tossed with bell peppers, onions and freshly-ground kadhai masala.",
    price: 26,
    category: "curries",
    spice: 3,
    tags: meatGf,
    image: U("1633504581786-316c8002b1b9"),
    pairsWith: ["mango-lassi", "jeera-rice"],
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    description: "Black lentils simmered overnight with butter and cream until velvety.",
    price: 16,
    category: "curries",
    spice: 1,
    tags: vegGf,
    image: U("1541518763669-27fef04b14ea"),
    popular: true,
    pairsWith: ["garlic-naan", "jeera-rice"],
  },
  {
    id: "chicken-korma",
    name: "Chicken Korma",
    description: "Chicken in a mild cashew-and-almond gravy, delicately fragrant.",
    price: 21,
    category: "curries",
    spice: 1,
    tags: meatGf,
    image: U("1618449840665-9ed506d73a34"),
    pairsWith: ["butter-naan", "jeera-rice"],
  },
  {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    description: "Charred paneer folded into a smoky tomato-butter gravy.",
    price: 19,
    category: "curries",
    spice: 2,
    tags: vegGf,
    image: U("1545247181-516773cae754"),
    pairsWith: ["garlic-naan", "mango-lassi"],
  },
  {
    id: "goan-fish-curry",
    name: "Goan Fish Curry",
    description: "Coastal-style fish in a tamarind and coconut gravy with a gentle kick.",
    price: 25,
    category: "curries",
    spice: 2,
    tags: meatGf,
    image: U("1559847844-5315695dadae"),
    pairsWith: ["jeera-rice", "mango-lassi"],
  },
  {
    id: "aloo-gobi",
    name: "Aloo Gobi",
    description: "Potato and cauliflower with turmeric, cumin and fresh coriander.",
    price: 15,
    category: "curries",
    spice: 1,
    tags: veganGf,
    image: U("1547592180-85f173990554"),
    pairsWith: ["butter-naan", "jeera-rice"],
  },

  /* ------------------------- Biryanis & Rice ------------------------- */
  {
    id: "chicken-biryani",
    name: "Hyderabadi Chicken Biryani",
    description: "Basmati layered with saffron, slow-cooked chicken, boiled egg and mint.",
    price: 24,
    category: "biryani-rice",
    spice: 2,
    tags: meatGf,
    image: U("1631515243349-e0cb75fb8d3a"),
    popular: true,
    pairsWith: ["cucumber-raita", "gulab-jamun"],
  },
  {
    id: "lamb-biryani",
    name: "Lamb Dum Biryani",
    description: "Sealed-pot biryani with tender lamb, fried onions and whole spices.",
    price: 27,
    category: "biryani-rice",
    spice: 2,
    tags: meatGf,
    image: U("1633945274405-b6c8069047b0"),
    pairsWith: ["cucumber-raita", "mango-lassi"],
  },
  {
    id: "veg-biryani",
    name: "Vegetable Biryani",
    description: "Mixed vegetables, cashews, raisins and saffron rice, sealed and steamed.",
    price: 19,
    category: "biryani-rice",
    spice: 1,
    tags: vegGf,
    image: U("1625398407796-82650a8c135f"),
    pairsWith: ["cucumber-raita"],
  },
  {
    id: "jeera-rice",
    name: "Jeera Rice",
    description: "Basmati tossed with toasted cumin and a touch of ghee.",
    price: 6,
    category: "biryani-rice",
    spice: 0,
    tags: vegGf,
    image: U("1642821373181-696a54913e93"),
  },
  {
    id: "steamed-basmati",
    name: "Steamed Basmati Rice",
    description: "Long-grain basmati, simply steamed.",
    price: 5,
    category: "biryani-rice",
    spice: 0,
    tags: veganGf,
    image: U("1585937421612-70a008356fbe"),
  },
  {
    id: "coconut-rice",
    name: "Coconut Rice",
    description: "Basmati with toasted coconut, curry leaves and mustard seed.",
    price: 7,
    category: "biryani-rice",
    spice: 1,
    tags: veganGf,
    image: U("1596797038530-2c107229654b"),
  },

  /* ------------------------------ Breads ----------------------------- */
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    description: "Fresh from the tandoor, brushed with butter and roasted garlic.",
    price: 5,
    category: "breads",
    spice: 0,
    tags: veg,
    image: U("1565557623262-b51c2513a641"),
    popular: true,
  },
  {
    id: "butter-naan",
    name: "Butter Naan",
    description: "Soft, pillowy tandoor bread glazed with butter.",
    price: 4,
    category: "breads",
    spice: 0,
    tags: veg,
    image: U("1668236543090-82eba5ee5976"),
  },
  {
    id: "peshawari-naan",
    name: "Peshawari Naan",
    description: "Stuffed with coconut, raisins and cashews — sweet and rich.",
    price: 6,
    category: "breads",
    spice: 0,
    tags: veg,
    image: U("1589301760014-d929f3979dbc"),
  },
  {
    id: "laccha-paratha",
    name: "Laccha Paratha",
    description: "Flaky, layered whole-wheat bread, crisp at the edges.",
    price: 5,
    category: "breads",
    spice: 0,
    tags: vegan,
    image: U("1546833999-b9f581a1996d"),
  },
  {
    id: "tandoori-roti",
    name: "Tandoori Roti",
    description: "Whole-wheat flatbread baked against the tandoor wall.",
    price: 4,
    category: "breads",
    spice: 0,
    tags: vegan,
    image: U("1567337710282-00832b415979"),
  },

  /* ------------------------------ Sides ------------------------------ */
  {
    id: "cucumber-raita",
    name: "Cucumber Raita",
    description: "Cooling whisked yogurt with cucumber, cumin and mint.",
    price: 5,
    category: "sides",
    spice: 0,
    tags: vegGf,
    image: U("1548940740-204726a19be3"),
  },
  {
    id: "papadum",
    name: "Papadum (4)",
    description: "Crisp lentil wafers with tamarind and mint chutneys.",
    price: 4,
    category: "sides",
    spice: 0,
    tags: veganGf,
    image: U("1600628421055-4d30de868b8f"),
  },
  {
    id: "mango-chutney",
    name: "Mango Chutney",
    description: "Sweet-tart house preserve of Alphonso mango.",
    price: 3,
    category: "sides",
    spice: 0,
    tags: veganGf,
    image: U("1596040033229-a9821ebd058d"),
  },
  {
    id: "onion-kachumber",
    name: "Onion Kachumber",
    description: "Onion, tomato and cucumber with lemon and chaat masala.",
    price: 5,
    category: "sides",
    spice: 1,
    tags: veganGf,
    image: U("1540189549336-e6e99c3679fe"),
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    description: "Crispy fries dusted with chaat masala and fresh coriander.",
    price: 7,
    category: "sides",
    spice: 1,
    tags: veganGf,
    image: U("1504674900247-0877df9cc836"),
  },

  /* ----------------------------- Desserts ---------------------------- */
  {
    id: "gulab-jamun",
    name: "Gulab Jamun (2)",
    description: "Warm milk dumplings soaked in cardamom-rose syrup.",
    price: 9,
    category: "desserts",
    spice: 0,
    tags: veg,
    image: U("1554978991-33ef7f31d658"),
    popular: true,
  },
  {
    id: "mango-kulfi",
    name: "Mango Kulfi",
    description: "Traditional slow-churned Indian ice cream, saffron and pistachio.",
    price: 8,
    category: "desserts",
    spice: 0,
    tags: vegGf,
    image: U("1631206753348-db44968fd440"),
  },
  {
    id: "kheer",
    name: "Kheer",
    description: "Rice pudding with cardamom, rose water and toasted almonds.",
    price: 7,
    category: "desserts",
    spice: 0,
    tags: vegGf,
    image: U("1476718406336-bb5a9690ee2a"),
  },
  {
    id: "gajar-halwa",
    name: "Gajar Halwa",
    description: "Slow-cooked carrot pudding with ghee, cardamom and cashews.",
    price: 8,
    category: "desserts",
    spice: 0,
    tags: vegGf,
    image: U("1666190092159-3171cf0fbb12"),
  },

  /* ------------------------------ Drinks ----------------------------- */
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description: "Thick, sweet yogurt cooler blended with Alphonso mango.",
    price: 6,
    category: "drinks",
    spice: 0,
    tags: vegGf,
    image: U("1600271886742-f049cd451bba"),
    popular: true,
  },
  {
    id: "salted-lassi",
    name: "Salted Lassi",
    description: "Whisked yogurt with cumin and mint — the classic cooler.",
    price: 5,
    category: "drinks",
    spice: 0,
    tags: vegGf,
    image: U("1544145945-f90425340c7e"),
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    description: "Black tea simmered with milk, ginger and whole spices.",
    price: 4,
    category: "drinks",
    spice: 0,
    tags: vegGf,
    image: U("1571934811356-5cc061b6821f"),
  },
  {
    id: "rose-lemonade",
    name: "House Rose Lemonade",
    description: "Sparkling lemonade with a whisper of rose and cardamom.",
    price: 6,
    category: "drinks",
    spice: 0,
    tags: veganGf,
    image: U("1613478223719-2ab802602423"),
  },
  {
    id: "sparkling-water",
    name: "Sparkling Water",
    description: "Chilled sparkling mineral water.",
    price: 4,
    category: "drinks",
    spice: 0,
    tags: veganGf,
    image: U("1517959105821-eaf2591984ca"),
  },
  {
    id: "kingfisher",
    name: "Kingfisher Beer",
    description: "Crisp Indian lager, 12oz bottle. (21+)",
    price: 7,
    category: "drinks",
    spice: 0,
    tags: veganGf,
    image: U("1608270586620-248524c67de9"),
  },
  {
    id: "house-wine",
    name: "House Red / White Wine",
    description: "A rotating glass pour chosen to pair with spice. (21+)",
    price: 9,
    category: "drinks",
    spice: 0,
    tags: veganGf,
    image: U("1510812431401-41d2bd2722f3"),
  },

  /* ---------------------------- Kids Menu ---------------------------- */
  {
    id: "kids-butter-chicken",
    name: "Kids Butter Chicken & Rice",
    description: "A gentle, creamy portion with steamed rice. No heat.",
    price: 11,
    category: "kids",
    spice: 0,
    tags: meatGf,
    image: U("1546069901-ba9599a7e63c"),
    pairsWith: ["mango-lassi"],
  },
  {
    id: "kids-naan-cheese",
    name: "Cheesy Naan Fingers",
    description: "Warm naan strips with melted cheese and a mild tomato dip.",
    price: 8,
    category: "kids",
    spice: 0,
    tags: veg,
    image: U("1585032226651-759b368d7246"),
  },
  {
    id: "kids-dal-rice",
    name: "Kids Dal & Rice",
    description: "Comforting yellow lentils with soft basmati rice.",
    price: 9,
    category: "kids",
    spice: 0,
    tags: veganGf,
    image: U("1600891964092-4316c288032e"),
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const ITEM_BY_ID = new Map(MENU_ITEMS.map((item) => [item.id, item]));

export function getItem(id: string): MenuItem | undefined {
  return ITEM_BY_ID.get(id);
}

export function getPopularItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.popular);
}

export function getItemsByCategory(categoryId: CategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === categoryId);
}

export const SPICE_LABELS: Record<SpiceLevel, string> = {
  0: "No heat",
  1: "Mild",
  2: "Medium",
  3: "Spicy",
};

/** Texas state sales tax applied at checkout. */
export const TAX_RATE = 0.0825;
