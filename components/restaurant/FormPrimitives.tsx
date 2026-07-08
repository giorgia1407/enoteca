"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { CheckIcon } from "./Icons";

/* ------------------------------------------------------------------ */
/* Validation helpers                                                  */
/* ------------------------------------------------------------------ */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** US phone: 10 digits (optionally with formatting characters). */
export const isUSPhone = (v: string) => v.replace(/\D/g, "").length === 10;

/** Lenient international phone (e.g. Italian +39 numbers): 8–15 digits. */
export const isIntlPhone = (v: string) => {
  const n = v.replace(/\D/g, "").length;
  return n >= 8 && n <= 15;
};

export const isZip = (v: string) => /^\d{5}(-\d{4})?$/.test(v.trim());

export function formatPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function formatCardNumber(v: string): string {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatExpiry(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export const isCardComplete = (v: string) => v.replace(/\D/g, "").length === 16;
export const isExpiryComplete = (v: string) => /^\d{2}\/\d{2}$/.test(v);
export const isCvc = (v: string) => /^\d{3,4}$/.test(v);

/* ------------------------------------------------------------------ */
/* Field                                                               */
/* ------------------------------------------------------------------ */

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string | null;
  hint?: string;
}

export function TextField({ id, label, error, hint, className, ...rest }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-[#2A2420]">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A] ${
          error ? "border-[#C7401A]" : "border-[#E4D5C3]"
        }`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-[12.5px] font-medium text-[#C7401A]">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[12.5px] text-[#8A7D71]">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextArea({
  id,
  label,
  hint,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-[#2A2420]">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        className="w-full resize-none rounded-xl border border-[#E4D5C3] bg-white px-4 py-3 text-[15px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A]"
        {...rest}
      />
      {hint && <p className="mt-1 text-[12.5px] text-[#8A7D71]">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper / breadcrumbs                                               */
/* ------------------------------------------------------------------ */

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-1.5">
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={label} className="flex flex-1 items-center gap-1.5">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold transition-colors ${
                state === "done"
                  ? "bg-[#4A6B4E] text-white"
                  : state === "active"
                    ? "bg-[#C7401A] text-white"
                    : "bg-[#EADFD0] text-[#8A7D71]"
              }`}
            >
              {state === "done" ? <CheckIcon className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`hidden truncate text-[12.5px] font-semibold sm:inline ${
                state === "todo" ? "text-[#B4A798]" : "text-[#2A2420]"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`h-px flex-1 ${i < current ? "bg-[#4A6B4E]" : "bg-[#EADFD0]"}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Big selectable card button used for order-type and party-size choices. */
export function ChoiceCard({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border-2 p-5 text-left transition-all ${
        selected
          ? "border-[#C7401A] bg-[#FBE9E1] shadow-[0_10px_28px_-16px_rgba(199,64,26,0.6)]"
          : "border-[#E4D5C3] bg-white hover:border-[#C7401A]/50"
      } ${className}`}
    >
      {children}
    </button>
  );
}
