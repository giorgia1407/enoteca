/**
 * Il Tempio di Vino — inline SVG icons (no icon library; all currentColor,
 * so every icon inherits its text colour and the bundle stays lean).
 */

interface IconProps {
  className?: string;
}

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Star({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.25l2.955 5.988 6.61.96-4.783 4.662 1.129 6.585L12 17.347l-5.911 3.098 1.129-6.585L2.435 9.198l6.61-.96L12 2.25z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.4} aria-hidden="true" className={className}>
      <path d="M4 12.5l5 5 11-11" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden="true" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden="true" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M4 5c0 8.3 6.7 15 15 15 1 0 1.5-.9 1.2-1.8l-.9-2.6a1.5 1.5 0 00-1.7-1l-2.3.5-3.9-3.9.5-2.3a1.5 1.5 0 00-1-1.7l-2.6-.9C6.9 4.5 6 5 6 6z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 21s-7.5-4.9-10.1-9.2C.3 9 1 5.8 3.6 4.6c1.9-.9 4.2-.3 5.4 1.3L12 9l3-3.1c1.2-1.6 3.5-2.2 5.4-1.3 2.6 1.2 3.3 4.4 1.7 7.2C19.5 16.1 12 21 12 21z" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" />
    </svg>
  );
}

export function SlidersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  );
}

/** Clinking glasses — "vast selection" advantage icon. */
export function CheersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M8 3l2.5 6c.6 1.4-.1 3-1.5 3.6l-.5.2M8 3l-3 1.2 2.5 6M8 21l1.5-8.6M5.5 21h5" />
      <path d="M16 3l-2.5 6c-.6 1.4.1 3 1.5 3.6l.5.2M16 3l3 1.2-2.5 6M16 21l-1.5-8.6M13.5 21h5" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M2 9h20M12 9v11M12 9S9 3 6.5 4.5 9 9 12 9zM12 9s3-6 5.5-4.5S15 9 12 9z" />
    </svg>
  );
}

export function AwardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5L8 22l4-2 4 2-1-7.5" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}

export function GrapeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M12 8V4m0 0c1 0 3-.5 4-2" />
      <circle cx="12" cy="10.5" r="2.2" />
      <circle cx="8.5" cy="13.5" r="2.2" />
      <circle cx="15.5" cy="13.5" r="2.2" />
      <circle cx="10.2" cy="17.5" r="2.2" />
      <circle cx="13.8" cy="17.5" r="2.2" />
    </svg>
  );
}

export function BottleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M10 2h4v3l1 2c.6 1.2 1 2.5 1 4v10a1 1 0 01-1 1H9a1 1 0 01-1-1V11c0-1.5.4-2.8 1-4l1-2z" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

export function WineGlassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M7 3h10l-.7 6a4.3 4.3 0 01-8.6 0zM12 15v5M8.5 21h7" />
    </svg>
  );
}

export function ThermometerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <path d="M14 14.5V5a2 2 0 10-4 0v9.5a4 4 0 104 0z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7v3h2.6v8z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.5c-1.3.1-2.5-.3-3.8-1v5.9c0 3.6-2.6 5.8-5.7 5.8-2.9 0-5.3-2-5.3-5 0-3.2 2.6-5.1 5.6-4.8v2.6c-.4-.1-.9-.2-1.3-.2-1.3 0-2.3.9-2.3 2.2 0 1.4 1 2.3 2.3 2.3 1.5 0 2.5-1.1 2.5-2.8V3z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 01-1.44-5.01c0-5.2 4.24-9.44 9.46-9.44 2.53 0 4.9.99 6.68 2.78a9.36 9.36 0 012.76 6.67c0 5.2-4.24 9.44-9.43 9.44zM20.4 3.6A11.3 11.3 0 0012.05.12C5.8.12.72 5.2.72 11.44c0 2 .52 3.95 1.52 5.67L.62 23.1l6.13-1.6a11.32 11.32 0 005.29 1.35h.01c6.24 0 11.32-5.08 11.33-11.32a11.26 11.26 0 00-2.98-7.93z" />
    </svg>
  );
}
