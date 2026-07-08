"use client";

import Image from "next/image";
import Link from "next/link";
import { useUI } from "./UIContext";
import { useContent } from "./ContentContext";
import { BELLA_PORTRAIT_URL } from "./data/bellaPortrait";
import { PhoneIcon } from "./Icons";

const BASE = "";

/**
 * Hero actions: a row of three (Dine In → reserve, Order Online → mode picker,
 * Call & Order → tel) plus a prominent full-width "Chat with Bella" button that
 * positions the AI waiter as the star of the ordering experience.
 */
export function HeroCTAs() {
  const { openOrderPicker, openBella } = useUI();
  const { r, t } = useContent();

  return (
    <div className="mx-auto max-w-3xl">
      {/* Row 1 — three actions */}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:gap-3">
        <Link
          href={`${BASE}/reserve`}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#E4D5C3] bg-white px-6 text-[15px] font-semibold uppercase tracking-wide text-[#2A2420] transition-colors hover:border-[#C7401A] hover:text-[#C7401A] sm:h-14"
        >
          <span aria-hidden="true">🍽️</span> {t.ctaDineIn}
        </Link>

        <button
          type="button"
          onClick={openOrderPicker}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold uppercase tracking-wide text-white shadow-[0_12px_34px_-8px_rgba(199,64,26,0.7)] transition-transform hover:-translate-y-0.5 sm:h-14"
          style={{ backgroundImage: "linear-gradient(135deg, #C7401A 0%, #E8A548 130%)" }}
        >
          <span aria-hidden="true">🛍️</span> {t.ctaOrderOnline}
        </button>

        <div className="group relative flex flex-1">
          <a
            href={r.phoneHref}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#E4D5C3] bg-white px-6 text-[15px] font-semibold uppercase tracking-wide text-[#2A2420] transition-colors hover:border-[#C7401A] hover:text-[#C7401A] sm:h-14"
          >
            <PhoneIcon className="h-4 w-4" /> {t.ctaCallOrder}
          </a>
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#2A2420] px-3 py-1.5 text-[13px] font-semibold text-[#FFF8F0] opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block"
          >
            {r.phone}
          </span>
        </div>
      </div>

      {/* Row 2 — prominent Bella button */}
      <button
        type="button"
        onClick={openBella}
        className="mt-2.5 flex h-[54px] w-full items-center gap-3 rounded-2xl border-2 border-[#C7401A]/40 bg-white px-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#C7401A] hover:shadow-[0_14px_36px_-16px_rgba(199,64,26,0.5)] sm:h-[60px] sm:gap-4 sm:px-5"
      >
        <span className="curry-bella-glow relative block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E8A548]">
          <Image src={BELLA_PORTRAIT_URL} alt="Bella, your AI waiter" fill sizes="40px" className="object-cover" />
        </span>
        <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-[#2A2420] sm:text-[14px]">
          {t.bellaButton}
        </span>
        <span className="shrink-0 text-[20px]" aria-hidden="true">
          🌸
        </span>
      </button>
    </div>
  );
}
