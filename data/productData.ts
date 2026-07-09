/**
 * Enoteca [Placeholder] — product catalogue (Phase 1).
 *
 * All producers are FICTIONAL. Regions, denominations and grape varieties are
 * real Italian references so the catalogue reads authentically. Prices are in
 * realistic Italian retail ranges (€8–€150).
 *
 * Schema note (vs the original Phase-1 spec): `region`, `denomination`,
 * `grapeVarieties`, `vintage` and `alcohol` are OPTIONAL — they don't apply to
 * the non-wine categories (distillati, liquori, accessori). Wines always carry
 * them. This keeps a single product type across the whole catalogue without
 * sentinel values. Documented in /DORECA_ANALYSIS.md.
 *
 * Images: every Unsplash photo-id below was verified to return HTTP 200 from
 * images.unsplash.com. `source.unsplash.com` is never used. A curated pool is
 * reused across bottles by category; <BottleImage> falls back to a branded
 * cream tile if any URL ever breaks, so there is never a broken-image icon.
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
  image: string;
  tastingNotes: string;
  foodPairings: string[];
  awards?: string[];
  inStock: boolean;
  featured?: boolean;
  badges?: Badge[];
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

/** Build a verified Unsplash URL. */
const u = (id: string, w = 800): string =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

/* ---- Verified image pools (all return 200) ---- */
const BOTTLES = [
  "photo-1510812431401-41d2bd2722f3",
  "photo-1553361371-9b22f78e8b1d",
  "photo-1584916201218-f4242ceb4809",
  "photo-1560148218-1a83060f7b32",
  "photo-1568213816046-0ee1c42bd559",
  "photo-1516594915697-87eb3b1c14ea",
  "photo-1524594152303-9fd13543fe6e",
  "photo-1598306442928-4d90f32c6866",
  "photo-1608270586620-248524c67de9",
  "photo-1551218808-94e220e084d2",
  "photo-1510626176961-4b57d4fbad03",
  "photo-1528823872057-9c018a7a7553",
  "photo-1514362545857-3bc16c4c7d1b",
  "photo-1481349518771-20055b2a7b24",
  "photo-1600271886742-f049cd451bba",
  "photo-1569529465841-dfecdab7503b",
  "photo-1516997121675-4c2d1684aa3e",
  "photo-1571613316887-6f8d5cbf7ef7",
  "photo-1585553616435-2dc0a54e271d",
  "photo-1560493676-04071c5f467b",
  "photo-1598986646512-9330bcc4c0dc",
  "photo-1566995541428-f2246c17cda1",
  "photo-1513558161293-cdaf765ed2fd",
  "photo-1516594798947-e65505dbb29d",
  "photo-1544145945-f90425340c7e",
  "photo-1558346547-4439467bd1d5",
  "photo-1626897505254-e0f811aa9bf7",
  "photo-1536935338788-846bb9981813",
  "photo-1550928431-ee0ec6db30d3",
  "photo-1502920917128-1aa500764cbd",
  "photo-1518176258769-f227c798150e",
  "photo-1516600164266-f3b8166ae679",
  "photo-1471193945509-9ad0617afabf",
] as const;

const SPARKLING = [
  "photo-1543418219-44e30b057fea",
  "photo-1608885898957-a559228e8749",
  "photo-1609951651556-5334e2706168",
  "photo-1512069772995-ec65ed45afd6",
] as const;

const ROSE = "photo-1558001373-7b93ee48ffa0";
const WHITE = "photo-1474722883778-792e7990302f";

/** Atmospheric shots for category headers / hero / marketing sections.
 * Every id was visually inspected (not just 200-checked) to ensure it depicts
 * wine, vineyards, cellars or spirits — never unrelated stock. */
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

const bottle = (i: number): string => u(BOTTLES[i % BOTTLES.length]);
const sparkling = (i: number): string => u(SPARKLING[i % SPARKLING.length]);

/**
 * Per-category product image pools — visually verified to match each category
 * (reds for vini-rossi, whites for vini-bianchi, amber liquids for spirits,
 * glassware for accessori, etc.). Applied to every product below via a single
 * pass so the 200-checked-but-mismatched placeholder ids never surface.
 */
const CAT_IMAGES: Record<WineCategory, string[]> = {
  "vini-rossi": [
    "photo-1553361371-9b22f78e8b1d",
    "photo-1560148218-1a83060f7b32",
    "photo-1584916201218-f4242ceb4809",
    "photo-1510812431401-41d2bd2722f3",
    "photo-1598306442928-4d90f32c6866",
    "photo-1516594915697-87eb3b1c14ea",
    "photo-1516600164266-f3b8166ae679",
    "photo-1474722883778-792e7990302f",
  ],
  "vini-bianchi": [
    "photo-1585553616435-2dc0a54e271d",
    "photo-1566995541428-f2246c17cda1",
    "photo-1506377247377-2a5b3b417ebb",
    "photo-1516594915697-87eb3b1c14ea",
    "photo-1568213816046-0ee1c42bd559",
  ],
  rosati: [
    "photo-1558001373-7b93ee48ffa0",
    "photo-1547595628-c61a29f496f0",
    "photo-1568213816046-0ee1c42bd559",
  ],
  bollicine: [
    "photo-1547595628-c61a29f496f0",
    "photo-1470158499416-75be9aa0c4db",
    "photo-1568213816046-0ee1c42bd559",
    "photo-1516600164266-f3b8166ae679",
  ],
  "vini-dolci": [
    "photo-1470337458703-46ad1756a187",
    "photo-1514362545857-3bc16c4c7d1b",
    "photo-1626897505254-e0f811aa9bf7",
    "photo-1585553616435-2dc0a54e271d",
    "photo-1566995541428-f2246c17cda1",
  ],
  distillati: [
    "photo-1569529465841-dfecdab7503b",
    "photo-1608885898957-a559228e8749",
    "photo-1470337458703-46ad1756a187",
    "photo-1514362545857-3bc16c4c7d1b",
    "photo-1510626176961-4b57d4fbad03",
    "photo-1513558161293-cdaf765ed2fd",
    "photo-1626897505254-e0f811aa9bf7",
    "photo-1609951651556-5334e2706168",
    "photo-1544145945-f90425340c7e",
  ],
  liquori: [
    "photo-1514362545857-3bc16c4c7d1b",
    "photo-1470337458703-46ad1756a187",
    "photo-1510626176961-4b57d4fbad03",
    "photo-1513558161293-cdaf765ed2fd",
    "photo-1609951651556-5334e2706168",
    "photo-1544145945-f90425340c7e",
    "photo-1626897505254-e0f811aa9bf7",
    "photo-1569529465841-dfecdab7503b",
  ],
  accessori: [
    "photo-1585553616435-2dc0a54e271d",
    "photo-1568213816046-0ee1c42bd559",
    "photo-1547595628-c61a29f496f0",
    "photo-1474722883778-792e7990302f",
    "photo-1516600164266-f3b8166ae679",
    "photo-1506377247377-2a5b3b417ebb",
  ],
};

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
/* Products — exactly 10 per category                                  */
/* ------------------------------------------------------------------ */

const VINI_ROSSI: Wine[] = [
  {
    id: "r01", slug: "chianti-classico-riserva-2019-tenuta-fioranova", name: "Chianti Classico Riserva 2019", producer: "Tenuta Fioranova",
    category: "vini-rossi", subcategory: "Toscana", region: "Toscana", denomination: "DOCG", grapeVarieties: ["Sangiovese", "Colorino"], vintage: 2019, alcohol: 14, volume: "750ml",
    price: 24.9, image: bottle(0),
    tastingNotes: "Rubino intenso con riflessi granati. Al naso amarena, viola e una nota balsamica; in bocca è teso, con tannini fitti e un finale di lunga persistenza.",
    foodPairings: ["Bistecca alla fiorentina", "Pappardelle al cinghiale", "Pecorino stagionato"],
    awards: ["Tre Bicchieri Gambero Rosso"], inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "r02", slug: "barolo-2018-cascina-ventaglio", name: "Barolo 2018", producer: "Cascina Ventaglio",
    category: "vini-rossi", subcategory: "Piemonte", region: "Piemonte", denomination: "DOCG", grapeVarieties: ["Nebbiolo"], vintage: 2018, alcohol: 14.5, volume: "750ml",
    price: 42, image: bottle(1),
    tastingNotes: "Il re dei vini piemontesi: rosa appassita, catrame e liquirizia. Tannino nobile e austero, destinato a evolvere per un decennio.",
    foodPairings: ["Brasato al Barolo", "Tartufo bianco", "Formaggi erborinati"],
    awards: ["3 Bicchieri Gambero Rosso"], inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "r03", slug: "amarone-valpolicella-2017-corte-delle-rose", name: "Amarone della Valpolicella 2017", producer: "Corte delle Rose",
    category: "vini-rossi", subcategory: "Veneto", region: "Veneto", denomination: "DOCG", grapeVarieties: ["Corvina", "Rondinella", "Molinara"], vintage: 2017, alcohol: 15.5, volume: "750ml",
    price: 38.5, originalPrice: 45, image: bottle(2),
    tastingNotes: "Da uve appassite: confettura di ciliegia, cioccolato e cacao. Corpo pieno e vellutato, calore avvolgente e chiusura speziata.",
    foodPairings: ["Selvaggina", "Risotto all'Amarone", "Formaggi stagionati"],
    inStock: true, badges: ["In Offerta"],
  },
  {
    id: "r04", slug: "brunello-di-montalcino-2018-poggio-antico", name: "Brunello di Montalcino 2018", producer: "Poggio Antico dei Sassi",
    category: "vini-rossi", subcategory: "Toscana", region: "Toscana", denomination: "DOCG", grapeVarieties: ["Sangiovese Grosso"], vintage: 2018, alcohol: 14.5, volume: "750ml",
    price: 49.9, image: bottle(3),
    tastingNotes: "Eleganza toscana pura: frutti rossi maturi, tabacco e cuoio. Trama tannica finissima e progressione infinita al palato.",
    foodPairings: ["Arrosti di carne rossa", "Cacciagione", "Pecorino toscano"],
    awards: ["Tre Bicchieri Gambero Rosso"], inStock: true, featured: true,
  },
  {
    id: "r05", slug: "montepulciano-d-abruzzo-2021-colline-del-gran-sasso", name: "Montepulciano d'Abruzzo 2021", producer: "Colline del Gran Sasso",
    category: "vini-rossi", subcategory: "Abruzzo", region: "Abruzzo", denomination: "DOC", grapeVarieties: ["Montepulciano"], vintage: 2021, alcohol: 13.5, volume: "750ml",
    price: 11.9, image: bottle(4),
    tastingNotes: "Succoso e generoso: prugna, mora e una punta di pepe nero. Beva morbida e immediata, ottimo rapporto qualità-prezzo.",
    foodPairings: ["Pasta al ragù", "Arrosticini", "Pizza"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "r06", slug: "nero-d-avola-2021-baglio-solelune", name: "Nero d'Avola 2021", producer: "Baglio Solelune",
    category: "vini-rossi", subcategory: "Sicilia", region: "Sicilia", denomination: "DOC", grapeVarieties: ["Nero d'Avola"], vintage: 2021, alcohol: 14, volume: "750ml",
    price: 13.5, image: bottle(5),
    tastingNotes: "Il calore siciliano in un calice: ciliegia matura, macchia mediterranea e cacao. Caldo, morbido e avvolgente.",
    foodPairings: ["Caponata", "Salsiccia alla griglia", "Formaggi mediterranei"],
    inStock: true, badges: ["Biologico"],
  },
  {
    id: "r07", slug: "primitivo-di-manduria-2020-masseria-lucente", name: "Primitivo di Manduria 2020", producer: "Masseria Lucente",
    category: "vini-rossi", subcategory: "Puglia", region: "Puglia", denomination: "DOC", grapeVarieties: ["Primitivo"], vintage: 2020, alcohol: 14.5, volume: "750ml",
    price: 16.9, image: bottle(6),
    tastingNotes: "Potente e solare: marmellata di more, fico secco e vaniglia. Sorso pieno, tannini dolci e finale caldo.",
    foodPairings: ["Brasati", "Agnello al forno", "Caciocavallo"],
    inStock: true, featured: true,
  },
  {
    id: "r08", slug: "valpolicella-ripasso-2020-corte-delle-rose", name: "Valpolicella Ripasso 2020", producer: "Corte delle Rose",
    category: "vini-rossi", subcategory: "Veneto", region: "Veneto", denomination: "DOC", grapeVarieties: ["Corvina", "Corvinone", "Rondinella"], vintage: 2020, alcohol: 13.5, volume: "750ml",
    price: 18.5, image: bottle(7),
    tastingNotes: "Il 'piccolo Amarone': ciliegia sotto spirito e spezie dolci. Corpo medio-pieno, morbido e succoso.",
    foodPairings: ["Risotto", "Stufati", "Grana Padano"],
    inStock: true,
  },
  {
    id: "r09", slug: "aglianico-del-vulture-2019-tenuta-basileia", name: "Aglianico del Vulture 2019", producer: "Tenuta Basileia",
    category: "vini-rossi", subcategory: "Basilicata", region: "Basilicata", denomination: "DOC", grapeVarieties: ["Aglianico"], vintage: 2019, alcohol: 14, volume: "750ml",
    price: 19.9, image: bottle(8),
    tastingNotes: "Vulcanico e minerale: ribes nero, grafite e spezie. Tannino vigoroso e freschezza spiccata, grande potenziale d'invecchiamento.",
    foodPairings: ["Cinghiale in umido", "Formaggi stagionati", "Carni alla brace"],
    inStock: true, badges: ["Novità"],
  },
  {
    id: "r10", slug: "cannonau-di-sardegna-riserva-2019-nuraghe-antico", name: "Cannonau di Sardegna Riserva 2019", producer: "Nuraghe Antico",
    category: "vini-rossi", subcategory: "Sardegna", region: "Sardegna", denomination: "DOC", grapeVarieties: ["Cannonau"], vintage: 2019, alcohol: 14.5, volume: "750ml",
    price: 17.5, image: bottle(9),
    tastingNotes: "Terra e sole di Sardegna: mirto, prugna e macchia mediterranea. Caldo e sapido, con un finale balsamico.",
    foodPairings: ["Porceddu", "Pecorino sardo", "Carni arrosto"],
    inStock: true,
  },
];

const VINI_BIANCHI: Wine[] = [
  {
    id: "b01", slug: "vermentino-di-gallura-2023-nuraghe-antico", name: "Vermentino di Gallura 2023", producer: "Nuraghe Antico",
    category: "vini-bianchi", subcategory: "Sardegna", region: "Sardegna", denomination: "DOCG", grapeVarieties: ["Vermentino"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 14.9, image: u(WHITE),
    tastingNotes: "Fresco e salino: agrumi, fiori bianchi e una nota iodata. Sorso scattante con finale ammandorlato.",
    foodPairings: ["Spaghetti alle vongole", "Crudi di mare", "Bottarga"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "b02", slug: "gavi-del-comune-di-gavi-2023-cascina-ventaglio", name: "Gavi del Comune di Gavi 2023", producer: "Cascina Ventaglio",
    category: "vini-bianchi", subcategory: "Piemonte", region: "Piemonte", denomination: "DOCG", grapeVarieties: ["Cortese"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 15.5, image: u(WHITE),
    tastingNotes: "Elegante e verticale: mela verde, cedro e mandorla fresca. Acidità viva e finale minerale.",
    foodPairings: ["Antipasti di pesce", "Risotto ai frutti di mare", "Fritture"],
    inStock: true,
  },
  {
    id: "b03", slug: "fiano-di-avellino-2022-tenuta-basileia", name: "Fiano di Avellino 2022", producer: "Tenuta Basileia",
    category: "vini-bianchi", subcategory: "Campania", region: "Campania", denomination: "DOCG", grapeVarieties: ["Fiano"], vintage: 2022, alcohol: 13, volume: "750ml",
    price: 17.9, image: u(WHITE),
    tastingNotes: "Complesso e longevo: nocciola, pera e miele d'acacia. Struttura sapida e persistenza notevole.",
    foodPairings: ["Zuppe di legumi", "Pesce al forno", "Formaggi di media stagionatura"],
    awards: ["Tre Bicchieri Gambero Rosso"], inStock: true, featured: true,
  },
  {
    id: "b04", slug: "friulano-2023-colli-del-natisone", name: "Friulano 2023", producer: "Colli del Natisone",
    category: "vini-bianchi", subcategory: "Friuli-Venezia Giulia", region: "Friuli-Venezia Giulia", denomination: "DOC", grapeVarieties: ["Friulano"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 16.5, image: u(WHITE),
    tastingNotes: "Il classico bianco friulano: fiori di campo, mandorla amara e pera. Secco, pieno e dal finale nervoso.",
    foodPairings: ["Prosciutto San Daniele", "Frico", "Asparagi"],
    inStock: true, badges: ["Biologico"],
  },
  {
    id: "b05", slug: "soave-classico-2023-corte-delle-rose", name: "Soave Classico 2023", producer: "Corte delle Rose",
    category: "vini-bianchi", subcategory: "Veneto", region: "Veneto", denomination: "DOC", grapeVarieties: ["Garganega", "Trebbiano di Soave"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 10.9, image: u(WHITE),
    tastingNotes: "Delicato e floreale: biancospino, mela e mandorla. Beva agile e piacevole, freschissimo.",
    foodPairings: ["Antipasti di verdure", "Risotto agli asparagi", "Pesce di lago"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "b06", slug: "greco-di-tufo-2022-tenuta-basileia", name: "Greco di Tufo 2022", producer: "Tenuta Basileia",
    category: "vini-bianchi", subcategory: "Campania", region: "Campania", denomination: "DOCG", grapeVarieties: ["Greco"], vintage: 2022, alcohol: 13.5, volume: "750ml",
    price: 18.9, image: u(WHITE),
    tastingNotes: "Ricco e minerale: pesca gialla, zolfo nobile e agrumi. Corpo importante con acidità che sostiene il lungo finale.",
    foodPairings: ["Zuppa di pesce", "Mozzarella di bufala", "Pasta e patate"],
    inStock: true,
  },
  {
    id: "b07", slug: "verdicchio-castelli-di-jesi-2023-colline-del-gran-sasso", name: "Verdicchio dei Castelli di Jesi 2023", producer: "Colline del Gran Sasso",
    category: "vini-bianchi", subcategory: "Marche", region: "Marche", denomination: "DOC", grapeVarieties: ["Verdicchio"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 12.5, image: u(WHITE),
    tastingNotes: "Fresco e ammandorlato: limone, erbe aromatiche e mandorla nel tipico finale amarognolo.",
    foodPairings: ["Brodetto di pesce", "Olive all'ascolana", "Insalate di mare"],
    inStock: true,
  },
  {
    id: "b08", slug: "chardonnay-alto-adige-2022-maso-veltliner", name: "Chardonnay Alto Adige 2022", producer: "Maso Veltliner",
    category: "vini-bianchi", subcategory: "Alto Adige", region: "Trentino-Alto Adige", denomination: "DOC", grapeVarieties: ["Chardonnay"], vintage: 2022, alcohol: 13.5, volume: "750ml",
    price: 19.5, image: u(WHITE),
    tastingNotes: "Alpino ed elegante: frutta a polpa bianca, vaniglia leggera e burro. Fine passaggio in legno, sorso cremoso ma teso.",
    foodPairings: ["Pollame", "Pesce in salsa", "Formaggi freschi"],
    inStock: true, featured: true, badges: ["Novità"],
  },
  {
    id: "b09", slug: "pinot-grigio-2023-colli-del-natisone", name: "Pinot Grigio 2023", producer: "Colli del Natisone",
    category: "vini-bianchi", subcategory: "Friuli-Venezia Giulia", region: "Friuli-Venezia Giulia", denomination: "DOC", grapeVarieties: ["Pinot Grigio"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 13.9, image: u(WHITE),
    tastingNotes: "Ramato tenue e croccante: mela, pera e un tocco floreale. Secco, pulito e versatile a tavola.",
    foodPairings: ["Aperitivo", "Risotti delicati", "Pesce grigliato"],
    inStock: true,
  },
  {
    id: "b10", slug: "falanghina-del-sannio-2023-baglio-solelune", name: "Falanghina del Sannio 2023", producer: "Baglio Solelune",
    category: "vini-bianchi", subcategory: "Campania", region: "Campania", denomination: "DOC", grapeVarieties: ["Falanghina"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 11.5, image: u(WHITE),
    tastingNotes: "Solare e fragrante: ananas, ginestra e agrumi. Fresco e beverino, con un finale sapido.",
    foodPairings: ["Frittura di paranza", "Pizza margherita", "Insalate"],
    inStock: true, badges: ["Biologico"],
  },
];

const ROSATI: Wine[] = [
  {
    id: "p01", slug: "cerasuolo-d-abruzzo-2023-colline-del-gran-sasso", name: "Cerasuolo d'Abruzzo 2023", producer: "Colline del Gran Sasso",
    category: "rosati", subcategory: "Abruzzo", region: "Abruzzo", denomination: "DOC", grapeVarieties: ["Montepulciano"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 12.9, image: u(ROSE),
    tastingNotes: "Rosa ciliegia luminoso: fragola, melagrana e una nota speziata. Sorso pieno per un rosato, fresco e sapido.",
    foodPairings: ["Antipasti misti", "Zuppe di pesce", "Pizza"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "p02", slug: "bardolino-chiaretto-2023-corte-delle-rose", name: "Bardolino Chiaretto 2023", producer: "Corte delle Rose",
    category: "rosati", subcategory: "Veneto", region: "Veneto", denomination: "DOC", grapeVarieties: ["Corvina", "Rondinella"], vintage: 2023, alcohol: 12, volume: "750ml",
    price: 11.5, image: u(ROSE),
    tastingNotes: "Petalo di rosa tenue: lampone, agrumi e fiori. Delicato, teso e dall'ottima bevibilità.",
    foodPairings: ["Aperitivo", "Risotto", "Pesce di lago"],
    inStock: true,
  },
  {
    id: "p03", slug: "rosato-del-salento-2023-masseria-lucente", name: "Rosato del Salento 2023", producer: "Masseria Lucente",
    category: "rosati", subcategory: "Puglia", region: "Puglia", denomination: "IGT", grapeVarieties: ["Negroamaro"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 13.5, image: u(ROSE),
    tastingNotes: "Rosa corallo: ciliegia, arancia sanguinella e macchia mediterranea. Caldo e avvolgente, con freschezza vibrante.",
    foodPairings: ["Orecchiette", "Grigliate di pesce", "Formaggi freschi"],
    inStock: true, featured: true,
  },
  {
    id: "p04", slug: "cirotto-rosato-2023-nuraghe-antico", name: "Rosato 2023", producer: "Nuraghe Antico",
    category: "rosati", subcategory: "Sardegna", region: "Sardegna", denomination: "IGT", grapeVarieties: ["Cannonau"], vintage: 2023, alcohol: 13, volume: "750ml",
    price: 14.5, image: u(ROSE),
    tastingNotes: "Rosa antico: fragolina di bosco, erbe e sale marino. Sapido e diretto, chiusura balsamica.",
    foodPairings: ["Fregola con arselle", "Antipasti sardi", "Pesce arrosto"],
    inStock: true, badges: ["Novità"],
  },
  {
    id: "p05", slug: "etna-rosato-2023-baglio-solelune", name: "Etna Rosato 2023", producer: "Baglio Solelune",
    category: "rosati", subcategory: "Sicilia", region: "Sicilia", denomination: "DOC", grapeVarieties: ["Nerello Mascalese"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 18.9, image: u(ROSE),
    tastingNotes: "Vulcanico e fine: ribes, agrumi e pietra focaia. Teso, minerale ed elegante, dal grande carattere.",
    foodPairings: ["Crudi di mare", "Cucina vegetariana", "Sushi"],
    inStock: true, badges: ["Biologico"],
  },
  {
    id: "p06", slug: "chiaretto-valtenesi-2023-corte-delle-rose", name: "Chiaretto Valtènesi 2023", producer: "Corte delle Rose",
    category: "rosati", subcategory: "Lombardia", region: "Lombardia", denomination: "DOC", grapeVarieties: ["Groppello", "Marzemino"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 15.9, image: u(ROSE),
    tastingNotes: "Rosa tenue del Garda: pompelmo rosa, pesca e spezie leggere. Fresco, agile e persistente.",
    foodPairings: ["Aperitivo sul lago", "Risotto ai gamberi", "Formaggi molli"],
    inStock: true,
  },
  {
    id: "p07", slug: "primitivo-rosato-2023-masseria-lucente", name: "Primitivo Rosato 2023", producer: "Masseria Lucente",
    category: "rosati", subcategory: "Puglia", region: "Puglia", denomination: "IGT", grapeVarieties: ["Primitivo"], vintage: 2023, alcohol: 13.5, volume: "750ml",
    price: 12.5, image: u(ROSE),
    tastingNotes: "Rosa intenso: frutti rossi maturi e fiori. Morbido e generoso, dalla beva golosa.",
    foodPairings: ["Cucina speziata", "Salumi", "Pizze gourmet"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "p08", slug: "rosa-toscana-2023-tenuta-fioranova", name: "Rosato Toscana 2023", producer: "Tenuta Fioranova",
    category: "rosati", subcategory: "Toscana", region: "Toscana", denomination: "IGT", grapeVarieties: ["Sangiovese"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 13.9, image: u(ROSE),
    tastingNotes: "Buccia di cipolla tenue: melagrana, agrumi e macchia. Secco e sapido, con finale minerale.",
    foodPairings: ["Panzanella", "Crostini toscani", "Pesce alla griglia"],
    inStock: true,
  },
  {
    id: "p09", slug: "rosato-vesuvio-2023-tenuta-basileia", name: "Rosato del Vesuvio 2023", producer: "Tenuta Basileia",
    category: "rosati", subcategory: "Campania", region: "Campania", denomination: "DOC", grapeVarieties: ["Piedirosso", "Aglianico"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 14.9, image: u(ROSE),
    tastingNotes: "Rosa vivace: fragola, agrumi rosa e minerale vulcanico. Fresco e teso, di grande piacevolezza.",
    foodPairings: ["Spaghetti al pomodoro", "Mozzarella", "Frittura"],
    inStock: true,
  },
  {
    id: "p10", slug: "lagrein-rosato-2023-maso-veltliner", name: "Lagrein Rosato 2023", producer: "Maso Veltliner",
    category: "rosati", subcategory: "Alto Adige", region: "Trentino-Alto Adige", denomination: "DOC", grapeVarieties: ["Lagrein"], vintage: 2023, alcohol: 12.5, volume: "750ml",
    price: 16.5, image: u(ROSE),
    tastingNotes: "Rosa brillante alpino: lampone, rosa e spezie. Vivace ed elegante, con acidità cristallina.",
    foodPairings: ["Speck", "Canederli", "Formaggi di malga"],
    inStock: true, badges: ["Novità"],
  },
];

const BOLLICINE: Wine[] = [
  {
    id: "s01", slug: "franciacorta-brut-cuvee-metodo-classico-cascina-ventaglio", name: "Franciacorta Brut Cuvée", producer: "Cascina Ventaglio",
    category: "bollicine", subcategory: "Metodo Classico", region: "Lombardia", denomination: "DOCG", grapeVarieties: ["Chardonnay", "Pinot Nero"], vintage: 2020, alcohol: 12.5, volume: "750ml",
    price: 28.9, image: sparkling(0),
    tastingNotes: "Perlage finissimo e persistente: crosta di pane, agrumi e mandorla. Elegante, cremoso e teso, chiusura sapida.",
    foodPairings: ["Aperitivo", "Crudi di pesce", "Risotto allo zafferano"],
    awards: ["Tre Bicchieri Gambero Rosso"], inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "s02", slug: "prosecco-valdobbiadene-superiore-extra-dry-corte-delle-rose", name: "Prosecco di Valdobbiadene Superiore Extra Dry", producer: "Corte delle Rose",
    category: "bollicine", subcategory: "Prosecco", region: "Veneto", denomination: "DOCG", grapeVarieties: ["Glera"], vintage: 2023, alcohol: 11.5, volume: "750ml",
    price: 13.9, originalPrice: 16.5, image: sparkling(1),
    tastingNotes: "Fresco e floreale: mela verde, glicine e pera. Bollicina soffice, finale morbido e invitante.",
    foodPairings: ["Aperitivo", "Antipasti", "Fritture leggere"],
    inStock: true, featured: true, badges: ["In Offerta"],
  },
  {
    id: "s03", slug: "trentodoc-brut-metodo-classico-maso-veltliner", name: "Trentodoc Brut", producer: "Maso Veltliner",
    category: "bollicine", subcategory: "Metodo Classico", region: "Trentino-Alto Adige", denomination: "DOC", grapeVarieties: ["Chardonnay"], vintage: 2020, alcohol: 12.5, volume: "750ml",
    price: 24.5, image: sparkling(2),
    tastingNotes: "Montano e cristallino: mela, fiori bianchi e lievito. Acidità alpina viva e perlage elegantissimo.",
    foodPairings: ["Aperitivo", "Trota", "Formaggi freschi"],
    inStock: true,
  },
  {
    id: "s04", slug: "champagne-brut-reserve-maison-clairval", name: "Champagne Brut Réserve", producer: "Maison Clairval",
    category: "bollicine", subcategory: "Champagne", region: "Champagne (Francia)", denomination: "AOC", grapeVarieties: ["Pinot Nero", "Chardonnay", "Pinot Meunier"], alcohol: 12.5, volume: "750ml",
    price: 49.9, image: sparkling(3),
    tastingNotes: "Il fascino della Champagne: brioche, nocciola e agrumi canditi. Bollicina fine, complessità e lunghezza notevoli.",
    foodPairings: ["Ostriche", "Aragosta", "Formaggi cremosi"],
    inStock: true, featured: true,
  },
  {
    id: "s05", slug: "prosecco-treviso-brut-corte-delle-rose", name: "Prosecco Treviso Brut", producer: "Corte delle Rose",
    category: "bollicine", subcategory: "Prosecco", region: "Veneto", denomination: "DOC", grapeVarieties: ["Glera"], vintage: 2023, alcohol: 11, volume: "750ml",
    price: 9.9, image: sparkling(1),
    tastingNotes: "Semplice e piacevole: fiori bianchi, mela e agrumi. Secco e scattante, perfetto per ogni occasione.",
    foodPairings: ["Aperitivo", "Sushi", "Antipasti"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "s06", slug: "franciacorta-satten-metodo-classico-cascina-ventaglio", name: "Franciacorta Satèn", producer: "Cascina Ventaglio",
    category: "bollicine", subcategory: "Metodo Classico", region: "Lombardia", denomination: "DOCG", grapeVarieties: ["Chardonnay"], vintage: 2019, alcohol: 12.5, volume: "750ml",
    price: 32.5, image: sparkling(0),
    tastingNotes: "Setoso e cremoso: pesca bianca, vaniglia e panna. Pressione dolce, texture vellutata e finale elegante.",
    foodPairings: ["Risotti", "Pesce al burro", "Formaggi molli"],
    inStock: true, badges: ["Biologico"],
  },
  {
    id: "s07", slug: "alta-langa-pas-dose-metodo-classico-cascina-ventaglio", name: "Alta Langa Pas Dosé", producer: "Cascina Ventaglio",
    category: "bollicine", subcategory: "Metodo Classico", region: "Piemonte", denomination: "DOCG", grapeVarieties: ["Pinot Nero", "Chardonnay"], vintage: 2019, alcohol: 12.5, volume: "750ml",
    price: 34.9, image: sparkling(2),
    tastingNotes: "Dritto e minerale, senza dosaggio: agrumi, gesso e crosta di pane. Estremamente teso e gastronomico.",
    foodPairings: ["Ostriche", "Tartare di pesce", "Cucina di mare"],
    inStock: true, featured: true, badges: ["Novità"],
  },
  {
    id: "s08", slug: "prosecco-rose-brut-millesimato-corte-delle-rose", name: "Prosecco Rosé Brut Millesimato", producer: "Corte delle Rose",
    category: "bollicine", subcategory: "Prosecco", region: "Veneto", denomination: "DOC", grapeVarieties: ["Glera", "Pinot Nero"], vintage: 2022, alcohol: 11.5, volume: "750ml",
    price: 12.9, image: sparkling(3),
    tastingNotes: "Rosa tenue e festoso: fragolina, lampone e crosta di pane. Bollicina fine, fresco e goloso.",
    foodPairings: ["Aperitivo", "Salumi leggeri", "Dolci alla frutta"],
    inStock: true,
  },
  {
    id: "s09", slug: "lambrusco-di-sorbara-corte-delle-rose", name: "Lambrusco di Sorbara Brut", producer: "Corte delle Rose",
    category: "bollicine", subcategory: "Frizzante", region: "Emilia-Romagna", denomination: "DOC", grapeVarieties: ["Lambrusco di Sorbara"], vintage: 2023, alcohol: 11, volume: "750ml",
    price: 10.5, image: sparkling(1),
    tastingNotes: "Rosso rubino spumeggiante: violetta, fragola e agrumi. Secco, fresco e sorprendentemente gastronomico.",
    foodPairings: ["Gnocco fritto", "Salumi emiliani", "Tortellini"],
    inStock: true,
  },
  {
    id: "s10", slug: "champagne-blanc-de-blancs-maison-clairval", name: "Champagne Blanc de Blancs", producer: "Maison Clairval",
    category: "bollicine", subcategory: "Champagne", region: "Champagne (Francia)", denomination: "AOC", grapeVarieties: ["Chardonnay"], alcohol: 12.5, volume: "750ml",
    price: 62, image: sparkling(3),
    tastingNotes: "Solo Chardonnay: fiori bianchi, agrumi e gesso. Finezza assoluta, tensione e una lunghissima scia salina.",
    foodPairings: ["Caviale", "Crostacei", "Sushi di alta gamma"],
    awards: ["95/100 Wine Spectator"], inStock: true, featured: true,
  },
];

const VINI_DOLCI: Wine[] = [
  {
    id: "d01", slug: "vin-santo-del-chianti-2016-tenuta-fioranova", name: "Vin Santo del Chianti 2016", producer: "Tenuta Fioranova",
    category: "vini-dolci", subcategory: "Toscana", region: "Toscana", denomination: "DOC", grapeVarieties: ["Trebbiano", "Malvasia"], vintage: 2016, alcohol: 15, volume: "500ml",
    price: 26.9, image: bottle(10),
    tastingNotes: "Ambra intenso: miele, fico secco, noce e scorza d'arancia. Dolcezza avvolgente bilanciata da una vibrante acidità.",
    foodPairings: ["Cantucci", "Pasticceria secca", "Formaggi erborinati"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "d02", slug: "passito-di-pantelleria-2019-baglio-solelune", name: "Passito di Pantelleria 2019", producer: "Baglio Solelune",
    category: "vini-dolci", subcategory: "Sicilia", region: "Sicilia", denomination: "DOC", grapeVarieties: ["Zibibbo"], vintage: 2019, alcohol: 14.5, volume: "500ml",
    price: 29.9, image: bottle(11),
    tastingNotes: "Oro ambrato: albicocca disidratata, miele e zagara. Dolce, caldo e mediterraneo, dal finale interminabile.",
    foodPairings: ["Cassata siciliana", "Formaggi stagionati", "Frutta secca"],
    awards: ["Tre Bicchieri Gambero Rosso"], inStock: true, featured: true,
  },
  {
    id: "d03", slug: "recioto-della-valpolicella-2018-corte-delle-rose", name: "Recioto della Valpolicella 2018", producer: "Corte delle Rose",
    category: "vini-dolci", subcategory: "Veneto", region: "Veneto", denomination: "DOCG", grapeVarieties: ["Corvina", "Rondinella"], vintage: 2018, alcohol: 14, volume: "500ml",
    price: 27.5, image: bottle(12),
    tastingNotes: "Rosso dolce da uve appassite: ciliegia sotto spirito, cacao e spezie. Vellutato, ricco e persistente.",
    foodPairings: ["Cioccolato fondente", "Dolci al cacao", "Pasticceria"],
    inStock: true,
  },
  {
    id: "d04", slug: "moscato-d-asti-2023-cascina-ventaglio", name: "Moscato d'Asti 2023", producer: "Cascina Ventaglio",
    category: "vini-dolci", subcategory: "Piemonte", region: "Piemonte", denomination: "DOCG", grapeVarieties: ["Moscato Bianco"], vintage: 2023, alcohol: 5.5, volume: "750ml",
    price: 11.9, image: bottle(13),
    tastingNotes: "Dolce e delicatamente frizzante: uva, salvia e fiori d'arancio. Leggero, aromatico e gioioso.",
    foodPairings: ["Panettone", "Crostate di frutta", "Dolci leggeri"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "d05", slug: "sagrantino-passito-2017-tenuta-fioranova", name: "Sagrantino Passito 2017", producer: "Tenuta Fioranova",
    category: "vini-dolci", subcategory: "Umbria", region: "Umbria", denomination: "DOCG", grapeVarieties: ["Sagrantino"], vintage: 2017, alcohol: 14.5, volume: "500ml",
    price: 33.9, image: bottle(14),
    tastingNotes: "Rosso profondo: mora in confettura, cioccolato e spezie. Dolce ma tannico, di grande struttura.",
    foodPairings: ["Cioccolato amaro", "Formaggi piccanti", "Dolci speziati"],
    inStock: true, badges: ["Novità"],
  },
  {
    id: "d06", slug: "malvasia-delle-lipari-2020-baglio-solelune", name: "Malvasia delle Lipari 2020", producer: "Baglio Solelune",
    category: "vini-dolci", subcategory: "Sicilia", region: "Sicilia", denomination: "DOC", grapeVarieties: ["Malvasia"], vintage: 2020, alcohol: 13.5, volume: "500ml",
    price: 24.9, image: bottle(15),
    tastingNotes: "Oro delle Eolie: albicocca, miele e macchia mediterranea. Dolce equilibrato, sapido e balsamico.",
    foodPairings: ["Pasticceria alle mandorle", "Formaggi", "Frutta candita"],
    inStock: true, badges: ["Biologico"],
  },
  {
    id: "d07", slug: "verduzzo-ramandolo-2019-colli-del-natisone", name: "Ramandolo 2019", producer: "Colli del Natisone",
    category: "vini-dolci", subcategory: "Friuli-Venezia Giulia", region: "Friuli-Venezia Giulia", denomination: "DOCG", grapeVarieties: ["Verduzzo"], vintage: 2019, alcohol: 13, volume: "500ml",
    price: 22.5, image: bottle(16),
    tastingNotes: "Oro antico: mela cotogna, miele e frutta secca. Dolcezza con una piacevole vena tannica friulana.",
    foodPairings: ["Gubana", "Formaggi stagionati", "Strudel"],
    inStock: true,
  },
  {
    id: "d08", slug: "brachetto-d-acqui-2023-cascina-ventaglio", name: "Brachetto d'Acqui 2023", producer: "Cascina Ventaglio",
    category: "vini-dolci", subcategory: "Piemonte", region: "Piemonte", denomination: "DOCG", grapeVarieties: ["Brachetto"], vintage: 2023, alcohol: 6, volume: "750ml",
    price: 13.5, image: bottle(17),
    tastingNotes: "Rosso dolce frizzante: rosa, fragola e lampone. Leggero, aromatico e romantico.",
    foodPairings: ["Dolci ai frutti rossi", "Cioccolato al latte", "Macedonia"],
    inStock: true,
  },
  {
    id: "d09", slug: "aleatico-dell-elba-2019-nuraghe-antico", name: "Aleatico dell'Elba 2019", producer: "Nuraghe Antico",
    category: "vini-dolci", subcategory: "Toscana", region: "Toscana", denomination: "DOCG", grapeVarieties: ["Aleatico"], vintage: 2019, alcohol: 14, volume: "500ml",
    price: 31.9, image: bottle(18),
    tastingNotes: "Rosso rubino dolce: rosa, ciliegia e spezie dolci. Aromatico, vellutato e mediterraneo.",
    foodPairings: ["Schiacciata briaca", "Cioccolato", "Biscotti"],
    inStock: true, featured: true,
  },
  {
    id: "d10", slug: "vendemmia-tardiva-2020-maso-veltliner", name: "Gewürztraminer Vendemmia Tardiva 2020", producer: "Maso Veltliner",
    category: "vini-dolci", subcategory: "Alto Adige", region: "Trentino-Alto Adige", denomination: "DOC", grapeVarieties: ["Gewürztraminer"], vintage: 2020, alcohol: 13, volume: "375ml",
    price: 28.5, image: bottle(19),
    tastingNotes: "Aromatico e opulento: litchi, rosa, miele e zenzero candito. Dolce ma fresco, di rara eleganza.",
    foodPairings: ["Foie gras", "Formaggi erborinati", "Dolci speziati"],
    inStock: true, badges: ["Novità"],
  },
];

const DISTILLATI: Wine[] = [
  {
    id: "di01", slug: "grappa-di-barolo-barrique-cascina-ventaglio", name: "Grappa di Barolo Barrique", producer: "Cascina Ventaglio",
    category: "distillati", subcategory: "Grappa", region: "Piemonte", volume: "700ml", alcohol: 42,
    price: 34.9, image: bottle(20),
    tastingNotes: "Da vinacce di Nebbiolo, affinata in barrique: vaniglia, spezie e frutta secca. Calda, morbida e avvolgente.",
    foodPairings: ["Cioccolato fondente", "Fine pasto", "Sigaro"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "di02", slug: "grappa-di-amarone-corte-delle-rose", name: "Grappa di Amarone", producer: "Corte delle Rose",
    category: "distillati", subcategory: "Grappa", region: "Veneto", volume: "700ml", alcohol: 40,
    price: 29.9, image: bottle(21),
    tastingNotes: "Da vinacce appassite: prugna, cacao e legno dolce. Rotonda e generosa, dal finale caldo.",
    foodPairings: ["Cioccolato", "Fine pasto", "Pasticceria secca"],
    inStock: true,
  },
  {
    id: "di03", slug: "single-malt-whisky-12-anni-glenavon", name: "Single Malt Whisky 12 Anni", producer: "Glenavon Distillery",
    category: "distillati", subcategory: "Whisky", region: "Scozia", volume: "700ml", alcohol: 43,
    price: 46.5, image: bottle(22),
    tastingNotes: "Highland classico: miele, orzo tostato e una punta di torba. Morbido, complesso e persistente.",
    foodPairings: ["Cioccolato fondente", "Formaggi stagionati", "Sigaro"],
    awards: ["Gold — IWSC"], inStock: true, featured: true,
  },
  {
    id: "di04", slug: "cognac-vsop-maison-clairval", name: "Cognac VSOP", producer: "Maison Clairval",
    category: "distillati", subcategory: "Cognac", region: "Francia", volume: "700ml", alcohol: 40,
    price: 52, image: bottle(23),
    tastingNotes: "Ambrato elegante: uva passa, vaniglia e fiori. Rotondo e vellutato, dal lungo finale caldo.",
    foodPairings: ["Cioccolato", "Dessert", "Sigaro"],
    inStock: true,
  },
  {
    id: "di05", slug: "rum-riserva-15-anni-isla-serena", name: "Rum Riserva 15 Anni", producer: "Isla Serena",
    category: "distillati", subcategory: "Rum", region: "Caraibi", volume: "700ml", alcohol: 40,
    price: 44.9, image: bottle(24),
    tastingNotes: "Invecchiato ai tropici: caramello, banana matura e spezie dolci. Morbido, dolce e complesso.",
    foodPairings: ["Cioccolato", "Dessert al caramello", "Sigaro"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "di06", slug: "grappa-di-moscato-cascina-ventaglio", name: "Grappa di Moscato", producer: "Cascina Ventaglio",
    category: "distillati", subcategory: "Grappa", region: "Piemonte", volume: "500ml", alcohol: 40,
    price: 22.9, image: bottle(25),
    tastingNotes: "Aromatica e fragrante: uva moscato, salvia e fiori. Delicata e profumatissima, ideale come fine pasto.",
    foodPairings: ["Pasticceria", "Frutta", "Fine pasto"],
    inStock: true,
  },
  {
    id: "di07", slug: "brandy-italiano-riserva-tenuta-fioranova", name: "Brandy Italiano Riserva", producer: "Tenuta Fioranova",
    category: "distillati", subcategory: "Brandy", region: "Italia", volume: "700ml", alcohol: 40,
    price: 27.5, image: bottle(26),
    tastingNotes: "Ambra dorata: uva sultanina, caramello e vaniglia. Morbido e rotondo, dal calore avvolgente.",
    foodPairings: ["Cioccolato", "Fine pasto", "Caffè"],
    inStock: true,
  },
  {
    id: "di08", slug: "gin-mediterraneo-baglio-solelune", name: "Gin Mediterraneo", producer: "Baglio Solelune",
    category: "distillati", subcategory: "Gin", region: "Sicilia", volume: "700ml", alcohol: 43,
    price: 31.9, image: bottle(27),
    tastingNotes: "Botaniche del sud: ginepro, agrumi siciliani e rosmarino. Fresco, balsamico e aromatico.",
    foodPairings: ["Aperitivo", "Gin tonic", "Crudi di mare"],
    inStock: true, featured: true, badges: ["Novità"],
  },
  {
    id: "di09", slug: "vodka-artigianale-glenavon", name: "Vodka Artigianale", producer: "Glenavon Distillery",
    category: "distillati", subcategory: "Vodka", region: "Europa", volume: "700ml", alcohol: 40,
    price: 24.9, image: bottle(28),
    tastingNotes: "Cristallina e purissima: cereale delicato e minerale. Pulita, morbida e setosa.",
    foodPairings: ["Caviale", "Cocktail", "Aperitivo"],
    inStock: true,
  },
  {
    id: "di10", slug: "grappa-invecchiata-riserva-maso-veltliner", name: "Grappa Invecchiata Riserva", producer: "Maso Veltliner",
    category: "distillati", subcategory: "Grappa", region: "Trentino-Alto Adige", volume: "700ml", alcohol: 42,
    price: 38.9, image: bottle(29),
    tastingNotes: "Riposata in legno: miele, spezie e frutta secca. Elegante e complessa, dal finale lungo e caldo.",
    foodPairings: ["Cioccolato", "Formaggi", "Fine pasto"],
    inStock: true,
  },
];

const LIQUORI: Wine[] = [
  {
    id: "l01", slug: "amaro-alle-erbe-tenuta-fioranova", name: "Amaro alle Erbe", producer: "Tenuta Fioranova",
    category: "liquori", subcategory: "Amaro", region: "Italia", volume: "700ml", alcohol: 30,
    price: 19.9, image: bottle(30),
    tastingNotes: "33 erbe e radici: genziana, rabarbaro e agrumi. Amaro-dolce equilibrato, balsamico e digestivo.",
    foodPairings: ["Fine pasto", "Con ghiaccio", "Caffè corretto"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "l02", slug: "limoncello-di-costa-baglio-solelune", name: "Limoncello di Costa", producer: "Baglio Solelune",
    category: "liquori", subcategory: "Limoncello", region: "Campania", volume: "500ml", alcohol: 30,
    price: 15.9, image: bottle(31),
    tastingNotes: "Solo scorze di limoni di costa: agrume intenso e fresco. Dolce, profumatissimo, da servire ghiacciato.",
    foodPairings: ["Fine pasto", "Dolci al limone", "Frutta"],
    inStock: true, featured: true, badges: ["Biologico"],
  },
  {
    id: "l03", slug: "nocino-artigianale-corte-delle-rose", name: "Nocino Artigianale", producer: "Corte delle Rose",
    category: "liquori", subcategory: "Nocino", region: "Emilia-Romagna", volume: "500ml", alcohol: 40,
    price: 17.5, image: bottle(32),
    tastingNotes: "Da noci verdi: spezie, cacao e chiodi di garofano. Denso, caldo e balsamico, tipico digestivo emiliano.",
    foodPairings: ["Fine pasto", "Gelato", "Dolci speziati"],
    inStock: true,
  },
  {
    id: "l04", slug: "amaro-siciliano-alle-arance-baglio-solelune", name: "Amaro Siciliano all'Arancia", producer: "Baglio Solelune",
    category: "liquori", subcategory: "Amaro", region: "Sicilia", volume: "700ml", alcohol: 28,
    price: 18.9, image: bottle(0),
    tastingNotes: "Arancia rossa, erbe e spezie del sud. Amaro morbido e aromatico, dal finale agrumato.",
    foodPairings: ["Fine pasto", "Con scorza d'arancia", "Cioccolato"],
    inStock: true, badges: ["Novità"],
  },
  {
    id: "l05", slug: "grappa-alla-liquirizia-cascina-ventaglio", name: "Liquore alla Liquirizia", producer: "Cascina Ventaglio",
    category: "liquori", subcategory: "Liquore", region: "Calabria", volume: "500ml", alcohol: 25,
    price: 14.9, image: bottle(1),
    tastingNotes: "Liquirizia pura di Calabria: dolce, balsamico e intenso. Da gustare freddo a fine pasto.",
    foodPairings: ["Fine pasto", "Gelato alla crema", "Caffè"],
    inStock: true,
  },
  {
    id: "l06", slug: "sambuca-classica-tenuta-basileia", name: "Sambuca Classica", producer: "Tenuta Basileia",
    category: "liquori", subcategory: "Sambuca", region: "Lazio", volume: "700ml", alcohol: 38,
    price: 13.9, image: bottle(2),
    tastingNotes: "Anice stellato e sambuco: dolce, cristallina e profumata. Perfetta liscia, con la mosca o nel caffè.",
    foodPairings: ["Caffè", "Fine pasto", "Con chicchi di caffè"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "l07", slug: "amaro-di-genziana-colline-del-gran-sasso", name: "Amaro di Genziana", producer: "Colline del Gran Sasso",
    category: "liquori", subcategory: "Amaro", region: "Abruzzo", volume: "500ml", alcohol: 35,
    price: 21.5, image: bottle(3),
    tastingNotes: "Da radice di genziana appenninica: amaro deciso, terroso e balsamico. Grande digestivo di montagna.",
    foodPairings: ["Fine pasto", "Con ghiaccio", "Dopo pasti importanti"],
    inStock: true,
  },
  {
    id: "l08", slug: "mirto-di-sardegna-nuraghe-antico", name: "Mirto di Sardegna", producer: "Nuraghe Antico",
    category: "liquori", subcategory: "Mirto", region: "Sardegna", volume: "500ml", alcohol: 32,
    price: 16.9, image: bottle(4),
    tastingNotes: "Da bacche di mirto: macchia mediterranea, erbe e frutti scuri. Dolce-balsamico, da servire fresco.",
    foodPairings: ["Fine pasto", "Dolci sardi", "Formaggi"],
    inStock: true, featured: true, badges: ["Biologico"],
  },
  {
    id: "l09", slug: "amaretto-alle-mandorle-tenuta-fioranova", name: "Amaretto alle Mandorle", producer: "Tenuta Fioranova",
    category: "liquori", subcategory: "Liquore", region: "Piemonte", volume: "700ml", alcohol: 24,
    price: 15.5, image: bottle(5),
    tastingNotes: "Mandorla amara e vaniglia: dolce, morbido e avvolgente. Ottimo liscio, con ghiaccio o nei dolci.",
    foodPairings: ["Dolci", "Caffè", "Gelato"],
    inStock: true,
  },
  {
    id: "l10", slug: "fernet-alle-erbe-corte-delle-rose", name: "Fernet alle Erbe", producer: "Corte delle Rose",
    category: "liquori", subcategory: "Fernet", region: "Italia", volume: "700ml", alcohol: 39,
    price: 17.9, image: bottle(6),
    tastingNotes: "Menta, mirra e 27 erbe: amaro intenso, fresco e persistente. Il digestivo per eccellenza.",
    foodPairings: ["Fine pasto", "Con menta", "Dopo cena"],
    inStock: true,
  },
];

const ACCESSORI: Wine[] = [
  {
    id: "a01", slug: "cavatappi-professionale-sommelier", name: "Cavatappi Professionale Sommelier", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Cavatappi", volume: "—",
    price: 24.9, image: bottle(7),
    tastingNotes: "Cavatappi a doppia leva in acciaio, con lama tagliacapsula integrata. Lo strumento del sommelier professionista.",
    foodPairings: ["Ideale per ogni bottiglia", "Regalo perfetto"],
    inStock: true, featured: true, badges: ["Best Seller"],
  },
  {
    id: "a02", slug: "set-6-calici-cristallo-degustazione", name: "Set 6 Calici Cristallo Degustazione", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Calici", volume: "—",
    price: 49.9, originalPrice: 59.9, image: bottle(8),
    tastingNotes: "Sei calici in cristallo soffiato, stelo sottile e coppa ampia per esaltare i profumi dei grandi rossi.",
    foodPairings: ["Vini rossi importanti", "Regalo perfetto"],
    inStock: true, featured: true, badges: ["In Offerta"],
  },
  {
    id: "a03", slug: "decanter-cristallo-artigianale", name: "Decanter Cristallo Artigianale", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Decanter", volume: "1500ml",
    price: 44.9, image: bottle(9),
    tastingNotes: "Decanter in cristallo soffiato a bocca, dalla base ampia. Ossigena i vini importanti liberandone il bouquet.",
    foodPairings: ["Vini rossi da invecchiamento", "Regalo perfetto"],
    inStock: true,
  },
  {
    id: "a04", slug: "cofanetto-regalo-due-bottiglie", name: "Cofanetto Regalo Due Bottiglie", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Cofanetti", volume: "—",
    price: 12.9, image: bottle(10),
    tastingNotes: "Elegante cofanetto in legno per due bottiglie, con chiusura magnetica. Il modo più bello per regalare il vino.",
    foodPairings: ["Regalo perfetto", "Occasioni speciali"],
    inStock: true, badges: ["Best Seller"],
  },
  {
    id: "a05", slug: "tappo-salva-vino-sottovuoto", name: "Tappo Salva-Vino Sottovuoto", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Tappi", volume: "—",
    price: 9.9, image: bottle(11),
    tastingNotes: "Pompa e due tappi ermetici che estraggono l'aria dalla bottiglia, conservando il vino fino a una settimana.",
    foodPairings: ["Conservazione", "Uso quotidiano"],
    inStock: true,
  },
  {
    id: "a06", slug: "secchiello-ghiaccio-acciaio", name: "Secchiello Ghiaccio in Acciaio", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Secchielli", volume: "—",
    price: 34.9, image: bottle(12),
    tastingNotes: "Secchiello a doppia parete in acciaio inox, mantiene le bollicine alla temperatura ideale senza ghiaccio.",
    foodPairings: ["Bollicine", "Vini bianchi", "Regalo perfetto"],
    inStock: true, featured: true, badges: ["Novità"],
  },
  {
    id: "a07", slug: "set-accessori-sommelier-4-pezzi", name: "Set Accessori Sommelier 4 Pezzi", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Set", volume: "—",
    price: 29.9, image: bottle(13),
    tastingNotes: "Cofanetto con cavatappi, versatore anti-goccia, tappo ermetico e tagliacapsula. Il kit essenziale.",
    foodPairings: ["Regalo perfetto", "Uso quotidiano"],
    inStock: true,
  },
  {
    id: "a08", slug: "aeratore-versatore-vino", name: "Aeratore & Versatore Vino", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Aeratori", volume: "—",
    price: 14.9, image: bottle(14),
    tastingNotes: "Aeratore da inserire nel collo della bottiglia: ossigena il vino nel calice, senza attese. Anti-goccia.",
    foodPairings: ["Vini rossi giovani", "Uso quotidiano"],
    inStock: true,
  },
  {
    id: "a09", slug: "termometro-vino-a-bracciale", name: "Termometro Vino a Bracciale", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Termometri", volume: "—",
    price: 11.9, image: bottle(15),
    tastingNotes: "Termometro a bracciale da applicare alla bottiglia: lettura immediata della temperatura di servizio ideale.",
    foodPairings: ["Ogni tipologia di vino", "Regalo perfetto"],
    inStock: true, badges: ["Novità"],
  },
  {
    id: "a10", slug: "set-2-calici-flute-cristallo", name: "Set 2 Calici Flûte Cristallo", producer: "Enoteca [Placeholder] Atelier",
    category: "accessori", subcategory: "Calici", volume: "—",
    price: 22.9, image: bottle(16),
    tastingNotes: "Due flûte in cristallo dallo stelo affusolato, pensate per valorizzare il perlage delle bollicine.",
    foodPairings: ["Bollicine", "Champagne", "Regalo perfetto"],
    inStock: true,
  },
];

export const WINES: Wine[] = [
  ...VINI_ROSSI,
  ...VINI_BIANCHI,
  ...ROSATI,
  ...BOLLICINE,
  ...VINI_DOLCI,
  ...DISTILLATI,
  ...LIQUORI,
  ...ACCESSORI,
];

// Assign every product a category-appropriate, visually-verified image. This
// overrides the placeholder ids used in the literals above so the catalogue is
// semantically correct (a red bottle for a Barolo, an amber pour for a grappa,
// glassware for accessori) — not just a valid 200 URL.
{
  const idx: Partial<Record<WineCategory, number>> = {};
  for (const w of WINES) {
    const pool = CAT_IMAGES[w.category];
    const i = idx[w.category] ?? 0;
    w.image = u(pool[i % pool.length]);
    idx[w.category] = i + 1;
  }
}

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
