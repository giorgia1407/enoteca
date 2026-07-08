/**
 * Curry & Spice — post-dining REVIEW flow copy.
 *
 * Self-contained locale dictionary for every user-visible string in the review
 * experience. English values are byte-for-byte the original copy, so the English
 * pages render unchanged; Italian is professional native copy in the formal "Lei".
 *
 * The brand name itself is NOT stored here — components source it from
 * `useContent().r` (r.name / r.ampBefore / r.ampAfter) so it becomes
 * "Curry & Spice" in Italian. Strings that embed the brand use a "{name}" token.
 *
 * FEEDBACK_CATEGORIES (see ReviewData.ts) stay stable English identifiers;
 * `feedbackCategories` here maps each key to its localized display label.
 */

import { FEEDBACK_CATEGORIES } from "./ReviewData";

type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export interface ReviewCopy {
  // shared / orchestrator
  backPrefix: string; // + r.name
  demoMode: string;

  // contact step
  eyebrow: string;
  contactTitle: string;
  contactSubtitle: string;
  emailLabel: string;
  phoneLabel: string;
  optional: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  bothOptional: string;
  invalidEmail: string;
  continue: string;

  // star rating
  starTitle: string; // may embed {name}
  starSubtitle: string;
  rateAriaOne: string; // embeds {n}
  rateAriaMany: string; // embeds {n}
  tapToRate: string;

  // positive path
  redirecting: string;
  kindness: string;
  positiveTitle: string;
  positiveSubtitle: string;
  lovedMost: string; // sr-only label + placeholder
  shareGoogle: string;

  // feedback path
  feedbackErrorEmpty: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
  tellUsLabel: string;
  tellUsPlaceholder: string;
  submit: string;
  submitting: string;
  privateNote: string;

  // success
  close: string;
  positiveSuccessTitle: string;
  positiveSuccessSubtitle: string;
  instagram: string;
  feedbackSuccessTitle: string;
  feedbackSuccessSubtitle: string;
  feedbackSuccessNote: string;

  // localized category labels (keys stay the English identifiers)
  feedbackCategories: Record<FeedbackCategory, string>;
}

const IT: ReviewCopy = {
  backPrefix: "← Torna a ",
  demoMode: "Modalità demo — nessun invio reale",

  eyebrow: "Grazie per aver cenato con noi",
  contactTitle: "Prima di condividere la Sua esperienza…",
  contactSubtitle: "Come possiamo contattarLa?",
  emailLabel: "Email",
  phoneLabel: "Telefono",
  optional: "(facoltativo)",
  emailPlaceholder: "nome@email.it",
  phonePlaceholder: "+39 333 123 4567",
  bothOptional: "Entrambi sono facoltativi. Può lasciarli vuoti e condividere comunque il Suo parere.",
  invalidEmail: "Inserisca un indirizzo email valido",
  continue: "Continua",

  starTitle: "Com'è stata la Sua esperienza da {name}?",
  starSubtitle: "Il Suo parere ci aiuta a servirLa meglio",
  rateAriaOne: "Valuta {n} stella",
  rateAriaMany: "Valuta {n} stelle",
  tapToRate: "Tocchi una stella per valutare la Sua visita",

  redirecting: "Reindirizzamento a Google…",
  kindness: "Grazie per la Sua gentilezza 🌸",
  positiveTitle: "Siamo felicissimi che Le sia piaciuto!",
  positiveSubtitle: "La Sua recensione aiuta altri ospiti a scoprirci",
  lovedMost: "Cosa Le è piaciuto di più?",
  shareGoogle: "Lasci una recensione su Google",

  feedbackErrorEmpty: "Ci racconti brevemente cosa è successo.",
  feedbackTitle: "Ci dispiace, come possiamo migliorare?",
  feedbackSubtitle: "Il Suo parere arriva direttamente a Priya, la nostra titolare",
  tellUsLabel: "Ci dica cosa è successo",
  tellUsPlaceholder: "Ci dica cosa è successo…",
  submit: "Invia",
  submitting: "Invio in corso…",
  privateNote: "🔒 Questo parere resta privato",

  close: "Chiudi",
  positiveSuccessTitle: "Grazie di cuore! 🌸",
  positiveSuccessSubtitle: "La Sua recensione significa moltissimo per la nostra piccola famiglia.",
  instagram: "Ci segua su Instagram per nuovi piatti ogni settimana →",
  feedbackSuccessTitle: "Grazie per aiutarci a crescere.",
  feedbackSuccessSubtitle: "Priya leggerà personalmente il Suo messaggio.",
  feedbackSuccessNote: "Potrebbe ricevere una Sua risposta entro 48 ore.",

  feedbackCategories: {
    Food: "Cibo",
    Service: "Servizio",
    Ambience: "Atmosfera",
    "Wait time": "Tempi di attesa",
    Value: "Rapporto qualità-prezzo",
    Cleanliness: "Pulizia",
  },
};

export const REVIEW_COPY: Record<"en" | "it", ReviewCopy> = { en: IT, it: IT };

/** Resolve the review copy for the active locale. */
export function reviewCopy(locale: string): ReviewCopy {
  return REVIEW_COPY[locale === "it" ? "it" : "en"];
}
