"use client";

/**
 * Curry & Spice — immersive brand shell.
 *
 * Announcement bar → refined nav with a full-width MENUS mega-menu and ORDER /
 * ABOUT dropdowns (La Brochette-style) → page → footer. It owns the full page chrome — nav and footer.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { BellaAssistant } from "./BellaAssistant";
import { OrderModePicker } from "./OrderModePicker";
import { BagIcon, CloseIcon, ChevronDown } from "./Icons";

const BASE = "";

/** Which mega/dropdown is open on desktop. */
type OpenMenu = null | "menus" | "order" | "about";

interface LinkItem {
  label: string;
  href: string;
  desc?: string;
}

/** Mega-menu category layout (3 columns). */
const MEGA_COLUMNS: string[][] = [
  ["appetizers", "small-plates", "breads"],
  ["curries", "biryani-rice", "sides"],
  ["desserts", "drinks", "kids"],
];

function BrandMark({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  const { r } = useContent();
  return (
    <Link href="/" onClick={onClick} className="block leading-none">
      <span
        className={`block font-[family-name:var(--font-curry-display)] font-bold tracking-tight text-[#C7401A] ${
          compact ? "text-[22px]" : "text-[26px]"
        }`}
      >
        {r.ampBefore} <span className="text-[#2A2420]">&amp;</span> {r.ampAfter}
      </span>
      <span className="mt-0.5 block font-[family-name:var(--font-curry-accent)] text-[11px] italic tracking-[0.15em] text-[#8A7D71]">
        {r.cityLabel}
      </span>
    </Link>
  );
}

function CartButton({ onClick }: { onClick?: () => void }) {
  const { count } = useCart();
  return (
    <Link
      href={`/#order`}
      onClick={onClick}
      aria-label={`${count}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D5C3] bg-white text-[#2A2420] transition-colors hover:border-[#C7401A] hover:text-[#C7401A]"
    >
      <BagIcon className="h-5 w-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C7401A] px-1 text-[11px] font-bold text-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

/** Plain top-level nav anchor with the sliding saffron underline. */
function NavItem({
  href,
  label,
  onClick,
  onHover,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  onHover?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onHover}
      className="group relative text-[14px] font-medium text-[#2A2420] transition-colors hover:text-[#C7401A]"
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[#C7401A] transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

/** Dropdown trigger (used for ORDER ▼ and ABOUT ▼). */
function DropdownTrigger({
  label,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      onClick={() => (open ? onClose() : onOpen())}
      className="group relative inline-flex items-center gap-1 text-[14px] font-medium text-[#2A2420] transition-colors hover:text-[#C7401A]"
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[#C7401A] transition-transform duration-300 group-hover:scale-x-100" />
    </button>
  );
}

export function BrandShell({ children }: { children: React.ReactNode }) {
  const { t, categories, itemsByCategory, money } = useContent();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const headerRef = useRef<HTMLElement>(null);

  const orderModes: LinkItem[] = [
    { label: t.orderModeDineIn, href: `${BASE}/reserve`, desc: t.orderModeDineInDesc },
    { label: t.orderModePickup, href: `${BASE}/order?mode=pickup`, desc: t.orderModePickupDesc },
    { label: t.orderModeDelivery, href: `${BASE}/order?mode=delivery`, desc: t.orderModeDeliveryDesc },
  ];
  const aboutLinks: LinkItem[] = [
    { label: t.aboutStory, href: `/#story` },
    { label: t.aboutChef, href: `/#story` },
    { label: t.aboutReviews, href: `${BASE}/review` },
    { label: t.aboutCareers, href: `/#location` },
    { label: t.aboutPress, href: `/#location` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  // Esc closes any open desktop menu.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF8F0] text-[#2A2420] antialiased">
      <AnnouncementBar />

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_4px_20px_rgba(42,36,32,0.08)]"
            : "bg-[#FFF8F0]"
        }`}
        style={{ borderBottom: "1px solid rgba(199,64,26,0.2)" }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8"
        >
          <BrandMark compact />

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex">
            <NavItem href="/" label={t.navHome} onHover={() => setOpenMenu(null)} />

            {/* MENUS mega-menu */}
            <div
              className="static"
              onMouseEnter={() => setOpenMenu("menus")}
            >
              <DropdownTrigger
                label={t.navMenus}
                open={openMenu === "menus"}
                onOpen={() => setOpenMenu("menus")}
                onClose={() => setOpenMenu(null)}
              />
            </div>

            <NavItem href={`${BASE}/reserve`} label={t.navReserve} onHover={() => setOpenMenu(null)} />

            {/* ORDER dropdown */}
            <div className="relative" onMouseEnter={() => setOpenMenu("order")}>
              <DropdownTrigger
                label={t.navOrder}
                open={openMenu === "order"}
                onOpen={() => setOpenMenu("order")}
                onClose={() => setOpenMenu(null)}
              />
              <AnimatePresence>
                {openMenu === "order" && (
                  <SmallDropdown>
                    {orderModes.map((m) => (
                      <Link
                        key={m.label}
                        href={m.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-[#FBE9E1]"
                      >
                        <span className="block text-[14px] font-semibold text-[#2A2420]">{m.label}</span>
                        <span className="block text-[12px] text-[#8A7D71]">{m.desc}</span>
                      </Link>
                    ))}
                  </SmallDropdown>
                )}
              </AnimatePresence>
            </div>

            <NavItem href={`/#newsletter`} label={t.navGiftCards} onHover={() => setOpenMenu(null)} />

            {/* ABOUT dropdown */}
            <div className="relative" onMouseEnter={() => setOpenMenu("about")}>
              <DropdownTrigger
                label={t.navAbout}
                open={openMenu === "about"}
                onOpen={() => setOpenMenu("about")}
                onClose={() => setOpenMenu(null)}
              />
              <AnimatePresence>
                {openMenu === "about" && (
                  <SmallDropdown>
                    {aboutLinks.map((a) => (
                      <Link
                        key={a.label}
                        href={a.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3 py-2 text-[14px] font-medium text-[#2A2420] transition-colors hover:bg-[#FBE9E1]"
                      >
                        {a.label}
                      </Link>
                    ))}
                  </SmallDropdown>
                )}
              </AnimatePresence>
            </div>

            <NavItem href={`/#gallery`} label={t.navGallery} onHover={() => setOpenMenu(null)} />
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href={`${BASE}/reserve`}
              className="hidden rounded-full border-[1.5px] border-[#C7401A] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#C7401A] transition-colors hover:bg-[#C7401A] hover:text-white lg:inline-flex"
            >
              {t.findATable}
            </Link>
            <div className="lg:hidden">
              <CartButton />
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D5C3] text-[#2A2420] lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Full-width MENUS mega-menu */}
        <AnimatePresence>
          {openMenu === "menus" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden border-t border-[#EADFD0] bg-[#FFF8F0] shadow-[0_24px_50px_-20px_rgba(42,36,32,0.35)] lg:block"
            >
              <div className="mx-auto max-w-6xl px-8 py-8">
                <div className="grid grid-cols-3 gap-8">
                  {MEGA_COLUMNS.map((col, ci) => (
                    <div key={ci} className="space-y-6">
                      {col.map((catId) => {
                        const cat = categories.find((c) => c.id === catId);
                        if (!cat) return null;
                        const samples = itemsByCategory(cat.id).slice(0, 3);
                        return (
                          <div key={cat.id} className="rounded-xl p-2 transition-colors hover:bg-[#FBE9E1]/50">
                            <Link
                              href={`/#cat-${cat.id}`}
                              onClick={() => setOpenMenu(null)}
                              className="font-[family-name:var(--font-curry-display)] text-[18px] font-bold text-[#C7401A]"
                            >
                              {cat.label}
                            </Link>
                            <ul className="mt-1.5 space-y-1">
                              {samples.map((item) => (
                                <li key={item.id} className="flex justify-between gap-3 text-[13px] text-[#5A4F47]">
                                  <span className="truncate">{item.name}</span>
                                  <span className="shrink-0 font-semibold text-[#8A7D71]">{money(item.price)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end border-t border-[#EADFD0] pt-4">
                  <Link
                    href={`/#order`}
                    onClick={() => setOpenMenu(null)}
                    className="text-[14px] font-semibold text-[#C7401A] transition-colors hover:text-[#A5330F]"
                  >
                    {t.viewFullMenu} →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && <MobileDrawer onClose={closeDrawer} orderModes={orderModes} aboutLinks={aboutLinks} />}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <Footer />

      {/* Site-wide overlays (rendered once, controlled via UIContext) */}
      <OrderModePicker />
      <BellaAssistant />
    </div>
  );
}

/** Small anchored dropdown panel for ORDER / ABOUT. */
function SmallDropdown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="absolute left-1/2 top-full z-50 mt-3 min-w-[240px] -translate-x-1/2 rounded-2xl border border-[#EADFD0] bg-white p-2 shadow-[0_20px_50px_-16px_rgba(42,36,32,0.3)]"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile drawer                                                       */
/* ------------------------------------------------------------------ */

function MobileDrawer({
  onClose,
  orderModes,
  aboutLinks,
}: {
  onClose: () => void;
  orderModes: LinkItem[];
  aboutLinks: LinkItem[];
}) {
  const { t, categories, itemsByCategory } = useContent();
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (k: string) => setExpanded((e) => (e === k ? null : k));

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col bg-[#FFF8F0] lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E4D5C3] px-5">
        <BrandMark compact onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D5C3] text-[#2A2420]"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <DrawerLink href="/" label={t.navHome} onClose={onClose} />

        {/* Menus (expandable → all 9 categories) */}
        <DrawerExpandable
          label={t.navMenus}
          open={expanded === "menus"}
          onToggle={() => toggle("menus")}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/#cat-${cat.id}`}
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-[15px] font-medium text-[#5A4F47] transition-colors hover:bg-[#FBE9E1]"
            >
              {cat.label}
              <span className="text-[12px] text-[#B4A798]">{itemsByCategory(cat.id).length}</span>
            </Link>
          ))}
        </DrawerExpandable>

        <DrawerLink href={`${BASE}/reserve`} label={t.navReserve} onClose={onClose} />

        {/* Order (expandable → 3 modes) */}
        <DrawerExpandable label={t.navOrder} open={expanded === "order"} onToggle={() => toggle("order")}>
          {orderModes.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-2 text-[15px] font-medium text-[#5A4F47] transition-colors hover:bg-[#FBE9E1]"
            >
              {m.label}
            </Link>
          ))}
        </DrawerExpandable>

        <DrawerLink href={`/#newsletter`} label={t.navGiftCards} onClose={onClose} />

        {/* About (expandable) */}
        <DrawerExpandable label={t.navAbout} open={expanded === "about"} onToggle={() => toggle("about")}>
          {aboutLinks.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-2 text-[15px] font-medium text-[#5A4F47] transition-colors hover:bg-[#FBE9E1]"
            >
              {a.label}
            </Link>
          ))}
        </DrawerExpandable>

        <DrawerLink href={`/#gallery`} label={t.navGallery} onClose={onClose} />
      </div>

      <div className="shrink-0 border-t border-[#E4D5C3] px-6 py-6">
        <Link
          href={`${BASE}/reserve`}
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-[#4A6B4E] px-5 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-white"
        >
          {t.findATable}
        </Link>
      </div>
    </motion.div>
  );
}

function DrawerLink({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block border-b border-[#EADFD0] py-3.5 font-[family-name:var(--font-curry-display)] text-[22px] font-bold text-[#2A2420]"
    >
      {label}
    </Link>
  );
}

function DrawerExpandable({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#EADFD0]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 font-[family-name:var(--font-curry-display)] text-[22px] font-bold text-[#2A2420]"
      >
        {label}
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className="accordion-grid" data-open={open}>
        <div className="accordion-inner">
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
