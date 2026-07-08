"use client";

/**
 * Curry & Spice — "Bella", the AI waiter.
 *
 * A floating chat assistant that walks a guest through order-type → party size →
 * diet → spice → mood → recommendations → starter/dessert/drink upsells →
 * checkout. It is a deterministic client-side state machine (no AI API) that
 * adds real items to the shared CartContext. Preferences/step/rec-paging
 * live in refs (only messages + typing re-render), which keeps handlers free of
 * stale closures.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useContent } from "./ContentContext";
import { useUI } from "./UIContext";
import { DishImage } from "./DishImage";
import { DietaryTags } from "./Tags";
import { SendIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import { getItem, type MenuItem } from "./data/menuData";
import { BELLA_COPY } from "./data/curryBellaContent";
import { BELLA_PORTRAIT_URL } from "./data/bellaPortrait";
import {
  buildRecommendations,
  pickStarter,
  pickDessert,
  drinkOptions,
  type BellaPrefs,
  type Diet,
  type Spice,
} from "./data/bellaLogic";

const BASE = "";

type Step =
  | "orderType"
  | "partySize"
  | "diet"
  | "spice"
  | "mood"
  | "recommend"
  | "bread"
  | "starterDessert"
  | "drinks"
  | "checkout"
  | "browsing";

interface Reply {
  label: string;
  value: string;
}
interface BellaMsg {
  id: number;
  sender: "bella" | "user";
  text?: string;
  itemCards?: string[];
  replies?: Reply[];
}

const OTHER_BREAD_IDS = ["butter-naan", "peshawari-naan", "laccha-paratha"];

/** Resolve the active locale to Bella's copy dictionary. */
function useBellaCopy() {
  const locale: "en" | "it" = "it";
  return BELLA_COPY[locale === "it" ? "it" : "en"];
}

export function BellaAssistant() {
  const { bellaOpen, openBella, closeBella } = useUI();
  return (
    <>
      <FloatingStack bellaOpen={bellaOpen} onOpenBella={openBella} />
      <AnimatePresence>{bellaOpen && <BellaPanel onClose={closeBella} />}</AnimatePresence>
    </>
  );
}

/** Circular Bella portrait, reused at every size. */
function BellaAvatar({ className, sizes = "64px" }: { className: string; sizes?: string }) {
  const copy = useBellaCopy();
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-[#F7EBDD] ${className}`}>
      <Image src={BELLA_PORTRAIT_URL} alt={copy.bellaAlt} fill sizes={sizes} className="object-cover" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Floating right-side stack: Bella + WhatsApp                          */
/* ------------------------------------------------------------------ */

function FloatingStack({
  bellaOpen,
  onOpenBella,
}: {
  bellaOpen: boolean;
  onOpenBella: () => void;
}) {
  const copy = useBellaCopy();
  const { r } = useContent();
  const [nearBottom, setNearBottom] = useState(false);

  // Fade the widgets out near the very bottom so the footer can breathe.
  useEffect(() => {
    const onScroll = () => {
      const full = document.documentElement.scrollHeight;
      setNearBottom(full - (window.scrollY + window.innerHeight) < 500);
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const hidden = nearBottom && !bellaOpen;

  return (
    <div
      className={`fixed top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 transition-all duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      } ${bellaOpen ? "hidden sm:flex sm:right-[424px]" : "right-4 sm:right-6"}`}
    >
      {!bellaOpen && (
        <div className="group relative flex justify-end">
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#2A2420] px-3 py-1.5 text-[12.5px] font-semibold text-[#FFF8F0] opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
            {copy.chatWithBella}
          </span>
          <button
            type="button"
            onClick={onOpenBella}
            aria-label={copy.chatWithBellaAria}
            className="curry-bella-glow relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#E8A548] transition-transform hover:scale-105 sm:h-16 sm:w-16"
          >
            <Image src={BELLA_PORTRAIT_URL} alt={copy.bellaAlt} fill sizes="64px" className="object-cover" />
          </button>
        </div>
      )}

      <div className="group relative flex justify-end">
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#2A2420] px-3 py-1.5 text-[12.5px] font-semibold text-[#FFF8F0] opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
          {copy.whatsappUs}
        </span>
        <a
          href={r.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.whatsappAria}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 sm:h-16 sm:w-16"
        >
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chat panel                                                          */
/* ------------------------------------------------------------------ */

function BellaPanel({ onClose }: { onClose: () => void }) {
  const cart = useCart();
  const copy = useBellaCopy();
  const money = cart.money;
  const router = useRouter();

  const idRef = useRef(1);
  const stepRef = useRef<Step>("diet");
  const prefsRef = useRef<BellaPrefs>({
    orderType: null,
    partySize: null,
    diet: "none",
    spice: "any",
    mood: null,
  });
  const recRef = useRef<{ ids: string[]; index: number }>({ ids: [], index: 0 });

  const [messages, setMessages] = useState<BellaMsg[]>(() => [
    { id: 0, sender: "bella", text: copy.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Warm opener, then (after an 800ms typing beat) the first of just two questions.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setTyping(true));
    const t = window.setTimeout(() => {
      const msg: BellaMsg = {
        id: idRef.current++,
        sender: "bella",
        text: copy.dietText,
        replies: [...copy.diet, copy.skip],
      };
      setMessages((m) => [...m, msg]);
      setTyping(false);
    }, 800);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
    // Mount-only opener: `copy` is stable for the panel's lifetime (a locale
    // switch remounts the tree), so we intentionally run this once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Body scroll lock + Esc + focus.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const bella = (text: string, replies?: Reply[], itemCards?: string[]): BellaMsg => ({
    id: idRef.current++,
    sender: "bella",
    text,
    replies,
    itemCards,
  });

  const addToCart = (id: string): MenuItem | undefined => {
    const item = getItem(id);
    if (item) cart.addItem(id);
    return item;
  };

  const recReplies = (ids: string[], index: number): Reply[] => {
    const out: Reply[] = [{ label: copy.recMore, value: "more" }];
    if (ids.slice(index, index + 3).length === 3) out.push({ label: copy.recAddAll, value: "addall" });
    return out;
  };

  const buildStarterDessert = (): BellaMsg => {
    const diet = prefsRef.current.diet;
    const starter = getItem(pickStarter(diet));
    const dessertId = pickDessert(diet);
    const dessert = dessertId ? getItem(dessertId) : null;
    stepRef.current = "starterDessert";
    let text = copy.starterDessertIntro;
    const replies: Reply[] = [];
    if (starter) {
      text += copy.starterFavourite(starter.name, money(starter.price));
      replies.push({ label: copy.addLabel(starter.name), value: `add:${starter.id}` });
    }
    if (dessert) {
      text += copy.dessertNotMissed(dessert.name, money(dessert.price));
      replies.push({ label: copy.addLabel(dessert.name), value: `add:${dessert.id}` });
    }
    if (starter && dessert) {
      replies.push({ label: copy.addBoth, value: `addmany:${starter.id},${dessert.id}` });
    }
    replies.push({ label: copy.noThanksGood, value: "no" });
    return bella(text, replies);
  };

  const buildDrinks = (): BellaMsg => {
    stepRef.current = "drinks";
    const opts = drinkOptions(prefsRef.current.diet);
    const replies: Reply[] = opts
      .map((id) => getItem(id))
      .filter((i): i is MenuItem => !!i)
      .map((i) => ({ label: copy.drinkLabel(i.name, money(i.price)), value: `add:${i.id}` }));
    replies.push({ label: copy.justWater, value: "water" });
    return bella(copy.drinksIntro, replies);
  };

  const orderSummary = (): string => {
    if (cart.lines.length === 0) return copy.orderEmpty;
    const lines = cart.lines.map((l) => copy.orderLine(l.qty, l.item.name, money(l.lineTotal))).join("\n");
    return copy.orderSummary(lines, money(cart.subtotal));
  };

  /** Jump straight to recommendations using whatever prefs we have. */
  const recommendNow = (): BellaMsg => {
    prefsRef.current.mood = "chef";
    const ids = buildRecommendations(prefsRef.current);
    recRef.current = { ids, index: 0 };
    stepRef.current = "recommend";
    return bella(copy.recommendIntro, recReplies(ids, 0), ids.slice(0, 3));
  };

  /** Compute Bella's response to a reply value. Mutates refs/cart; returns the
   *  bot messages to append + an optional post-append action (navigation). */
  const reduce = (value: string): { bot: BellaMsg[]; after?: () => void } => {
    const step = stepRef.current;
    const prefs = prefsRef.current;
    const bot: BellaMsg[] = [];

    switch (step) {
      case "diet":
        // "Just show me the menu" or "Just tell me" → skip straight to recs.
        if (value === "skip" || value === "justtell") {
          bot.push(recommendNow());
        } else {
          prefs.diet = value as Diet;
          stepRef.current = "spice";
          bot.push(bella(copy.spiceText, [...copy.spice, copy.skip]));
        }
        break;
      case "spice":
        if (value !== "skip") prefs.spice = value as Spice;
        bot.push(recommendNow());
        break;
      case "recommend":
        if (value === "more") {
          const r = recRef.current;
          r.index = r.ids.length ? (r.index + 3) % r.ids.length : 0;
          bot.push(bella(copy.recMoreIntro, recReplies(r.ids, r.index), r.ids.slice(r.index, r.index + 3)));
        } else if (value === "addall") {
          const r = recRef.current;
          const slice = r.ids.slice(r.index, r.index + 3);
          slice.forEach(addToCart);
          stepRef.current = "bread";
          bot.push(bella(copy.allThreeAdded, copy.breadReplies));
        } else if (value.startsWith("add:")) {
          const item = addToCart(value.slice(4));
          stepRef.current = "bread";
          bot.push(bella(copy.addedToBread(item?.name ?? copy.addedFallback), copy.breadReplies));
        }
        break;
      case "bread":
        if (value === "more") {
          bot.push(bella(copy.breadsIntro, [{ label: copy.noBreadThanks, value: "skip" }], OTHER_BREAD_IDS));
        } else if (value === "skip") {
          bot.push(buildStarterDessert());
        } else if (value.startsWith("add:")) {
          const item = addToCart(value.slice(4));
          bot.push(bella(copy.breadAdded(item?.name ?? copy.breadFallback)));
          bot.push(buildStarterDessert());
        }
        break;
      case "starterDessert":
        if (value.startsWith("addmany:")) value.slice(8).split(",").forEach(addToCart);
        else if (value.startsWith("add:")) addToCart(value.slice(4));
        bot.push(buildDrinks());
        break;
      case "drinks":
        if (value.startsWith("add:")) addToCart(value.slice(4));
        stepRef.current = "checkout";
        bot.push(bella(copy.checkoutPrompt, copy.checkoutReplies));
        break;
      case "checkout":
        if (value === "ready") {
          bot.push(bella(copy.takingToCheckout));
          const mode = prefs.orderType === "delivery" ? "delivery" : "pickup";
          return { bot, after: () => window.setTimeout(() => { onClose(); router.push(`${BASE}/order?mode=${mode}`); }, 600) };
        }
        if (value === "show") {
          bot.push(
            bella(orderSummary(), [
              { label: copy.showReady, value: "ready" },
              { label: copy.showKeepBrowsing, value: "browse" },
            ]),
          );
        }
        if (value === "browse") return { bot, after: () => goHash("#order") };
        break;
    }
    return { bot };
  };

  const goHash = (hash: string) => {
    onClose();
    router.push(`/${hash}`);
  };

  const handleReply = (value: string, label: string) => {
    setMessages((m) => [...m, { id: idRef.current++, sender: "user", text: label }]);
    setTyping(true);
    const { bot, after } = reduce(value);
    window.setTimeout(() => {
      setMessages((m) => [...m, ...bot]);
      setTyping(false);
      after?.();
    }, 700);
  };

  const handleFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { id: idRef.current++, sender: "user", text }]);
    setTyping(true);

    // During the first question, warmly acknowledge free-form input and offer
    // to jump into recommendations. Elsewhere, gently point back to the chips.
    if (stepRef.current === "diet") {
      const ack = bella(
        copy.freeTextAck,
        [{ label: copy.freeTextAckSuggest, value: "skip" }, ...copy.diet],
      );
      window.setTimeout(() => {
        setMessages((m) => [...m, ack]);
        setTyping(false);
      }, 600);
      return;
    }

    const lastWithReplies = [...messages].reverse().find((m) => m.sender === "bella" && (m.replies || m.itemCards));
    const nudge = bella(
      copy.freeTextNudge,
      lastWithReplies?.replies,
      lastWithReplies?.itemCards,
    );
    window.setTimeout(() => {
      setMessages((m) => [...m, nudge]);
      setTyping(false);
    }, 600);
  };

  return (
    <motion.aside
      role="dialog"
      aria-label={copy.bellaAlt}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-y-0 right-0 z-[80] flex h-[100dvh] w-full flex-col bg-[#FFF8F0] shadow-[-20px_0_60px_-24px_rgba(42,36,32,0.5)] sm:w-[400px]"
      style={{ backgroundImage: "linear-gradient(180deg, #FFF8F0 0%, #FBEFE2 100%)" }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[#EADFD0] bg-white/70 px-4 py-3 backdrop-blur">
        <BellaAvatar className="h-12 w-12 ring-2 ring-[#E8A548]" sizes="48px" />
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-curry-display)] text-[18px] font-bold leading-none text-[#2A2420]">Bella</p>
          <p className="text-[12px] text-[#8A7D71]">{copy.headerSubtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeChat}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A4F47] transition-colors hover:bg-[#F3E6D6]"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        {messages.map((msg, i) => (
          <Bubble key={msg.id} msg={msg} isLast={i === messages.length - 1 && !typing} onReply={handleReply} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {/* Input */}
      <form onSubmit={handleFreeText} className="flex shrink-0 items-center gap-2 border-t border-[#EADFD0] bg-white/70 px-3 py-3 backdrop-blur">
        <label htmlFor="bella-input" className="sr-only">
          {copy.messageLabel}
        </label>
        <input
          id="bella-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.inputPlaceholder}
          className="min-w-0 flex-1 rounded-full border border-[#E4D5C3] bg-white px-4 py-2.5 text-[14px] text-[#2A2420] outline-none placeholder:text-[#B4A798] focus:border-[#C7401A]"
        />
        <button
          type="submit"
          aria-label={copy.sendMessage}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C7401A] text-white transition-colors hover:bg-[#A5330F]"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/* Message bubble                                                      */
/* ------------------------------------------------------------------ */

function Bubble({
  msg,
  isLast,
  onReply,
}: {
  msg: BellaMsg;
  isLast: boolean;
  onReply: (value: string, label: string) => void;
}) {
  if (msg.sender === "user") {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#C7401A] px-4 py-2.5 text-[14px] font-medium text-white">
          {msg.text}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
      <BellaAvatar className="mt-0.5 h-8 w-8" sizes="32px" />
      <div className="min-w-0 flex-1">
        {msg.text && (
          <div className="inline-block max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-[#EADFD0] bg-white px-4 py-2.5 text-[14px] leading-relaxed text-[#2A2420]">
            {msg.text}
          </div>
        )}

        {msg.itemCards && msg.itemCards.length > 0 && (
          <div className="mt-2 space-y-2">
            {msg.itemCards.map((id) => {
              const item = getItem(id);
              if (!item) return null;
              return <RecCard key={id} item={item} isLast={isLast} onReply={onReply} />;
            })}
          </div>
        )}

        {isLast && msg.replies && msg.replies.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {msg.replies.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => onReply(r.value, r.label)}
                className="rounded-full border border-[#C7401A]/40 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#C7401A] transition-colors hover:bg-[#C7401A] hover:text-white"
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RecCard({
  item,
  isLast,
  onReply,
}: {
  item: MenuItem;
  isLast: boolean;
  onReply: (value: string, label: string) => void;
}) {
  const copy = useBellaCopy();
  const { money } = useCart();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#EADFD0] bg-white p-2.5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F7EBDD]">
        <DishImage src={item.image} alt={item.name} sizes="56px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-[family-name:var(--font-curry-display)] text-[15px] font-bold text-[#2A2420]">{item.name}</p>
          <span className="shrink-0 text-[14px] font-bold text-[#C7401A]">{money(item.price)}</span>
        </div>
        <p className="line-clamp-1 text-[12px] text-[#8A7D71]">{item.description}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <DietaryTags item={item} size="xs" />
          {isLast && (
            <button
              type="button"
              onClick={() => onReply(`add:${item.id}`, copy.addLabel(item.name))}
              className="shrink-0 rounded-full bg-[#C7401A] px-3 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-[#A5330F]"
            >
              {copy.add}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator(): ReactNode {
  return (
    <div className="flex gap-2.5">
      <BellaAvatar className="h-8 w-8" sizes="32px" />
      <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[#EADFD0] bg-white px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="curry-typing-dot h-1.5 w-1.5 rounded-full bg-[#C7401A]" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}
