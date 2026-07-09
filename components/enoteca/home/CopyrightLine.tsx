import { BrandLogo } from "@/components/BrandLogo";

/** Section 14 — tiny centered copyright line with the amphora brand mark. */
export function CopyrightLine() {
  return (
    <div className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-2 px-6 py-5">
        <BrandLogo size="sm" variant="icon-only" />
        <p className="text-center text-[11px] text-text-muted">
          {/* TODO: replace [placeholder] with the client's real P.IVA before launch. */}
          ©2026 Il Tempio di Vino · P.IVA [placeholder] · Tutti i diritti riservati.
        </p>
      </div>
    </div>
  );
}
