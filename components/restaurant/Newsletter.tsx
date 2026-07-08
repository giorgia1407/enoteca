"use client";

import { useState } from "react";
import { useContent } from "./ContentContext";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  CheckIcon,
} from "./Icons";

/** Newsletter CTA + social links (demo — no real submission). */
export function Newsletter() {
  const { r, t } = useContent();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 className="font-[family-name:var(--font-curry-display)] text-[30px] font-bold text-[#2A2420] sm:text-[36px]">
        {t.newsletterHeading}
      </h2>
      <p className="mx-auto mt-2 max-w-md font-[family-name:var(--font-curry-accent)] text-[19px] italic text-[#8A7D71]">
        {t.newsletterSub}
      </p>

      {done ? (
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#E6EFE3] px-5 py-3 text-[15px] font-semibold text-[#3B5A3F]">
          <CheckIcon className="h-5 w-5" />
          {t.newsletterDone}
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="curry-newsletter" className="sr-only">
            {t.newsletterPlaceholder}
          </label>
          <input
            id="curry-newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletterPlaceholder}
            className="flex-1 rounded-full border border-[#E4D5C3] bg-white px-5 py-3.5 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#C7401A] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
          >
            {t.subscribe}
          </button>
        </form>
      )}

      <div className="mt-8">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8A7D71]">
          {t.followUs}
        </p>
        <div className="mt-3 flex justify-center gap-3">
          <SocialButton href={r.social.instagram} label="Instagram">
            <InstagramIcon className="h-5 w-5" />
          </SocialButton>
          <SocialButton href={r.social.facebook} label="Facebook">
            <FacebookIcon className="h-5 w-5" />
          </SocialButton>
          <SocialButton href={r.social.tiktok} label="TikTok">
            <TikTokIcon className="h-5 w-5" />
          </SocialButton>
        </div>
      </div>
    </section>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D5C3] bg-white text-[#5A4F47] transition-colors hover:border-[#C7401A] hover:text-[#C7401A]"
    >
      {children}
    </a>
  );
}
