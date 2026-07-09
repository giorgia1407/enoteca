"use client";

import { useState } from "react";
import Link from "next/link";
import type { Wine, CategoryMeta, Badge } from "@/data/productData";
import { discountPct } from "@/data/productData";
import { formatEuro, getWhatsAppProductUrl } from "@/lib/constants";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import { useI18n } from "./i18n";
import { BottleImage } from "./BottleImage";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealItem } from "./Reveal";
import {
  PlusIcon,
  MinusIcon,
  CheckIcon,
  WhatsAppIcon,
  ChevronRight,
  ChevronLeft,
  GlobeIcon,
  AwardIcon,
  GrapeIcon,
  ClockIcon,
  ThermometerIcon,
  BottleIcon,
  WineGlassIcon,
} from "./Icons";

const BADGE_STYLES: Record<Badge, string> = {
  "Novità": "bg-wine text-white",
  "Best Seller": "bg-gold text-charcoal",
  "In Offerta": "bg-wine-soft text-white",
  "Biologico": "bg-[#4a6b3f] text-white",
};

type Tab = "tasting" | "pairings" | "tech" | "cellar";

export function ProductView({
  wine,
  category,
  related,
}: {
  wine: Wine;
  category: CategoryMeta;
  related: Wine[];
}) {
  const { t } = useI18n();
  const { addItem, has } = useCart();
  const { openCart } = useUI();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<Tab>("tasting");

  // Small gallery: the bottle shot + the category atmosphere shot.
  const gallery = [wine.image, category.image];
  const [active, setActive] = useState(0);

  const off = discountPct(wine);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(wine.id);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1400);
  };

  const attributes: { icon: React.ReactNode; label: string; value: string }[] = [
    wine.region && { icon: <GlobeIcon className="h-5 w-5" />, label: t("prod.attr.region"), value: wine.region },
    wine.denomination && { icon: <AwardIcon className="h-5 w-5" />, label: t("prod.attr.denomination"), value: wine.denomination },
    wine.grapeVarieties?.length && {
      icon: <GrapeIcon className="h-5 w-5" />,
      label: t("prod.attr.grape"),
      value: wine.grapeVarieties.join(", "),
    },
    wine.vintage && { icon: <ClockIcon className="h-5 w-5" />, label: t("prod.attr.vintage"), value: String(wine.vintage) },
    wine.alcohol && { icon: <ThermometerIcon className="h-5 w-5" />, label: t("prod.attr.alcohol"), value: `${wine.alcohol}% vol` },
    { icon: <BottleIcon className="h-5 w-5" />, label: t("prod.attr.volume"), value: wine.volume },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  const tabs: { key: Tab; label: string }[] = [
    { key: "tasting", label: t("prod.tab.tasting") },
    { key: "pairings", label: t("prod.tab.pairings") },
    { key: "tech", label: t("prod.tab.tech") },
    { key: "cellar", label: t("prod.tab.cellar") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-charcoal-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-wine">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/categoria/${category.slug}`} className="hover:text-wine">{category.label}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-charcoal">{wine.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-cream-deep">
            {off !== null && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-[13px] font-bold text-charcoal shadow-sm">
                -{off}%
              </span>
            )}
            <BottleImage
              src={gallery[active]}
              alt={active === 0 ? (wine.alt || `${wine.name} — ${wine.producer}`) : `${category.label} — ${wine.name}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActive((a) => (a - 1 + gallery.length) % gallery.length)}
                  aria-label="Precedente"
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-wine shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((a) => (a + 1) % gallery.length)}
                  aria-label="Successivo"
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-wine shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Immagine ${i + 1}`}
                  className={`relative h-20 w-16 overflow-hidden rounded-lg border-2 bg-cream-deep transition-colors ${
                    active === i ? "border-wine" : "border-line"
                  }`}
                >
                  <BottleImage src={g} alt="" sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {wine.badges && wine.badges.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {wine.badges.map((b) => (
                <span
                  key={b}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${BADGE_STYLES[b]}`}
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-gold-deep">
            {wine.producer}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-[32px] font-bold leading-tight text-charcoal md:text-[40px]">
            {wine.name}
          </h1>
          {wine.subcategory && (
            <p className="mt-1 text-[15px] text-charcoal-soft">{wine.subcategory}</p>
          )}

          {/* Price */}
          <div className="mt-5 flex items-end gap-3">
            {wine.originalPrice && (
              <span className="text-[18px] text-charcoal-soft line-through">
                {formatEuro(wine.originalPrice)}
              </span>
            )}
            <span className={`text-[36px] font-extrabold leading-none ${off !== null ? "text-wine-soft" : "text-charcoal"}`}>
              {formatEuro(wine.price)}
            </span>
            <span className="mb-1 text-[14px] text-charcoal-soft">{t("prod.perPiece")}</span>
          </div>
          <p className={`mt-2 text-[13px] font-semibold ${wine.inStock ? "text-[#4a6b3f]" : "text-wine-soft"}`}>
            {wine.inStock ? `● ${t("prod.inStock")}` : `● ${t("prod.outOfStock")}`}
          </p>

          {/* Quantity + CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-line bg-white">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="-"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-charcoal transition-colors hover:text-wine"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-[32px] text-center text-[16px] font-bold text-charcoal">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="+"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-charcoal transition-colors hover:text-wine"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 text-[15px] font-bold uppercase tracking-wide text-charcoal shadow-gold-cta transition-colors hover:bg-gold-deep hover:text-white"
            >
              {added || has(wine.id) ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
              {added ? t("btn.added") : t("btn.addToCart")}
            </button>
          </div>

          <a
            href={getWhatsAppProductUrl(wine.name, wine.vintage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#128C4A]"
          >
            <WhatsAppIcon className="h-5 w-5" /> {t("btn.orderWhatsapp")}
          </a>

          {/* Attributes */}
          <dl className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
            {attributes.map((a) => (
              <div key={a.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-wine">
                  {a.icon}
                </span>
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-soft">
                    {a.label}
                  </dt>
                  <dd className="truncate text-[14px] font-medium text-charcoal">{a.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="curry-no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={`shrink-0 border-b-2 px-4 py-3 text-[14px] font-semibold transition-colors ${
                tab === tb.key
                  ? "border-wine text-wine"
                  : "border-transparent text-charcoal-soft hover:text-charcoal"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="py-6 text-[15.5px] leading-relaxed text-charcoal/90">
          {tab === "tasting" && <p className="max-w-3xl">{wine.tastingNotes}</p>}
          {tab === "pairings" && (
            <ul className="flex flex-wrap gap-2">
              {wine.foodPairings.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-charcoal"
                >
                  <WineGlassIcon className="h-4 w-4 text-wine" /> {p}
                </li>
              ))}
            </ul>
          )}
          {tab === "tech" && (
            <dl className="max-w-lg divide-y divide-line rounded-2xl border border-line bg-white">
              {[
                [t("prod.attr.category"), category.label],
                wine.subcategory ? [t("facet.type"), wine.subcategory] : null,
                wine.region ? [t("prod.attr.region"), wine.region] : null,
                wine.denomination ? [t("prod.attr.denomination"), wine.denomination] : null,
                wine.grapeVarieties?.length ? [t("prod.attr.grape"), wine.grapeVarieties.join(", ")] : null,
                wine.vintage ? [t("prod.attr.vintage"), String(wine.vintage)] : null,
                wine.alcohol ? [t("prod.attr.alcohol"), `${wine.alcohol}% vol`] : null,
                [t("prod.attr.volume"), wine.volume],
                [t("prod.producer"), wine.producer],
              ]
                .filter(Boolean)
                .map((row) => {
                  const [k, v] = row as [string, string];
                  return (
                    <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                      <dt className="text-[13.5px] text-charcoal-soft">{k}</dt>
                      <dd className="text-right text-[13.5px] font-medium text-charcoal">{v}</dd>
                    </div>
                  );
                })}
            </dl>
          )}
          {tab === "cellar" && (
            <div className="max-w-3xl">
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold text-wine">
                {wine.producer}
              </h3>
              <p className="mt-2">{t("prod.cellarText")}</p>
              {wine.awards && wine.awards.length > 0 && (
                <div className="mt-5">
                  <p className="text-[12px] font-bold uppercase tracking-wide text-charcoal-soft">
                    {t("prod.awards")}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {wine.awards.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-[14px] font-medium text-charcoal">
                        <AwardIcon className="h-5 w-5 text-gold-deep" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <SectionHeading title={t("prod.related")} />
          <Reveal className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((w) => (
              <RevealItem key={w.id}>
                <ProductCard wine={w} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      )}
    </div>
  );
}
