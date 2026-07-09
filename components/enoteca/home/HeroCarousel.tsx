"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ATMOSPHERE } from "@/data/productData";
import { getWhatsAppUrl } from "@/lib/constants";
import { BottleImage } from "../BottleImage";

/**
 * Homepage hero — a full-width, single-image auto slideshow (one photo per
 * slide, NOT a split layout). Each slide fills the frame with `object-cover`,
 * a dark scrim keeps the centred white text legible, and slides crossfade
 * (opacity) rather than sliding horizontally.
 *
 * Behaviour: autoplay 6s, infinite loop, pause on hover (desktop). Respects
 * `prefers-reduced-motion` — autoplay off and the fade becomes a jump-cut.
 */

type SlideCta =
  | { label: string; kind: "scroll"; href: string }
  | { label: string; kind: "link"; href: string }
  | { label: string; kind: "whatsapp"; href: string };

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  sub: string;
  cta: SlideCta;
}

const SLIDES: Slide[] = [
  {
    image: ATMOSPHERE.cellar,
    alt: "Cantina con botti di rovere",
    eyebrow: "ENOTECA ROMA · DAL 2015",
    heading: "Il Tempio di Vino",
    sub: "Vini pregiati, bollicine ricercate, distillati selezionati. Nel cuore di Roma.",
    cta: { label: "SCOPRI LA SELEZIONE", kind: "scroll", href: "#categorie" },
  },
  {
    image: ATMOSPHERE.vineyard,
    alt: "Vigneto al tramonto",
    eyebrow: "SELEZIONE ESCLUSIVA",
    heading: "Le Grandi Etichette Italiane",
    sub: "Dalle colline della Toscana ai vigneti del Piemonte, solo il meglio del territorio.",
    cta: { label: "ESPLORA I VINI", kind: "link", href: "/categoria/vini-rossi" },
  },
  {
    image: ATMOSPHERE.tasting,
    alt: "Degustazione di vino",
    eyebrow: "CONSEGNA A ROMA",
    heading: "A casa tua in giornata",
    sub: "Ordina via WhatsApp e ricevi la tua selezione in poche ore.",
    cta: {
      label: "ORDINA VIA WHATSAPP",
      kind: "whatsapp",
      href: getWhatsAppUrl(
        "Ciao Il Tempio di Vino! Vorrei ordinare una selezione con consegna a Roma.",
      ),
    },
  },
];

const AUTOPLAY_MS = 6000;

/** The gold CTA button — shared shape, three link behaviours. */
function HeroCta({ cta }: { cta: SlideCta }) {
  const cls =
    "inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-text shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-colors hover:bg-primary hover:text-text";

  if (cta.kind === "link") {
    return (
      <Link href={cta.href} className={cls}>
        {cta.label}
      </Link>
    );
  }
  if (cta.kind === "whatsapp") {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {cta.label}
      </a>
    );
  }
  // scroll — smooth-scroll to an on-page section (globals set scroll-behavior).
  return (
    <a href={cta.href} className={cls}>
      {cta.label}
    </a>
  );
}

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section
      aria-label="In evidenza"
      aria-roledescription="carousel"
      className="group relative w-full overflow-hidden bg-text"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="relative h-[340px] w-full md:h-[420px] lg:h-[560px]">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.heading}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* Full-bleed image */}
              <div className="absolute inset-0">
                <BottleImage
                  src={s.image}
                  alt={s.alt}
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
              {/* Dark scrim for legibility */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.55)_100%)]" />

              {/* Centred text — a full-width block (never shrink-to-content, so
                  long Italian lines wrap instead of overflowing at 320px). */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="mx-auto w-full max-w-[800px] text-center">
                  <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/80">
                    {s.eyebrow}
                  </p>
                  <h1
                    className="mt-3 font-[family-name:var(--font-display)] text-[32px] font-semibold leading-[1.15] text-white md:text-[40px] lg:text-[56px]"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                  >
                    {s.heading}
                  </h1>
                  <p className="mx-auto mt-4 max-w-[42ch] text-[16px] font-normal leading-snug text-white/90 md:text-[18px]">
                    {s.sub}
                  </p>
                  <div className="mt-7">
                    <HeroCta cta={s.cta} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows — desktop only, fade in on hover */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Slide precedente"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-text opacity-0 shadow-card transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Slide successiva"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-text opacity-0 shadow-card transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot pagination */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.heading}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Vai alla slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
