import Link from "next/link";
import { ATMOSPHERE } from "@/data/productData";
import { BottleImage } from "../BottleImage";

/** Section 9 — 3 large editorial photo tiles with italic serif titles. */
const TILES = [
  {
    title: "I Nostri Store",
    copy: "Vieni a trovarci in enoteca: scaffali curati, consigli su misura e una cantina sempre in evoluzione.",
    image: ATMOSPHERE.shelf,
    href: "/#store",
    alt: "Scaffali di bottiglie in enoteca",
  },
  {
    title: "Eventi in Cantina",
    copy: "Degustazioni guidate, serate a tema e incontri con i produttori. Il vino diventa esperienza.",
    image: ATMOSPHERE.tasting,
    href: "/#store",
    alt: "Degustazione di vino con taglieri",
  },
  {
    title: "Distillati",
    copy: "Grappe, whisky, rum e cognac d'autore: una selezione da meditazione per intenditori.",
    image: ATMOSPHERE.amber,
    href: "/categoria/distillati",
    alt: "Bicchiere di distillato ambrato",
  },
];

export function EditorialTriptych() {
  return (
    <section aria-label="Editoriale" className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.title} href={t.href} className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <BottleImage
                src={t.image}
                alt={t.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,26,0.6),transparent_55%)]" />
              <h3 className="absolute bottom-4 left-4 font-[family-name:var(--font-display)] text-[24px] font-bold italic text-white">
                {t.title}
              </h3>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{t.copy}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
