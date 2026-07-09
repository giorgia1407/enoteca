"use client";

/**
 * Il Tempio di Vino — lightweight bilingual layer.
 *
 * The original template shipped a locale-aware ContentContext (it/en UI copy
 * over a shared data model) but hardcoded Italian and had no route-based
 * locale. We preserve that model: Italian is primary, English secondary, and a
 * header toggle flips all site chrome via this dictionary. Choice persists to
 * localStorage.
 *
 * The product CATALOGUE (wine names, tasting notes, regions) stays in Italian
 * by design — Italian wine nomenclature is authentic in any language and the
 * real product list is client-supplied in Phase 2. Documented in
 * /DORECA_ANALYSIS.md.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "it" | "en";

type Dict = Record<string, string>;

const IT: Dict = {
  // Announcement bar
  "ann.shipping": "Consegna gratuita sopra €80",
  "ann.selection": "Selezione di 500+ etichette italiane",
  "ann.whatsapp": "Ordina via WhatsApp per una consulenza personalizzata",
  // Nav
  "nav.home": "Home",
  "nav.catalog": "Catalogo",
  "nav.offers": "Offerte",
  "nav.about": "Chi Siamo",
  "nav.contact": "Contatti",
  "nav.business": "Cliente Business?",
  "nav.search": "Cerca vino, cantina, regione…",
  "nav.account": "Account",
  "nav.cart": "Carrello",
  "nav.menu": "Menu",
  "nav.close": "Chiudi",
  "nav.allCategories": "Tutte le categorie",
  "nav.orderNow": "Ordina ora",
  // Facets in mega-menu
  "facet.region": "Regione",
  "facet.denomination": "Denominazione",
  "facet.grape": "Vitigno",
  "facet.vintage": "Annata",
  "facet.type": "Tipologia",
  "facet.price": "Prezzo",
  "facet.format": "Formato",
  // Buttons / actions
  "btn.orderWhatsapp": "Ordina via WhatsApp",
  "btn.addToCart": "Aggiungi",
  "btn.added": "Aggiunto ✓",
  "btn.viewAll": "Vedi tutto",
  "btn.discover": "Scopri",
  "btn.explore": "Esplora il catalogo",
  "btn.details": "Dettagli",
  "btn.filters": "Filtri",
  "btn.resetFilters": "Azzera filtri",
  "btn.applyFilters": "Mostra risultati",
  // Home
  "home.hero.eyebrow": "La Grande Enoteca Italiana",
  "home.hero.title": "Il meglio del vino italiano, a casa tua",
  "home.hero.subtitle":
    "Oltre 500 etichette selezionate dalle migliori cantine d'Italia. Ordina via WhatsApp e ricevi a Roma, con consegna gratuita sopra €80.",
  "home.hero.cta": "Esplora il catalogo",
  "home.hero.cta2": "Consulenza via WhatsApp",
  "home.vantaggi.title": "Perché sceglierci",
  "home.v1.title": "Consegna gratuita",
  "home.v1.text": "A Roma e provincia sopra €80",
  "home.v2.title": "Selezione esperta",
  "home.v2.text": "500+ etichette scelte a mano",
  "home.v3.title": "Ordine sicuro",
  "home.v3.text": "Ordini e paghi via WhatsApp",
  "home.v4.title": "Regalo perfetto",
  "home.v4.text": "Cofanetti e confezioni regalo",
  "home.categories.title": "Le nostre categorie",
  "home.categories.subtitle": "Naviga la cantina per tipologia",
  "home.featured.title": "Selezione del sommelier",
  "home.featured.subtitle": "Le etichette che amiamo in questo momento",
  "home.bestsellers.title": "I più venduti",
  "home.bestsellers.subtitle": "I preferiti dei nostri clienti",
  "home.offers.title": "Le nostre offerte",
  "home.offers.subtitle": "Etichette selezionate a prezzo speciale",
  "home.story.eyebrow": "La nostra storia",
  "home.story.title": "Una passione italiana, dal 1962",
  "home.story.p1":
    "Nasce come piccola bottega nel cuore di Roma, dove tre generazioni hanno imparato a riconoscere un grande vino ancora prima di stapparlo. Da allora selezioniamo ogni etichetta con la stessa cura artigianale.",
  "home.story.p2":
    "Percorriamo l'Italia una vigna alla volta — dalle Langhe alla Sicilia — per portarvi cantine autentiche, spesso piccole e familiari, che raccontano il loro territorio in ogni sorso.",
  "home.story.p3":
    "Oggi quella bottega è una grande enoteca, ma lo spirito è lo stesso: consigliarvi il vino giusto, come farebbe un amico che se ne intende.",
  "home.location.title": "Vieni a trovarci",
  "home.location.hours": "Orari di apertura",
  "home.location.address": "Indirizzo",
  "home.location.delivery": "Consegna",
  "home.location.cta": "Scrivici su WhatsApp",
  "home.testimonials.title": "Cosa dicono di noi",
  // Category page
  "cat.results": "risultati",
  "cat.result": "risultato",
  "cat.sortBy": "Ordina per",
  "cat.sort.featured": "In evidenza",
  "cat.sort.priceAsc": "Prezzo crescente",
  "cat.sort.priceDesc": "Prezzo decrescente",
  "cat.sort.name": "Nome A-Z",
  "cat.sort.vintage": "Annata",
  "cat.sort.novelty": "Novità",
  "cat.empty": "Nessun vino corrisponde ai filtri selezionati.",
  "cat.filter.region": "Regione",
  "cat.filter.denomination": "Denominazione",
  "cat.filter.grape": "Vitigno",
  "cat.filter.vintage": "Annata",
  "cat.filter.price": "Prezzo massimo",
  "cat.filter.inStock": "Solo disponibili",
  // Product page
  "prod.from": "Prezzo",
  "prod.perPiece": "/bott.",
  "prod.inStock": "Disponibile",
  "prod.outOfStock": "Non disponibile",
  "prod.producer": "Cantina",
  "prod.tab.tasting": "Note di degustazione",
  "prod.tab.pairings": "Abbinamenti",
  "prod.tab.tech": "Scheda tecnica",
  "prod.tab.cellar": "La cantina",
  "prod.attr.region": "Regione",
  "prod.attr.denomination": "Denominazione",
  "prod.attr.grape": "Vitigno",
  "prod.attr.vintage": "Annata",
  "prod.attr.alcohol": "Gradazione",
  "prod.attr.volume": "Formato",
  "prod.attr.category": "Categoria",
  "prod.related": "Ti potrebbe piacere anche",
  "prod.cellarText":
    "Una cantina selezionata dalla nostra enoteca per l'autenticità e la costanza qualitativa. Per la scheda completa e la disponibilità, scrivici su WhatsApp.",
  "prod.awards": "Riconoscimenti",
  // Cart drawer
  "cart.title": "Il tuo carrello WhatsApp",
  "cart.empty": "Il carrello è vuoto",
  "cart.emptyHint": "Aggiungi le tue etichette preferite e concludi l'ordine su WhatsApp.",
  "cart.subtotal": "Subtotale",
  "cart.total": "Totale",
  "cart.freeShippingReached": "Consegna gratuita raggiunta ✔",
  "cart.freeShippingLeft": "Aggiungi {x} per la consegna gratuita",
  "cart.order": "Ordina via WhatsApp",
  "cart.clear": "Svuota carrello",
  "cart.remove": "Rimuovi",
  "cart.continue": "Continua lo shopping",
  "cart.note": "L'ordine sarà finalizzato su WhatsApp con un nostro consulente.",
  // Footer
  "footer.tagline": "La grande enoteca italiana. Selezione, consegna e consulenza dal 1962.",
  "footer.newsletter.title": "Iscriviti e ricevi le offerte in esclusiva",
  "footer.newsletter.placeholder": "Il tuo indirizzo e-mail",
  "footer.newsletter.cta": "Iscriviti",
  "footer.col.shop": "Catalogo",
  "footer.col.info": "Informazioni",
  "footer.col.help": "Assistenza",
  "footer.info.about": "Chi siamo",
  "footer.info.story": "La nostra storia",
  "footer.info.stores": "Punti vendita",
  "footer.info.events": "Eventi & degustazioni",
  "footer.help.contact": "Contatti",
  "footer.help.shipping": "Costi e tempi di consegna",
  "footer.help.faq": "Domande frequenti",
  "footer.help.terms": "Termini e condizioni",
  "footer.help.privacy": "Privacy & Cookie",
  "footer.drink": "Bevi responsabilmente",
  "footer.rights": "Tutti i diritti riservati.",
  // Misc
  "badge.new": "Novità",
  "badge.bestseller": "Best Seller",
  "badge.offer": "In Offerta",
  "badge.bio": "Biologico",
};

const EN: Dict = {
  "ann.shipping": "Free delivery over €80",
  "ann.selection": "500+ curated Italian labels",
  "ann.whatsapp": "Order via WhatsApp for personal advice",
  "nav.home": "Home",
  "nav.catalog": "Catalogue",
  "nav.offers": "Offers",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.business": "Business client?",
  "nav.search": "Search wine, winery, region…",
  "nav.account": "Account",
  "nav.cart": "Cart",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.allCategories": "All categories",
  "nav.orderNow": "Order now",
  "facet.region": "Region",
  "facet.denomination": "Denomination",
  "facet.grape": "Grape",
  "facet.vintage": "Vintage",
  "facet.type": "Type",
  "facet.price": "Price",
  "facet.format": "Format",
  "btn.orderWhatsapp": "Order via WhatsApp",
  "btn.addToCart": "Add",
  "btn.added": "Added ✓",
  "btn.viewAll": "View all",
  "btn.discover": "Discover",
  "btn.explore": "Explore the catalogue",
  "btn.details": "Details",
  "btn.filters": "Filters",
  "btn.resetFilters": "Reset filters",
  "btn.applyFilters": "Show results",
  "home.hero.eyebrow": "The Great Italian Wine House",
  "home.hero.title": "The best of Italian wine, delivered to you",
  "home.hero.subtitle":
    "Over 500 labels selected from Italy's finest wineries. Order via WhatsApp and receive in Rome — free delivery over €80.",
  "home.hero.cta": "Explore the catalogue",
  "home.hero.cta2": "Advice via WhatsApp",
  "home.vantaggi.title": "Why choose us",
  "home.v1.title": "Free delivery",
  "home.v1.text": "In Rome & province over €80",
  "home.v2.title": "Expert selection",
  "home.v2.text": "500+ hand-picked labels",
  "home.v3.title": "Secure order",
  "home.v3.text": "Order and pay via WhatsApp",
  "home.v4.title": "Perfect gift",
  "home.v4.text": "Gift boxes and sets",
  "home.categories.title": "Our categories",
  "home.categories.subtitle": "Browse the cellar by type",
  "home.featured.title": "Sommelier's selection",
  "home.featured.subtitle": "The labels we love right now",
  "home.bestsellers.title": "Best sellers",
  "home.bestsellers.subtitle": "Our customers' favourites",
  "home.offers.title": "Our offers",
  "home.offers.subtitle": "Selected labels at a special price",
  "home.story.eyebrow": "Our story",
  "home.story.title": "An Italian passion, since 1962",
  "home.story.p1":
    "It began as a small shop in the heart of Rome, where three generations learned to recognise a great wine before even uncorking it. We still select every label with that same artisan care.",
  "home.story.p2":
    "We travel Italy one vineyard at a time — from the Langhe to Sicily — to bring you authentic wineries, often small and family-run, that speak of their land in every sip.",
  "home.story.p3":
    "Today that shop is a great wine house, but the spirit is unchanged: to recommend the right wine, like a knowledgeable friend would.",
  "home.location.title": "Come visit us",
  "home.location.hours": "Opening hours",
  "home.location.address": "Address",
  "home.location.delivery": "Delivery",
  "home.location.cta": "Message us on WhatsApp",
  "home.testimonials.title": "What people say",
  "cat.results": "results",
  "cat.result": "result",
  "cat.sortBy": "Sort by",
  "cat.sort.featured": "Featured",
  "cat.sort.priceAsc": "Price low to high",
  "cat.sort.priceDesc": "Price high to low",
  "cat.sort.name": "Name A-Z",
  "cat.sort.vintage": "Vintage",
  "cat.sort.novelty": "New",
  "cat.empty": "No wine matches the selected filters.",
  "cat.filter.region": "Region",
  "cat.filter.denomination": "Denomination",
  "cat.filter.grape": "Grape",
  "cat.filter.vintage": "Vintage",
  "cat.filter.price": "Max price",
  "cat.filter.inStock": "In stock only",
  "prod.from": "Price",
  "prod.perPiece": "/btl",
  "prod.inStock": "In stock",
  "prod.outOfStock": "Out of stock",
  "prod.producer": "Winery",
  "prod.tab.tasting": "Tasting notes",
  "prod.tab.pairings": "Pairings",
  "prod.tab.tech": "Technical sheet",
  "prod.tab.cellar": "The winery",
  "prod.attr.region": "Region",
  "prod.attr.denomination": "Denomination",
  "prod.attr.grape": "Grape",
  "prod.attr.vintage": "Vintage",
  "prod.attr.alcohol": "Alcohol",
  "prod.attr.volume": "Format",
  "prod.attr.category": "Category",
  "prod.related": "You may also like",
  "prod.cellarText":
    "A winery selected by our wine house for its authenticity and consistent quality. For the full sheet and availability, message us on WhatsApp.",
  "prod.awards": "Awards",
  "cart.title": "Your WhatsApp cart",
  "cart.empty": "Your cart is empty",
  "cart.emptyHint": "Add your favourite labels and complete the order on WhatsApp.",
  "cart.subtotal": "Subtotal",
  "cart.total": "Total",
  "cart.freeShippingReached": "Free delivery unlocked ✔",
  "cart.freeShippingLeft": "Add {x} for free delivery",
  "cart.order": "Order via WhatsApp",
  "cart.clear": "Empty cart",
  "cart.remove": "Remove",
  "cart.continue": "Continue shopping",
  "cart.note": "The order is finalised on WhatsApp with one of our advisors.",
  "footer.tagline": "The great Italian wine house. Selection, delivery and advice since 1962.",
  "footer.newsletter.title": "Subscribe and get exclusive offers",
  "footer.newsletter.placeholder": "Your e-mail address",
  "footer.newsletter.cta": "Subscribe",
  "footer.col.shop": "Catalogue",
  "footer.col.info": "Information",
  "footer.col.help": "Support",
  "footer.info.about": "About us",
  "footer.info.story": "Our story",
  "footer.info.stores": "Stores",
  "footer.info.events": "Events & tastings",
  "footer.help.contact": "Contact",
  "footer.help.shipping": "Shipping costs & times",
  "footer.help.faq": "FAQ",
  "footer.help.terms": "Terms & conditions",
  "footer.help.privacy": "Privacy & Cookies",
  "footer.drink": "Please drink responsibly",
  "footer.rights": "All rights reserved.",
  "badge.new": "New",
  "badge.bestseller": "Best Seller",
  "badge.offer": "On Offer",
  "badge.bio": "Organic",
};

const DICTS: Record<Locale, Dict> = { it: IT, en: EN };

interface I18nValue {
  locale: Locale;
  t: (key: string, vars?: Record<string, string>) => string;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "enoteca-locale-v1";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");

  // Hydrate from localStorage after mount (avoids SSR mismatch — server always
  // renders Italian, the primary locale).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "it") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from external store
        setLocaleState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "it" ? "en" : "it");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let str = DICTS[locale][key] ?? DICTS.it[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, v);
        }
      }
      return str;
    },
    [locale],
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, t, setLocale, toggle }),
    [locale, t, setLocale, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
