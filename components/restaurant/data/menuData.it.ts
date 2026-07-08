/**
 * Curry & Spice (Roma) — Italian menu overlay.
 *
 * Same ids / images / tags / spice levels as the English `menuData.ts`; only the
 * dish name (where it carried English words), the description and the price
 * (euros) change. Merged over the English items by the content layer so the two
 * locales can never drift in structure. Native Italian, formal register.
 */

import type { Category } from "./menuData";

export const CATEGORIES_IT: Category[] = [
  { id: "appetizers", label: "Antipasti", blurb: "Stuzzichini da condividere", emoji: "🥟" },
  { id: "small-plates", label: "Piatti Piccoli", blurb: "Dal tandoor e alla griglia", emoji: "🍢" },
  { id: "curries", label: "Curry", blurb: "A cottura lenta, il cuore della nostra cucina", emoji: "🍛" },
  { id: "biryani-rice", label: "Biryani e Riso", blurb: "Basmati a strati, zafferano e spezie", emoji: "🍚" },
  { id: "breads", label: "Pane", blurb: "Appena sfornato dal tandoor", emoji: "🫓" },
  { id: "sides", label: "Contorni", blurb: "I piccoli tocchi che completano il pasto", emoji: "🥗" },
  { id: "desserts", label: "Dolci", blurb: "Un finale dolce, come faceva la nonna", emoji: "🍮" },
  { id: "drinks", label: "Bevande", blurb: "Freschezze, chai e qualcosa di più", emoji: "🥤" },
  { id: "kids", label: "Menu Bambini", blurb: "Poco piccante, tanto gusto", emoji: "🧒" },
];

export interface ItOverride {
  name?: string;
  description: string;
  price: number;
}

/** id → Italian name (optional) / description / euro price. */
export const MENU_IT: Record<string, ItOverride> = {
  /* Antipasti */
  "samosa-chaat": { description: "Croccanti samosa di patate coperti di ceci, yogurt, chutney di tamarindo e menta.", price: 7.5 },
  "vegetable-samosa": { name: "Samosa di Verdure (2)", description: "Sfoglia friabile ripiena di patate speziate e piselli, con chutney di tamarindo.", price: 5.5 },
  "onion-bhaji": { description: "Cipolle dolci in croccante pastella di ceci, leggermente speziate e fritte.", price: 6.5 },
  "papdi-chaat": { description: "Cialde croccanti, ceci, patate, yogurt e tre chutney della casa.", price: 8.5 },
  "gobi-manchurian": { description: "Cavolfiore croccante saltato in una glassa indo-cinese aglio e peperoncino.", price: 9.5 },
  /* Piatti Piccoli */
  "chicken-tikka": { description: "Petto di pollo marinato, cotto al tandoor, servito con chutney di menta.", price: 12.5 },
  "paneer-65": { description: "Croccante formaggio paneer in glassa di foglie di curry e peperoncino.", price: 10.5 },
  "seekh-kebab": { name: "Seekh Kebab d'Agnello", description: "Agnello macinato a mano, zenzero, peperoncino verde e spezie, cotto allo spiedo.", price: 13.5 },
  "tandoori-wings": { name: "Ali Tandoori", description: "Ali marinate nello yogurt e cotte al tandoor, rifinite con lime.", price: 11.5 },
  "malai-tikka": { name: "Malai Tikka di Pollo", description: "Marinatura cremosa di anacardi e formaggio, delicata e affumicata.", price: 13.5 },
  "tandoori-broccoli": { name: "Broccoli Tandoori", description: "Broccoli abbrustoliti, glassa miele e peperoncino, mandorle tostate.", price: 10.5 },
  /* Curry */
  "butter-chicken": { description: "Il nostro piatto più amato. Salsa cremosa di pomodoro e panna, fieno greco, cosce di pollo tenere.", price: 18.5 },
  "rogan-josh": { name: "Rogan Josh d'Agnello", description: "Spalla d'agnello in stile Kashmir, brasata lentamente con spezie aromatiche.", price: 24.5 },
  "palak-paneer": { description: "Spinaci freschi, aglio, paneer fatto in casa. Delicato.", price: 15.5 },
  "chana-masala": { description: "Ceci in salsa di zenzero e pomodoro. Vegano.", price: 13.5 },
  "kadhai-prawns": { name: "Gamberi Kadhai", description: "Gamberi saltati con peperoni, cipolle e masala kadhai.", price: 22.5 },
  "dal-makhani": { description: "Lenticchie nere cotte tutta la notte con burro e panna, fino a diventare vellutate.", price: 13.5 },
  "chicken-korma": { name: "Korma di Pollo", description: "Pollo in una delicata salsa di anacardi e mandorle, profumata.", price: 17.5 },
  "paneer-tikka-masala": { description: "Paneer abbrustolito immerso in una salsa affumicata di pomodoro e burro.", price: 16.5 },
  "goan-fish-curry": { name: "Curry di Pesce alla Goanese", description: "Pesce in stile costiero in salsa di tamarindo e cocco, con un tocco piccante.", price: 21.5 },
  "aloo-gobi": { description: "Patate e cavolfiore con curcuma, cumino e coriandolo fresco, carciofi romani di stagione.", price: 13.5 },
  /* Biryani e Riso */
  "chicken-biryani": { name: "Biryani di Pollo Hyderabadi", description: "Riso basmati a strati con zafferano, pollo a cottura lenta, uovo sodo e menta.", price: 19.5 },
  "lamb-biryani": { name: "Biryani d'Agnello Dum", description: "Biryani sigillato in pentola con agnello tenero, cipolle fritte e spezie intere.", price: 22.5 },
  "veg-biryani": { name: "Biryani di Verdure", description: "Verdure miste, anacardi, uvetta e riso allo zafferano, cotto a vapore sigillato.", price: 15.5 },
  "jeera-rice": { name: "Riso Jeera", description: "Basmati saltato con cumino tostato e un tocco di ghee.", price: 5.5 },
  "steamed-basmati": { name: "Riso Basmati al Vapore", description: "Basmati a chicco lungo, semplicemente cotto a vapore.", price: 4.5 },
  "coconut-rice": { name: "Riso al Cocco", description: "Basmati con cocco tostato, foglie di curry e semi di senape.", price: 5.5 },
  /* Pane */
  "garlic-naan": { name: "Naan all'Aglio", description: "Appena sfornato dal tandoor, spennellato con burro e aglio arrostito.", price: 4.5 },
  "butter-naan": { name: "Naan al Burro", description: "Morbido pane soffice del tandoor, spennellato di burro.", price: 3.5 },
  "peshawari-naan": { name: "Naan Peshawari", description: "Ripieno di cocco, uvetta e anacardi — dolce e ricco.", price: 5.5 },
  "laccha-paratha": { name: "Laccha Paratha", description: "Pane integrale sfogliato a strati, croccante ai bordi.", price: 4.5 },
  "tandoori-roti": { name: "Roti Tandoori", description: "Pane integrale cotto contro la parete del tandoor.", price: 3.5 },
  /* Contorni */
  "cucumber-raita": { name: "Raita al Cetriolo", description: "Yogurt fresco con cetriolo, cumino e menta.", price: 4.5 },
  "papadum": { name: "Papadum (4)", description: "Croccanti cialde di lenticchie con chutney di tamarindo e menta.", price: 3.5 },
  "mango-chutney": { name: "Chutney di Mango", description: "Conserva dolce-acidula della casa al mango Alphonso.", price: 2.5 },
  "onion-kachumber": { name: "Kachumber di Cipolla", description: "Insalata fresca di cipolla, pomodoro e cetriolo con limone e chaat masala.", price: 4.5 },
  "masala-fries": { name: "Patatine Masala", description: "Patatine croccanti spolverate di chaat masala e coriandolo fresco.", price: 5.5 },
  /* Dolci */
  "gulab-jamun": { name: "Gulab Jamun (2)", description: "Palline di latte calde in sciroppo di cardamomo e rosa.", price: 7.5 },
  "mango-kulfi": { name: "Kulfi al Mango", description: "Gelato indiano tradizionale a lenta mantecatura, zafferano e pistacchio.", price: 7.5 },
  "kheer": { description: "Budino di riso con cardamomo, acqua di rose e mandorle tostate.", price: 6.5 },
  "gajar-halwa": { description: "Dolce di carote a cottura lenta con ghee, cardamomo e anacardi.", price: 6.5 },
  /* Bevande */
  "mango-lassi": { description: "Denso frullato dolce di yogurt e mango Alphonso.", price: 5.5 },
  "salted-lassi": { name: "Lassi Salato", description: "Yogurt frullato con cumino e menta — il classico rinfrescante.", price: 4.5 },
  "masala-chai": { description: "Tè nero cotto con latte, zenzero e spezie intere.", price: 3.5 },
  "rose-lemonade": { name: "Limonata alla Rosa della Casa", description: "Limonata frizzante con un soffio di rosa e cardamomo.", price: 5.5 },
  "sparkling-water": { name: "Acqua Frizzante", description: "Acqua minerale frizzante ghiacciata.", price: 3.5 },
  "kingfisher": { name: "Birra Kingfisher", description: "Lager indiana fresca, bottiglia da 33cl. (18+)", price: 6.5 },
  "house-wine": { name: "Vino Rosso / Bianco della Casa", description: "Un calice a rotazione scelto per accompagnare le spezie. (18+)", price: 7.5 },
  /* Menu Bambini */
  "kids-butter-chicken": { name: "Butter Chicken e Riso per Bambini", description: "Una porzione delicata e cremosa con riso al vapore. Senza piccante.", price: 9.5 },
  "kids-naan-cheese": { name: "Bastoncini di Naan al Formaggio", description: "Striscioline di naan calde con formaggio fuso e una salsa di pomodoro delicata.", price: 6.5 },
  "kids-dal-rice": { name: "Dal e Riso per Bambini", description: "Confortanti lenticchie gialle con morbido riso basmati.", price: 7.5 },
};
