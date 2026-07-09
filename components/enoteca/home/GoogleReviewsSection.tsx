import { GoogleStars, GoogleLogo } from "../GoogleReviews";

/**
 * Section 5 — Google Reviews strip (replaces the former Trustpilot section).
 * NOTE: the reviews below are FICTIONAL sample content ("recensioni di
 * esempio") for the placeholder build; the review count is a placeholder to be
 * swapped for the shop's real Google Business Profile figure at launch.
 */
const REVIEWS = [
  {
    name: "Marco R.",
    when: "2 settimane fa",
    text: "Selezione di vini straordinaria e personale competentissimo. Mi hanno consigliato un Barolo perfetto per la cena.",
  },
  {
    name: "Giulia S.",
    when: "1 mese fa",
    text: "Consegna a domicilio rapidissima e bottiglie imballate con cura. Ormai il mio punto di riferimento a Roma.",
  },
  {
    name: "Alessandro T.",
    when: "1 mese fa",
    text: "Che competenza! Mi hanno guidato tra bollicine e distillati con passione. Prezzi onesti e qualità altissima.",
  },
  {
    name: "Francesca M.",
    when: "2 mesi fa",
    text: "Servizio impeccabile e ottima consulenza via WhatsApp. Ho trovato etichette introvabili altrove. Consigliatissimo.",
  },
];

export function GoogleReviewsSection() {
  return (
    <section aria-label="Recensioni Google" className="bg-surface">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-6 py-12 md:py-16 lg:grid-cols-[280px_1fr]">
        {/* Summary card */}
        <div className="rounded-lg border border-border bg-bg p-6 text-center shadow-card">
          <div className="flex items-center justify-center gap-2">
            <GoogleStars size={22} />
            <span className="text-[20px] font-bold text-text">5.0</span>
          </div>
          <p className="mt-3 text-[15px] font-semibold text-text">Recensioni Google</p>
          <p className="mt-1 text-[13px] text-text-muted">
            Sulla base di [placeholder] recensioni verificate
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <GoogleLogo size={18} />
            <span className="text-[13px] font-semibold text-text-muted">Google</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-lg border border-border bg-bg p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <GoogleStars size={16} gap={2} />
                <GoogleLogo size={16} />
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-sm bg-surface px-1.5 py-0.5 text-[10px] font-bold text-text-muted">
                  Recensione Google
                </span>
              </div>
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-text-muted">
                {r.text}
              </p>
              <p className="mt-auto pt-3 text-[12px] text-text-muted">
                <span className="font-semibold text-text">{r.name}</span> · {r.when}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
