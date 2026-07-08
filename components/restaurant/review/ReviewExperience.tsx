"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useContent } from "../ContentContext";
import { reviewCopy } from "./curryReviewContent";
import { ReviewCard } from "./ReviewCard";
import { ContactStep } from "./ContactStep";
import { StarRating } from "./StarRating";
import { PositivePath } from "./PositivePath";
import { FeedbackPath } from "./FeedbackPath";
import { SuccessState } from "./SuccessState";
import type { ReviewPhase, SuccessKind } from "./ReviewData";


/**
 * Standalone QR review experience. Renders its own full-viewport background and
 * a single elevated card — deliberately without the brand shell, nav or the
 * floating Bella/WhatsApp widgets. Branches on the star rating: 5★ → Google,
 * 1–4★ → private feedback to the owner.
 */
export function ReviewExperience() {
  const [phase, setPhase] = useState<ReviewPhase>("contact");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successKind, setSuccessKind] = useState<SuccessKind>("positive");
  const reduce = useReducedMotion();
  const locale: "en" | "it" = "it";
  const copy = reviewCopy(locale);
  const { r } = useContent();

  const handleRate = (n: number) => {
    setRating(n);
    setPhase(n === 5 ? "positive" : "feedback");
  };
  const toSuccess = (kind: SuccessKind) => {
    setSuccessKind(kind);
    setPhase("success");
  };
  const reset = () => {
    setPhase("contact");
    setRating(0);
    setEmail("");
    setPhone("");
  };

  const offset = reduce ? 0 : 24;

  return (
    <main
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-14"
      style={{
        background: "linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 50%, #FFF8F0 100%)",
      }}
    >
      {/* faint saffron glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(232,165,72,0.18) 0%, transparent 70%)" }}
      />

      {/* Back link (demo affordance) */}
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 text-[12px] font-medium text-[#8A7D71] transition-colors hover:text-[#2A2420]"
      >
        {copy.backPrefix}{r.name}
      </Link>

      <div className="relative z-[1] w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -offset }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {phase === "contact" && (
              <ContactStep
                onContinue={(e, p) => {
                  setEmail(e);
                  setPhone(p);
                  setPhase("rate");
                }}
              />
            )}
            {phase === "rate" && (
              <ReviewCard>
                <StarRating onRate={handleRate} />
              </ReviewCard>
            )}
            {phase === "positive" && (
              <PositivePath rating={rating} email={email} phone={phone} onDone={() => toSuccess("positive")} />
            )}
            {phase === "feedback" && (
              <FeedbackPath rating={rating} email={email} phone={phone} onDone={() => toSuccess("feedback")} />
            )}
            {phase === "success" && <SuccessState kind={successKind} onClose={reset} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-[#2A2420] opacity-40">
        {copy.demoMode}
      </p>
    </main>
  );
}
