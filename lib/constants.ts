/**
 * Single source of truth for the restaurant's contact details and the
 * WhatsApp CTA. Rebranding for a new client? Change the values here and the
 * WhatsApp link, address and phone update everywhere on the site.
 *
 * (Longer-form brand copy — hero lines, section headings, menu — lives in
 * `components/restaurant/data/`.)
 */

export const RESTAURANT_INFO = {
  name: "Curry & Spice",
  address: "Via del Corso 187, 00186 Roma",
  phone: "+39 06 6788 2500",
  email: "ciao@curryespice.it",
  whatsapp: {
    phone: "393493262657",
    message: "Ciao Curry & Spice! Vorrei informazioni su...",
  },
} as const;

/** Ready-to-use WhatsApp deep link with the pre-filled Italian message. */
export function getWhatsAppUrl(): string {
  const { phone, message } = RESTAURANT_INFO.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
