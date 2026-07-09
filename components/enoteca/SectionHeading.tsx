import Link from "next/link";

/** Shared section heading with optional eyebrow and "view all" link. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  hrefLabel,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:text-left" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto sm:mx-0" : ""}>
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-[28px] font-bold leading-tight text-wine md:text-[34px]">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-[15px] text-charcoal-soft">{subtitle}</p>}
      </div>
      {href && hrefLabel && (
        <Link
          href={href}
          className="shrink-0 text-[14px] font-semibold text-gold-deep transition-colors hover:text-wine"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
