"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, type CartLine } from "./CartContext";
import { useContent } from "./ContentContext";
import { ORDER_COPY } from "./data/curryOrderContent";
import { TAX_RATE } from "./data/menuData";
import { Confetti } from "./Confetti";
import {
  TextField,
  TextArea,
  Stepper,
  ChoiceCard,
  isEmail,
  isUSPhone,
  isIntlPhone,
  isZip,
  formatPhone,
  formatCardNumber,
  formatExpiry,
  isCardComplete,
  isExpiryComplete,
  isCvc,
} from "./FormPrimitives";
import {
  BagIcon,
  CheckIcon,
  ArrowRight,
  ChevronLeft,
  SpinnerIcon,
} from "./Icons";

const BASE = "";
const TIP_PERCENTS = [18, 20, 22] as const;

// Dine-in is handled by scanning a QR at the table, so remote checkout is
// pickup or delivery only.
type OrderType = "pickup" | "delivery";

interface PlacedOrder {
  number: string;
  type: OrderType;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  tip: number;
  deliveryFee: number;
  total: number;
  etaText: string;
  detail: string;
}

/** Generate 15-min pickup slots starting ~20 min from now (client-only). */
function usePickupSlots(it: boolean): string[] {
  const [slots, setSlots] = useState<string[]>([]);
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getTime() + 20 * 60 * 1000);
    start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
    const out: string[] = [];
    for (let i = 0; i < 16; i++) {
      const t = new Date(start.getTime() + i * 15 * 60 * 1000);
      out.push(
        it
          ? t.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", hour12: false })
          : t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      );
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock read on mount
    setSlots(out);
  }, [it]);
  return slots;
}

export function OrderCheckout() {
  const { lines, subtotal, tax, clearCart, money } = useCart();
  const { r } = useContent();
  const locale: "en" | "it" = "it";
  const it = locale === "it";
  const copy = ORDER_COPY[it ? "it" : "en"];
  const pickupSlots = usePickupSlots(it);

  const [step, setStep] = useState(0);
  const [orderType, setOrderType] = useState<OrderType | null>(null);

  // Contact + fulfilment details.
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [addr, setAddr] = useState({ street: "", apt: "", city: "", state: "", zip: "" });
  const [instructions, setInstructions] = useState("");

  // Tip.
  const [tipPct, setTipPct] = useState<number | "custom">(20);
  const [customTip, setCustomTip] = useState("");

  // Payment.
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardZip, setCardZip] = useState("");
  const [processing, setProcessing] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [tracking, setTracking] = useState(false);

  const deliveryFee = orderType === "delivery" ? r.deliveryFee : 0;
  const tip = useMemo(() => {
    if (tipPct === "custom") {
      const v = parseFloat(customTip);
      return Number.isFinite(v) && v > 0 ? v : 0;
    }
    return Math.round(subtotal * (tipPct / 100) * 100) / 100;
  }, [tipPct, customTip, subtotal]);
  const total = subtotal + tax + deliveryFee + tip;

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
    if (orderType === "pickup" && !pickupTime) e.pickupTime = copy.errPickupTime;
    if (orderType === "delivery") {
      if (!addr.street.trim()) e.street = copy.errStreet;
      if (!addr.city.trim()) e.city = copy.errCity;
      if (!addr.state.trim()) e.state = copy.errState;
      if (!isZip(addr.zip)) e.zip = copy.errZip;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (!isCardComplete(card)) e.card = copy.errCard;
    if (!isExpiryComplete(expiry)) e.expiry = copy.errExpiry;
    if (!isCvc(cvc)) e.cvc = copy.errCvc;
    if (!isZip(cardZip)) e.cardZip = copy.errCardZip;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitPayment = () => {
    if (!validatePayment()) return;
    setProcessing(true);
    window.setTimeout(() => {
      const number = `CK-${1000 + Math.floor(Math.random() * 9000)}`;
      const etaMap: Record<OrderType, { eta: string; detail: string }> = {
        pickup: {
          eta: copy.etaPickup.replace("{time}", pickupTime),
          detail: copy.etaPickupDetail.replace("{time}", pickupTime),
        },
        delivery: {
          eta: copy.etaDelivery,
          detail: `${addr.street}${addr.apt ? `, ${addr.apt}` : ""}, ${addr.city}`,
        },
      };
      const info = etaMap[orderType as OrderType];
      setPlaced({
        number,
        type: orderType as OrderType,
        lines,
        subtotal,
        tax,
        tip,
        deliveryFee,
        total,
        etaText: info.eta,
        detail: info.detail,
      });
      clearCart();
      setProcessing(false);
      go(4);
    }, 2000);
  };

  // Empty-cart guard (before an order is placed).
  if (lines.length === 0 && !placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7EBDD] text-[#C7401A]">
          <BagIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-[family-name:var(--font-curry-display)] text-2xl font-bold text-[#2A2420]">
          {copy.emptyTitle}
        </h1>
        <p className="mt-2 text-[15px] text-[#6A5F55]">
          {copy.emptyBody}
        </p>
        <Link
          href={`${BASE}/menu`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C7401A] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
        >
          {copy.browseMenu}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      {step < 4 && (
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
          {/* STEP 1 — order type */}
          {step === 0 && (
            <div>
              <StepHeading eyebrow={copy.s1Eyebrow} title={copy.s1Title} />
              <div className="mt-6 grid gap-3">
                {(
                  [
                    { type: "pickup", emoji: "🛍️", title: copy.pickupTitle, body: copy.pickupBody },
                    { type: "delivery", emoji: "🛵", title: copy.deliveryTitle, body: copy.deliveryBody },
                  ] as const
                ).map((o) => (
                  <ChoiceCard
                    key={o.type}
                    selected={orderType === o.type}
                    onClick={() => setOrderType(o.type)}
                    className="flex items-center gap-4"
                  >
                    <span className="text-3xl" aria-hidden="true">{o.emoji}</span>
                    <span>
                      <span className="block font-[family-name:var(--font-curry-display)] text-[19px] font-bold text-[#2A2420]">
                        {o.title}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] text-[#6A5F55]">{o.body}</span>
                    </span>
                  </ChoiceCard>
                ))}
              </div>
              <NavRow
                onNext={() => orderType && go(1)}
                nextDisabled={!orderType}
                nextLabel={copy.continueLabel}
              />
            </div>
          )}

          {/* STEP 2 — details */}
          {step === 1 && (
            <div>
              <StepHeading eyebrow={copy.s2Eyebrow} title={copy.s2Title} />
              <div className="mt-6 space-y-4">
                <TextField id="name" label={copy.fullNameLabel} value={name} autoComplete="name"
                  onChange={(e) => setName(e.target.value)} error={errors.name} placeholder={copy.fullNamePlaceholder} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField id="phone" label={copy.phoneLabel} value={phone} inputMode="tel" autoComplete="tel"
                    onChange={(e) => setPhone(it ? e.target.value : formatPhone(e.target.value))} error={errors.phone} placeholder={copy.phonePlaceholder} />
                  <TextField id="email" label={copy.emailLabel} value={email} type="email" inputMode="email" autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder={copy.emailPlaceholder} />
                </div>

                {orderType === "pickup" && (
                  <div>
                    <label htmlFor="pickup" className="mb-1.5 block text-[13.5px] font-semibold text-[#2A2420]">
                      {copy.pickupTimeLabel}
                    </label>
                    <select id="pickup" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#2A2420] outline-none focus:border-[#C7401A] ${errors.pickupTime ? "border-[#C7401A]" : "border-[#E4D5C3]"}`}>
                      <option value="">{copy.selectTime}</option>
                      {pickupSlots.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.pickupTime && <p className="mt-1 text-[12.5px] font-medium text-[#C7401A]">{errors.pickupTime}</p>}
                  </div>
                )}
                {orderType === "delivery" && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                      <TextField id="street" label={copy.streetLabel} value={addr.street} autoComplete="address-line1"
                        onChange={(e) => setAddr({ ...addr, street: e.target.value })} error={errors.street} placeholder={copy.streetPlaceholder} />
                      <TextField id="apt" label={copy.aptLabel} value={addr.apt}
                        onChange={(e) => setAddr({ ...addr, apt: e.target.value })} placeholder={copy.aptPlaceholder} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <TextField id="city" label={copy.cityLabel} value={addr.city} autoComplete="address-level2"
                        onChange={(e) => setAddr({ ...addr, city: e.target.value })} error={errors.city} placeholder={copy.cityPlaceholder} />
                      <TextField id="state" label={copy.stateLabel} value={addr.state} autoComplete="address-level1"
                        onChange={(e) => setAddr({ ...addr, state: e.target.value })} error={errors.state} placeholder={copy.statePlaceholder} />
                      <TextField id="zip" label={copy.zipLabel} value={addr.zip} inputMode="numeric" autoComplete="postal-code"
                        onChange={(e) => setAddr({ ...addr, zip: e.target.value })} error={errors.zip} placeholder={copy.zipPlaceholder} />
                    </div>
                  </div>
                )}
              </div>
              <NavRow onBack={() => go(0)} onNext={() => validateDetails() && go(2)} nextLabel={copy.reviewOrder} />
            </div>
          )}

          {/* STEP 3 — review */}
          {step === 2 && (
            <div>
              <StepHeading eyebrow={copy.s3Eyebrow} title={copy.s3Title} />
              <div className="mt-6 rounded-2xl border border-[#EADFD0] bg-white p-5">
                <ul className="divide-y divide-[#F1E7DA]">
                  {lines.map((l) => (
                    <li key={l.item.id} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="text-[14.5px] text-[#2A2420]">
                        <span className="font-semibold">{l.qty}×</span> {l.item.name}
                      </span>
                      <span className="text-[14px] font-semibold text-[#2A2420]">{money(l.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`${BASE}/menu`} className="mt-3 inline-block text-[13.5px] font-semibold text-[#C7401A] underline underline-offset-2">
                  {copy.editCart}
                </Link>
              </div>

              <div className="mt-5">
                <TextArea id="instructions" label={copy.instructionsLabel} value={instructions}
                  onChange={(e) => setInstructions(e.target.value)} placeholder={copy.instructionsPlaceholder} />
              </div>

              {/* Tip */}
              <div className="mt-5">
                <p className="mb-2 text-[13.5px] font-semibold text-[#2A2420]">{copy.tipPrompt}</p>
                <div className="flex flex-wrap gap-2">
                  {TIP_PERCENTS.map((p) => (
                    <button key={p} type="button" onClick={() => setTipPct(p)}
                      className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${tipPct === p ? "border-[#C7401A] bg-[#C7401A] text-white" : "border-[#E4D5C3] bg-white text-[#5A4F47] hover:border-[#C7401A]"}`}>
                      {p}% · {money(Math.round(subtotal * (p / 100) * 100) / 100)}
                    </button>
                  ))}
                  <button type="button" onClick={() => setTipPct("custom")}
                    className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${tipPct === "custom" ? "border-[#C7401A] bg-[#C7401A] text-white" : "border-[#E4D5C3] bg-white text-[#5A4F47] hover:border-[#C7401A]"}`}>
                    {copy.custom}
                  </button>
                  {tipPct === "custom" && (
                    <input type="number" min="0" step="1" value={customTip} onChange={(e) => setCustomTip(e.target.value)}
                      placeholder={copy.customTipPlaceholder} aria-label={copy.customTipAria}
                      className="w-24 rounded-full border border-[#E4D5C3] bg-white px-4 py-2 text-[14px] outline-none focus:border-[#C7401A]" />
                  )}
                </div>
              </div>

              <TotalsBlock subtotal={subtotal} tax={tax} deliveryFee={deliveryFee} tip={tip} total={total} />
              <NavRow onBack={() => go(1)} onNext={() => go(3)} nextLabel={copy.continueToPayment} />
            </div>
          )}

          {/* STEP 4 — payment */}
          {step === 3 && (
            <div>
              <StepHeading eyebrow={copy.s4Eyebrow} title={copy.s4Title} />
              <div className="mt-6 space-y-4 rounded-2xl border border-[#EADFD0] bg-white p-5">
                <TextField id="card" label={copy.cardLabel} value={card} inputMode="numeric"
                  onChange={(e) => setCard(formatCardNumber(e.target.value))} error={errors.card} placeholder={copy.cardPlaceholder} />
                <div className="grid grid-cols-3 gap-4">
                  <TextField id="expiry" label={copy.expiryLabel} value={expiry} inputMode="numeric"
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))} error={errors.expiry} placeholder={copy.expiryPlaceholder} />
                  <TextField id="cvc" label={copy.cvcLabel} value={cvc} inputMode="numeric"
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} error={errors.cvc} placeholder={copy.cvcPlaceholder} />
                  <TextField id="cardZip" label={copy.cardZipLabel} value={cardZip} inputMode="numeric"
                    onChange={(e) => setCardZip(e.target.value.replace(/\D/g, "").slice(0, 5))} error={errors.cardZip} placeholder={copy.cardZipPlaceholder} />
                </div>
              </div>

              <TotalsBlock subtotal={subtotal} tax={tax} deliveryFee={deliveryFee} tip={tip} total={total} />

              <button type="button" onClick={submitPayment} disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C7401A] px-6 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[#A5330F] disabled:opacity-70">
                {processing ? (<><SpinnerIcon className="h-5 w-5 animate-spin" /> {copy.processing}</>) : (copy.pay.replace("{amount}", money(total)))}
              </button>
              <p className="mt-2.5 text-center text-[12.5px] text-[#8A7D71]">
                {copy.demoNote}
              </p>
              {!processing && (
                <button type="button" onClick={() => go(2)} className="mx-auto mt-3 flex items-center gap-1 text-[13.5px] font-semibold text-[#8A7D71] hover:text-[#2A2420]">
                  <ChevronLeft className="h-4 w-4" /> {copy.backToReview}
                </button>
              )}
            </div>
          )}

          {/* STEP 5 — success / tracking */}
          {step === 4 && placed && (
            tracking ? (
              <OrderTracking order={placed} onBack={() => setTracking(false)} />
            ) : (
              <OrderSuccess order={placed} onTrack={() => setTracking(true)} />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-views                                                           */
/* ------------------------------------------------------------------ */

function StepHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-curry-accent)] text-[16px] italic text-[#C7401A]">{eyebrow}</p>
      <h1 className="mt-0.5 font-[family-name:var(--font-curry-display)] text-[28px] font-bold leading-tight text-[#2A2420] sm:text-[32px]">
        {title}
      </h1>
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
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
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

function TotalsBlock({
  subtotal, tax, deliveryFee, tip, total,
}: {
  subtotal: number; tax: number; deliveryFee: number; tip: number; total: number;
}) {
  const { money } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <dl className="mt-5 space-y-1.5 rounded-2xl bg-[#F7EBDD] p-5 text-[14px]">
      <Row label={copy.subtotal} value={money(subtotal)} />
      <Row label={copy.taxLabel.replace("{pct}", (TAX_RATE * 100).toFixed(2))} value={money(tax)} />
      {deliveryFee > 0 && <Row label={copy.deliveryFee} value={money(deliveryFee)} />}
      {tip > 0 && <Row label={copy.tip} value={money(tip)} />}
      <div className="mt-1 flex justify-between border-t border-[#E4D5C3] pt-2 text-[17px] font-bold text-[#2A2420]">
        <dt>{copy.total}</dt>
        <dd className="text-[#C7401A]">{money(total)}</dd>
      </div>
    </dl>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[#5A4F47]">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function OrderSuccess({ order, onTrack }: { order: PlacedOrder; onTrack: () => void }) {
  const { money } = useCart();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#EADFD0] bg-white p-8 text-center">
      <Confetti />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4A6B4E] text-white"
      >
        <CheckIcon className="h-10 w-10" />
      </motion.span>
      <h1 className="relative mt-5 font-[family-name:var(--font-curry-display)] text-[30px] font-bold text-[#2A2420]">
        {copy.orderConfirmed}
      </h1>
      <p className="relative mt-1 text-[15px] font-semibold text-[#C7401A]">{copy.orderLabel} {order.number}</p>
      <p className="relative mt-3 text-[15px] text-[#5A4F47]">{order.etaText}</p>

      <div className="relative mx-auto mt-6 max-w-sm rounded-2xl bg-[#F7EBDD] p-5 text-left">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#8A7D71]">{order.detail}</p>
        <ul className="mt-2 divide-y divide-[#E4D5C3]">
          {order.lines.map((l) => (
            <li key={l.item.id} className="flex justify-between py-1.5 text-[14px] text-[#2A2420]">
              <span>{l.qty}× {l.item.name}</span>
              <span className="font-semibold">{money(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-[#E4D5C3] pt-2 text-[15px] font-bold text-[#2A2420]">
          <span>{copy.totalPaid}</span>
          <span className="text-[#C7401A]">{money(order.total)}</span>
        </div>
      </div>

      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={onTrack}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C7401A] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#A5330F]">
          {copy.trackOrder}
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link href={`${BASE}/menu`}
          className="inline-flex items-center justify-center rounded-full border border-[#E4D5C3] px-6 py-3.5 text-[15px] font-semibold text-[#2A2420] transition-colors hover:border-[#C7401A]">
          {copy.orderMore}
        </Link>
      </div>
    </div>
  );
}

function OrderTracking({ order, onBack }: { order: PlacedOrder; onBack: () => void }) {
  const { r } = useContent();
  const locale: "en" | "it" = "it";
  const copy = ORDER_COPY[locale === "it" ? "it" : "en"];
  const stages =
    order.type === "delivery" ? copy.stagesDelivery : copy.stagesPickup;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= stages.length - 1) return;
    const t = window.setTimeout(() => setActive((a) => a + 1), 2600);
    return () => window.clearTimeout(t);
  }, [active, stages.length]);

  return (
    <div className="rounded-3xl border border-[#EADFD0] bg-white p-8">
      <button type="button" onClick={onBack} className="flex items-center gap-1 text-[13.5px] font-semibold text-[#8A7D71] hover:text-[#2A2420]">
        <ChevronLeft className="h-4 w-4" /> {copy.back}
      </button>
      <h1 className="mt-3 font-[family-name:var(--font-curry-display)] text-[26px] font-bold text-[#2A2420]">
        {copy.orderLabel} {order.number}
      </h1>
      <p className="mt-1 text-[14px] text-[#5A4F47]">{order.etaText}</p>

      <ol className="mt-7 space-y-0">
        {stages.map((stage, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={stage} className="flex gap-4">
              <div className="flex flex-col items-center">
                <motion.span
                  animate={{
                    backgroundColor: done || current ? "#C7401A" : "#EADFD0",
                    scale: current ? 1.1 : 1,
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                >
                  {done ? <CheckIcon className="h-5 w-5" /> : current ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : <span className="text-[13px] font-bold text-[#8A7D71]">{i + 1}</span>}
                </motion.span>
                {i < stages.length - 1 && (
                  <span className={`my-1 h-8 w-0.5 ${done ? "bg-[#C7401A]" : "bg-[#EADFD0]"}`} />
                )}
              </div>
              <div className="pt-1.5">
                <p className={`text-[15.5px] font-semibold ${done || current ? "text-[#2A2420]" : "text-[#B4A798]"}`}>
                  {stage}
                </p>
                {current && <p className="text-[13px] text-[#C7401A]">{copy.inProgress}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {active >= stages.length - 1 && (
        <p className="mt-6 rounded-2xl bg-[#E6EFE3] p-4 text-center text-[14px] font-semibold text-[#3B5A3F]">
          {copy.allDone.replace("{brand}", r.name)}
        </p>
      )}
    </div>
  );
}
