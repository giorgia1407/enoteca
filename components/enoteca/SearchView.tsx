"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { WINES, CATEGORIES } from "@/data/productData";
import { useI18n } from "./i18n";
import { ProductCard } from "./ProductCard";
import { SearchIcon, ChevronRight } from "./Icons";

function matches(term: string) {
  const q = term.toLowerCase();
  return WINES.filter((w) => {
    const hay = [
      w.name,
      w.producer,
      w.region ?? "",
      w.subcategory ?? "",
      w.denomination ?? "",
      ...(w.grapeVarieties ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function SearchView() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);

  const results = useMemo(() => (q.trim() ? matches(q.trim()) : WINES), [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = input.trim();
    router.push(term ? `/cerca?q=${encodeURIComponent(term)}` : "/cerca");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
      <nav className="flex items-center gap-1.5 text-[12.5px] text-charcoal-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-wine">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-charcoal">{t("nav.catalog")}</span>
      </nav>

      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[30px] font-bold text-wine md:text-[38px]">
        {q ? `“${q}”` : t("nav.catalog")}
      </h1>

      <form onSubmit={submit} className="relative mt-5 max-w-xl">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("nav.search")}
          aria-label={t("nav.search")}
          className="h-12 w-full rounded-full border border-line bg-white pl-5 pr-12 text-[15px] text-charcoal placeholder:text-charcoal-soft focus:border-wine focus:outline-none"
        />
        <button
          type="submit"
          aria-label={t("nav.search")}
          className="absolute right-1.5 top-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-wine text-white transition-colors hover:bg-wine-deep"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </form>

      {/* Category chips */}
      <div className="curry-no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/categoria/${c.slug}`}
            className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-charcoal transition-colors hover:border-wine hover:text-wine"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-[14px] text-charcoal-soft">
        <span className="font-bold text-charcoal">{results.length}</span>{" "}
        {results.length === 1 ? t("cat.result") : t("cat.results")}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="text-[15px] text-charcoal-soft">{t("cat.empty")}</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {results.map((w, i) => (
            <ProductCard key={w.id} wine={w} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
