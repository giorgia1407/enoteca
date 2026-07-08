/**
 * Curry & Spice (Roma) — "Bella" AI-waiter copy.
 *
 * Self-contained locale dictionary for every user-visible string the Bella chat
 * assistant renders. English values are byte-for-byte the current copy (so the
 * English page is unchanged); Italian is professional native copy in the formal
 * "Lei". The component picks `BELLA_COPY[locale === "it" ? "it" : "en"]`.
 *
 * Reply `value` strings are NOT copy — they drive the state machine and live in
 * the component. Only the `label`s below are localized (values stay identical).
 */

export interface BellaReply {
  label: string;
  value: string;
}

export interface BellaCopy {
  /* portrait / floating widgets */
  bellaAlt: string;
  chatWithBella: string;
  chatWithBellaAria: string;
  whatsappUs: string;
  whatsappAria: string;

  /* header */
  headerSubtitle: string;
  closeChat: string;

  /* input */
  messageLabel: string;
  inputPlaceholder: string;
  sendMessage: string;

  /* questions */
  greeting: string;
  dietText: string;
  diet: BellaReply[];
  spiceText: string;
  spice: BellaReply[];
  skip: BellaReply;
  breadReplies: BellaReply[];
  checkoutReplies: BellaReply[];

  /* recommendations */
  recMore: string;
  recAddAll: string;
  recommendIntro: string;
  recMoreIntro: string;
  allThreeAdded: string;
  addedToBread: (name: string) => string;
  addedFallback: string;

  /* bread */
  breadsIntro: string;
  noBreadThanks: string;
  breadAdded: (name: string) => string;
  breadFallback: string;

  /* starter / dessert */
  starterDessertIntro: string;
  starterFavourite: (name: string, price: string) => string;
  dessertNotMissed: (name: string, price: string) => string;
  addLabel: (name: string) => string;
  addBoth: string;
  noThanksGood: string;

  /* drinks */
  drinksIntro: string;
  drinkLabel: (name: string, price: string) => string;
  justWater: string;

  /* checkout */
  checkoutPrompt: string;
  takingToCheckout: string;
  showReady: string;
  showKeepBrowsing: string;
  orderEmpty: string;
  orderLine: (qty: number, name: string, total: string) => string;
  orderSummary: (lines: string, total: string) => string;

  /* free text */
  freeTextAck: string;
  freeTextAckSuggest: string;
  freeTextNudge: string;

  /* rec card */
  add: string;
}

const IT: BellaCopy = {
  bellaAlt: "Bella, la Sua cameriera AI",
  chatWithBella: "Parla con Bella",
  chatWithBellaAria: "Parla con Bella, la Sua cameriera AI",
  whatsappUs: "Scrivici su WhatsApp",
  whatsappAria: "Scrivi a Curry & Spice su WhatsApp",

  headerSubtitle: "La Sua cameriera AI, sempre al Suo servizio 🌸",
  closeChat: "Chiudi la chat",

  messageLabel: "Scrivi a Bella",
  inputPlaceholder: "Scriva un messaggio…",
  sendMessage: "Invia messaggio",

  greeting:
    "Salve! Sono Bella, la Sua cameriera AI di oggi 🌸 Mi lasci aiutarLa a trovare i piatti perfetti per Lei.",
  dietText: "Ha qualche preferenza alimentare che dovrei conoscere?",
  diet: [
    { label: "Nessuna", value: "none" },
    { label: "Vegetariano", value: "vegetarian" },
    { label: "Vegano", value: "vegan" },
    { label: "Senza glutine", value: "gf" },
    { label: "Mi dica pure Lei", value: "justtell" },
  ],
  spiceText: "Quanto piccante Le piace?",
  spice: [
    { label: "Delicato", value: "mild" },
    { label: "Medio", value: "medium" },
    { label: "Piccante", value: "spicy" },
    { label: "Nessun problema", value: "any" },
  ],
  skip: { label: "Mi mostri solo il menu", value: "skip" },
  breadReplies: [
    { label: "Sì, aggiunga il Naan all'Aglio (€4,50)", value: "add:garlic-naan" },
    { label: "Salto il pane", value: "skip" },
    { label: "Mi mostri gli altri pani", value: "more" },
  ],
  checkoutReplies: [
    { label: "Sono pronto a ordinare", value: "ready" },
    { label: "Mi mostri l'ordine", value: "show" },
    { label: "Continuo a sfogliare il menu", value: "browse" },
  ],

  recMore: "Mi mostri altre opzioni",
  recAddAll: "Aggiungi tutti e tre",
  recommendIntro:
    "In base ai Suoi gusti, ecco cosa Le consiglio — desidera che ne aggiunga qualcuno all'ordine?",
  recMoreIntro: "Certamente — qualche altra proposta che potrebbe piacerLe:",
  allThreeAdded:
    "Meraviglioso — tutti e tre sono nel Suo ordine! Un cestino di naan all'aglio è perfetto da condividere.",
  addedToBread: (name) =>
    `Perfetto, ho aggiunto ${name} al Suo ordine! Desidera un pane da accompagnare? Il nostro naan all'aglio si sposa benissimo.`,
  addedFallback: "quel piatto",

  breadsIntro: "Certo — ecco i nostri pani:",
  noBreadThanks: "Niente pane, grazie",
  breadAdded: (name) => `Ottimo — ${name} aggiunto.`,
  breadFallback: "il pane",

  starterDessertIntro: "Desidera iniziare con qualcosa? ",
  starterFavourite: (name, price) => `Il nostro ${name} è tra i preferiti (${price}).`,
  dessertNotMissed: (name, price) =>
    ` E lasci un po' di spazio — il nostro ${name} è da non perdere (${price}).`,
  addLabel: (name) => `Aggiungi ${name}`,
  addBoth: "Aggiungi entrambi",
  noThanksGood: "No grazie, così va bene",

  drinksIntro:
    "Qualcosa da bere? La nostra limonata alla rosa fatta in casa e il mango lassi sono perfetti per rinfrescare il palato.",
  drinkLabel: (name, price) => `${name} (${price})`,
  justWater: "Solo acqua",

  checkoutPrompt: "Posso suggerirLe altro? Quando è pronto, La porto alla cassa.",
  takingToCheckout: "La porto alla cassa — buon appetito! 🌸",
  showReady: "Sono pronto a ordinare",
  showKeepBrowsing: "Continuo a sfogliare",
  orderEmpty: "Per ora il Suo ordine è vuoto — troviamo qualcosa di delizioso per Lei!",
  orderLine: (qty, name, total) => `• ${qty}× ${name} — ${total}`,
  orderSummary: (lines, total) =>
    `Ecco il Suo ordine finora:\n${lines}\n\nTotale (imposte escluse): ${total}`,

  freeTextAck:
    "Ottima scelta! C'è altro a cui pensa — oppure Le suggerisco qualche piatto?",
  freeTextAckSuggest: "Sì, mi suggerisca qualche piatto",
  freeTextNudge:
    "Do il meglio con le opzioni rapide qui sopra 🌸 — ne tocchi una e penso a tutto io.",

  add: "Aggiungi",
};

export const BELLA_COPY: Record<"en" | "it", BellaCopy> = { en: IT, it: IT };
