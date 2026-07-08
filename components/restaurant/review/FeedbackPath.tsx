"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";
import { SpinnerIcon } from "../Icons";
import { saveSubmission, type ReviewSubmission } from "./ReviewData";
import { reviewCopy } from "./curryReviewContent";

/** 1–4 star flow (simplified): a heading + private textarea + submit. */
export function FeedbackPath({
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const copy = reviewCopy("it");

  const submit = () => {
    if (!message.trim()) {
      setError(copy.feedbackErrorEmpty);
      return;
    }
    setSubmitting(true);
    const data: ReviewSubmission = {
      rating,
      path: "feedback",
      message: message.trim(),
      email: email || undefined,
      phone: phone || undefined,
      at: new Date().toISOString(),
    };
    window.setTimeout(() => {
      saveSubmission(data);
      setSubmitting(false);
      onDone();
    }, 1500);
  };

  return (
    <ReviewCard>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6">
        <h1 className="text-center font-[family-name:var(--font-curry-display)] text-[26px] font-bold leading-tight text-[#2A2420] sm:text-[28px]">
          {copy.feedbackTitle}
        </h1>
        <p className="mt-1.5 text-center font-[family-name:var(--font-curry-accent)] text-[15px] italic text-[#8A7D71]">
          {copy.feedbackSubtitle}
        </p>

        <label htmlFor="fb-message" className="sr-only">
          {copy.tellUsLabel}
        </label>
        <textarea
          id="fb-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          placeholder={copy.tellUsPlaceholder}
          aria-invalid={error ? true : undefined}
          className={`mt-5 min-h-[160px] w-full resize-y rounded-xl border bg-[#FFFCF8] p-4 text-[14px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A] focus:ring-2 focus:ring-[#C7401A]/20 ${
            error ? "border-[#C7401A]" : "border-[#2A2420]/15"
          }`}
        />
        {error && <p className="mt-1 text-[12px] font-medium text-[#C7401A]">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full text-[16px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(199,64,26,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          style={{ backgroundImage: "linear-gradient(135deg, #C7401A 0%, #E8A548 130%)" }}
        >
          {submitting ? (<><SpinnerIcon className="h-5 w-5 animate-spin" /> {copy.submitting}</>) : copy.submit}
        </button>
        <p className="mt-2.5 text-center text-[11px] text-[#8A7D71]">{copy.privateNote}</p>
      </motion.div>
    </ReviewCard>
  );
}
