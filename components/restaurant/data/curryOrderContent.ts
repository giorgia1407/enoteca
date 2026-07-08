/**
 * Curry & Spice — order & checkout UI copy.
 *
 * Self-contained string table for `OrderCheckout` and `Cart`. The
 * "en" values are byte-for-byte the existing English copy (so English output is
 * unchanged); "it" is professional native copy in the formal "Lei".
 *
 * Tokens: {time}, {amount}, {pct}, {number}, {name}, {brand} are substituted by
 * the components at render time. Currency is never baked in here — components
 * format money via the cart's locale-aware `money()`.
 */

export interface OrderCopy {
  // stepper
  steps: [string, string, string, string, string];

  // validation — details
  errName: string;
  errPhone: string;
  errEmail: string;
  errPickupTime: string;
  errStreet: string;
  errCity: string;
  errState: string;
  errZip: string;
  // validation — payment
  errCard: string;
  errExpiry: string;
  errCvc: string;
  errCardZip: string;

  // fulfilment summaries
  etaPickup: string; // {time}
  etaPickupDetail: string; // {time}
  etaDelivery: string;

  // empty cart (checkout guard)
  emptyTitle: string;
  emptyBody: string;
  browseMenu: string;

  // step 1 — order type
  s1Eyebrow: string;
  s1Title: string;
  pickupTitle: string;
  pickupBody: string;
  deliveryTitle: string;
  deliveryBody: string;
  continueLabel: string;

  // step 2 — details
  s2Eyebrow: string;
  s2Title: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  pickupTimeLabel: string;
  selectTime: string;
  streetLabel: string;
  streetPlaceholder: string;
  aptLabel: string;
  aptPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  zipLabel: string;
  zipPlaceholder: string;
  reviewOrder: string;

  // step 3 — review
  s3Eyebrow: string;
  s3Title: string;
  editCart: string;
  instructionsLabel: string;
  instructionsPlaceholder: string;
  tipPrompt: string;
  custom: string;
  customTipAria: string;
  customTipPlaceholder: string;
  continueToPayment: string;

  // step 4 — payment
  s4Eyebrow: string;
  s4Title: string;
  cardLabel: string;
  cardPlaceholder: string;
  expiryLabel: string;
  expiryPlaceholder: string;
  cvcLabel: string;
  cvcPlaceholder: string;
  cardZipLabel: string;
  cardZipPlaceholder: string;
  processing: string;
  pay: string; // {amount}
  demoNote: string;
  backToReview: string;

  // totals
  subtotal: string;
  taxLabel: string; // {pct}
  deliveryFee: string;
  tip: string;
  total: string;

  // success
  orderConfirmed: string;
  orderLabel: string;
  totalPaid: string;
  trackOrder: string;
  orderMore: string;

  // tracking
  stagesDelivery: string[];
  stagesPickup: string[];
  inProgress: string;
  allDone: string; // {brand}

  // shared nav
  back: string;

  // cart
  each: string;
  removeOne: string; // {name}
  addOne: string; // {name}
  yourOrder: string;
  itemSingular: string;
  itemPlural: string;
  proceedToCheckout: string;
  viewCart: string;
  closeCart: string;
  cartEmptyTitle: string;
  cartEmptyHint: string;
}

const IT: OrderCopy = {
  steps: ["Tipo di ordine", "Dati", "Riepilogo", "Pagamento", "Conferma"],

  errName: "Ci indichi il Suo nome, per favore.",
  errPhone: "Inserisca un numero di telefono valido.",
  errEmail: "Inserisca un indirizzo email valido.",
  errPickupTime: "Scelga un orario di ritiro.",
  errStreet: "L'indirizzo è obbligatorio.",
  errCity: "La città è obbligatoria.",
  errState: "La provincia è obbligatoria.",
  errZip: "Inserisca un CAP valido.",
  errCard: "Inserisca un numero di carta di 16 cifre.",
  errExpiry: "MM/AA",
  errCvc: "3–4 cifre",
  errCardZip: "CAP",

  etaPickup: "Pronto per il ritiro alle {time}",
  etaPickupDetail: "Ritiro · {time}",
  etaDelivery: "In arrivo tra 30–45 min",

  emptyTitle: "Il Suo carrello è vuoto",
  emptyBody: "Aggiunga qualche piatto e prepareremo subito il Suo ordine.",
  browseMenu: "Sfoglia il Menu",

  s1Eyebrow: "Iniziamo",
  s1Title: "Come preferisce il Suo ordine?",
  pickupTitle: "Ritiro",
  pickupBody: "Vengo io a ritirarlo — pronto in circa 20 minuti.",
  deliveryTitle: "Consegna",
  deliveryBody: "Portatelo da me — entro 5 km dal Corso.",
  continueLabel: "Continua",

  s2Eyebrow: "Ci siamo quasi",
  s2Title: "I Suoi dati",
  fullNameLabel: "Nome completo",
  fullNamePlaceholder: "Mario Rossi",
  phoneLabel: "Telefono",
  phonePlaceholder: "+39 333 123 4567",
  emailLabel: "Email",
  emailPlaceholder: "email@esempio.it",
  pickupTimeLabel: "Orario di ritiro",
  selectTime: "Scelga un orario…",
  streetLabel: "Indirizzo",
  streetPlaceholder: "Via del Corso 187",
  aptLabel: "Interno / Scala",
  aptPlaceholder: "Facoltativo",
  cityLabel: "Città",
  cityPlaceholder: "Roma",
  stateLabel: "Provincia",
  statePlaceholder: "RM",
  zipLabel: "CAP",
  zipPlaceholder: "00186",
  reviewOrder: "Rivedi l'ordine",

  s3Eyebrow: "Un ultimo controllo",
  s3Title: "Riveda il Suo ordine",
  editCart: "Modifica carrello",
  instructionsLabel: "Note speciali",
  instructionsPlaceholder: "Senza coriandolo, più piccante, note su allergie…",
  tipPrompt: "Aggiunga una mancia per la cucina e il team",
  custom: "Personalizza",
  customTipAria: "Importo mancia personalizzato",
  customTipPlaceholder: "€",
  continueToPayment: "Continua al pagamento",

  s4Eyebrow: "Pagamento sicuro",
  s4Title: "Pagamento",
  cardLabel: "Numero carta",
  cardPlaceholder: "4242 4242 4242 4242",
  expiryLabel: "Scadenza",
  expiryPlaceholder: "MM/AA",
  cvcLabel: "CVC",
  cvcPlaceholder: "123",
  cardZipLabel: "CAP",
  cardZipPlaceholder: "00186",
  processing: "Elaborazione…",
  pay: "Paga {amount}",
  demoNote: "🔒 Modalità demo — nessun addebito reale. Usi un qualsiasi numero di 16 cifre.",
  backToReview: "Torna al riepilogo",

  subtotal: "Subtotale",
  taxLabel: "IVA ({pct}%)",
  deliveryFee: "Costo consegna",
  tip: "Mancia",
  total: "Totale",

  orderConfirmed: "Ordine Confermato!",
  orderLabel: "Ordine",
  totalPaid: "Totale pagato",
  trackOrder: "Segui il Suo ordine",
  orderMore: "Ordina ancora",

  stagesDelivery: ["Ricevuto", "In preparazione", "Pronto", "In consegna", "Consegnato"],
  stagesPickup: ["Ricevuto", "In preparazione", "Pronto", "Ritirato"],
  inProgress: "In corso…",
  allDone: "🎉 Tutto pronto — buon appetito da {brand}!",

  back: "Indietro",

  each: "cad.",
  removeOne: "Rimuovi un {name}",
  addOne: "Aggiungi un {name}",
  yourOrder: "Il Suo Ordine",
  itemSingular: "piatto",
  itemPlural: "piatti",
  proceedToCheckout: "Vai al Pagamento",
  viewCart: "Vedi Carrello",
  closeCart: "Chiudi carrello",
  cartEmptyTitle: "Il Suo carrello è vuoto",
  cartEmptyHint: "— rimediamo subito! Aggiunga un piatto per iniziare.",
};

export const ORDER_COPY: Record<"en" | "it", OrderCopy> = { en: IT, it: IT };
