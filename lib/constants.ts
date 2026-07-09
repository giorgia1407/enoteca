/**
 * Single source of truth for the enoteca's contact details and the WhatsApp
 * order flow (Phase 1 stands in for real checkout). Rebranding for the real
 * client? Change the values here — the WhatsApp link, address, phone, hours
 * and delivery copy update everywhere on the site.
 *
 * Placeholders marked "[Placeholder]" are intended to be grep-replaced with the
 * real client identity later.
 */

export const SHOP_INFO = {
  name: "Il Tempio di Vino",
  tagline: "La tua enoteca di fiducia a Roma",
  address: "Largo Pier Francesco Scarampi, 18, 00167 Roma RM",
  phone: "+39 389 482 3221",
  phoneHref: "tel:+393894823221",
  // TODO: confirm the real shop mailbox with the client before launch.
  email: "info@iltempiodivino.it",
  emailHref: "mailto:info@iltempiodivino.it",
  hours: "Lun-Sab 10:30 - 20:30 · Domenica chiuso",
  deliveryZone: "Roma e provincia · Consegna gratuita sopra €80",
  freeShippingThreshold: 80,
  vatLabel: "P.IVA 00000000000",
  whatsapp: {
    /** REAL number — enoteca order leads route here. */
    phone: "393493262657",
    display: "+39 349 326 2657",
    message: "Ciao Enoteca! Vorrei informazioni su...",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

/** Base WhatsApp deep link with the generic pre-filled Italian message. */
export function getWhatsAppUrl(message?: string): string {
  const text = message ?? SHOP_INFO.whatsapp.message;
  return `https://wa.me/${SHOP_INFO.whatsapp.phone}?text=${encodeURIComponent(text)}`;
}

/** WhatsApp link pre-filled with interest in a single bottle. */
export function getWhatsAppProductUrl(name: string, vintage?: number): string {
  const label = vintage ? `${name} (${vintage})` : name;
  const text = `Ciao Enoteca! Vorrei informazioni su: ${label}`;
  return getWhatsAppUrl(text);
}

export interface WhatsAppOrderLine {
  name: string;
  vintage?: number;
  qty: number;
  price: number;
  lineTotal: number;
}

/** Currency formatter — Italian euro, e.g. "€ 24,90". */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/**
 * Build a multi-line WhatsApp order message from the current cart. Lists every
 * bottle with quantity and line total, the running total, and a free-shipping
 * note. This is the Phase-1 substitute for a real checkout.
 */
export function buildWhatsAppOrder(lines: WhatsAppOrderLine[], total: number): string {
  const header = "Ciao Enoteca! Vorrei ordinare:";
  const body = lines
    .map((l) => {
      const label = l.vintage ? `${l.name} ${l.vintage}` : l.name;
      return `• ${l.qty}× ${label} — ${formatEuro(l.lineTotal)}`;
    })
    .join("\n");
  const totalLine = `\nTotale: ${formatEuro(total)}`;
  const shipping =
    total >= SHOP_INFO.freeShippingThreshold
      ? "Consegna gratuita ✔"
      : `Aggiungi ${formatEuro(SHOP_INFO.freeShippingThreshold - total)} per la consegna gratuita.`;
  const footer =
    "\n\nConfermo nome, indirizzo di consegna a Roma e provincia, e orario preferito. Grazie!";
  return `${header}\n\n${body}${totalLine}\n${shipping}${footer}`;
}

/** Full order WhatsApp deep link. */
export function getWhatsAppOrderUrl(lines: WhatsAppOrderLine[], total: number): string {
  return getWhatsAppUrl(buildWhatsAppOrder(lines, total));
}
