/**
 * Curry & Spice (Roma) — recensioni dei clienti (fittizie, solo per la demo).
 * Scritte in tono naturale, come un vero feed di recensioni Google in italiano.
 */

import type { Review } from "./reviewsData";

export const REVIEWS_IT: Review[] = [
  {
    id: "r1",
    name: "Marco Ferretti",
    initials: "MF",
    rating: 5,
    date: "2 settimane fa",
    quote:
      "Il butter chicken è il migliore che abbia mai mangiato fuori dall'India, senza esagerare. Cremoso, affumicato al punto giusto, mai troppo dolce. Siamo venuti per un compleanno e ci siamo sentiti a casa. Prenotato di nuovo.",
    verified: true,
    avatar: "#C7401A",
  },
  {
    id: "r2",
    name: "Giulia Ricci",
    initials: "GR",
    rating: 5,
    date: "1 mese fa",
    quote:
      "Cucina indiana autentica nel cuore di Roma. Il dal makhani ha il sapore di qualcosa cotto a fuoco lento per ore — perché è proprio così. Sala accogliente e personale gentilissimo. Un indirizzo da tenere stretto.",
    verified: true,
    avatar: "#4A6B4E",
  },
  {
    id: "r3",
    name: "Francesca Conti",
    initials: "FC",
    rating: 5,
    date: "3 settimane fa",
    quote:
      "Prima volta con la cucina indiana e il personale mi ha guidata tra i livelli di piccante con tanta pazienza. Ho adorato il paneer tikka masala. Il mango lassi è pericolosamente buono!",
    verified: true,
    avatar: "#E8A548",
  },
  {
    id: "r4",
    name: "Davide Greco",
    initials: "DG",
    rating: 4,
    date: "1 settimana fa",
    quote:
      "Cibo davvero eccellente e il biryani è spettacolare. Ho tolto una stella solo perché il venerdì sera abbiamo aspettato un po' per il tavolo — ne vale la pena, ma conviene prenotare.",
    verified: true,
    avatar: "#2A2420",
  },
  {
    id: "r5",
    name: "Sofia Marchetti",
    initials: "SM",
    rating: 5,
    date: "2 mesi fa",
    quote:
      "Ormai è il nostro posto per le serate speciali. Elegante ma mai formale. Il Rogan Josh si scioglie al solo tocco della forchetta. La chef Priya è passata al tavolo a salutarci — un gesto davvero gentile.",
    verified: true,
    avatar: "#C7401A",
  },
  {
    id: "r6",
    name: "Alessandro Bruno",
    initials: "AB",
    rating: 5,
    date: "5 giorni fa",
    quote:
      "Ordinato d'asporto per la famiglia: tutto ancora caldo e confezionato con cura. I bambini hanno divorato il naan al formaggio. È diventato il nostro appuntamento fisso del martedì sera.",
    verified: true,
    avatar: "#4A6B4E",
  },
];
