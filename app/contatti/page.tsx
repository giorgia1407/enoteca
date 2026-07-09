import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { ChevronRight } from "@/components/enoteca/Icons";
import { SHOP_INFO, getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contatti — Il Tempio di Vino",
  description:
    "Dove siamo, orari, telefono e WhatsApp de Il Tempio di Vino, la tua enoteca a Roma. Consegna a Roma e provincia.",
  alternates: { canonical: "/contatti" },
};

export const dynamic = "force-static";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Largo%20Pier%20Francesco%20Scarampi%2018%2C%2000167%20Roma%20RM&output=embed";

export default function ContattiPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <nav
          className="flex items-center gap-1.5 text-[12.5px] text-text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary-hover">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text">Contatti</span>
        </nav>

        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-bold text-text md:text-[44px]">
          Contatti
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-text-muted">
          Passa a trovarci in enoteca oppure scrivici: ti aiutiamo a scegliere e
          prepariamo il tuo ordine per la consegna a Roma e provincia.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Details */}
          <div className="space-y-6">
            <ContactRow label="Indirizzo">
              {SHOP_INFO.address}
            </ContactRow>
            <ContactRow label="Orari">{SHOP_INFO.hours}</ContactRow>
            <ContactRow label="Telefono negozio">
              <a href={SHOP_INFO.phoneHref} className="text-text hover:text-primary-hover">
                {SHOP_INFO.phone}
              </a>
            </ContactRow>
            <ContactRow label="E-mail">
              <a href={SHOP_INFO.emailHref} className="text-text hover:text-primary-hover">
                {SHOP_INFO.email}
              </a>
            </ContactRow>
            <ContactRow label="WhatsApp">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text hover:text-primary-hover"
              >
                {SHOP_INFO.whatsapp.display}
              </a>
            </ContactRow>
            <ContactRow label="Consegna">{SHOP_INFO.deliveryZone}</ContactRow>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-text transition-colors hover:bg-primary-hover"
            >
              Scrivici su WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Mappa — Il Tempio di Vino"
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full border-0 md:h-full"
            />
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-[16px] text-text">{children}</p>
    </div>
  );
}
