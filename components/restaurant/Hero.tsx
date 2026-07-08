"use client";

import Link from "next/link";
import { TopDishes } from "./TopDishes";
import { HeroCTAs } from "./HeroCTAs";
import { ArrowRight } from "./Icons";
import { useContent } from "./ContentContext";


/** Compact hero: "loved by our guests" line, four dish photos, ordering CTAs. */
export function Hero() {
  const { t } = useContent();
  return (
    <section className="bg-[#FFF8F0]">
      <div className="mx-auto max-w-6xl px-5 pb-3 pt-4 sm:px-8 sm:pb-4 sm:pt-6">
        <p className="text-center font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#5A4F47] sm:text-[20px]">
          {t.lovedByGuests}
        </p>

        <div className="mt-2">
          <TopDishes />
        </div>

        <div className="mt-2 text-center">
          <Link
            href={`/#order`}
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#C7401A] transition-colors hover:text-[#A5330F]"
          >
            {t.viewFullMenu}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-3.5 sm:mt-4">
          <HeroCTAs />
        </div>
      </div>
    </section>
  );
}
