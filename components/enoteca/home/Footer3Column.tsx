import Link from "next/link";
import { SHOP_INFO, getWhatsAppUrl } from "@/lib/constants";

/** Section 13 — 3-column footer (Servizio Clienti / Informazioni / Supporto). */

const INFORMAZIONI = [
  "Chi siamo", "Punti vendita", "La nostra selezione", "Eventi e degustazioni",
  "Idee regalo", "Lavora con noi", "Blog del vino",
];

const SUPPORTO = [
  "Contatti", "Domande Frequenti (FAQ)", "Costi e tempi di spedizione",
  "Condizioni di vendita", "Condizioni di utilizzo del sito",
  "Privacy e Cookies",
];

export function Footer3Column() {
  return (
    <section
      id="contatti"
      aria-label="Footer"
      className="scroll-mt-32 border-t border-border bg-bg"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
        {/* Servizio Clienti */}
        <div>
          <h3 className="text-[15px] font-bold text-text">Servizio Clienti</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
            I nostri operatori sono presenti dal lunedì al sabato, dalle 10:30 alle 20:30.
          </p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-text-muted">
            <li>
              Tel. Negozio:{" "}
              <a href={SHOP_INFO.phoneHref} className="text-text hover:text-primary-hover">
                {SHOP_INFO.phone}
              </a>
            </li>
            {/* TODO: confirm the real shop mailbox with the client before launch. */}
            <li>
              E-mail:{" "}
              <a href={SHOP_INFO.emailHref} className="text-text hover:text-primary-hover">
                {SHOP_INFO.email}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text hover:text-primary-hover"
              >
                {SHOP_INFO.whatsapp.display}
              </a>
            </li>
            <li>Indirizzo: <span className="text-text">{SHOP_INFO.address}</span></li>
            <li>Orari: <span className="text-text">{SHOP_INFO.hours}</span></li>
          </ul>

          {/* Google Maps embed.
           * TODO: replace with real Maps embed URL from Google Maps → Share → Embed a map. */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <iframe
              title="Mappa — Il Tempio di Vino"
              src="https://www.google.com/maps?q=Largo%20Pier%20Francesco%20Scarampi%2018%2C%2000167%20Roma&output=embed"
              width="100%"
              height="180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>

        {/* Informazioni */}
        <div>
          <h3 className="text-[15px] font-bold text-text">Informazioni</h3>
          <ul className="mt-3 space-y-1.5 text-[13px]">
            {INFORMAZIONI.map((l) => (
              <li key={l}>
                <Link href="#" className="text-text-muted transition-colors hover:text-primary-hover">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Supporto clienti */}
        <div>
          <h3 className="text-[15px] font-bold text-text">Supporto clienti</h3>
          <ul className="mt-3 space-y-1.5 text-[13px]">
            {SUPPORTO.map((l) => (
              <li key={l}>
                <Link href="#" className="text-text-muted transition-colors hover:text-primary-hover">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
