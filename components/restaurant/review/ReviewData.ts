/**
 * Curry & Spice — QR "post-dining review" page: types, constants and mock
 * persistence. No backend; submissions are stashed in sessionStorage so a
 * future demo dashboard could read them.
 */

export type ReviewPhase = "contact" | "rate" | "positive" | "feedback" | "success";
export type SuccessKind = "positive" | "feedback";

/** Quick-tag categories for the private feedback path. */
export const FEEDBACK_CATEGORIES = [
  "Food",
  "Service",
  "Ambience",
  "Wait time",
  "Value",
  "Cleanliness",
] as const;

/** Rewards (mock). */
export const FEEDBACK_DISCOUNT_CODE = "PRIYA10";
export const POSITIVE_CHAI_CODE = "CHAILOVE";

/** In production this would be the restaurant's Google Business review link. */
export const GOOGLE_REVIEW_URL = "https://www.google.com/maps";

export const INSTAGRAM_URL = "https://instagram.com";

const STORAGE_KEY = "curry-kin-review-v1";

export interface ReviewSubmission {
  rating: number;
  path: "positive" | "feedback";
  categories?: string[];
  message?: string;
  email?: string;
  phone?: string;
  wantsCallback?: boolean;
  at: string;
}

/** Persist a submission for the demo (best-effort — storage may be blocked). */
export function saveSubmission(data: ReviewSubmission): void {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const list: ReviewSubmission[] = raw ? JSON.parse(raw) : [];
    list.push(data);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore — demo only */
  }
}

/* ---- validation ---- */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Lenient international phone check: 7–15 digits after stripping symbols. */
export function isPhone(v: string): boolean {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
