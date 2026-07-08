"use client";

import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { MailIcon, PhoneIcon, ArrowRight } from "../Icons";
import { isEmail } from "./ReviewData";
import { reviewCopy } from "./curryReviewContent";

/** Step 1 — capture email/phone (both optional) before the star rating. */
export function ContactStep({
  onContinue,
}: {
  onContinue: (email: string, phone: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const copy = reviewCopy("it");

  const submit = () => {
    if (email.trim() && !isEmail(email)) {
      setError(copy.invalidEmail);
      return;
    }
    onContinue(email.trim(), phone.trim());
  };

  return (
    <ReviewCard>
      <div className="mt-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C7401A]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-curry-display)] text-[24px] font-bold leading-tight text-[#2A2420] sm:text-[30px]">
          {copy.contactTitle}
        </h1>
        <p className="mt-1.5 font-[family-name:var(--font-curry-accent)] text-[18px] italic text-[#8A7D71]">
          {copy.contactSubtitle}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="cc-email" className="mb-1.5 block text-[13px] font-medium text-[#2A2420]">
            {copy.emailLabel} <span className="font-normal text-[#8A7D71]">{copy.optional}</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B4A798]">
              <MailIcon className="h-4 w-4" />
            </span>
            <input
              id="cc-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder={copy.emailPlaceholder}
              aria-invalid={error ? true : undefined}
              className={`h-[52px] w-full rounded-xl border bg-white pl-11 pr-4 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A] ${
                error ? "border-[#C7401A]" : "border-[#2A2420]/15"
              }`}
            />
          </div>
          {error && <p className="mt-1 text-[12px] font-medium text-[#C7401A]">{error}</p>}
        </div>

        <div>
          <label htmlFor="cc-phone" className="mb-1.5 block text-[13px] font-medium text-[#2A2420]">
            {copy.phoneLabel} <span className="font-normal text-[#8A7D71]">{copy.optional}</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B4A798]">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <input
              id="cc-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={copy.phonePlaceholder}
              className="h-[52px] w-full rounded-xl border border-[#2A2420]/15 bg-white pl-11 pr-4 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A]"
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] text-[#8A7D71]">
        {copy.bothOptional}
      </p>

      <button
        type="button"
        onClick={submit}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full text-[16px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(199,64,26,0.6)] transition-transform hover:-translate-y-0.5"
        style={{ backgroundImage: "linear-gradient(135deg, #C7401A 0%, #E8A548 130%)" }}
      >
        {copy.continue} <ArrowRight className="h-4 w-4" />
      </button>
    </ReviewCard>
  );
}
