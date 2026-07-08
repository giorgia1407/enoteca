"use client";

import type { ReactNode } from "react";
import { useContent } from "../ContentContext";

/** Elevated review card with the restaurant wordmark + divider at the top. */
export function ReviewCard({ children }: { children: ReactNode }) {
  const { r } = useContent();
  return (
    <div className="w-full max-w-[480px]">
      <div className="rounded-3xl border border-[#C7401A]/10 bg-[#FFF8F0] p-5 shadow-[0_24px_64px_-12px_rgba(42,36,32,0.15)] sm:p-10">
        <div className="flex flex-col items-center">
          <span className="font-[family-name:var(--font-curry-display)] text-[20px] font-bold leading-none tracking-tight text-[#2A2420]">
            {r.ampBefore} <span className="text-[#C7401A]">&amp;</span> {r.ampAfter}
          </span>
          <span className="mt-3 block h-px w-10 bg-[#C7401A]/25" aria-hidden="true" />
        </div>
        {children}
      </div>
    </div>
  );
}

/** Labeled input with a leading icon, used across both review paths. */
export function ContactInput({
  id,
  label,
  icon,
  value,
  onChange,
  error,
  ...rest
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4A798]">
          {icon}
        </span>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-3 text-[14px] text-[#2A2420] outline-none transition-colors placeholder:text-[#B4A798] focus:border-[#C7401A] ${
            error ? "border-[#C7401A]" : "border-[#E4D5C3]"
          }`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-[12px] font-medium text-[#C7401A]">{error}</p>}
    </div>
  );
}
