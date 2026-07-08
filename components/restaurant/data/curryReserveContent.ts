/**
 * Curry & Spice — reservation-flow copy.
 *
 * Self-contained UI-string dictionary for `ReservationFlow`. English values
 * are byte-for-byte the current copy so the English pages are unchanged; Italian
 * is professional native copy in the formal "Lei". Brand facts (address, phone,
 * hours) are NOT duplicated here — the component reads those from
 * `useContent()`.
 */

export interface ReserveCopy {
  /** BCP-47 tag for locale-aware date labels (toLocaleDateString). */
  dateLocale: string;

  // stepper + option lists
  steps: string[];
  occasions: string[];
  dow: string[];
  months: string[];

  // loading
  loading: string;

  // step 1 — date
  bookEyebrow: string;
  pickDate: string;
  pickTime: string; // "Pick a time" — button + step-2 title

  // step 2 — time
  sundaySeatings: string;
  dinnerSeatings: string;
  partySize: string; // "Party size" — button + step-3 title

  // step 3 — party
  howManyJoining: string;
  partyEightNote: string;
  yourDetails: string; // "Your details" — button + step-4 title

  // step 4 — details
  nearlyBooked: string;
  fullName: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  occasionLabel: string;
  optional: string;
  noOccasion: string;
  specialRequests: string;
  requestsPlaceholder: string;
  reviewBooking: string;

  // validation
  errName: string;
  errPhone: string;
  errEmail: string;

  // step 5 — confirm
  confirmHold: string;
  almostBooked: string;
  dateLabel: string;
  timeLabel: string;
  partyLabel: string;
  guestOne: string;
  guestMany: string;
  holdCardBold: string;
  holdCardRest: string;
  cardNumber: string;
  expiry: string;
  expiryAria: string;
  cvc: string;
  demoMode: string;
  confirmReservation: string;
  reachOut: string;
  back: string;

  // step 6 — success
  youreBooked: string;
  reservationLabel: string;
  addGoogle: string;
  addApple: string;
  confirmSentPre: string;
  confirmSentAnd: string;
  modifyCancel: string;
  notImplemented: string;
  backToRestaurant: string;

  // calendar
  prevMonth: string;
  nextMonth: string;
  calendarNote: string;
}

const IT: ReserveCopy = {
  dateLocale: "it-IT",
  steps: ["Data", "Ora", "Persone", "Dettagli", "Conferma"],
  occasions: ["Compleanno", "Anniversario", "Cena di lavoro", "Cena romantica", "Altro"],
  dow: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  months: [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
  ],
  loading: "Verifica disponibilità…",
  bookEyebrow: "Prenoti un tavolo",
  pickDate: "Scelga la data",
  pickTime: "Scelga l'orario",
  sundaySeatings: "Turni brunch e cena della domenica",
  dinnerSeatings: "Turni di cena",
  partySize: "Numero di persone",
  howManyJoining: "Per quante persone?",
  partyEightNote: "Per tavoli da 8 o più persone, La ricontatteremo personalmente per organizzare il tavolo perfetto.",
  yourDetails: "I Suoi dati",
  nearlyBooked: "Ci siamo quasi",
  fullName: "Nome e cognome",
  namePlaceholder: "Mario Rossi",
  phoneLabel: "Telefono",
  phonePlaceholder: "+39 333 123 4567",
  emailLabel: "Email",
  emailPlaceholder: "email@esempio.it",
  occasionLabel: "Occasione",
  optional: "(facoltativo)",
  noOccasion: "Nessuna occasione particolare",
  specialRequests: "Richieste particolari (facoltativo)",
  requestsPlaceholder: "Seggiolone, intolleranze alimentari, tavolo tranquillo…",
  reviewBooking: "Rivedi la prenotazione",
  errName: "Ci indichi il Suo nome, per favore.",
  errPhone: "Inserisca un numero di telefono valido.",
  errEmail: "Inserisca un indirizzo email valido.",
  confirmHold: "Confermi e blocchi il tavolo",
  almostBooked: "Manca solo la conferma",
  dateLabel: "Data",
  timeLabel: "Ora",
  partyLabel: "Persone",
  guestOne: "ospite",
  guestMany: "ospiti",
  holdCardBold: "Blocchi il tavolo con una carta",
  holdCardRest: " — facoltativo. Nessun addebito, salvo mancata presentazione per tavoli da 6 o più persone.",
  cardNumber: "Numero della carta",
  expiry: "MM/AA",
  expiryAria: "Scadenza",
  cvc: "CVC",
  demoMode: "🔒 Modalità demo — nessuna carta reale viene salvata o addebitata.",
  confirmReservation: "Confermi la Prenotazione",
  reachOut: "Potremmo contattarLa per confermare i dettagli 24 ore prima della Sua visita.",
  back: "Indietro",
  youreBooked: "Prenotazione confermata!",
  reservationLabel: "Prenotazione",
  addGoogle: "Aggiungi a Google Calendar",
  addApple: "Aggiungi a Apple Calendar",
  confirmSentPre: "Abbiamo inviato una conferma a ",
  confirmSentAnd: "e",
  modifyCancel: "Modifichi o annulli la prenotazione",
  notImplemented: "Non disponibile in questa demo — potrà gestirla dalla email di conferma.",
  backToRestaurant: "Torna a",
  prevMonth: "Mese precedente",
  nextMonth: "Mese successivo",
  calendarNote: "Chiuso il lunedì · Prenoti fino a 60 giorni in anticipo",
};

export const RESERVE_COPY: Record<"en" | "it", ReserveCopy> = { en: IT, it: IT };
