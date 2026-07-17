/**
 * Il Tempio di Vino — enoteca product catalogue (REAL inventory).
 *
 * Rebuilt from the client's own WhatsApp bottle photos (see /Wine-Shop-Roma/).
 * Names, producers and prices were read directly off the labels and handwritten
 * price tags. Fields that were NOT visible on a label are left empty ("" / [] /
 * undefined) rather than invented. Tasting notes, food pairings and alt text are
 * generic, category-appropriate Italian marketing copy — they make no specific
 * factual claims (no awards, methods, vintages, grapes or denominations unless
 * those were actually printed on the bottle).
 *
 * A few bottles were photographed without a price tag in frame; those carry a
 * PROVISIONAL price (category median) flagged inline — confirm before go-live.
 *
 * Product images are local files in /public/products/<slug>.jpeg, copied 1:1
 * from the client's originals. <BottleImage> still falls back to a branded
 * cream tile if any file is ever missing.
 */

export type WineCategory =
  | "vini-rossi"
  | "vini-bianchi"
  | "rosati"
  | "bollicine"
  | "vini-dolci"
  | "distillati"
  | "liquori"
  | "accessori";

export type Badge = "Novità" | "Best Seller" | "In Offerta" | "Biologico";

export interface Wine {
  id: string;
  slug: string;
  name: string;
  producer: string;
  category: WineCategory;
  subcategory?: string;
  region?: string;
  denomination?: string;
  grapeVarieties?: string[];
  vintage?: number;
  alcohol?: number;
  volume: string;
  price: number;
  originalPrice?: number;
  images: string[];
  /** Italian alt text describing the product photo. */
  alt: string;
  tastingNotes: string;
  foodPairings: string[];
  awards?: string[];
  inStock: boolean;
  featured?: boolean;
  badges?: Badge[];
  /** New product added from a photo but missing catalogue data — client must fill price/description/etc. */
  needsClientReview?: boolean;
}

export interface CategoryMeta {
  id: WineCategory;
  slug: WineCategory;
  label: string;
  labelEn: string;
  tagline: string;
  description: string;
  /** Atmospheric header/tile image (vineyard, cellar). */
  image: string;
}

/** Build a verified Unsplash URL (used only for atmospheric backdrops). */
const u = (id: string, w = 800): string =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const ATMOSPHERE = {
  hero: u("photo-1547595628-c61a29f496f0", 1600), // moody red-wine glass
  cellar: u("photo-1528823872057-9c018a7a7553", 1600), // steel-tank cellar
  vineyard: u("photo-1543418219-44e30b057fea", 1600), // vineyard at sunset
  vineyardGlass: u("photo-1506377247377-2a5b3b417ebb", 1600), // glass over a vineyard
  sparkling: u("photo-1470158499416-75be9aa0c4db", 1600), // two sparkling flutes
  grapes: u("photo-1474722883778-792e7990302f", 1600), // red wine + grapes
  amberPour: u("photo-1470337458703-46ad1756a187", 1600), // amber spirit pour
  amber: u("photo-1514362545857-3bc16c4c7d1b", 1600), // amber cocktail
  glasses: u("photo-1568213816046-0ee1c42bd559", 1600), // wine flight on a barrel
  tasting: u("photo-1598306442928-4d90f32c6866", 1600), // wine + cheese tasting
  shelf: u("photo-1516594915697-87eb3b1c14ea", 1600), // bottle shelf
} as const;

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "vini-rossi",
    slug: "vini-rossi",
    label: "Vini Rossi",
    labelEn: "Red Wines",
    tagline: "Struttura, calore e lunga vita",
    description:
      "Dai Sangiovese toscani ai Nebbiolo piemontesi: i grandi rossi italiani, dal quotidiano al fuoriclasse da invecchiamento.",
    image: ATMOSPHERE.cellar,
  },
  {
    id: "vini-bianchi",
    slug: "vini-bianchi",
    label: "Vini Bianchi",
    labelEn: "White Wines",
    tagline: "Freschezza, mineralità e profumi",
    description:
      "Bianchi tesi e aromatici, dal Nord al Sud: la vivacità del Vermentino, la sapidità del Fiano, l'eleganza del Friulano.",
    image: ATMOSPHERE.vineyard,
  },
  {
    id: "rosati",
    slug: "rosati",
    label: "Rosati",
    labelEn: "Rosé Wines",
    tagline: "Il piacere leggero dell'estate",
    description:
      "Rosati fragranti e beverini, perfetti per l'aperitivo e la cucina di mare. Colore tenue, gusto scattante.",
    image: ATMOSPHERE.vineyardGlass,
  },
  {
    id: "bollicine",
    slug: "bollicine",
    label: "Bollicine",
    labelEn: "Sparkling",
    tagline: "Metodo Classico, Prosecco & Champagne",
    description:
      "Dalla finezza del Metodo Classico alla freschezza del Prosecco Superiore, fino agli Champagne. Per ogni brindisi.",
    image: ATMOSPHERE.sparkling,
  },
  {
    id: "vini-dolci",
    slug: "vini-dolci",
    label: "Vini Dolci & Passiti",
    labelEn: "Sweet Wines",
    tagline: "Il gran finale del pasto",
    description:
      "Passiti, vendemmie tardive e vini da meditazione. Dolcezza equilibrata, aromi di miele, frutta candita e spezie.",
    image: ATMOSPHERE.grapes,
  },
  {
    id: "distillati",
    slug: "distillati",
    label: "Distillati",
    labelEn: "Spirits",
    tagline: "Grappe, whisky, cognac e rum",
    description:
      "Una selezione di distillati d'autore: grappe di vinaccia, single malt, cognac invecchiati e rum da collezione.",
    image: ATMOSPHERE.amberPour,
  },
  {
    id: "liquori",
    slug: "liquori",
    label: "Liquori & Amari",
    labelEn: "Liqueurs & Amari",
    tagline: "Tradizione erbacea italiana",
    description:
      "Amari alle erbe, limoncello di costa, nocino e liquori da fine pasto. L'anima digestiva della tavola italiana.",
    image: ATMOSPHERE.amber,
  },
  {
    id: "accessori",
    slug: "accessori",
    label: "Accessori",
    labelEn: "Accessories",
    tagline: "Il rituale del vino",
    description:
      "Cavatappi, calici in cristallo, decanter e cofanetti regalo. Tutto per servire e regalare il vino con stile.",
    image: ATMOSPHERE.glasses,
  },
];

/* ------------------------------------------------------------------ */
/* Products — real inventory from the client's photos                  */
/* ------------------------------------------------------------------ */

export const WINES: Wine[] = [
  {
    id: "palio-montepulciano-d-abruzzo",
    slug: "palio-montepulciano-d-abruzzo",
    name: "Montepulciano d'Abruzzo",
    producer: "Palio",
    category: "vini-rossi",
    region: "Abruzzo",
    denomination: "",
    grapeVarieties: ["Montepulciano"],
    volume: "750ml",
    price: 7.5,
    images: [
      "/products/palio-montepulciano-d-abruzzo-hero.jpg", // hero (nuova foto)
      "/products/palio-montepulciano-d-abruzzo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Montepulciano d'Abruzzo di Palio, bottiglia scura con etichetta beige e verde biologico.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "venturone-appassimento-rosso",
    slug: "venturone-appassimento-rosso",
    name: "Venturone Appassimento Rosso",
    producer: "Venturone Appassimento Rosso",
    category: "vini-rossi",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "750ml",
    price: 8.8,
    images: [
      "/products/venturone-appassimento-rosso.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Venturone Appassimento Rosso, bottiglia scura con etichetta nera e decori dorati.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "bisanzio-chardonnay",
    slug: "bisanzio-chardonnay",
    name: "Bisanzio Chardonnay",
    producer: "Bisanzio Chardonnay",
    category: "vini-bianchi",
    region: "",
    denomination: "",
    grapeVarieties: ["Chardonnay"],
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/bisanzio-chardonnay-hero.jpg", // hero (nuova foto)
      "/products/bisanzio-chardonnay.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Bisanzio Chardonnay, bottiglia verde chiara con etichetta bianca e liquido dorato.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna",
    slug: "cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna",
    name: "Aragosta Vermentino di Sardegna",
    producer: "Cantina Santa Maria La Palma",
    category: "vini-bianchi",
    region: "Sardegna",
    denomination: "Vermentino di Sardegna DOC",
    grapeVarieties: ["Vermentino"],
    volume: "750ml",
    price: 6.3,
    images: [
      "/products/cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna-hero.jpg", // hero (nuova foto)
      "/products/cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Aragosta Vermentino di Sardegna di Cantina Santa Maria La Palma, bottiglia trasparente con liquido chiaro ed etichetta con aragosta.",
    tastingNotes: "Vino bianco dal carattere fragrante, con aromi di frutta bianca e una delicata scia minerale. Il palato è pulito, vivace e armonioso.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "falanghina",
    slug: "falanghina",
    name: "Falanghina",
    producer: "Falanghina",
    category: "vini-bianchi",
    region: "Benevento",
    denomination: "IGT",
    grapeVarieties: ["Falanghina"],
    volume: "750ml",
    price: 4,
    images: [
      "/products/falanghina-hero.jpg", // hero (nuova foto)
      "/products/falanghina.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Falanghina, bottiglia verde con liquido dorato ed etichetta azzurra.",
    tastingNotes: "Bianco fine ed elegante, dai profumi delicati e freschi. In bocca colpisce per equilibrio e per un finale piacevolmente sapido.",
    foodPairings: ["Pesce alla griglia", "Antipasti di mare", "Risotti delicati"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "savian-bio-merlot",
    slug: "savian-bio-merlot",
    name: "Savian Bio Merlot",
    producer: "Savian",
    category: "vini-rossi",
    region: "Venezia",
    denomination: "DOC",
    grapeVarieties: ["Merlot"],
    volume: "750ml",
    price: 8,
    originalPrice: 10,
    images: [
      "/products/savian-bio-merlot-hero.jpg", // hero (nuova foto)
      "/products/savian-bio-merlot.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Savian Bio Merlot di Savian, bottiglia scura con etichetta bianca e scritta BIO.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    featured: true,
    badges: ["In Offerta"],
  },
  {
    id: "bisanzio-montepulciano-d-abruzzo",
    slug: "bisanzio-montepulciano-d-abruzzo",
    name: "Bisanzio Montepulciano d'Abruzzo",
    producer: "Bisanzio Montepulciano d'Abruzzo",
    category: "vini-rossi",
    region: "Abruzzo",
    denomination: "DOC",
    grapeVarieties: ["Montepulciano"],
    volume: "750ml",
    price: 6.8,
    images: [
      "/products/bisanzio-montepulciano-d-abruzzo-hero.jpg", // hero (nuova foto)
      "/products/bisanzio-montepulciano-d-abruzzo-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/bisanzio-montepulciano-d-abruzzo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Bisanzio Montepulciano d'Abruzzo, bottiglia scura con etichetta bianca e decori rossi.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Brasati e stufati", "Salumi", "Pasta ripiena"],
    inStock: true,
    badges: [],
  },
  {
    id: "ferzo-pecorino",
    slug: "ferzo-pecorino",
    name: "Ferzo Pecorino",
    producer: "Ferzo",
    category: "vini-bianchi",
    region: "Abruzzo",
    denomination: "DOC",
    grapeVarieties: ["Pecorino"],
    volume: "750ml",
    price: 8.5,
    images: [
      "/products/ferzo-pecorino-hero.jpg", // hero (nuova foto)
      "/products/ferzo-pecorino-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/ferzo-pecorino.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Ferzo Pecorino di Ferzo, bottiglia scura con etichetta gialla e veliero dorato.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "ferzo-montepulciano-d-abruzzo-teate",
    slug: "ferzo-montepulciano-d-abruzzo-teate",
    name: "Ferzo Montepulciano d'Abruzzo Teate",
    producer: "Ferzo",
    category: "vini-rossi",
    region: "Abruzzo",
    denomination: "DOC",
    grapeVarieties: ["Montepulciano"],
    volume: "750ml",
    price: 11.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/ferzo-montepulciano-d-abruzzo-teate-hero.jpg", // hero (nuova foto)
      "/products/ferzo-montepulciano-d-abruzzo-teate-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/ferzo-montepulciano-d-abruzzo-teate.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Ferzo Montepulciano d'Abruzzo Teate di Ferzo, bottiglia scura con etichetta bordeaux e veliero dorato.",
    tastingNotes: "Rosso di bella profondità, con aromi di prugna e ciliegia sotto spirito. Al gusto è armonico e avvolgente, dal finale lungo e appagante.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: [],
  },
  {
    id: "consoli-saucha-sauvignon-chardonnay",
    slug: "consoli-saucha-sauvignon-chardonnay",
    name: "Saucha Sauvignon Chardonnay",
    producer: "Consoli",
    category: "vini-bianchi",
    region: "",
    denomination: "",
    grapeVarieties: ["Sauvignon", "Chardonnay"],
    volume: "750ml",
    price: 7.4,
    images: [
      "/products/consoli-saucha-sauvignon-chardonnay-hero.jpg", // hero (nuova foto)
      "/products/consoli-saucha-sauvignon-chardonnay.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Saucha Sauvignon Chardonnay di Consoli, bottiglia scura con etichetta bianca e scritta dorata.",
    tastingNotes: "Bianco fine ed elegante, dai profumi delicati e freschi. In bocca colpisce per equilibrio e per un finale piacevolmente sapido.",
    foodPairings: ["Frutti di mare", "Verdure di stagione", "Carni bianche"],
    inStock: true,
    badges: [],
  },
  {
    id: "consoli-pecorino",
    slug: "consoli-pecorino",
    name: "Pecorino",
    producer: "Consoli",
    category: "vini-bianchi",
    region: "Terre di Chieti",
    denomination: "IGP",
    grapeVarieties: ["Pecorino"],
    volume: "750ml",
    price: 6.1,
    images: [
      "/products/consoli-pecorino-hero.jpg", // hero (nuova foto)
      "/products/consoli-pecorino.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Pecorino di Consoli, bottiglia chiara con etichetta bianca e argento.",
    tastingNotes: "Vino bianco fresco e minerale, con profumi delicati di fiori bianchi e frutta a polpa gialla. Al palato è vivace ed equilibrato, con un finale pulito.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "consoli-ego",
    slug: "consoli-ego",
    name: "Ego",
    producer: "Consoli",
    category: "vini-rossi",
    region: "Abruzzo",
    denomination: "",
    grapeVarieties: ["Montepulciano"],
    volume: "750ml",
    price: 6.8,
    images: [
      "/products/consoli-ego-hero.jpg", // hero (nuova foto)
      "/products/consoli-ego.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Ego di Consoli, bottiglia scura con etichetta nera e oro.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Grigliate di carne", "Pecorino stagionato", "Primi saporiti"],
    inStock: true,
    badges: [],
  },
  {
    id: "consoli-oddoni-cesanese",
    slug: "consoli-oddoni-cesanese",
    name: "Oddoni Cesanese",
    producer: "Consoli",
    category: "vini-rossi",
    region: "Lazio",
    denomination: "IGP",
    grapeVarieties: ["Cesanese"],
    volume: "750ml",
    price: 9.5,
    images: [
      "/products/consoli-oddoni-cesanese-hero.jpg", // hero (nuova foto)
      "/products/consoli-oddoni-cesanese.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Oddoni Cesanese di Consoli, bottiglia scura con etichetta bianca e scritte nere.",
    tastingNotes: "Un vino rosso dal profilo intenso, con note fruttate e un tocco di sottobosco. Il sorso è morbido e generoso, sorretto da tannini vellutati.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: [],
  },
  {
    id: "consoli-ego-falanghina",
    slug: "consoli-ego-falanghina",
    name: "Ego Falanghina",
    producer: "Consoli",
    category: "vini-bianchi",
    region: "",
    denomination: "",
    grapeVarieties: ["Falanghina"],
    volume: "750ml",
    price: 5.2,
    images: [
      "/products/consoli-ego-falanghina-hero.jpg", // hero (nuova foto)
      "/products/consoli-ego-falanghina.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Ego Falanghina di Consoli, bottiglia verde con etichetta verde e scritte oro.",
    tastingNotes: "Vino bianco dal carattere fragrante, con aromi di frutta bianca e una delicata scia minerale. Il palato è pulito, vivace e armonioso.",
    foodPairings: ["Frutti di mare", "Verdure di stagione", "Carni bianche"],
    inStock: true,
    badges: [],
  },
  {
    id: "citra-caroso-montepulciano-d-abruzzo-riserva",
    slug: "citra-caroso-montepulciano-d-abruzzo-riserva",
    name: "Caroso Montepulciano d'Abruzzo Riserva",
    producer: "Citra",
    category: "vini-rossi",
    region: "Abruzzo",
    denomination: "DOC",
    grapeVarieties: ["Montepulciano"],
    vintage: 2018,
    volume: "750ml",
    price: 18,
    images: [
      "/products/citra-caroso-montepulciano-d-abruzzo-riserva-hero.jpg", // hero (nuova foto)
      "/products/citra-caroso-montepulciano-d-abruzzo-riserva-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/citra-caroso-montepulciano-d-abruzzo-riserva.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Caroso Montepulciano d'Abruzzo Riserva di Citra, bottiglia scura con capsula oro ed etichetta nera.",
    tastingNotes: "Un rosso conviviale e versatile, dai profumi vinosi e fruttati. Al palato è schietto, morbido e di piacevole beva.",
    foodPairings: ["Brasati e stufati", "Salumi", "Pasta ripiena"],
    inStock: true,
    badges: [],
  },
  {
    id: "savian-chardonnay-venezia",
    slug: "savian-chardonnay-venezia",
    name: "Chardonnay Venezia",
    producer: "Savian",
    category: "vini-bianchi",
    region: "Venezia",
    denomination: "DOC Venezia",
    grapeVarieties: ["Chardonnay"],
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/savian-chardonnay-venezia-hero.jpg", // hero (nuova foto)
      "/products/savian-chardonnay-venezia.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Chardonnay Venezia di Savian, bottiglia scura con etichetta bianca, BIO Chardonnay.",
    tastingNotes: "Vino bianco fresco e minerale, con profumi delicati di fiori bianchi e frutta a polpa gialla. Al palato è vivace ed equilibrato, con un finale pulito.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    badges: [],
  },
  {
    id: "mandrarossa-cavadiserpe",
    slug: "mandrarossa-cavadiserpe",
    name: "Cavadiserpe",
    producer: "Mandrarossa",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Menfi DOC",
    grapeVarieties: [],
    vintage: 2024,
    volume: "750ml",
    price: 11.9,
    images: [
      "/products/mandrarossa-cavadiserpe-hero.jpg", // hero (nuova foto)
      "/products/mandrarossa-cavadiserpe.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Cavadiserpe di Mandrarossa, bottiglia scura con etichetta avorio e stella.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: [],
  },
  {
    id: "clementina-fabi-cri-passerina",
    slug: "clementina-fabi-cri-passerina",
    name: "Cri Passerina",
    producer: "Clementina Fabi",
    category: "vini-bianchi",
    region: "Offida",
    denomination: "Offida Passerina DOCG",
    grapeVarieties: ["Passerina"],
    volume: "750ml",
    price: 11.6,
    images: [
      "/products/clementina-fabi-cri-passerina-hero.jpg", // hero (nuova foto)
      "/products/clementina-fabi-cri-passerina.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Cri Passerina di Clementina Fabi, bottiglia scura con capsula verde ed etichetta avorio.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Frutti di mare", "Verdure di stagione", "Carni bianche"],
    inStock: true,
    badges: [],
  },
  {
    id: "clementina-fabi-cri-pecorino",
    slug: "clementina-fabi-cri-pecorino",
    name: "Cri Pecorino",
    producer: "Clementina Fabi",
    category: "vini-bianchi",
    region: "Offida",
    denomination: "Offida Pecorino DOCG",
    grapeVarieties: ["Pecorino"],
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/clementina-fabi-cri-pecorino-hero.jpg", // hero (nuova foto)
      "/products/clementina-fabi-cri-pecorino.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Cri Pecorino di Clementina Fabi, bottiglia scura con capsula oro ed etichetta avorio.",
    tastingNotes: "Vino bianco dal carattere fragrante, con aromi di frutta bianca e una delicata scia minerale. Il palato è pulito, vivace e armonioso.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "savian-pinot-grigio-venezia",
    slug: "savian-pinot-grigio-venezia",
    name: "Pinot Grigio Venezia",
    producer: "Savian",
    category: "vini-bianchi",
    region: "Venezia",
    denomination: "DOC Venezia",
    grapeVarieties: ["Pinot Grigio"],
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/savian-pinot-grigio-venezia-hero.jpg", // hero (nuova foto)
      "/products/savian-pinot-grigio-venezia.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Pinot Grigio Venezia di Savian, bottiglia scura con etichetta bianca, BIO Pinot Grigio.",
    tastingNotes: "Bianco fine ed elegante, dai profumi delicati e freschi. In bocca colpisce per equilibrio e per un finale piacevolmente sapido.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    badges: [],
  },
  {
    id: "aldo-marenco-langhe-nebbiolo",
    slug: "aldo-marenco-langhe-nebbiolo",
    name: "Langhe Nebbiolo",
    producer: "Aldo Marenco",
    category: "vini-rossi",
    region: "Langhe",
    denomination: "DOC",
    grapeVarieties: ["Nebbiolo"],
    volume: "750ml",
    price: 18,
    originalPrice: 20,
    images: [
      "/products/aldo-marenco-langhe-nebbiolo.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Langhe Nebbiolo di Aldo Marenco, Bottiglia bordolese verde scura, etichetta bianca con scritta nera.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "marchesi-di-barolo-michet-nebbiolo-d-alba",
    slug: "marchesi-di-barolo-michet-nebbiolo-d-alba",
    name: "Michet Nebbiolo d'Alba",
    producer: "Marchesi di Barolo",
    category: "vini-rossi",
    region: "Alba",
    denomination: "DOC",
    grapeVarieties: ["Nebbiolo"],
    volume: "750ml",
    price: 13.5,
    images: [
      "/products/marchesi-di-barolo-michet-nebbiolo-d-alba-hero.jpg", // hero (nuova foto)
      "/products/marchesi-di-barolo-michet-nebbiolo-d-alba-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/marchesi-di-barolo-michet-nebbiolo-d-alba.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Michet Nebbiolo d'Alba di Marchesi di Barolo, Bottiglia bordolese scura, capsula rossa, etichetta crema elegante.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    badges: [],
  },
  {
    id: "pico-maccario-estrosa-viognier",
    slug: "pico-maccario-estrosa-viognier",
    name: "Estrosa Viognier",
    producer: "Pico Maccario",
    category: "vini-bianchi",
    region: "Piemonte",
    denomination: "Piemonte DOC",
    grapeVarieties: ["Viognier"],
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/pico-maccario-estrosa-viognier-hero.jpg", // hero (nuova foto)
      "/products/pico-maccario-estrosa-viognier-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/pico-maccario-estrosa-viognier.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Estrosa Viognier di Pico Maccario, Bottiglia chiara con vino giallo dorato, capsula verde lime.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "kamasutra-red-wine-shiraz",
    slug: "kamasutra-red-wine-shiraz",
    name: "Kamasutra Red Wine Shiraz",
    producer: "Kamasutra Red Wine Shiraz",
    category: "vini-rossi",
    region: "",
    denomination: "",
    grapeVarieties: ["Shiraz"],
    alcohol: 12.5,
    volume: "750ml",
    price: 11.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/kamasutra-red-wine-shiraz.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Kamasutra Red Wine Shiraz, Bottiglia scura opaca, etichetta nera con decoro rosso.",
    tastingNotes: "Rosso di bella profondità, con aromi di prugna e ciliegia sotto spirito. Al gusto è armonico e avvolgente, dal finale lungo e appagante.",
    foodPairings: ["Grigliate di carne", "Pecorino stagionato", "Primi saporiti"],
    inStock: true,
    badges: [],
  },
  {
    id: "kamasutra-white-wine-sauvignon-blanc",
    slug: "kamasutra-white-wine-sauvignon-blanc",
    name: "Kamasutra White Wine Sauvignon Blanc",
    producer: "Kamasutra White Wine Sauvignon Blanc",
    category: "vini-bianchi",
    region: "",
    denomination: "",
    grapeVarieties: ["Sauvignon Blanc"],
    alcohol: 12.5,
    volume: "750ml",
    price: 10.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/kamasutra-white-wine-sauvignon-blanc-hero.jpg", // hero (nuova foto)
      "/products/kamasutra-white-wine-sauvignon-blanc.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Kamasutra White Wine Sauvignon Blanc, Bottiglia scura opaca, etichetta dorata con decoro barocco.",
    tastingNotes: "Bianco fine ed elegante, dai profumi delicati e freschi. In bocca colpisce per equilibrio e per un finale piacevolmente sapido.",
    foodPairings: ["Pesce alla griglia", "Antipasti di mare", "Risotti delicati"],
    inStock: true,
    badges: [],
  },
  {
    id: "marchesi-di-barolo-rure-barbera-d-asti",
    slug: "marchesi-di-barolo-rure-barbera-d-asti",
    name: "Rurè Barbera d'Asti",
    producer: "Marchesi di Barolo",
    category: "vini-rossi",
    region: "Asti",
    denomination: "DOCG",
    grapeVarieties: ["Barbera"],
    volume: "750ml",
    price: 11.5,
    images: [
      "/products/marchesi-di-barolo-rure-barbera-d-asti-hero.jpg", // hero (nuova foto)
      "/products/marchesi-di-barolo-rure-barbera-d-asti.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Rurè Barbera d'Asti di Marchesi di Barolo, Bottiglia scura, capsula rossa, etichetta crema classica.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    badges: [],
  },
  {
    id: "marchesi-di-barolo-madonna-del-dono-dolcetto-d-alba",
    slug: "marchesi-di-barolo-madonna-del-dono-dolcetto-d-alba",
    name: "Madonna del Dono Dolcetto d'Alba",
    producer: "Marchesi di Barolo",
    category: "vini-rossi",
    region: "Alba",
    denomination: "DOC",
    grapeVarieties: ["Dolcetto"],
    volume: "750ml",
    price: 11.5,
    images: [
      "/products/marchesi-di-barolo-madonna-del-dono-dolcetto-d-alba-hero.jpg", // hero (nuova foto)
      "/products/marchesi-di-barolo-madonna-del-dono-dolcetto-d-alba.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Madonna del Dono Dolcetto d'Alba di Marchesi di Barolo, Bottiglia scura, capsula rossa, etichetta bianca elegante.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Brasati e stufati", "Salumi", "Pasta ripiena"],
    inStock: true,
    badges: [],
  },
  {
    id: "mybrid",
    slug: "mybrid",
    name: "Mybrid",
    producer: "Mybrid",
    category: "vini-bianchi",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "750ml",
    price: 15,
    originalPrice: 16.5,
    images: [
      "/products/mybrid-hero.jpg", // hero (nuova foto)
      "/products/mybrid-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/mybrid.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Mybrid, Bottiglia chiara con etichetta bianca e disegno albero verde.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "mandrarossa-bertolino-soprano-grillo",
    slug: "mandrarossa-bertolino-soprano-grillo",
    name: "Mandrarossa Bertolino Soprano Grillo",
    producer: "Mandrarossa",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "DOC",
    grapeVarieties: ["Grillo"],
    volume: "750ml",
    price: 14.8,
    images: [
      "/products/mandrarossa-bertolino-soprano-grillo-hero.jpg", // hero (nuova foto)
      "/products/mandrarossa-bertolino-soprano-grillo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Mandrarossa Bertolino Soprano Grillo di Mandrarossa, Bottiglia scura, etichetta illustrata con paesaggio e cavaliere.",
    tastingNotes: "Vino bianco dal carattere fragrante, con aromi di frutta bianca e una delicata scia minerale. Il palato è pulito, vivace e armonioso.",
    foodPairings: ["Pesce alla griglia", "Antipasti di mare", "Risotti delicati"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-cerasuolo-di-vittoria",
    slug: "planeta-cerasuolo-di-vittoria",
    name: "Planeta Cerasuolo di Vittoria",
    producer: "Planeta",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "DOCG",
    grapeVarieties: [],
    vintage: 2024,
    volume: "750ml",
    price: 12,
    images: [
      "/products/planeta-cerasuolo-di-vittoria-hero.jpg", // hero (nuova foto)
      "/products/planeta-cerasuolo-di-vittoria.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Planeta Cerasuolo di Vittoria di Planeta, Bottiglia scura, capsula rossa, etichetta rossa a spirale.",
    tastingNotes: "Un rosso conviviale e versatile, dai profumi vinosi e fruttati. Al palato è schietto, morbido e di piacevole beva.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-nocera",
    slug: "planeta-nocera",
    name: "Nocera",
    producer: "Planeta",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: ["Nocera"],
    vintage: 2023,
    volume: "750ml",
    price: 12.5,
    images: [
      "/products/planeta-nocera-hero.jpg", // hero (nuova foto)
      "/products/planeta-nocera.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Nocera di Planeta, Bottiglia scura con etichetta bianca e capsula rossa.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Brasati e stufati", "Salumi", "Pasta ripiena"],
    inStock: true,
    badges: [],
  },
  {
    id: "donnafugata-lighea",
    slug: "donnafugata-lighea",
    name: "Lighea",
    producer: "Donnafugata",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "",
    grapeVarieties: [],
    volume: "750ml",
    price: 14.5,
    images: [
      "/products/donnafugata-lighea-hero.jpg", // hero (nuova foto)
      "/products/donnafugata-lighea.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Lighea di Donnafugata, Bottiglia con vino chiaro ed etichetta azzurra con volto.",
    tastingNotes: "Bianco luminoso dai sentori agrumati e floreali. In bocca è teso e sapido, con una gradevole acidità che invita al sorso successivo.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    badges: [],
  },
  {
    id: "mandrarossa-larcera-vermentino",
    slug: "mandrarossa-larcera-vermentino",
    name: "Larcéra Vermentino",
    producer: "Mandrarossa",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "Terre Siciliane IGT",
    grapeVarieties: ["Vermentino"],
    vintage: 2024,
    volume: "750ml",
    price: 11.9,
    images: [
      "/products/mandrarossa-larcera-vermentino-hero.jpg", // hero (nuova foto)
      "/products/mandrarossa-larcera-vermentino.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Larcéra Vermentino di Mandrarossa, Bottiglia scura con etichetta crema e capsula grigia.",
    tastingNotes: "Un bianco profumato e scattante, con note di mela verde e fiori di campo. Al gusto è fresco, snello e di bella persistenza.",
    foodPairings: ["Pesce alla griglia", "Antipasti di mare", "Risotti delicati"],
    inStock: true,
    badges: [],
  },
  {
    id: "mandrarossa-cartagho",
    slug: "mandrarossa-cartagho",
    name: "Cartagho",
    producer: "Mandrarossa",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: [],
    vintage: 2021,
    volume: "750ml",
    price: 17.2,
    images: [
      "/products/mandrarossa-cartagho-hero.jpg", // hero (nuova foto)
      "/products/mandrarossa-cartagho.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Cartagho di Mandrarossa, Bottiglia scura con etichetta bianca e capsula bordeaux.",
    tastingNotes: "Rosso di bella profondità, con aromi di prugna e ciliegia sotto spirito. Al gusto è armonico e avvolgente, dal finale lungo e appagante.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-alastro",
    slug: "planeta-alastro",
    name: "Alastro",
    producer: "Planeta",
    category: "vini-bianchi",
    region: "Sicilia Menfi",
    denomination: "Sicilia Menfi DOC",
    grapeVarieties: ["Grecanico"],
    volume: "750ml",
    price: 12,
    images: [
      "/products/planeta-alastro-hero.jpg", // hero (nuova foto)
      "/products/planeta-alastro.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Alastro di Planeta, Bottiglia con vino chiaro ed etichetta verde salvia floreale.",
    tastingNotes: "Bianco fine ed elegante, dai profumi delicati e freschi. In bocca colpisce per equilibrio e per un finale piacevolmente sapido.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-terebinto",
    slug: "planeta-terebinto",
    name: "Terebinto",
    producer: "Planeta",
    category: "vini-bianchi",
    region: "Sicilia Menfi",
    denomination: "Sicilia Menfi DOC",
    grapeVarieties: ["Grillo"],
    volume: "750ml",
    price: 12,
    images: [
      "/products/planeta-terebinto-hero.jpg", // hero (nuova foto)
      "/products/planeta-terebinto.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Terebinto di Planeta, Bottiglia con etichetta gialla floreale e capsula gialla.",
    tastingNotes: "Vino bianco fresco e minerale, con profumi delicati di fiori bianchi e frutta a polpa gialla. Al palato è vivace ed equilibrato, con un finale pulito.",
    foodPairings: ["Antipasti vegetariani", "Pesce al forno", "Aperitivo"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-plumbago",
    slug: "planeta-plumbago",
    name: "Plumbago",
    producer: "Planeta",
    category: "vini-rossi",
    region: "Sicilia Menfi",
    denomination: "Sicilia Menfi DOC",
    grapeVarieties: ["Nero d'Avola"],
    volume: "750ml",
    price: 12,
    images: [
      "/products/planeta-plumbago-hero.jpg", // hero (nuova foto)
      "/products/planeta-plumbago.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Plumbago di Planeta, Bottiglia scura con etichetta rosa floreale e capsula viola.",
    tastingNotes: "Rosso elegante e strutturato, dai sentori di piccoli frutti scuri e spezie dolci. In bocca risulta caldo ed equilibrato, con una piacevole chiusura.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-dorilli",
    slug: "planeta-dorilli",
    name: "Dorilli",
    producer: "Planeta",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Cerasuolo di Vittoria Classico DOCG",
    grapeVarieties: [],
    vintage: 2023,
    volume: "750ml",
    price: 17,
    images: [
      "/products/planeta-dorilli-hero.jpg", // hero (nuova foto)
      "/products/planeta-dorilli.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Dorilli di Planeta, Bottiglia scura con etichetta nera e scritte a spirale bianche.",
    tastingNotes: "Un vino rosso dal profilo intenso, con note fruttate e un tocco di sottobosco. Il sorso è morbido e generoso, sorretto da tannini vellutati.",
    foodPairings: ["Selvaggina", "Arrosti", "Formaggi a pasta dura"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-la-segreta-bianco",
    slug: "planeta-la-segreta-bianco",
    name: "La Segreta Bianco",
    producer: "Planeta",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: [],
    vintage: 2025,
    volume: "750ml",
    price: 9,
    images: [
      "/products/planeta-la-segreta-bianco-hero.jpg", // hero (nuova foto)
      "/products/planeta-la-segreta-bianco.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di La Segreta Bianco di Planeta, Bottiglia con vino chiaro ed etichetta bianca floreale, capsula gialla.",
    tastingNotes: "Vino bianco dal carattere fragrante, con aromi di frutta bianca e una delicata scia minerale. Il palato è pulito, vivace e armonioso.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "planeta-la-segreta-rosso",
    slug: "planeta-la-segreta-rosso",
    name: "La Segreta Rosso",
    producer: "Planeta",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: [],
    vintage: 2024,
    volume: "750ml",
    price: 9,
    images: [
      "/products/planeta-la-segreta-rosso-hero.jpg", // hero (nuova foto)
      "/products/planeta-la-segreta-rosso-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/planeta-la-segreta-rosso.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di La Segreta Rosso di Planeta, Bottiglia scura con etichetta bianca floreale e capsula rossa.",
    tastingNotes: "Un rosso conviviale e versatile, dai profumi vinosi e fruttati. Al palato è schietto, morbido e di piacevole beva.",
    foodPairings: ["Grigliate di carne", "Pecorino stagionato", "Primi saporiti"],
    inStock: true,
    badges: [],
  },
  {
    id: "mandrarossa-santannella",
    slug: "mandrarossa-santannella",
    name: "Santannella",
    producer: "Mandrarossa",
    category: "vini-rossi",
    region: "Sicilia",
    denomination: "Terre Siciliane IGT",
    grapeVarieties: [],
    vintage: 2023,
    volume: "750ml",
    price: 11.9,
    images: [
      "/products/mandrarossa-santannella-hero.jpg", // hero (nuova foto)
      "/products/mandrarossa-santannella.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Santannella di Mandrarossa, Etichetta avorio con scritte scure e stella dorata.",
    tastingNotes: "Un rosso dal carattere deciso, con profumi di frutta rossa matura e delicate note speziate. Al palato è pieno e avvolgente, con tannini ben integrati e un finale persistente.",
    foodPairings: ["Carni rosse alla griglia", "Formaggi stagionati", "Primi piatti al ragù"],
    inStock: true,
    badges: [],
  },
  {
    id: "donnafugata-lumera",
    slug: "donnafugata-lumera",
    name: "Lumera",
    producer: "Donnafugata",
    category: "rosati",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: [],
    vintage: 2024,
    volume: "750ml",
    price: 12.8,
    images: [
      "/products/donnafugata-lumera-hero.jpg", // hero (nuova foto)
      "/products/donnafugata-lumera.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Lumera di Donnafugata, Liquido rosa salmone, capsula lilla, etichetta illustrata colorata.",
    tastingNotes: "Rosato delicato dai sentori floreali e fruttati. Al gusto risulta fresco ed equilibrato, perfetto per la tavola di tutti i giorni.",
    foodPairings: ["Insalate di mare", "Aperitivo", "Piatti estivi"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "benvenuti-limoncello",
    slug: "benvenuti-limoncello",
    name: "Limoncello",
    producer: "Benvenuti",
    category: "liquori",
    region: "Sicilia",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 13,
    images: [
      "/products/benvenuti-limoncello.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Limoncello di Benvenuti, Liquido giallo limone, etichetta bianca con limoni disegnati.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "raffles-gin",
    slug: "raffles-gin",
    name: "Raffles Gin",
    producer: "Raffles",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 10,
    images: [
      "/products/raffles-gin.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Raffles Gin di Raffles, Bottiglia trasparente, etichetta scura con decori turchese argento.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "meera-ginger",
    slug: "meera-ginger",
    name: "Meera Ginger",
    producer: "Meera",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 25,
    volume: "700ml",
    price: 18.5,
    images: [
      "/products/meera-ginger-hero.jpg", // hero (nuova foto)
      "/products/meera-ginger-2.jpg", // foto aggiuntiva (nuovo angolo)
      "/products/meera-ginger.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Meera Ginger di Meera, Liquido chiaro dorato, etichetta bianca e oro con elefante.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "meera-rose",
    slug: "meera-rose",
    name: "Meera Rose",
    producer: "Meera",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 25,
    volume: "700ml",
    price: 18.5, // PROVISIONAL — read from the shared line-up price tag (Meera range); confirm before go-live
    images: [
      "/products/meera-rose.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Meera Rose di Meera, Liquido rosato con etichetta bianca e oro Premium Quality.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "meera-alphonso-mango",
    slug: "meera-alphonso-mango",
    name: "Meera Alphonso Mango",
    producer: "Meera",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 25,
    volume: "700ml",
    price: 18.5, // PROVISIONAL — read from the shared line-up price tag (Meera range); confirm before go-live
    images: [
      "/products/meera-alphonso-mango.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Meera Alphonso Mango di Meera, Liquido arancione con etichetta bianca e oro Premium Quality e mango disegnato.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "meera-cardamom",
    slug: "meera-cardamom",
    name: "Meera Cardamom",
    producer: "Meera",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 25,
    volume: "700ml",
    price: 18.5, // PROVISIONAL — read from the shared line-up price tag (Meera range); confirm before go-live
    images: [
      "/products/meera-cardamom.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Meera Cardamom di Meera, Liquido verde con etichetta bianca e oro Premium Quality e cardamomo disegnato.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "donnafugata-sursur",
    slug: "donnafugata-sursur",
    name: "SurSur",
    producer: "Donnafugata",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: ["Grillo"],
    vintage: 2024,
    volume: "750ml",
    price: 12.8,
    images: [
      "/products/donnafugata-sursur-hero.jpg", // hero (nuova foto)
      "/products/donnafugata-sursur.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di SurSur di Donnafugata, Vino bianco paglierino, capsula verde, etichetta con prato illustrato.",
    tastingNotes: "Vino bianco fresco e minerale, con profumi delicati di fiori bianchi e frutta a polpa gialla. Al palato è vivace ed equilibrato, con un finale pulito.",
    foodPairings: ["Frutti di mare", "Verdure di stagione", "Carni bianche"],
    inStock: true,
    badges: [],
  },
  {
    id: "donnafugata-damarino",
    slug: "donnafugata-damarino",
    name: "Damarino",
    producer: "Donnafugata",
    category: "vini-bianchi",
    region: "Sicilia",
    denomination: "Sicilia DOC",
    grapeVarieties: [],
    vintage: 2025,
    volume: "750ml",
    price: 9.5,
    images: [
      "/products/donnafugata-damarino-hero.jpg", // hero (nuova foto)
      "/products/donnafugata-damarino.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Damarino di Donnafugata, Vino bianco chiaro, capsula azzurra, etichetta blu illustrata.",
    tastingNotes: "Bianco luminoso dai sentori agrumati e floreali. In bocca è teso e sapido, con una gradevole acidità che invita al sorso successivo.",
    foodPairings: ["Crostacei", "Formaggi freschi", "Primi ai frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "gin-puro-the-one",
    slug: "gin-puro-the-one",
    name: "Gin Puro The One",
    producer: "Gin Puro The One",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 47,
    images: [
      "/products/gin-puro-the-one-hero.jpg", // hero (nuova foto)
      "/products/gin-puro-the-one.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Gin Puro The One, Bottiglia quadrata trasparente, etichetta nera con scritte bianche.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "cobalto-17",
    slug: "cobalto-17",
    name: "Cobalto-17",
    producer: "Cobalto-17",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 38,
    originalPrice: 45,
    images: [
      "/products/cobalto-17-hero.jpg", // hero (nuova foto)
      "/products/cobalto-17.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Cobalto-17, Bottiglia trasparente, etichetta bianca con grande Co blu.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "martini-e-rossi-martini-fiero-l-aperitivo",
    slug: "martini-e-rossi-martini-fiero-l-aperitivo",
    name: "Martini Fiero L'Aperitivo",
    producer: "Martini & Rossi",
    category: "liquori",
    region: "Torino",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 11.2,
    originalPrice: 12.8,
    images: [
      "/products/martini-e-rossi-martini-fiero-l-aperitivo-hero.jpg", // hero (nuova foto)
      "/products/martini-e-rossi-martini-fiero-l-aperitivo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Martini Fiero L'Aperitivo di Martini & Rossi, Bottiglia scura con etichetta arancione tonda Martini.",
    tastingNotes: "Un liquore dal carattere deciso, con note erbacee e agrumate. Il sorso è morbido e persistente, perfetto a fine pasto.",
    foodPairings: ["Dopo cena", "Mixology", "Caffè"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "fratelli-branca-distillerie-fernet-branca",
    slug: "fratelli-branca-distillerie-fernet-branca",
    name: "Fernet-Branca",
    producer: "Fratelli Branca Distillerie",
    category: "liquori",
    region: "Milano",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 15.5,
    originalPrice: 16.6,
    images: [
      "/products/fratelli-branca-distillerie-fernet-branca-hero.jpg", // hero (nuova foto)
      "/products/fratelli-branca-distillerie-fernet-branca.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Fernet-Branca di Fratelli Branca Distillerie, Bottiglia scura con etichetta bianca Fernet-Branca.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "nardini-acqua-di-cedro-essenza-mediterranea",
    slug: "nardini-acqua-di-cedro-essenza-mediterranea",
    name: "Acqua di Cedro Essenza Mediterranea",
    producer: "Nardini",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 18.9,
    images: [
      "/products/nardini-acqua-di-cedro-essenza-mediterranea-hero.jpg", // hero (nuova foto)
      "/products/nardini-acqua-di-cedro-essenza-mediterranea.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Acqua di Cedro Essenza Mediterranea di Nardini, Bottiglia trasparente quadrata con etichetta bianca e cedro.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Dopo cena", "Mixology", "Caffè"],
    inStock: true,
    badges: [],
  },
  {
    id: "limoncello-luce-di-limone",
    slug: "limoncello-luce-di-limone",
    name: "Limoncello Luce di Limone",
    producer: "Limoncello Luce di Limone",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 28,
    volume: "700ml",
    price: 9,
    images: [
      "/products/limoncello-luce-di-limone.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Limoncello Luce di Limone, Liquido giallo limone con etichetta bianca floreale colorata.",
    tastingNotes: "Un liquore dal carattere deciso, con note erbacee e agrumate. Il sorso è morbido e persistente, perfetto a fine pasto.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "donnafugata-sul-vulcano-etna-rosato",
    slug: "donnafugata-sul-vulcano-etna-rosato",
    name: "Sul Vulcano Etna Rosato",
    producer: "Donnafugata",
    category: "rosati",
    region: "Sicilia",
    denomination: "Etna Rosato DOC",
    grapeVarieties: [],
    vintage: 2015,
    volume: "750ml",
    price: 20.7,
    images: [
      "/products/donnafugata-sul-vulcano-etna-rosato.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Sul Vulcano Etna Rosato di Donnafugata, Liquido rosato salmone con etichetta bianca colorata Donnafugata.",
    tastingNotes: "Rosato delicato dai sentori floreali e fruttati. Al gusto risulta fresco ed equilibrato, perfetto per la tavola di tutti i giorni.",
    foodPairings: ["Insalate di mare", "Aperitivo", "Piatti estivi"],
    inStock: true,
    badges: [],
  },
  {
    id: "national-alcohol-company-kozak-vodka-classic",
    slug: "national-alcohol-company-kozak-vodka-classic",
    name: "Kozak Vodka Classic",
    producer: "National Alcohol Company",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 6.9,
    originalPrice: 7.9,
    images: [
      "/products/national-alcohol-company-kozak-vodka-classic.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Kozak Vodka Classic di National Alcohol Company, Bottiglia trasparente con etichetta rossa e argento Kozak.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "malfy-gin-con-arancia-blood-orange",
    slug: "malfy-gin-con-arancia-blood-orange",
    name: "Malfy Gin Con Arancia (Blood Orange)",
    producer: "Malfy",
    category: "distillati",
    region: "Italy",
    denomination: "",
    grapeVarieties: [],
    alcohol: 41,
    volume: "700ml",
    price: 35.5,
    images: [
      "/products/malfy-gin-con-arancia-blood-orange.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Malfy Gin Con Arancia (Blood Orange) di Malfy, Bottiglia arancione con etichetta azzurra tonda Malfy.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "bulbash-green-line-fresh-infusion-raspberry-orange-thyme",
    slug: "bulbash-green-line-fresh-infusion-raspberry-orange-thyme",
    name: "Green Line Fresh Infusion Raspberry-Orange-Thyme",
    producer: "Bulbash",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 23,
    volume: "700ml",
    price: 8,
    images: [
      "/products/bulbash-green-line-fresh-infusion-raspberry-orange-thyme.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Green Line Fresh Infusion Raspberry-Orange-Thyme di Bulbash, Liquido rosato ambrato con etichetta verde e frutti.",
    tastingNotes: "Liquore dai profumi intensi e riconoscibili. Al gusto è rotondo ed equilibrato, gradevole liscio o nei cocktail.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "malfy-gin-rosa-pink-grapefruit",
    slug: "malfy-gin-rosa-pink-grapefruit",
    name: "Malfy Gin Rosa (Pink Grapefruit)",
    producer: "Malfy",
    category: "distillati",
    region: "Italy",
    denomination: "",
    grapeVarieties: [],
    alcohol: 41,
    volume: "700ml",
    price: 35.5,
    images: [
      "/products/malfy-gin-rosa-pink-grapefruit.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Malfy Gin Rosa (Pink Grapefruit) di Malfy, Bottiglia rosa smerigliata con etichetta azzurra tonda Malfy.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "kozatska-rada-originale",
    slug: "kozatska-rada-originale",
    name: "Kozatska Rada Originale (Козацька Рада)",
    producer: "Kozatska Rada Originale (Козацька Рада)",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 11.5,
    images: [
      "/products/kozatska-rada-originale.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Kozatska Rada Originale (Козацька Рада), Bottiglia trasparente con etichetta scura e stemma dorato.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "celsius-original-vodka",
    slug: "celsius-original-vodka",
    name: "Celsius Original Vodka",
    producer: "Celsius Original Vodka",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 9,
    images: [
      "/products/celsius-original-vodka-hero.jpg", // hero (nuova foto)
      "/products/celsius-original-vodka.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Celsius Original Vodka, Bottiglia trasparente con etichetta blu, vodka limpida incolore.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "disaronno-velvet-liqueur",
    slug: "disaronno-velvet-liqueur",
    name: "Disaronno Velvet Liqueur",
    producer: "Disaronno",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 17,
    volume: "700ml",
    price: 18.5,
    images: [
      "/products/disaronno-velvet-liqueur.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Disaronno Velvet Liqueur di Disaronno, Bottiglia bianca ceramica con etichetta dorata, crema liquore.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "baileys-the-original-irish-cream",
    slug: "baileys-the-original-irish-cream",
    name: "Baileys The Original Irish Cream",
    producer: "Baileys",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 17,
    volume: "700ml",
    price: 15,
    images: [
      "/products/baileys-the-original-irish-cream-hero.jpg", // hero (nuova foto)
      "/products/baileys-the-original-irish-cream.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Baileys The Original Irish Cream di Baileys, Bottiglia scura con etichetta rossa e paesaggio verde.",
    tastingNotes: "Un liquore dal carattere deciso, con note erbacee e agrumate. Il sorso è morbido e persistente, perfetto a fine pasto.",
    foodPairings: ["Dopo cena", "Mixology", "Caffè"],
    inStock: true,
    badges: [],
  },
  {
    id: "pernod-pastis-51",
    slug: "pernod-pastis-51",
    name: "Pastis 51",
    producer: "Pernod",
    category: "distillati",
    region: "Marseille",
    denomination: "",
    grapeVarieties: [],
    alcohol: 45,
    volume: "700ml",
    price: 23.8,
    originalPrice: 24.8,
    images: [
      "/products/pernod-pastis-51.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Pastis 51 di Pernod, Bottiglia scura con etichetta bianca blu rossa, pastis.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "hacienda-calibio-ron",
    slug: "hacienda-calibio-ron",
    name: "Hacienda Calibio Ron",
    producer: "Hacienda Calibio",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 42,
    volume: "700ml",
    price: 46.9,
    images: [
      "/products/hacienda-calibio-ron-hero.jpg", // hero (nuova foto)
      "/products/hacienda-calibio-ron.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Hacienda Calibio Ron di Hacienda Calibio, Bottiglia con rum ambrato dorato ed etichetta bianca minimale.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "gingino-london-dry-gin",
    slug: "gingino-london-dry-gin",
    name: "Gingino London Dry Gin",
    producer: "Gingino",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 9.5,
    images: [
      "/products/gingino-london-dry-gin.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Gingino London Dry Gin di Gingino, Bottiglia trasparente con etichetta azzurra decorata, gin limpido.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "xibal-gin",
    slug: "xibal-gin",
    name: "Xibal Gin",
    producer: "Xibal",
    category: "distillati",
    region: "Guatemala",
    denomination: "",
    grapeVarieties: [],
    alcohol: 45,
    volume: "700ml",
    price: 39.5,
    images: [
      "/products/xibal-gin-hero.jpg", // hero (nuova foto)
      "/products/xibal-gin.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Xibal Gin di Xibal, Bottiglia nera opaca con maschera maya verde e glifi.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "harvest-day-original-vodka",
    slug: "harvest-day-original-vodka",
    name: "Harvest Day Original Vodka",
    producer: "Harvest Day",
    category: "distillati",
    region: "Ukraine",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 11,
    images: [
      "/products/harvest-day-original-vodka.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Harvest Day Original Vodka di Harvest Day, Bottiglia trasparente con etichetta nera dorata, vodka limpida.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "bickens-premium-pink-distilled-gin-grapefruit",
    slug: "bickens-premium-pink-distilled-gin-grapefruit",
    name: "Bickens Premium Pink Distilled Gin Grapefruit",
    producer: "Bickens",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 13.3,
    originalPrice: 15.2,
    images: [
      "/products/bickens-premium-pink-distilled-gin-grapefruit-hero.jpg", // hero (nuova foto)
      "/products/bickens-premium-pink-distilled-gin-grapefruit.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Bickens Premium Pink Distilled Gin Grapefruit di Bickens, Bottiglia con gin rosa pompelmo ed etichetta bianca elegante.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "savian-anticaterra-prosecco-rose-extra-dry",
    slug: "savian-anticaterra-prosecco-rose-extra-dry",
    name: "Savian Anticaterra Prosecco Rose Extra Dry",
    producer: "Savian",
    category: "bollicine",
    region: "",
    denomination: "Prosecco DOC",
    grapeVarieties: [],
    volume: "750ml",
    price: 10.5,
    originalPrice: 12.5,
    images: [
      "/products/savian-anticaterra-prosecco-rose-extra-dry-hero.jpg", // hero (nuova foto)
      "/products/savian-anticaterra-prosecco-rose-extra-dry.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Savian Anticaterra Prosecco Rose Extra Dry di Savian, Bottiglia spumante con liquido rosato salmone ed etichetta rosa.",
    tastingNotes: "Bollicine eleganti dal perlage fine e persistente. Profumi di crosta di pane, frutta bianca e note floreali. Al palato è fresco, cremoso e dal finale sapido.",
    foodPairings: ["Crudi di mare", "Sushi", "Brindisi"],
    inStock: true,
    featured: true,
    badges: ["In Offerta"],
  },
  {
    id: "sensi-prosecco",
    slug: "sensi-prosecco",
    name: "Prosecco",
    producer: "Sensi",
    category: "bollicine",
    region: "",
    denomination: "DOC",
    grapeVarieties: [],
    volume: "750ml",
    price: 13.3,
    images: [
      "/products/sensi-prosecco.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Prosecco di Sensi, Bottiglia smerigliata bianca con capsula dorata, spumante.",
    tastingNotes: "Un calice dal perlage vivace e continuo, con aromi delicati di fiori e frutta a polpa bianca. In bocca è fresco, fragrante e invitante.",
    foodPairings: ["Aperitivo", "Antipasti raffinati", "Frutti di mare"],
    inStock: true,
    featured: true,
    badges: [],
  },
  {
    id: "savian-anticaterra-prosecco-doc-brut",
    slug: "savian-anticaterra-prosecco-doc-brut",
    name: "Anticaterra Prosecco DOC Brut",
    producer: "Savian",
    category: "bollicine",
    region: "",
    denomination: "DOC",
    grapeVarieties: [],
    volume: "750ml",
    price: 9.9,
    images: [
      "/products/savian-anticaterra-prosecco-doc-brut.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Anticaterra Prosecco DOC Brut di Savian, Etichetta azzurra chiara con capsula argento, spumante.",
    tastingNotes: "Bollicine fini e briose, dai profumi puliti e floreali. Al gusto è scattante ed equilibrato, ideale per ogni brindisi.",
    foodPairings: ["Occasioni speciali", "Fritture di pesce", "Aperitivo"],
    inStock: true,
    badges: [],
  },
  {
    id: "beefeater-24-london-dry-gin",
    slug: "beefeater-24-london-dry-gin",
    name: "Beefeater 24 London Dry Gin",
    producer: "Beefeater",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 45,
    volume: "700ml",
    price: 29.9,
    images: [
      "/products/beefeater-24-london-dry-gin.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Beefeater 24 London Dry Gin di Beefeater, Bottiglia trasparente riflessi rossi, etichetta bianca, gin.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "silvio-carta-pig-skin-london-dry-gin-silver",
    slug: "silvio-carta-pig-skin-london-dry-gin-silver",
    name: "Pig Skin London Dry Gin Silver",
    producer: "Silvio Carta",
    category: "distillati",
    region: "Sardegna",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 24.9,
    originalPrice: 27.65,
    images: [
      "/products/silvio-carta-pig-skin-london-dry-gin-silver.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Pig Skin London Dry Gin Silver di Silvio Carta, Bottiglia trasparente, etichetta bianca con cinghiale, gin.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "pilloni-grifu-gin",
    slug: "pilloni-grifu-gin",
    name: "Grifu Gin",
    producer: "Pilloni",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 43,
    volume: "700ml",
    price: 30,
    images: [
      "/products/pilloni-grifu-gin.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Grifu Gin di Pilloni, Bottiglia trasparente, etichetta blu a francobollo con grifone, gin.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "sandhera-rum-company-five-rivers-indian-spiced-white-rum",
    slug: "sandhera-rum-company-five-rivers-indian-spiced-white-rum",
    name: "Five Rivers Indian Spiced White Rum",
    producer: "Sandhera Rum Company",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 35.9,
    originalPrice: 39.9,
    images: [
      "/products/sandhera-rum-company-five-rivers-indian-spiced-white-rum-hero.jpg", // hero (nuova foto)
      "/products/sandhera-rum-company-five-rivers-indian-spiced-white-rum.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Five Rivers Indian Spiced White Rum di Sandhera Rum Company, Bottiglia trasparente, etichetta azzurra con numero 5, rum.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "bartavelle-gin-fraise-de-provence-et-rhubarbe",
    slug: "bartavelle-gin-fraise-de-provence-et-rhubarbe",
    name: "Bartavelle Gin Fraise de Provence et Rhubarbe",
    producer: "Bartavelle",
    category: "distillati",
    region: "Sud de la France",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 36.9,
    images: [
      "/products/bartavelle-gin-fraise-de-provence-et-rhubarbe-hero.jpg", // hero (nuova foto)
      "/products/bartavelle-gin-fraise-de-provence-et-rhubarbe.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Bartavelle Gin Fraise de Provence et Rhubarbe di Bartavelle, Bottiglia liquido rosato, etichetta bianca fragole e rabarbaro, gin.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "gordon-s-london-dry-gin",
    slug: "gordon-s-london-dry-gin",
    name: "Gordon's London Dry Gin",
    producer: "Gordon's",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 13.8,
    images: [
      "/products/gordon-s-london-dry-gin-hero.jpg", // hero (nuova foto)
      "/products/gordon-s-london-dry-gin.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Gordon's London Dry Gin di Gordon's, Bottiglia trasparente, etichetta bianca e gialla, gin.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "bacardi-carta-blanca-superior-white-rum",
    slug: "bacardi-carta-blanca-superior-white-rum",
    name: "Carta Blanca Superior White Rum",
    producer: "Bacardi",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 37.5,
    volume: "700ml",
    price: 15.5,
    images: [
      "/products/bacardi-carta-blanca-superior-white-rum-hero.jpg", // hero (nuova foto)
      "/products/bacardi-carta-blanca-superior-white-rum.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Carta Blanca Superior White Rum di Bacardi, Bottiglia trasparente, etichetta bianca con pipistrello rosso, rum.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "caffo-vecchio-amaro-del-capo",
    slug: "caffo-vecchio-amaro-del-capo",
    name: "Vecchio Amaro del Capo",
    producer: "Caffo",
    category: "liquori",
    region: "Calabria",
    denomination: "",
    grapeVarieties: [],
    alcohol: 35,
    volume: "700ml",
    price: 16.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/caffo-vecchio-amaro-del-capo-hero.jpg", // hero (nuova foto)
      "/products/caffo-vecchio-amaro-del-capo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Vecchio Amaro del Capo di Caffo, Bottiglia scura, etichetta con paesaggio costiero, amaro alle erbe.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "bombay-sapphire-london-dry-gin",
    slug: "bombay-sapphire-london-dry-gin",
    name: "Bombay Sapphire London Dry Gin",
    producer: "Bombay Sapphire",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 16,
    images: [
      "/products/bombay-sapphire-london-dry-gin-hero.jpg", // hero (nuova foto)
      "/products/bombay-sapphire-london-dry-gin.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Bombay Sapphire London Dry Gin di Bombay Sapphire, Bottiglia blu con etichetta bianca, gin distillato inglese.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "clementina-fabi-passerina-spumante-extra-brut",
    slug: "clementina-fabi-passerina-spumante-extra-brut",
    name: "Passerina Spumante Extra Brut",
    producer: "Clementina Fabi",
    category: "bollicine",
    region: "",
    denomination: "Terre di Offida DOC",
    grapeVarieties: ["Passerina"],
    volume: "750ml",
    price: 12.9,
    images: [
      "/products/clementina-fabi-passerina-spumante-extra-brut-hero.jpg", // hero (nuova foto)
      "/products/clementina-fabi-passerina-spumante-extra-brut.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Passerina Spumante Extra Brut di Clementina Fabi, Bottiglia scura con capsula dorata ed etichetta bianca.",
    tastingNotes: "Bollicine eleganti dal perlage fine e persistente. Profumi di crosta di pane, frutta bianca e note floreali. Al palato è fresco, cremoso e dal finale sapido.",
    foodPairings: ["Crudi di mare", "Sushi", "Brindisi"],
    inStock: true,
    badges: [],
  },
  {
    id: "bacardi-reserva-ocho-rare-gold-rum",
    slug: "bacardi-reserva-ocho-rare-gold-rum",
    name: "Bacardi Reserva Ocho Rare Gold Rum",
    producer: "Bacardi",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 39.9,
    originalPrice: 43.9,
    images: [
      "/products/bacardi-reserva-ocho-rare-gold-rum.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Bacardi Reserva Ocho Rare Gold Rum di Bacardi, Bottiglia trasparente con rum ambrato, sigillo rosso pipistrello.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "g-b-pezziol-vov-liquore-all-uovo",
    slug: "g-b-pezziol-vov-liquore-all-uovo",
    name: "VOV Liquore all'Uovo",
    producer: "G.B. Pezziol",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 14.5,
    images: [
      "/products/g-b-pezziol-vov-liquore-all-uovo.jpeg", // sola immagine
    ],
    alt: "Bottiglia di VOV Liquore all'Uovo di G.B. Pezziol, Bottiglia bianca con etichetta blu e rossa colorata, zabaione.",
    tastingNotes: "Un liquore dal carattere deciso, con note erbacee e agrumate. Il sorso è morbido e persistente, perfetto a fine pasto.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: [],
  },
  {
    id: "peruzzet-prosecco-extra-dry",
    slug: "peruzzet-prosecco-extra-dry",
    name: "Prosecco Extra Dry",
    producer: "Peruzzet",
    category: "bollicine",
    region: "",
    denomination: "Prosecco DOC",
    grapeVarieties: [],
    volume: "750ml",
    price: 8,
    images: [
      "/products/peruzzet-prosecco-extra-dry.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Prosecco Extra Dry di Peruzzet, Bottiglia scura con capsula dorata ed etichetta bianca prosecco.",
    tastingNotes: "Spuma cremosa e perlage elegante, con note di lievito e frutta bianca. Il sorso è fresco, teso e di piacevole persistenza.",
    foodPairings: ["Crudi di mare", "Sushi", "Brindisi"],
    inStock: true,
    badges: [],
  },
  {
    id: "citra-moscato-spumante-dolce",
    slug: "citra-moscato-spumante-dolce",
    name: "Moscato Spumante Dolce",
    producer: "Citra",
    category: "bollicine",
    region: "",
    denomination: "",
    grapeVarieties: ["Moscato"],
    volume: "750ml",
    price: 7.9,
    images: [
      "/products/citra-moscato-spumante-dolce-hero.jpg", // hero (nuova foto)
      "/products/citra-moscato-spumante-dolce.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Moscato Spumante Dolce di Citra, Bottiglia verde con etichetta bianca e decoro floreale dorato.",
    tastingNotes: "Bollicine eleganti dal perlage fine e persistente. Profumi di crosta di pane, frutta bianca e note floreali. Al palato è fresco, cremoso e dal finale sapido.",
    foodPairings: ["Aperitivo", "Antipasti raffinati", "Frutti di mare"],
    inStock: true,
    badges: [],
  },
  {
    id: "all-seasons-oasis-all-seasons-sir-e-taj-reserve-spirit",
    slug: "all-seasons-oasis-all-seasons-sir-e-taj-reserve-spirit",
    name: "All Seasons Sir-E-Taj Reserve Spirit",
    producer: "All Seasons (Oasis)",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 11.2,
    images: [
      "/products/all-seasons-oasis-all-seasons-sir-e-taj-reserve-spirit-hero.jpg", // hero (nuova foto)
      "/products/all-seasons-oasis-all-seasons-sir-e-taj-reserve-spirit.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di All Seasons Sir-E-Taj Reserve Spirit di All Seasons (Oasis), Astuccio cilindrico nero con scritte bianche e dorate, whisky.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "magic-moments-remix-orange-flavoured-vodka",
    slug: "magic-moments-remix-orange-flavoured-vodka",
    name: "Magic Moments Remix Orange Flavoured Vodka",
    producer: "Magic Moments",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 16.5,
    images: [
      "/products/magic-moments-remix-orange-flavoured-vodka-hero.jpg", // hero (nuova foto)
      "/products/magic-moments-remix-orange-flavoured-vodka.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Magic Moments Remix Orange Flavoured Vodka di Magic Moments, Bottiglia smerigliata trasparente con silhouette arancioni, vodka.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "seagram-s-blenders-pride-ultra-premium",
    slug: "seagram-s-blenders-pride-ultra-premium",
    name: "Seagram's Blenders Pride Ultra Premium",
    producer: "Seagram's",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 19.5,
    images: [
      "/products/seagram-s-blenders-pride-ultra-premium-hero.jpg", // hero (nuova foto)
      "/products/seagram-s-blenders-pride-ultra-premium.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Seagram's Blenders Pride Ultra Premium di Seagram's, Bottiglia con liquido ambrato ed etichetta nera e blu, whisky.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "magic-moments-premium-grain-vodka",
    slug: "magic-moments-premium-grain-vodka",
    name: "Magic Moments Premium Grain Vodka",
    producer: "Magic Moments",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 16.5,
    images: [
      "/products/magic-moments-premium-grain-vodka-hero.jpg", // hero (nuova foto)
      "/products/magic-moments-premium-grain-vodka.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Magic Moments Premium Grain Vodka di Magic Moments, Bottiglia smerigliata trasparente con etichetta blu e bianca, vodka.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "aristocrat-premium",
    slug: "aristocrat-premium",
    name: "Aristocrat Premium",
    producer: "Aristocrat Premium",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 17.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/aristocrat-premium-hero.jpg", // hero (nuova foto)
      "/products/aristocrat-premium.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Aristocrat Premium, etichetta rossa e dorata, liquido ambrato, stemma araldico.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "drambuie",
    slug: "drambuie",
    name: "Drambuie",
    producer: "Drambuie",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    alcohol: 40,
    volume: "700ml",
    price: 34.4,
    originalPrice: 36.4,
    images: [
      "/products/drambuie.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Drambuie, etichetta dorata e rossa, liquore scuro, bottiglia scura.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "vecchia-romagna-classica",
    slug: "vecchia-romagna-classica",
    name: "Vecchia Romagna Classica",
    producer: "Vecchia Romagna",
    category: "distillati",
    region: "Romagna",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 16.9,
    originalPrice: 19.9,
    images: [
      "/products/vecchia-romagna-classica-hero.jpg", // hero (nuova foto)
      "/products/vecchia-romagna-classica.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Vecchia Romagna Classica di Vecchia Romagna, bottiglia ovale, liquido ambrato ramato, etichetta bianca ovale.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "savian-prosecco-brut",
    slug: "savian-prosecco-brut",
    name: "Savian Prosecco Brut",
    producer: "Savian",
    category: "bollicine",
    region: "",
    denomination: "DOC",
    grapeVarieties: [],
    volume: "750ml",
    price: 13.5,
    originalPrice: 15, // struck price from tag ("con sconto")
    images: [
      "/products/savian-prosecco-brut-hero.jpg", // hero (nuova foto)
      "/products/savian-prosecco-brut.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Savian Prosecco Brut di Savian, bottiglia scura spumante, etichetta bianca minimale, capsula scura biologico.",
    tastingNotes: "Bollicine eleganti dal perlage fine e persistente. Profumi di crosta di pane, frutta bianca e note floreali. Al palato è fresco, cremoso e dal finale sapido.",
    foodPairings: ["Crudi di mare", "Sushi", "Brindisi"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "malibu-original",
    slug: "malibu-original",
    name: "Malibu Original",
    producer: "Malibu Original",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 15.8,
    originalPrice: 16.8,
    images: [
      "/products/malibu-original.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Malibu Original, bottiglia bianca opaca, logo palme e tramonto colorato.",
    tastingNotes: "Liquore dal profilo aromatico distintivo, ideale come digestivo o per la mixology creativa. Al palato è avvolgente e ben bilanciato.",
    foodPairings: ["Dopo cena", "Mixology", "Caffè"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "mohan-meakin-old-monk-coffee-xo",
    slug: "mohan-meakin-old-monk-coffee-xo",
    name: "Old Monk Coffee XO",
    producer: "Mohan Meakin",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 17.9,
    originalPrice: 20.9,
    images: [
      "/products/mohan-meakin-old-monk-coffee-xo-hero.jpg", // hero (nuova foto)
      "/products/mohan-meakin-old-monk-coffee-xo.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Old Monk Coffee XO di Mohan Meakin, bottiglia scura, etichetta marrone e bianca, tappo marrone.",
    tastingNotes: "Un liquore dal carattere deciso, con note erbacee e agrumate. Il sorso è morbido e persistente, perfetto a fine pasto.",
    foodPairings: ["Digestivo", "Cocktail", "Fine pasto"],
    inStock: true,
    badges: ["In Offerta"],
  },
  {
    id: "mohan-meakin-old-monk-20-amber",
    slug: "mohan-meakin-old-monk-20-amber",
    name: "Old Monk 20 Amber",
    producer: "Mohan Meakin",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 17.9, // PROVISIONAL — price tag not visible in client photo; confirm before go-live
    images: [
      "/products/mohan-meakin-old-monk-20-amber-hero.jpg", // hero (nuova foto)
      "/products/mohan-meakin-old-monk-20-amber.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Old Monk 20 Amber di Mohan Meakin, bottiglia ambrata a nido d'ape, etichetta bordeaux, astuccio rosso.",
    tastingNotes: "Distillato dal bouquet aromatico e profondo. Il sorso è avvolgente e vellutato, con una chiusura calda ed elegante.",
    foodPairings: ["Fine pasto", "Degustazione", "Pasticceria secca"],
    inStock: true,
    badges: [],
  },
  {
    id: "magic-moments-remix-green-apple",
    slug: "magic-moments-remix-green-apple",
    name: "Magic Moments Remix Green Apple",
    producer: "Magic Moments Remix Green Apple",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 16.5,
    images: [
      "/products/magic-moments-remix-green-apple.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Magic Moments Remix Green Apple, bottiglia smerigliata verde chiaro, grafica cavalli e polo.",
    tastingNotes: "Distillato di grande carattere, dai profumi complessi e avvolgenti. Al palato è rotondo e persistente, con un finale lungo ed elegante.",
    foodPairings: ["Meditazione", "Fine pasto", "Cioccolato fondente"],
    inStock: true,
    badges: [],
  },
  {
    id: "seagram-s-royal-stag-blended-spirit",
    slug: "seagram-s-royal-stag-blended-spirit",
    name: "Royal Stag Blended Spirit",
    producer: "Seagram's",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 10.9,
    images: [
      "/products/seagram-s-royal-stag-blended-spirit-hero.jpg", // hero (nuova foto)
      "/products/seagram-s-royal-stag-blended-spirit.jpeg", // foto originale precedente
    ],
    alt: "Bottiglia di Royal Stag Blended Spirit di Seagram's, bottiglia squadrata, liquido ambrato, etichetta crema con cervo.",
    tastingNotes: "Un distillato dal profilo intenso e raffinato, con sentori caldi e speziati. In bocca risulta morbido, pieno e di lunga persistenza.",
    foodPairings: ["Sigaro", "Dopo cena", "Cioccolato"],
    inStock: true,
    badges: [],
  },
  {
    id: "mionetto-valdobbiadene-prosecco-superiore",
    slug: "mionetto-valdobbiadene-prosecco-superiore",
    name: "Mionetto Valdobbiadene Prosecco Superiore",
    producer: "Mionetto",
    category: "bollicine",
    region: "Valdobbiadene",
    denomination: "DOCG",
    grapeVarieties: [],
    volume: "750ml",
    price: 11,
    images: [
      "/products/mionetto-valdobbiadene-prosecco-superiore.jpeg", // sola immagine
    ],
    alt: "Bottiglia di Mionetto Valdobbiadene Prosecco Superiore di Mionetto, bottiglia scura spumante, etichetta nera, gabbietta dorata.",
    tastingNotes: "Bollicine fini e briose, dai profumi puliti e floreali. Al gusto è scattante ed equilibrato, ideale per ogni brindisi.",
    foodPairings: ["Crudi di mare", "Sushi", "Brindisi"],
    inStock: true,
    badges: [],
  },
  {
    id: "disaronno-originale",
    slug: "disaronno-originale",
    name: "Disaronno Originale",
    producer: "Illva Saronno",
    category: "liquori",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 0, // PLACEHOLDER — prezzo da confermare col cliente
    images: ["/products/disaronno-originale.jpg"],
    alt: "Bottiglia di Disaronno Originale, liquore, in primo piano su fondo neutro.",
    tastingNotes: "PLACEHOLDER — descrizione da fornire dal cliente.",
    foodPairings: [],
    inStock: true,
    badges: ["Novità"],
    needsClientReview: true,
  },
  {
    id: "mohan-meakin-old-monk-7-years",
    slug: "mohan-meakin-old-monk-7-years",
    name: "Old Monk Rum 7 Years",
    producer: "Mohan Meakin",
    category: "distillati",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "700ml",
    price: 0, // PLACEHOLDER — prezzo da confermare col cliente
    images: ["/products/mohan-meakin-old-monk-7-years.jpg"],
    alt: "Bottiglia di Old Monk Rum 7 Years, distillato, in primo piano su fondo neutro.",
    tastingNotes: "PLACEHOLDER — descrizione da fornire dal cliente.",
    foodPairings: [],
    inStock: true,
    badges: ["Novità"],
    needsClientReview: true,
  },
  {
    id: "savian-anticaterra-prosecco-extra-dry",
    slug: "savian-anticaterra-prosecco-extra-dry",
    name: "Savian Anticaterra Prosecco Extra Dry",
    producer: "Savian",
    category: "bollicine",
    region: "",
    denomination: "",
    grapeVarieties: [],
    volume: "750ml",
    price: 0, // PLACEHOLDER — prezzo da confermare col cliente
    images: ["/products/savian-anticaterra-prosecco-extra-dry.jpg"],
    alt: "Bottiglia di Savian Anticaterra Prosecco Extra Dry, spumante, in primo piano su fondo neutro.",
    tastingNotes: "PLACEHOLDER — descrizione da fornire dal cliente.",
    foodPairings: [],
    inStock: true,
    badges: ["Novità"],
    needsClientReview: true,
  },
];

/* ------------------------------------------------------------------ */
/* Selectors                                                           */
/* ------------------------------------------------------------------ */

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getWinesByCategory(slug: WineCategory): Wine[] {
  return WINES.filter((w) => w.category === slug);
}

export function getWineBySlug(slug: string): Wine | undefined {
  return WINES.find((w) => w.slug === slug);
}

export function getFeatured(limit?: number): Wine[] {
  const list = WINES.filter((w) => w.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getBestSellers(limit = 8): Wine[] {
  return WINES.filter((w) => w.badges?.includes("Best Seller")).slice(0, limit);
}

export function getOnOffer(limit?: number): Wine[] {
  const list = WINES.filter((w) => w.originalPrice && w.originalPrice > w.price);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Related wines: same region first, then same category. */
export function getRelated(wine: Wine, limit = 4): Wine[] {
  const sameRegion = WINES.filter(
    (w) => w.id !== wine.id && wine.region && w.region === wine.region,
  );
  const sameCategory = WINES.filter(
    (w) => w.id !== wine.id && w.category === wine.category && !sameRegion.includes(w),
  );
  return [...sameRegion, ...sameCategory].slice(0, limit);
}

/** Discount percentage for a wine on offer (rounded), else null. */
export function discountPct(wine: Wine): number | null {
  if (!wine.originalPrice || wine.originalPrice <= wine.price) return null;
  return Math.round((1 - wine.price / wine.originalPrice) * 100);
}

/** Distinct filter facet values for a set of wines. */
export function facetsFor(wines: Wine[]) {
  const regions = new Set<string>();
  const denominations = new Set<string>();
  const grapes = new Set<string>();
  const vintages = new Set<number>();
  let minPrice = Infinity;
  let maxPrice = 0;
  for (const w of wines) {
    if (w.region) regions.add(w.region);
    if (w.denomination) denominations.add(w.denomination);
    w.grapeVarieties?.forEach((g) => grapes.add(g));
    if (w.vintage) vintages.add(w.vintage);
    minPrice = Math.min(minPrice, w.price);
    maxPrice = Math.max(maxPrice, w.price);
  }
  return {
    regions: [...regions].sort(),
    denominations: [...denominations].sort(),
    grapes: [...grapes].sort(),
    vintages: [...vintages].sort((a, b) => b - a),
    minPrice: Number.isFinite(minPrice) ? Math.floor(minPrice) : 0,
    maxPrice: Math.ceil(maxPrice),
  };
}
