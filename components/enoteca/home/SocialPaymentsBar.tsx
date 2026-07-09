import { SHOP_INFO } from "@/lib/constants";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "../Icons";

/** Section 11 — social icons · "bevi responsabile" · payment methods. */

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A2.5 2.5 0 112.5 6 2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3zM9.5 8.98h3.8v1.64h.05a4.17 4.17 0 013.75-2c4 0 4.75 2.64 4.75 6.08v6.28h-4v-5.57c0-1.33 0-3-1.85-3s-2.13 1.44-2.13 2.92v5.68h-4z" />
    </svg>
  );
}

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: SHOP_INFO.social.facebook },
  { Icon: InstagramIcon, label: "Instagram", href: SHOP_INFO.social.instagram },
  { Icon: TikTokIcon, label: "TikTok", href: SHOP_INFO.social.tiktok },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
];

const PAYMENTS = [
  { label: "PayPal", bg: "#003087" },
  { label: "Amex", bg: "#2E77BC" },
  { label: "Mastercard", bg: "#EB001B" },
  { label: "Visa", bg: "#1A1F71" },
  { label: "PostePay", bg: "#0090D1" },
  { label: "Maestro", bg: "#0099DF" },
];

export function SocialPaymentsBar() {
  return (
    <section aria-label="Social e pagamenti" className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-6 py-6 md:flex-row md:justify-between">
        {/* Social */}
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg text-text transition-colors hover:border-primary hover:text-primary-hover"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Slogan */}
        <p className="font-[family-name:var(--font-accent)] text-[18px] italic text-text-muted">
          “bevi responsabile”
        </p>

        {/* Payments */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {PAYMENTS.map((p) => (
            <span
              key={p.label}
              className="inline-flex h-6 min-w-[42px] items-center justify-center rounded px-1.5 text-[9px] font-bold uppercase text-white"
              style={{ backgroundColor: p.bg }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
