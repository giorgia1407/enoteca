"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "./ContentContext";
import { RESERVE_COPY } from "./data/curryReserveContent";
import { Confetti } from "./Confetti";
import {
  TextField,
  TextArea,
  Stepper,
  isEmail,
  isUSPhone,
  isIntlPhone,
  formatPhone,
} from "./FormPrimitives";
import {
  CheckIcon,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
} from "./Icons";

const MAX_DAYS_AHEAD = 60;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const dateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const sameDay = (a: Date, b: Date) => dateKey(a) === dateKey(b);

/** Deterministic "Full" flag so the UI is stable across re-renders. */
function isSlotFull(key: string, slot: string): boolean {
  const s = key + slot;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 10 < 3;
}

function buildSlots(start: string, endHour: number, endMin: number, use24: boolean): string[] {
  const [h0, m0] = start.split(":").map(Number);
  const out: string[] = [];
  let h = h0;
  let m = m0;
  while (h < endHour || (h === endHour && m <= endMin)) {
    if (use24) {
      out.push(`${h}:${m.toString().padStart(2, "0")}`);
    } else {
      const hour12 = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? "AM" : "PM";
      out.push(`${hour12}:${m.toString().padStart(2, "0")} ${ampm}`);
    }
    m += 15;
    if (m >= 60) { m = 0; h += 1; }
  }
  return out;
}

/**
 * Time slots available on a given weekday (0 = Sun … 6 = Sat). English uses the
 * Rome hours (18:30 service) in 24h.
 */
function slotsForDay(day: number, it: boolean): string[] {
  if (it) {
    // Roma: Dom 12–15 · 18:30–22 · Ven–Sab 18:30–24 · Mar–Gio 18:30–23 · Lun chiuso
    if (day === 0) return [...buildSlots("12:00", 14, 30, true), ...buildSlots("18:30", 21, 30, true)];
    if (day === 5 || day === 6) return buildSlots("18:30", 23, 30, true);
    return buildSlots("18:30", 22, 30, true);
  }
  if (day === 0) return [...buildSlots("11:00", 14, 30, false), ...buildSlots("17:00", 20, 30, false)]; // Sun
  if (day === 5 || day === 6) return buildSlots("17:00", 22, 30, false); // Fri/Sat
  return buildSlots("17:00", 21, 30, false); // Tue–Thu
}

export function ReservationFlow() {
  const locale: "en" | "it" = "it";
  const it = locale === "it";
  const copy = RESERVE_COPY[it ? "it" : "en"];
  const { r } = useContent();

  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date | null>(null);

  // Client-only "today" read on mount — the calendar depends on the local
  // clock, which isn't available during SSR. Intentional external-sync effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const t = startOfDay(new Date());
    setToday(t);
    setViewMonth(new Date(t.getFullYear(), t.getMonth(), 1));
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [party, setParty] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [requests, setRequests] = useState("");
  const [holdCard, setHoldCard] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [showCancelTip, setShowCancelTip] = useState(false);

  const maxDate = useMemo(() => (today ? addDays(today, MAX_DAYS_AHEAD) : null), [today]);

  const go = (next: number) => {
    setErrors({});
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = copy.errName;
    if (!(it ? isIntlPhone(phone) : isUSPhone(phone))) e.phone = copy.errPhone;
    if (!isEmail(email)) e.email = copy.errEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirm = () => {
    setReservationId(`CK-R-${1000 + Math.floor(Math.random() * 9000)}`);
    go(5);
  };

  if (!mounted || !today || !viewMonth || !maxDate) {
    return <div className="mx-auto max-w-xl px-5 py-24 text-center text-[#8A7D71]">{copy.loading}</div>;
  }

  const summaryDate = date
    ? date.toLocaleDateString(copy.dateLocale, { weekday: "long", month: "long", day: "numeric" })
    : "";

  return (
    <div className="mx-auto max-w-xl px-5 py-8 sm:px-8 sm:py-12">
      {step < 5 && (
        <div className="mb-8">
          <Stepper steps={copy.steps} current={step} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* STEP 1 — date */}
          {step === 0 && (
            <div>
              <Heading eyebrow={copy.bookEyebrow} title={copy.pickDate} />
              <Calendar
                today={today}
                viewMonth={viewMonth}
                maxDate={maxDate}
                selected={date}
                onPrev={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                onNext={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                onSelect={(d) => { setDate(d); setTime(""); }}
              />
              <NavRow onNext={() => date && go(1)} nextDisabled={!date} nextLabel={copy.pickTime} />
            </div>
          )}

          {/* STEP 2 — time */}
          {step === 1 && date && (
            <div>
              <Heading eyebrow={summaryDate} title={copy.pickTime} />
              <p className="mt-2 text-[14px] text-[#8A7D71]">
                {date.getDay() === 0 ? copy.sundaySeatings : copy.dinnerSeatings}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {slotsForDay(date.getDay(), it).map((slot) => {
                  const full = isSlotFull(dateKey(date), slot);
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={full}
                      onClick={() => setTime(slot)}
                      className={`rounded-xl border px-2 py-2.5 text-[13.5px] font-semibold transition-colors ${
                        selected
                          ? "border-[#C7401A] bg-[#C7401A] text-white"
                          : full
                            ? "cursor-not-allowed border-[#EADFD0] bg-[#F3ECE2] text-[#C4B7A8] line-through"
                            : "border-[#E4D5C3] bg-white text-[#2A2420] hover:border-[#C7401A]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <NavRow onBack={() => go(0)} onNext={() => time && go(2)} nextDisabled={!time} nextLabel={copy.partySize} />
            </div>
          )}

          {/* STEP 3 — party size */}
          {step === 2 && (
            <div>
              <Heading eyebrow={copy.howManyJoining} title={copy.partySize} />
              <div className="mt-6 grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setParty(n)}
                    className={`aspect-square rounded-2xl border-2 text-[20px] font-bold transition-all ${
                      party === n
                        ? "border-[#C7401A] bg-[#C7401A] text-white"
                        : "border-[#E4D5C3] bg-white text-[#2A2420] hover:border-[#C7401A]/50"
                    }`}
                  >
                    {n === 8 ? "8+" : n}
                  </button>
                ))}
              </div>
              {party === 8 && (
                <p className="mt-4 rounded-2xl bg-[#FBEBD8] p-4 text-[14px] text-[#8A5A17]">
                  {copy.partyEightNote}
                </p>
              )}
              <NavRow onBack={() => go(1)} onNext={() => party && go(3)} nextDisabled={!party} nextLabel={copy.yourDetails} />
            </div>
          )}

          {/* STEP 4 — details */}
          {step === 3 && (
            <div>
              <Heading eyebrow={copy.nearlyBooked} title={copy.yourDetails} />
              <div className="mt-6 space-y-4">
                <TextField id="r-name" label={copy.fullName} value={name} autoComplete="name"
                  onChange={(e) => setName(e.target.value)} error={errors.name} placeholder={copy.namePlaceholder} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField id="r-phone" label={copy.phoneLabel} value={phone} inputMode="tel" autoComplete="tel"
                    onChange={(e) => setPhone(it ? e.target.value : formatPhone(e.target.value))} error={errors.phone} placeholder={copy.phonePlaceholder} />
                  <TextField id="r-email" label={copy.emailLabel} value={email} type="email" inputMode="email" autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder={copy.emailPlaceholder} />
                </div>
                <div>
                  <label htmlFor="occasion" className="mb-1.5 block text-[13.5px] font-semibold text-[#2A2420]">
                    {copy.occasionLabel} <span className="font-normal text-[#8A7D71]">{copy.optional}</span>
                  </label>
                  <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}
                    className="w-full rounded-xl border border-[#E4D5C3] bg-white px-4 py-3 text-[15px] text-[#2A2420] outline-none focus:border-[#C7401A]">
                    <option value="">{copy.noOccasion}</option>
                    {copy.occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <TextArea id="requests" label={copy.specialRequests} value={requests}
                  onChange={(e) => setRequests(e.target.value)} placeholder={copy.requestsPlaceholder} />
              </div>
              <NavRow onBack={() => go(2)} onNext={() => validateDetails() && go(4)} nextLabel={copy.reviewBooking} />
            </div>
          )}

          {/* STEP 5 — confirm */}
          {step === 4 && (
            <div>
              <Heading eyebrow={copy.confirmHold} title={copy.almostBooked} />
              <div className="mt-6 rounded-2xl border border-[#EADFD0] bg-white p-6">
                <SummaryRow icon={<CalendarIcon className="h-5 w-5" />} label={copy.dateLabel} value={summaryDate} />
                <SummaryRow icon={<ClockIcon className="h-5 w-5" />} label={copy.timeLabel} value={time} />
                <SummaryRow icon={<UsersIcon className="h-5 w-5" />} label={copy.partyLabel} value={`${party === 8 ? "8+" : party} ${party === 1 ? copy.guestOne : copy.guestMany}`} />
                <div className="mt-3 border-t border-[#F1E7DA] pt-3 text-[14px] text-[#5A4F47]">
                  <p><span className="font-semibold text-[#2A2420]">{name}</span> · {phone}</p>
                  <p className="text-[#8A7D71]">{email}</p>
                  {occasion && <p className="mt-1 text-[#C7401A]">🎉 {occasion}</p>}
                  {requests && <p className="mt-1 italic text-[#8A7D71]">&ldquo;{requests}&rdquo;</p>}
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#EADFD0] bg-white p-4">
                <input type="checkbox" checked={holdCard} onChange={(e) => setHoldCard(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#C7401A]" />
                <span className="text-[14px] text-[#5A4F47]">
                  <span className="font-semibold text-[#2A2420]">{copy.holdCardBold}</span>{copy.holdCardRest}
                </span>
              </label>
              {holdCard && (
                <div className="mt-3 grid grid-cols-1 gap-3 rounded-2xl bg-[#F7EBDD] p-4 sm:grid-cols-[2fr_1fr_1fr]">
                  <input placeholder={copy.cardNumber} aria-label={copy.cardNumber} className="rounded-xl border border-[#E4D5C3] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#C7401A]" />
                  <input placeholder={copy.expiry} aria-label={copy.expiryAria} className="rounded-xl border border-[#E4D5C3] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#C7401A]" />
                  <input placeholder={copy.cvc} aria-label={copy.cvc} className="rounded-xl border border-[#E4D5C3] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#C7401A]" />
                  <p className="text-[12px] text-[#8A7D71] sm:col-span-3">{copy.demoMode}</p>
                </div>
              )}

              <button type="button" onClick={confirm}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C7401A] px-6 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[#A5330F]">
                {copy.confirmReservation}
                <CheckIcon className="h-5 w-5" />
              </button>
              <p className="mt-2.5 text-center text-[12.5px] text-[#8A7D71]">
                {copy.reachOut}
              </p>
              <button type="button" onClick={() => go(3)} className="mx-auto mt-3 flex items-center gap-1 text-[13.5px] font-semibold text-[#8A7D71] hover:text-[#2A2420]">
                <ChevronLeft className="h-4 w-4" /> {copy.back}
              </button>
            </div>
          )}

          {/* STEP 6 — success */}
          {step === 5 && reservationId && (
            <div className="relative overflow-hidden rounded-3xl border border-[#EADFD0] bg-white p-8 text-center">
              <Confetti />
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4A6B4E] text-white">
                <CheckIcon className="h-10 w-10" />
              </motion.span>
              <h1 className="relative mt-5 font-[family-name:var(--font-curry-display)] text-[32px] font-bold text-[#2A2420]">
                {copy.youreBooked}
              </h1>
              <p className="relative mt-1 text-[15px] font-semibold text-[#C7401A]">{copy.reservationLabel} {reservationId}</p>

              <div className="relative mx-auto mt-6 max-w-sm rounded-2xl bg-[#F7EBDD] p-5 text-left">
                <SummaryRow icon={<CalendarIcon className="h-5 w-5" />} label={copy.dateLabel} value={summaryDate} />
                <SummaryRow icon={<ClockIcon className="h-5 w-5" />} label={copy.timeLabel} value={time} />
                <SummaryRow icon={<UsersIcon className="h-5 w-5" />} label={copy.partyLabel} value={`${party === 8 ? "8+" : party} ${party === 1 ? copy.guestOne : copy.guestMany}`} />
                <p className="mt-3 border-t border-[#E4D5C3] pt-3 text-[13px] text-[#8A7D71]">{r.fullAddress}</p>
              </div>

              <div className="relative mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E4D5C3] bg-white px-5 py-3 text-[14px] font-semibold text-[#2A2420]">
                  <CalendarIcon className="h-4 w-4" /> {copy.addGoogle}
                </span>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E4D5C3] bg-white px-5 py-3 text-[14px] font-semibold text-[#2A2420]">
                  <CalendarIcon className="h-4 w-4" /> {copy.addApple}
                </span>
              </div>

              <p className="relative mt-6 rounded-2xl bg-[#E6EFE3] p-4 text-[13.5px] text-[#3B5A3F]">
                {copy.confirmSentPre}<span className="font-semibold">{email}</span> {copy.confirmSentAnd} <span className="font-semibold">{phone}</span>.
              </p>

              <div className="relative mt-6 flex flex-col items-center gap-3">
                <div className="relative">
                  <button type="button" onMouseEnter={() => setShowCancelTip(true)} onMouseLeave={() => setShowCancelTip(false)}
                    onClick={() => setShowCancelTip((v) => !v)}
                    className="text-[13.5px] font-semibold text-[#8A7D71] underline underline-offset-4 hover:text-[#2A2420]">
                    {copy.modifyCancel}
                  </button>
                  {showCancelTip && (
                    <span className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-lg bg-[#2A2420] px-3 py-2 text-[12px] text-white">
                      {copy.notImplemented}
                    </span>
                  )}
                </div>
                <Link href="/" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C7401A] hover:text-[#A5330F]">
                  {copy.backToRestaurant} {r.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

function Calendar({
  today, viewMonth, maxDate, selected, onPrev, onNext, onSelect,
}: {
  today: Date;
  viewMonth: Date;
  maxDate: Date;
  selected: Date | null;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (d: Date) => void;
}) {
  const locale: "en" | "it" = "it";
  const copy = RESERVE_COPY[locale === "it" ? "it" : "en"];
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(year, month, 1) < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="mt-6 rounded-2xl border border-[#EADFD0] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label={copy.prevMonth}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5A4F47] transition-colors enabled:hover:bg-[#F3E6D6] disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="font-[family-name:var(--font-curry-display)] text-[18px] font-bold text-[#2A2420]">
          {copy.months[month]} {year}
        </p>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label={copy.nextMonth}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5A4F47] transition-colors enabled:hover:bg-[#F3E6D6] disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {copy.dow.map((d) => (
          <span key={d} className="py-1 text-[11.5px] font-semibold uppercase tracking-wide text-[#B4A798]">{d}</span>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`e${i}`} />;
          const isPast = cell < today;
          const isMonday = cell.getDay() === 1;
          const isTooFar = cell > maxDate;
          const disabled = isPast || isMonday || isTooFar;
          const isToday = sameDay(cell, today);
          const isSelected = selected && sameDay(cell, selected);
          return (
            <button
              key={dateKey(cell)}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(cell)}
              aria-label={cell.toLocaleDateString(copy.dateLocale, { weekday: "long", month: "long", day: "numeric" })}
              className={`relative mx-auto flex aspect-square w-full max-w-[42px] items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${
                isSelected
                  ? "bg-[#C7401A] text-white"
                  : disabled
                    ? "cursor-not-allowed text-[#CFC2B3]"
                    : "text-[#2A2420] hover:bg-[#F3E6D6]"
              } ${isToday && !isSelected ? "ring-2 ring-[#E8A548]" : ""}`}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[12px] text-[#8A7D71]">{copy.calendarNote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#C7401A]">{eyebrow}</p>
      <h1 className="mt-0.5 font-[family-name:var(--font-curry-display)] text-[28px] font-bold leading-tight text-[#2A2420] sm:text-[32px]">
        {title}
      </h1>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-[#C7401A]">{icon}</span>
      <span className="text-[13px] font-semibold uppercase tracking-wide text-[#8A7D71]">{label}</span>
      <span className="ml-auto text-[15px] font-semibold text-[#2A2420]">{value}</span>
    </div>
  );
}

function NavRow({
  onBack, onNext, nextLabel, nextDisabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  const locale: "en" | "it" = "it";
  const copy = RESERVE_COPY[locale === "it" ? "it" : "en"];
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 rounded-full px-4 py-3 text-[14px] font-semibold text-[#5A4F47] hover:text-[#2A2420]">
          <ChevronLeft className="h-4 w-4" /> {copy.back}
        </button>
      ) : <span />}
      <button type="button" onClick={onNext} disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-full bg-[#C7401A] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F] disabled:cursor-not-allowed disabled:opacity-40">
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
