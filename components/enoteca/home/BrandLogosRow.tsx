/**
 * Section 7 — row of fictional cantina "logos" rendered as distinct typographic
 * lockups (the cantine are invented for the placeholder build).
 */
const BRANDS = [
  { name: "Cantina San Vito", font: "var(--font-display)", className: "italic" },
  { name: "Villa Corvara", font: "var(--font-accent)", className: "" },
  { name: "Poderi Antichi", font: "var(--font-display)", className: "uppercase tracking-[0.15em] text-[15px]" },
  { name: "Tenuta Belfiore", font: "var(--font-accent)", className: "italic" },
  { name: "Nusa Reale", font: "var(--font-heading)", className: "uppercase tracking-[0.2em] text-[15px] font-black" },
  { name: "Casa Boccadoro", font: "var(--font-display)", className: "" },
];

export function BrandLogosRow() {
  return (
    <section aria-label="Le nostre cantine" className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6 py-9">
        {BRANDS.map((b) => (
          <div key={b.name} className="flex flex-col items-center gap-1 text-center">
            <span
              className={`text-[20px] font-bold text-text ${b.className}`}
              style={{ fontFamily: b.font }}
            >
              {b.name}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-text-muted">{b.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
