"use client";

import { useContent } from "./ContentContext";
import { PinIcon, LeafIcon, PhoneIcon, MailIcon } from "./Icons";

/**
 * Thin hospitality-style announcement bar above the nav (charcoal / cream).
 * Desktop: a single spaced row. Mobile: a seamless, pure-CSS rotating fade.
 * Driven by the content layer.
 */
export function AnnouncementBar() {
  const { r, t } = useContent();

  const items: { icon: React.ReactNode; text: string; href?: string }[] = [
    { icon: <PinIcon className="h-3.5 w-3.5" />, text: r.fullAddress },
    { icon: <LeafIcon className="h-3.5 w-3.5" />, text: t.annVegan },
    { icon: <PhoneIcon className="h-3.5 w-3.5" />, text: r.phone, href: r.phoneHref },
    { icon: <MailIcon className="h-3.5 w-3.5" />, text: r.email, href: r.emailHref },
  ];

  return (
    <div className="bg-[#2A2420] text-[#E5D9CB]">
      {/* Desktop: single spaced row */}
      <div className="mx-auto hidden h-9 max-w-6xl items-center justify-between px-6 text-[12px] font-medium md:flex">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>

      {/* Mobile: pure-CSS rotating fade */}
      <div className="relative h-8 md:hidden" aria-live="off">
        {items.map((item, i) => (
          <div
            key={i}
            className="curry-rotate-item absolute inset-0 flex items-center justify-center text-[11px] font-medium"
            style={{ animationDelay: `${i * 4}s` }}
          >
            <Item {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Item({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const inner = (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-[#E8A548]" aria-hidden="true">
        {icon}
      </span>
      {text}
    </span>
  );
  return href ? (
    <a href={href} className="transition-colors hover:text-white">
      {inner}
    </a>
  ) : (
    inner
  );
}
