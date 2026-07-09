import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { ChevronRight } from "@/components/enoteca/Icons";
import { SHOP_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chi Siamo — Il Tempio di Vino",
  description:
    "Il Tempio di Vino: l'enoteca di fiducia a Roma. Selezione curata di vini, bollicine, distillati e liquori, con consigli su misura.",
  alternates: { canonical: "/chi-siamo" },
};

export const dynamic = "force-static";

export default function ChiSiamoPage() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <nav
          className="flex items-center gap-1.5 text-[12.5px] text-text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary-hover">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text">Chi Siamo</span>
        </nav>

        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-bold text-text md:text-[44px]">
          Chi Siamo
        </h1>
        <p className="mt-2 text-[15px] font-medium text-primary-hover">
          {SHOP_INFO.tagline}
        </p>

        <div className="mt-8 space-y-6 text-[16px] leading-[1.9] text-text md:text-[17px]">
          <p>
            Il Tempio di Vino nasce dalla passione per il buon bere e dal desiderio di
            rendere accessibile a tutti una selezione di qualità. Nella nostra enoteca a
            Roma ogni etichetta è scelta a mano, assaggiata e raccontata: dai rossi
            strutturati ai bianchi profumati, dalle bollicine per il brindisi fino ai
            distillati e ai liquori da fine pasto.
          </p>
          <p>
            Crediamo che dietro ogni bottiglia ci sia una storia — di territorio, di
            famiglie e di lavoro paziente — e il nostro compito è aiutarti a scoprirla.
            Che tu stia cercando il vino giusto per una cena importante, un&rsquo;idea regalo o
            semplicemente la bottiglia da aprire stasera, i nostri consulenti sono qui per
            guidarti senza fretta e senza formalità.
          </p>
          <p>
            Vieni a trovarci in negozio oppure scrivici su WhatsApp: ti aiutiamo a
            scegliere, prepariamo il tuo ordine e lo consegniamo a Roma e provincia.
            Perché il vino, prima ancora che un prodotto, è un piacere da condividere.
          </p>
        </div>

        {/* Quick facts pulled from the single source of truth in lib/constants. */}
        <dl className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-wide text-text-muted">
              Dove siamo
            </dt>
            <dd className="mt-1 text-[15px] text-text">{SHOP_INFO.address}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-wide text-text-muted">
              Orari
            </dt>
            <dd className="mt-1 text-[15px] text-text">{SHOP_INFO.hours}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-wide text-text-muted">
              Telefono
            </dt>
            <dd className="mt-1 text-[15px] text-text">
              <a href={SHOP_INFO.phoneHref} className="hover:text-primary-hover">
                {SHOP_INFO.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-wide text-text-muted">
              Consegna
            </dt>
            <dd className="mt-1 text-[15px] text-text">{SHOP_INFO.deliveryZone}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/categoria/vini-rossi"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-text transition-colors hover:bg-primary-hover"
          >
            Esplora il catalogo
          </Link>
          <Link
            href="/contatti"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border px-7 text-[15px] font-semibold text-text transition-colors hover:border-primary hover:text-primary-hover"
          >
            Contattaci
          </Link>
        </div>
      </div>
    </SiteChrome>
  );
}
