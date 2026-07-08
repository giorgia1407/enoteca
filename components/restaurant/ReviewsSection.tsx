"use client";

import { useRef } from "react";
import { REVIEW_SUMMARY, type Review } from "./data/reviewsData";
import { useContent } from "./ContentContext";
import { Star, ChevronLeft, ChevronRight, CheckIcon } from "./Icons";

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${n <= rating ? "text-[#E8A548]" : "text-[#E4D5C3]"}`}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review, verifiedLabel }: { review: Review; verifiedLabel: string }) {
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-[#EADFD0] bg-white p-6 sm:w-[340px]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold text-white"
          style={{ backgroundColor: review.avatar }}
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[15px] font-semibold text-[#2A2420]">
            {review.name}
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6EFE3] px-1.5 py-0.5 text-[10px] font-bold text-[#3B5A3F]">
                <CheckIcon className="h-2.5 w-2.5" /> {verifiedLabel}
              </span>
            )}
          </p>
          <p className="text-[12.5px] text-[#8A7D71]">{review.date}</p>
        </div>
      </div>
      <div className="mt-3">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[#5A4F47]">
        &ldquo;{review.quote}&rdquo;
      </p>
    </article>
  );
}

/** "What Our Kin Are Saying" — aggregate + scrollable review carousel. */
export function ReviewsSection() {
  const { t, reviews } = useContent();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-curry-display)] text-[32px] font-bold text-[#2A2420] sm:text-[40px]">
          {t.reviewsHeading}
        </h2>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-[#EADFD0] bg-white p-7 sm:flex-row sm:gap-10">
        <div className="text-center">
          <p className="font-[family-name:var(--font-curry-display)] text-[56px] font-bold leading-none text-[#2A2420]">
            {REVIEW_SUMMARY.rating}
          </p>
          <div className="mt-2 flex justify-center">
            <Stars rating={5} className="h-5 w-5" />
          </div>
          <p className="mt-1.5 text-[13.5px] text-[#8A7D71]">
            {REVIEW_SUMMARY.count} {t.reviewsCountWord}
          </p>
        </div>
        <div className="w-full flex-1 space-y-1.5">
          {REVIEW_SUMMARY.breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-3 text-[13px] font-semibold text-[#5A4F47]">{row.stars}</span>
              <Star className="h-3.5 w-3.5 text-[#E8A548]" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1E7DA]">
                <div
                  className="h-full rounded-full bg-[#E8A548]"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-[12.5px] text-[#8A7D71]">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-curry-display)] text-[20px] font-bold text-[#2A2420]">
          {t.reviewsRecent}
        </h3>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={t.reviewsPrevAria}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4D5C3] text-[#5A4F47] transition-colors hover:border-[#C7401A] hover:text-[#C7401A]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={t.reviewsNextAria}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4D5C3] text-[#5A4F47] transition-colors hover:border-[#C7401A] hover:text-[#C7401A]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="curry-no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} verifiedLabel={t.reviewsVerified} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#C7401A] underline decoration-[#E8A548] decoration-2 underline-offset-4 transition-colors hover:text-[#A5330F]"
        >
          {t.reviewsSeeAll}
        </a>
      </div>
    </section>
  );
}
