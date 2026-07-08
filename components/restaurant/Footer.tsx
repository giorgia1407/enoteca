"use client";

import Link from "next/link";
import { useContent } from "./ContentContext";
import { InstagramIcon, FacebookIcon, TikTokIcon, PhoneIcon } from "./Icons";

const BASE = "";

/** Restaurant-specific footer — warm charcoal, immersive, locale-aware. */
export function Footer() {
  const { r, t } = useContent();
  const quickLinks = [
    { label: t.linkMenu, href: `${BASE}/menu` },
    { label: t.navReserve, href: `${BASE}/reserve` },
    { label: t.navOrder, href: `${BASE}/order` },
    { label: t.aboutStory, href: `/#story` },
    { label: t.linkContact, href: `/#location` },
  ];

  return (
    <footer className="bg-[#2A2420] text-[#FFF8F0]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="font-[family-name:var(--font-curry-display)] text-2xl font-bold tracking-tight text-[#FFF8F0]">
              {r.ampBefore} <span className="text-[#E8A548]">&amp;</span> {r.ampAfter}
            </Link>
            <p className="mt-3 font-[family-name:var(--font-curry-accent)] text-[17px] italic text-[#E8A548]">
              {r.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={r.social.instagram} label="Instagram"><InstagramIcon className="h-5 w-5" /></SocialLink>
              <SocialLink href={r.social.facebook} label="Facebook"><FacebookIcon className="h-5 w-5" /></SocialLink>
              <SocialLink href={r.social.tiktok} label="TikTok"><TikTokIcon className="h-5 w-5" /></SocialLink>
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#E8A548]">{t.footerExplore}</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-[#D8CabB] transition-colors hover:text-[#FFF8F0]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#E8A548]">{t.footerVisit}</h3>
            <address className="mt-4 space-y-2.5 text-[15px] not-italic text-[#D8CabB]">
              <p>{r.fullAddress}</p>
              <p>
                <a href={r.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-[#FFF8F0]">
                  <PhoneIcon className="h-4 w-4" />
                  {r.phone}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#E8A548]">{t.footerHours}</h3>
            <ul className="mt-4 space-y-1.5 text-[15px] text-[#D8CabB]">
              {r.hoursSummary.map((line, i) => (
                <li key={i} className={i === r.hoursSummary.length - 1 ? "text-[#9C8F84]" : ""}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <Link href={`${BASE}/review`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#E8A548] transition-colors hover:text-[#FFF8F0]">
            {t.footerReviewCta}
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-[#9C8F84] sm:flex-row sm:items-center sm:justify-between">
          <p>© {2026} {r.name} · {r.addressLines[1]} · {t.footerRights}</p>
          <div className="flex items-center gap-4">
            <span>{t.footerMade}</span>
            <Link href="/" className="text-[#9C8F84] underline decoration-dotted underline-offset-4 transition-colors hover:text-[#D8CabB]">
              {t.footerBack}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#D8CabB] transition-colors hover:border-[#E8A548] hover:text-[#E8A548]">
      {children}
    </a>
  );
}
