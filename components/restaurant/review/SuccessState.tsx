"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";
import { Confetti } from "../Confetti";
import { CheckIcon, InstagramIcon } from "../Icons";
import { INSTAGRAM_URL, type SuccessKind } from "./ReviewData";
import { reviewCopy } from "./curryReviewContent";

/** Simplified success screens for both paths, with a subtle Close. */
export function SuccessState({ kind, onClose }: { kind: SuccessKind; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const copy = reviewCopy("it");

  const CloseLink = (
    <button
      type="button"
      onClick={onClose}
      className="mt-6 text-[13px] font-medium text-[#8A7D71] underline underline-offset-4 transition-colors hover:text-[#5A4F47]"
    >
      {copy.close}
    </button>
  );

  if (kind === "positive") {
    return (
      <ReviewCard>
        <div className="relative overflow-hidden">
          {!reduceMotion && <Confetti count={36} />}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative mt-6 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#4A6B4E] text-white">
              <CheckIcon className="h-9 w-9" />
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-curry-display)] text-[26px] font-bold text-[#2A2420]">
              {copy.positiveSuccessTitle}
            </h1>
            <p className="mt-2 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
              {copy.positiveSuccessSubtitle}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#C7401A] hover:text-[#A5330F]"
            >
              <InstagramIcon className="h-4 w-4" /> {copy.instagram}
            </a>
            <div>{CloseLink}</div>
          </motion.div>
        </div>
      </ReviewCard>
    );
  }

  // feedback
  return (
    <ReviewCard>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4A6B4E] text-white">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-curry-display)] text-[26px] font-bold text-[#2A2420]">
          {copy.feedbackSuccessTitle}
        </h1>
        <p className="mt-2 font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#8A7D71]">
          {copy.feedbackSuccessSubtitle}
        </p>
        <p className="mt-1 text-[13px] text-[#8A7D71]">{copy.feedbackSuccessNote}</p>
        <div>{CloseLink}</div>
      </motion.div>
    </ReviewCard>
  );
}
