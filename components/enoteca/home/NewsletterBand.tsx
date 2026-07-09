"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

/** Section 12 — full-width black newsletter band. */
export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend in the placeholder build — acknowledge locally.
    setDone(true);
    setEmail("");
    window.setTimeout(() => setDone(false), 3000);
  };

  return (
    <section aria-label="Newsletter" className="bg-text">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:py-12">
        <div className="flex flex-col items-center gap-3 md:items-start">
          {/* White override of the brand lockup for the dark band. */}
          <BrandLogo size="sm" variant="full" color="#ffffff" />
          <h2 className="max-w-md text-center font-[family-name:var(--font-heading)] text-[22px] font-bold uppercase leading-tight text-white md:text-left md:text-[24px]">
            Iscriviti e ricevi offerte in esclusiva
          </h2>
        </div>
        <form onSubmit={submit} className="relative w-full max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Il tuo indirizzo e-mail"
            aria-label="Il tuo indirizzo e-mail"
            className="h-12 w-full rounded-full border border-white/20 bg-surface pl-5 pr-14 text-[15px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Iscriviti"
            className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-text transition-colors hover:bg-primary-hover"
          >
            {done ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <ArrowRight className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </form>
      </div>
    </section>
  );
}
