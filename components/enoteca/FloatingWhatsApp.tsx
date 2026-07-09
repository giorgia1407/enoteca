"use client";

import { getWhatsAppUrl } from "@/lib/constants";
import { WhatsAppIcon } from "./Icons";

/**
 * Floating WhatsApp button, bottom-right. Opens the enoteca's WhatsApp with the
 * generic pre-filled message. The gold/green glow respects reduced-motion via
 * globals.css.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ordina via WhatsApp"
      className="enoteca-wa-glow fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 md:h-16 md:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}
