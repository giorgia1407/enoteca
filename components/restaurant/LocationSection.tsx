"use client";

import { useContent } from "./ContentContext";
import { PinIcon, PhoneIcon, ArrowRight } from "./Icons";

const TODAY_INDEX = 2; // Highlight a representative open weekday in the demo.

/**
 * Location + hours. Uses a self-contained stylized map (CSS, no external tile
 * service) for guaranteed reliability, with a real Get Directions deep-link.
 */
export function LocationSection() {
  const { r, t } = useContent();
  return (
    <section id="location" className="scroll-mt-20 bg-[#2A2420] text-[#FFF8F0]">
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
        {/* Stylized map */}
        <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#3A4A3C]">
          {/* street grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,248,240,0.18) 2px, transparent 2px), linear-gradient(90deg, rgba(255,248,240,0.18) 2px, transparent 2px)",
              backgroundSize: "56px 56px",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute left-0 right-0 top-1/2 h-4 -translate-y-1/2 bg-[#FFF8F0]/15"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/3 top-0 w-4 bg-[#FFF8F0]/15"
            aria-hidden="true"
          />
          {/* pin */}
          <div className="absolute left-1/3 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C7401A] text-white shadow-lg ring-4 ring-[#C7401A]/30">
              <PinIcon className="h-6 w-6" />
            </span>
            <span className="mt-1 rounded-full bg-[#2A2420] px-2.5 py-1 text-[11px] font-bold text-[#FFF8F0]">
              {r.ampBefore} &amp; {r.ampAfter}
            </span>
          </div>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/30 px-2 py-1 text-[10px] text-white/70">
            {r.mapLabel}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="font-[family-name:var(--font-curry-accent)] text-[18px] italic text-[#E8A548]">
            {t.locationEyebrow}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-curry-display)] text-[32px] font-bold sm:text-[40px]">
            {t.locationHeading}
          </h2>

          <div className="mt-5 flex items-start gap-3 text-[15px]">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A548]" />
            <p className="text-[#E5D9CB]">
              {r.addressLines[0]}
              <br />
              {r.addressLines[1]}
            </p>
          </div>
          <a
            href={r.phoneHref}
            className="mt-3 flex items-center gap-3 text-[15px] text-[#E5D9CB] transition-colors hover:text-white"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-[#E8A548]" />
            {r.phone}
          </a>

          {/* Hours */}
          <div className="mt-6">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#E8A548]">
              {t.hoursLabel}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {r.hours.map((day, i) => (
                <li
                  key={day.day}
                  className={`flex justify-between border-b border-white/5 pb-1.5 text-[14.5px] ${
                    i === TODAY_INDEX ? "font-semibold text-white" : "text-[#C9BCAD]"
                  }`}
                >
                  <span>{day.day}</span>
                  <span>{day.hours ?? t.closedLabel}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={r.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#C7401A] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
          >
            {t.getDirections}
            <ArrowRight className="h-4 w-4" />
          </a>

          <p className="mt-5 text-[13px] leading-relaxed text-[#9C8F84]">
            <span className="font-semibold text-[#C9BCAD]">{t.gettingHere}</span>{" "}
            {r.transit.join(" ")}
          </p>
        </div>
      </div>
    </section>
  );
}
