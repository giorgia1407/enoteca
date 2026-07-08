/**
 * Curry & Spice (Roma) — content layer.
 *
 * One dictionary per locale holds the restaurant identity + every UI string, so
 * the components render the right brand, currency and native copy without any
 * per-locale forks. English values are exactly the current copy (so the English
 * pages are unchanged); Italian is professional native copy in the formal "Lei".
 */

import { getWhatsAppUrl } from "@/lib/constants";
import { type Category } from "./menuData";
import { CATEGORIES_IT } from "./menuData.it";

export type Locale = "en" | "it";

export interface DayHours {
  day: string;
  hours: string | null;
}

export interface RestaurantContent {
  name: string;
  ampBefore: string; // wordmark part before "&"
  ampAfter: string; // wordmark part after "&"
  tagline: string;
  cityLabel: string;
  neighborhood: string;
  addressLines: string[];
  fullAddress: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  whatsappUrl: string;
  rating: number;
  reviewCount: number;
  avgWaitMinutes: number;
  deliveryRadiusMiles: number;
  deliveryFee: number;
  hours: DayHours[];
  directionsUrl: string;
  transit: string[];
  hoursSummary: string[];
  mapLabel: string;
  social: { instagram: string; facebook: string; tiktok: string };
}

const IT_RESTAURANT: RestaurantContent = {
  name: "Curry & Spice",
  ampBefore: "Curry",
  ampAfter: "Spice",
  tagline: "Cucina indiana moderna, ricette di famiglia, cuore romano.",
  cityLabel: "ROMA · RM",
  neighborhood: "Centro Storico",
  addressLines: ["Via del Corso 187", "00186 Roma RM, Italia"],
  fullAddress: "Via del Corso 187, 00186 Roma RM, Italia",
  phone: "+39 06 6788 2500",
  phoneHref: "tel:+390667882500",
  email: "ciao@curryespice.it",
  emailHref: "mailto:ciao@curryespice.it",
  whatsappUrl: getWhatsAppUrl(),
  rating: 4.8,
  reviewCount: 847,
  avgWaitMinutes: 15,
  deliveryRadiusMiles: 5,
  deliveryFee: 3.99,
  hours: [
    { day: "Lunedì", hours: null },
    { day: "Martedì", hours: "18:30 – 23:00" },
    { day: "Mercoledì", hours: "18:30 – 23:00" },
    { day: "Giovedì", hours: "18:30 – 23:00" },
    { day: "Venerdì", hours: "18:30 – 24:00" },
    { day: "Sabato", hours: "18:30 – 24:00" },
    { day: "Domenica", hours: "12:00 – 15:00 · 18:30 – 22:00" },
  ],
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Via del Corso 187, 00186 Roma")}`,
  transit: [
    "Metro A: fermata Barberini (7 min a piedi). Autobus 62, 63, 85, 95, 175 (fermata Corso).",
    "Parcheggio: parcheggio pubblico Villa Borghese (10 min).",
  ],
  hoursSummary: ["Mar–Gio · 18:30–23:00", "Ven–Sab · 18:30–24:00", "Dom · 12–15 · 18:30–22", "Lunedì · Chiuso"],
  mapLabel: "Centro Storico · Roma",
  social: { instagram: "https://instagram.com", facebook: "https://facebook.com", tiktok: "https://tiktok.com" },
};

/* ------------------------------------------------------------------ */
/* UI copy                                                             */
/* ------------------------------------------------------------------ */

export interface CopyContent {
  // announcement
  annVegan: string;
  // nav
  navHome: string;
  navMenus: string;
  navReserve: string;
  navOrder: string;
  navGiftCards: string;
  navAbout: string;
  navGallery: string;
  findATable: string;
  viewFullMenu: string;
  orderModeDineIn: string;
  orderModeDineInDesc: string;
  orderModePickup: string;
  orderModePickupDesc: string;
  orderModeDelivery: string;
  orderModeDeliveryDesc: string;
  aboutStory: string;
  aboutChef: string;
  aboutReviews: string;
  aboutCareers: string;
  aboutPress: string;
  // masthead
  mastheadTag: string;
  mastheadHeadline: string;
  // hero
  lovedByGuests: string;
  ctaDineIn: string;
  ctaOrderOnline: string;
  ctaCallOrder: string;
  bellaButton: string;
  // order-mode picker
  pickerTitle: string;
  pickerSub: string;
  pickerDeliveryDesc: string;
  pickerDeliveryInfo: string;
  pickerPickupDesc: string;
  pickerPickupInfo: string;
  pickerPrefer: string;
  pickerReserveLink: string;
  // full menu
  orderFromKitchen: string;
  fullMenu: string;
  acceptsCards: string;
  avgWait: string;
  searchDishes: string;
  clear: string;
  bellaChip: string;
  noResults: string;
  clearSearch: string;
  filterVeg: string;
  filterVegan: string;
  filterGf: string;
  filterUnder: string;
  filterChef: string;
  filterMild: string;
  filterMedium: string;
  filterSpicy: string;
  chefsPick: string;
  add: string;
  addToOrder: string;
  yourOrder: string;
  basketEmpty: string;
  basketEmptyHint: string;
  askBella: string;
  askBellaSuggestion: string;
  subtotal: string;
  tax: string;
  deliveryFeeLabel: string;
  tip: string;
  total: string;
  addTip: string;
  custom: string;
  proceedToCheckout: string;
  viewCart: string;
  indicatorDelivery: string;
  indicatorPickup: string;
  indicatorDineIn: string;
  modeDelivery: string;
  modePickup: string;
  modeDineInTab: string;
  orderTypeAria: string;
  searchLabel: string;
  eachLabel: string;
  customTipAria: string;
  tipPlaceholder: string;
  removeOne: string;
  addOne: string;
  closeCart: string;
  // checkout upsell
  completeMeal: string;
  addAndContinue: string;
  continueToCheckout: string;
  upsellDessert: string; // {names}
  upsellDrink: string; // {names}
  upsellAlso: string; // {names} {item}
  chefPairing: string;
  dismissSuggestion: string;
  maybeLater: string;
  yesAdd: string; // {price}
  noThanks: string;
  // review — see below
  // footer + sections
  footerExplore: string;
  footerVisit: string;
  footerHours: string;
  linkMenu: string;
  linkContact: string;
  footerReviewCta: string;
  footerRights: string;
  footerMade: string;
  footerBack: string;
  storyHeading: string;
  storyEyebrow: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storySignature: string;
  reviewsHeading: string;
  reviewsRecent: string;
  reviewsSeeAll: string;
  reviewsCountWord: string;
  reviewsPrevAria: string;
  reviewsNextAria: string;
  reviewsVerified: string;
  galleryHeading: string;
  galleryEyebrow: string;
  galleryCaptions: string[];
  locationHeading: string;
  locationEyebrow: string;
  hoursLabel: string;
  getDirections: string;
  gettingHere: string;
  closedLabel: string;
  newsletterHeading: string;
  newsletterSub: string;
  newsletterPlaceholder: string;
  subscribe: string;
  newsletterDone: string;
  followUs: string;
  storyChef: string;
  // misc
  loading: string;
}

const IT_COPY: CopyContent = {
  annVegan: "Opzioni vegane e senza glutine disponibili",
  navHome: "Home",
  navMenus: "Menu",
  navReserve: "Prenota",
  navOrder: "Ordina",
  navGiftCards: "Buoni Regalo",
  navAbout: "Chi Siamo",
  navGallery: "Galleria",
  findATable: "Prenoti un Tavolo",
  viewFullMenu: "Vedi il Menu Completo",
  orderModeDineIn: "In Ristorante",
  orderModeDineInDesc: "Prenoti un tavolo o scansioni il QR in sala",
  orderModePickup: "Ritiro",
  orderModePickupDesc: "Pronto in ~20 minuti",
  orderModeDelivery: "Consegna",
  orderModeDeliveryDesc: "Entro 5 km dal Corso",
  aboutStory: "La Nostra Storia",
  aboutChef: "Chef Priya",
  aboutReviews: "🌟 Recensioni",
  aboutCareers: "Lavora con Noi",
  aboutPress: "Stampa",
  mastheadTag: "★ Cucina Indiana Premiata",
  mastheadHeadline: "Autentica Cucina Indiana che conquisterà i Suoi sensi.",
  lovedByGuests: "Amato dai nostri ospiti",
  ctaDineIn: "In Ristorante",
  ctaOrderOnline: "Ordina Online",
  ctaCallOrder: "Chiami per Ordinare",
  bellaButton: "Ciao, sono Bella, la Sua cameriera oggi, mi lasci prendermi cura di Lei",
  pickerTitle: "Come preferisce l'ordine?",
  pickerSub: "Scelga la Sua opzione preferita.",
  pickerDeliveryDesc: "Lo porti da noi a Lei. Pronto in 30-45 min, consegnato dal nostro team.",
  pickerDeliveryInfo: "Costo consegna: €3,99 · Entro 5 km",
  pickerPickupDesc: "Vengo io a ritirare. Pronto in circa 20 minuti.",
  pickerPickupInfo: "Nessun costo aggiuntivo · Senza attesa",
  pickerPrefer: "Preferisce cenare qui? ",
  pickerReserveLink: "Prenoti un tavolo",
  orderFromKitchen: "Ordini dalla nostra cucina",
  fullMenu: "Menu Completo",
  acceptsCards: "Accettiamo carte di credito",
  avgWait: "Attesa media",
  searchDishes: "Cerca piatti…",
  clear: "Cancella",
  bellaChip: "Non sa cosa scegliere? Parli con Bella, la nostra cameriera AI →",
  noResults: "Nessun piatto corrisponde alla ricerca",
  clearSearch: "Cancella ricerca e filtri",
  filterVeg: "Vegetariano 🌱",
  filterVegan: "Vegano",
  filterGf: "Senza Glutine",
  filterUnder: "Sotto i €15",
  filterChef: "Scelta dello Chef ⭐",
  filterMild: "Delicato 🌶",
  filterMedium: "Medio 🌶🌶",
  filterSpicy: "Piccante 🌶🌶🌶",
  chefsPick: "Scelta dello Chef ★",
  add: "Aggiungi",
  addToOrder: "Aggiungi all'Ordine",
  yourOrder: "Il Suo Ordine",
  basketEmpty: "Il Suo carrello è vuoto",
  basketEmptyHint: "Esplori il menu o chieda un consiglio a Bella.",
  askBella: "🌸 Chieda a Bella →",
  askBellaSuggestion: "🌸 Vuole un consiglio? Chieda a Bella →",
  subtotal: "Subtotale",
  tax: "IVA",
  deliveryFeeLabel: "Costo consegna",
  tip: "Mancia",
  total: "Totale",
  addTip: "Aggiungi una mancia",
  custom: "Personalizza",
  proceedToCheckout: "Vai al Pagamento",
  viewCart: "Vedi Carrello",
  indicatorDelivery: "🛵 Consegna — Arriva in 30–45 min",
  indicatorPickup: "🛍️ Ritiro — Pronto in ~20 min",
  indicatorDineIn: "🍽️ In Ristorante — Scansioni il QR al tavolo",
  modeDelivery: "Consegna",
  modePickup: "Ritiro",
  modeDineInTab: "QR al Tavolo",
  orderTypeAria: "Tipo di ordine",
  searchLabel: "Cerca piatti",
  eachLabel: "cad.",
  customTipAria: "Importo mancia personalizzato",
  tipPlaceholder: "€",
  removeOne: "Togli un",
  addOne: "Aggiungi un",
  closeCart: "Chiudi carrello",
  completeMeal: "Completa il pasto?",
  addAndContinue: "Aggiungi e continua",
  continueToCheckout: "Continua al pagamento",
  upsellDessert: "Chi ordina {names} adora anche un Gulab Jamun caldo per concludere.",
  upsellDrink: "Un Mango Lassi è il sorso perfetto insieme a {names}.",
  upsellAlso: "Chi ordina {names} adora anche {item}.",
  chefPairing: "✨ Consiglio dello Chef",
  dismissSuggestion: "Ignora suggerimento",
  maybeLater: "Magari dopo",
  yesAdd: "Sì, aggiungi ({price})",
  noThanks: "No, grazie",
  footerExplore: "Esplora",
  footerVisit: "Vieni a Trovarci",
  footerHours: "Orari",
  linkMenu: "Menu",
  linkContact: "Contatti",
  footerReviewCta: "Ha cenato con noi? Condivida la Sua esperienza →",
  footerRights: "Tutti i diritti riservati.",
  footerMade: "Fatto con passione nel cuore di Roma",
  footerBack: "← Torna alla home",
  storyHeading: "La Nostra Storia",
  storyEyebrow: "Ricette di famiglia, tre generazioni",
  storyP1: "La cucina di mia nonna a Amritsar era la mia scuola. Da bambina, la guardavo macinare le spezie a mano, tostare i semi di cumino fino al momento perfetto, mescolare il ghee nei suoi curry con la pazienza di chi sa che il tempo è un ingrediente.",
  storyP2: "Ho lasciato il Punjab a ventotto anni, con le sue ricette scritte a mano in un quaderno. Sono arrivata a Roma quasi per caso — mio marito trovò lavoro qui, io lo seguii. Ma questa città mi ha adottata: i mercati di Testaccio, i carciofi romani, l'olio del Lazio.",
  storyP3: "Curry & Spice è nato da questo incontro. Le ricette della nonna, ma anche l'anima romana. Perché in fondo, il cibo è famiglia. E la famiglia si allarga sempre.",
  storySignature: "— Chef Priya",
  reviewsHeading: "I Nostri Ospiti Dicono",
  reviewsRecent: "Recensioni recenti",
  reviewsSeeAll: "Legga tutte le 847 recensioni su Google →",
  reviewsCountWord: "recensioni",
  reviewsPrevAria: "Recensioni precedenti",
  reviewsNextAria: "Altre recensioni",
  reviewsVerified: "Verificata",
  galleryHeading: "Un Assaggio della Nostra Cucina",
  galleryEyebrow: "@curryespice",
  galleryCaptions: [
    "Biryani di Hyderabad",
    "Il Tavolo dello Chef",
    "Una Serata da Curry & Spice",
    "Impiattato con Cura",
    "Paneer Tikka",
    "La Nostra Sala",
    "Curry al Cocco",
    "Dal Tandoor",
  ],
  locationHeading: "Dove Siamo",
  locationEyebrow: "Venga a sedersi al nostro tavolo",
  hoursLabel: "Orari",
  getDirections: "Come Arrivare",
  gettingHere: "Come arrivare:",
  closedLabel: "Chiuso",
  newsletterHeading: "Unisciti a noi",
  newsletterSub: "Riceva in anteprima menu di stagione, cene speciali ed eventi.",
  newsletterPlaceholder: "email@esempio.it",
  subscribe: "Iscriviti",
  newsletterDone: "È dei nostri — benvenuta in famiglia!",
  followUs: "Ci Segua",
  storyChef: "Chef Priya nella cucina di Curry & Spice",
  loading: "Caricamento…",
};

export interface Content {
  locale: Locale;
  currency: "USD" | "EUR";
  r: RestaurantContent;
  t: CopyContent;
  categories: Category[];
}

const CONTENT: Record<Locale, Content> = {
  en: { locale: "en", currency: "EUR", r: IT_RESTAURANT, t: IT_COPY, categories: CATEGORIES_IT },
  it: { locale: "it", currency: "EUR", r: IT_RESTAURANT, t: IT_COPY, categories: CATEGORIES_IT },
};

export function getContent(locale: string): Content {
  return locale === "it" ? CONTENT.it : CONTENT.en;
}

/** Locale-aware money formatting: $9.00 / €9,00. */
export function formatMoney(locale: Locale, amount: number): string {
  if (locale === "it") return `€${amount.toFixed(2).replace(".", ",")}`;
  return `$${amount.toFixed(2)}`;
}
