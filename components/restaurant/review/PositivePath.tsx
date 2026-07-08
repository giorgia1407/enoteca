"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";
import { GoogleGIcon, SpinnerIcon } from "../Icons";
import { saveSubmission, type ReviewSubmission } from "./ReviewData";
import { reviewCopy } from "./curryReviewContent";

/** 5-star flow (simplified): a note + textarea + green "share on Google" CTA. */
export function PositivePath({
  rating,
  email,
  phone,
  onDone,
}: {
  rating: number;
  email: string;
  phone: string;
  onDone: () => void;
}) {
  const [text, setText] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const copy = reviewCopy("it");

  const share = () => {
    const data: ReviewSubmission = {
      rating,
      path: "positive",
      message: text.trim() || undefined,
      email: email || undefined,
      phone: phone || undefined,
      at: new Date().toISOString(),
    };
    saveSubmission(data);
    setRedirecting(true);
    window.setTimeout(onDone, 2000);
  };

  if (redirecting) {
    return (
      <ReviewCard>
        <div className="flex flex-col items-center py-10 text-center">
          <SpinnerIcon className="h-9 w-9 animate-spin text-[#4A6B4E]" />
          <p className="mt-4 text-[15px] font-semibold text-[#2A2420]">{copy.redirecting}</p>
          <p className="mt-1 text-[13px] text-[#8A7D71]">{copy.kindness}</p>
        </div>
      </ReviewCard>
    );
  }

  return (
    <ReviewCard>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6">
        <h1 className="text-center font-[family-name:var(--font-curry-display)] text-[26px] font-bold leading-tight text-[#2A2420] sm:text-[28px]">
          {copy.positiveTitle}
        </h1>
        <p className="mt-1.5 text-center font-[family-name:var(--font-curry-accent)] text-[15px] italic text-[#8A7D71]">
          {copy.positiveSubtitle}
        </p>

        <label htmlFor="pos-text" className="sr-only">
          {copy.lovedMost}
        </label>
        <textarea
          id="pos-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={copy.lovedMost}
          className="mt-5 min-h-[160px] w-full resize-y rounded-xl border border-[#2A2420]/15 bg-[#FFFCF8] p-4 text-[14px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A] focus:ring-2 focus:ring-[#C7401A]/20"
        />

        <button
          type="button"
          onClick={share}
          className="mt-4 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#4A6B4E] text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(74,107,78,0.6)] transition-colors hover:bg-[#3B5A3F]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <GoogleGIcon className="h-4 w-4" />
          </span>
          {copy.shareGoogle}
        </button>
      </motion.div>
    </ReviewCard>
  );
}
