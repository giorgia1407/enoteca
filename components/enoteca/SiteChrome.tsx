"use client";

/**
 * Il Tempio di Vino — global site chrome.
 *
 * Desktop (≥768px): a 2-row sticky header —
 *   Row 1 (utility): Google-rating pill · centred BrandLogo · account + cart
 *   Row 2 (main):    "Cliente Business?" pill · category nav · search
 *     Vini / Bollicine / Distillati open a full-width mega-menu on hover
 *     (120ms in / 200ms out); Chi Siamo / Accessori / Contatti are plain links.
 * Mobile (<768px): single row (hamburger · logo · icons) + a left slide-in
 * drawer where each mega category becomes an accordion.
 *
 * This is a specialty wine shop — the beverage-distributor labels (Birre,
 * Acqua/Bibite) were dropped in the client review.
 */

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { User, Search, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { getWinesByCategory, type Wine, type WineCategory } from "@/data/productData";
import { getWhatsAppUrl, formatEuro } from "@/lib/constants";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { GoogleRatingPill } from "./GoogleReviews";
import { BrandLogo } from "@/components/BrandLogo";
import { BottleImage } from "./BottleImage";

/* ---- Nav model ---- */

interface MenuColumn {
  header: string;
  links: { label: string; href: string }[];
}

interface MegaConfig {
  /** Link columns (2–3) rendered left of the "In Evidenza" promo column. */
  columns: MenuColumn[];
  /** Category whose featured bottle fills the "In Evidenza" promo column. */
  featuredCategory: WineCategory;
}

interface NavItem {
  label: string;
  href: string;
  mega?: MegaConfig;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Chi Siamo", href: "/#chi-siamo" },
  {
    label: "Vini",
    href: "/categoria/vini-rossi",
    mega: {
      featuredCategory: "vini-rossi",
      columns: [
        {
          header: "Per Colore",
          links: [
            { label: "Vini Rossi", href: "/categoria/vini-rossi" },
            { label: "Vini Bianchi", href: "/categoria/vini-bianchi" },
            { label: "Rosati", href: "/categoria/rosati" },
            { label: "Vini Dolci", href: "/categoria/vini-dolci" },
          ],
        },
        {
          header: "Per Regione",
          links: [
            { label: "Toscana", href: "/categoria/vini-rossi?regione=Toscana" },
            { label: "Piemonte", href: "/categoria/vini-rossi?regione=Piemonte" },
            { label: "Veneto", href: "/categoria/vini-bianchi?regione=Veneto" },
            { label: "Sicilia", href: "/categoria/vini-rossi?regione=Sicilia" },
            { label: "Puglia", href: "/categoria/vini-rossi?regione=Puglia" },
          ],
        },
        {
          header: "Denominazione",
          links: [
            { label: "DOCG", href: "/categoria/vini-rossi?denominazione=DOCG" },
            { label: "DOC", href: "/categoria/vini-rossi?denominazione=DOC" },
            { label: "IGT", href: "/categoria/vini-rossi?denominazione=IGT" },
          ],
        },
      ],
    },
  },
  {
    label: "Bollicine",
    href: "/categoria/bollicine",
    mega: {
      featuredCategory: "bollicine",
      columns: [
        {
          header: "Tipologia",
          links: [
            { label: "Prosecco", href: "/categoria/bollicine?subcategoria=prosecco" },
            { label: "Champagne", href: "/categoria/bollicine?subcategoria=champagne" },
            { label: "Franciacorta", href: "/categoria/bollicine?subcategoria=franciacorta" },
            { label: "Spumanti Metodo Classico", href: "/categoria/bollicine?subcategoria=metodo-classico" },
            { label: "Trentodoc", href: "/categoria/bollicine?subcategoria=trentodoc" },
          ],
        },
        {
          header: "Occasioni",
          links: [
            { label: "Aperitivo", href: "/categoria/bollicine?occasione=aperitivo" },
            { label: "Regali", href: "/categoria/bollicine?occasione=regali" },
            { label: "Grandi eventi", href: "/categoria/bollicine?occasione=grandi-eventi" },
            { label: "Anniversari", href: "/categoria/bollicine?occasione=anniversari" },
          ],
        },
      ],
    },
  },
  {
    label: "Distillati",
    href: "/categoria/distillati",
    mega: {
      featuredCategory: "distillati",
      columns: [
        {
          header: "Spiriti",
          links: [
            { label: "Whisky", href: "/categoria/distillati?tipo=whisky" },
            { label: "Gin", href: "/categoria/distillati?tipo=gin" },
            { label: "Rum", href: "/categoria/distillati?tipo=rum" },
            { label: "Vodka", href: "/categoria/distillati?tipo=vodka" },
            { label: "Cognac", href: "/categoria/distillati?tipo=cognac" },
          ],
        },
        {
          header: "Italiani",
          links: [
            { label: "Grappa", href: "/categoria/distillati?tipo=grappa" },
            { label: "Amaro", href: "/categoria/distillati?tipo=amaro" },
            { label: "Limoncello", href: "/categoria/distillati?tipo=limoncello" },
            { label: "Sambuca", href: "/categoria/distillati?tipo=sambuca" },
          ],
        },
      ],
    },
  },
  { label: "Accessori", href: "/categoria/accessori" },
  { label: "Contatti", href: "/#contatti" },
];

/** The featured bottle for a mega-menu promo column (first featured, else first). */
function featuredIn(category: WineCategory): Wine | undefined {
  const list = getWinesByCategory(category);
  return list.find((w) => w.featured) ?? list[0];
}

/* ---- Small pieces ---- */

function LogoLink({
  onClick,
  size = "md",
  className = "",
}: {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Link href="/" onClick={onClick} aria-label="Il Tempio di Vino — home" className={className}>
      <BrandLogo size={size} variant="full" />
    </Link>
  );
}

function SearchForm({ onSubmit, className = "" }: { onSubmit?: () => void; className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/cerca?q=${encodeURIComponent(term)}` : "/cerca");
    onSubmit?.();
  };
  return (
    <form onSubmit={submit} className={`relative ${className}`}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca prodotto"
        aria-label="Cerca prodotto"
        className="h-10 w-full rounded-full border border-border bg-surface pl-4 pr-10 text-[14px] text-text placeholder:text-text-muted focus:border-primary focus:bg-bg focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Cerca"
        className="absolute right-1 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:text-primary-hover"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>
    </form>
  );
}

function CartButton({ className = "" }: { className?: string }) {
  const { count } = useCart();
  const { openCart } = useUI();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Carrello (${count} articoli)`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:text-primary-hover ${className}`}
    >
      <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.6} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-text"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function AccountButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Account / assistenza"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:text-primary-hover ${className}`}
    >
      <User className="h-[22px] w-[22px]" strokeWidth={1.6} />
    </a>
  );
}

function BusinessPill({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <a
      href={getWhatsAppUrl(
        "Ciao Il Tempio di Vino! Sono un cliente business e vorrei conoscere le condizioni riservate.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`items-center justify-center rounded-full bg-text px-4 text-[13px] font-semibold text-white transition-colors hover:bg-primary hover:text-text ${className}`}
    >
      Cliente Business?
    </a>
  );
}

/** The "In Evidenza" promo card shared by desktop + mobile mega-menus. */
function FeaturedCard({ wine, onClick }: { wine: Wine; onClick?: () => void }) {
  return (
    <Link
      href={`/prodotto/${wine.slug}`}
      onClick={onClick}
      className="group/feat block rounded-lg border border-border bg-bg p-3 transition-shadow hover:shadow-card"
    >
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">
        In Evidenza
      </p>
      <div className="relative h-[120px] w-full overflow-hidden rounded-md bg-surface">
        <BottleImage src={wine.image} alt={wine.name} sizes="220px" className="object-cover" />
      </div>
      <p className="mt-2 line-clamp-2 text-[13px] font-semibold text-text">{wine.name}</p>
      <p className="mt-0.5 text-[14px] font-bold text-text">{formatEuro(wine.price)}</p>
      <span className="mt-1 inline-block text-[13px] font-semibold text-primary-hover">
        Scopri →
      </span>
    </Link>
  );
}

/* ---- Desktop mega-menu panel ---- */

function MegaPanel({ mega, onNavigate }: { mega: MegaConfig; onNavigate: () => void }) {
  const featured = featuredIn(mega.featuredCategory);
  return (
    <div className="mx-auto max-w-[1280px] px-[60px] py-10">
      <div className="flex gap-10">
        {mega.columns.map((col) => (
          <div key={col.header} className="min-w-0 flex-1">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted">
              {col.header}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="inline-block text-[15px] font-medium text-text transition-all hover:translate-x-1 hover:text-primary-hover"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featured && (
          <div className="w-[220px] shrink-0">
            <FeaturedCard wine={featured} onClick={onNavigate} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Header ---- */

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);

  // These only touch refs + the state setter (both stable), so they memoise
  // with empty deps and stay referentially stable across renders.
  const clearTimers = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);
  const scheduleOpen = useCallback(
    (label: string) => {
      clearTimers();
      openTimer.current = window.setTimeout(() => setOpenLabel(label), 120);
    },
    [clearTimers],
  );
  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), 200);
  }, [clearTimers]);
  const closeNow = useCallback(() => {
    clearTimers();
    setOpenLabel(null);
  }, [clearTimers]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close the mega-menu on ESC. (Route-change close is handled by calling
  // closeNow from every nav/mega link's onClick, which avoids a synchronous
  // setState-in-effect.)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeNow]);

  // Tidy any pending open/close timers on unmount.
  useEffect(() => clearTimers, [clearTimers]);

  const activeItem = NAV_ITEMS.find((n) => n.label === openLabel && n.mega);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text antialiased">
      <header
        className={`sticky top-0 z-50 bg-bg transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_12px_rgba(26,26,26,0.08)]" : ""
        }`}
      >
        {/* Row 1 — utility bar (desktop) */}
        <div className="mx-auto hidden h-12 max-w-[1280px] grid-cols-3 items-center px-6 md:grid">
          <div className="justify-self-start">
            <GoogleRatingPill />
          </div>
          <div className="justify-self-center">
            <LogoLink size="md" />
          </div>
          <div className="flex items-center gap-1 justify-self-end">
            <AccountButton />
            <CartButton />
          </div>
        </div>

        {/* Row 2 — main nav (desktop) */}
        <div
          className="relative hidden border-y border-border md:block"
          onMouseLeave={scheduleClose}
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex h-16 max-w-[1280px] items-center gap-4 px-6"
          >
            <BusinessPill className="hidden h-10 shrink-0 lg:flex" />
            <ul className="flex flex-1 items-center justify-center gap-4 lg:gap-6">
              {NAV_ITEMS.map((item) => {
                const isOpen = openLabel === item.label;
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => (item.mega ? scheduleOpen(item.label) : closeNow())}
                  >
                    <Link
                      href={item.href}
                      onClick={closeNow}
                      aria-haspopup={item.mega ? "true" : undefined}
                      aria-expanded={item.mega ? isOpen : undefined}
                      className="group relative flex items-center gap-1 whitespace-nowrap py-1 text-[13px] font-medium text-text transition-colors hover:text-primary-hover lg:text-[15px]"
                    >
                      {item.label}
                      {item.mega && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                      <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <SearchForm className="hidden w-[240px] shrink-0 lg:block xl:w-[280px]" />
          </nav>

          {/* Full-width mega-menu panel */}
          <AnimatePresence>
            {activeItem?.mega && (
              <motion.div
                key={activeItem.label}
                initial={{ opacity: 0, y: reduce ? 0 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -4 }}
                transition={{ duration: reduce ? 0 : 0.15 }}
                onMouseEnter={clearTimers}
                onMouseLeave={scheduleClose}
                className="absolute left-0 right-0 top-full z-40 border-b border-border bg-bg shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
              >
                <MegaPanel mega={activeItem.mega} onNavigate={closeNow} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile bar */}
        <div className="flex h-16 items-center justify-between px-4 md:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Apri menu"
            aria-expanded={drawerOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text"
          >
            <Menu className="h-6 w-6" />
          </button>
          <LogoLink size="sm" />
          <div className="flex items-center">
            <Link
              href="/cerca"
              aria-label="Cerca"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text"
            >
              <Search className="h-[21px] w-[21px]" strokeWidth={1.7} />
            </Link>
            <AccountButton />
            <CartButton />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && <MobileDrawer onClose={() => setDrawerOpen(false)} />}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <Footer />

      {/* Site-wide overlays */}
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---- Mobile drawer (left slide-in, accordion nav) ---- */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-[rgba(26,26,26,0.4)] md:hidden"
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 z-[70] flex h-[100dvh] w-[86%] max-w-sm flex-col bg-bg md:hidden"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/" onClick={onClose} aria-label="Il Tempio di Vino — home">
            <BrandLogo size="sm" variant="full" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-4">
            <GoogleRatingPill />
          </div>
          <div className="mb-4">
            <SearchForm onSubmit={onClose} className="w-full" />
          </div>

          <nav aria-label="Mobile">
            {NAV_ITEMS.map((item) =>
              item.mega ? (
                <div key={item.label} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen((k) => (k === item.label ? null : item.label))}
                    aria-expanded={open === item.label}
                    className="flex min-h-[52px] w-full items-center justify-between py-3 text-[16px] font-semibold text-text"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform ${open === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className="accordion-grid" data-open={open === item.label}>
                    <div className="accordion-inner">
                      <div className="space-y-4 pb-4">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-[15px] font-semibold text-primary-hover"
                        >
                          Tutti · {item.label}
                        </Link>
                        {item.mega.columns.map((col) => (
                          <div key={col.header}>
                            <p className="px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">
                              {col.header}
                            </p>
                            <div className="mt-1">
                              {col.links.map((l) => (
                                <Link
                                  key={l.href}
                                  href={l.href}
                                  onClick={onClose}
                                  className="block rounded-lg px-3 py-2 text-[15px] text-text-muted transition-colors hover:bg-surface hover:text-text"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <MobileFeatured category={item.mega.featuredCategory} onClose={onClose} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[52px] items-center border-b border-border py-3 text-[16px] font-semibold text-text"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="shrink-0 border-t border-border px-5 py-4">
          <BusinessPill onClick={onClose} className="flex h-12 w-full" />
        </div>
      </motion.div>
    </>
  );
}

/** Featured promo card inside a mobile accordion (null when the category is empty). */
function MobileFeatured({
  category,
  onClose,
}: {
  category: WineCategory;
  onClose: () => void;
}) {
  const featured = featuredIn(category);
  if (!featured) return null;
  return (
    <div className="px-3">
      <FeaturedCard wine={featured} onClick={onClose} />
    </div>
  );
}
