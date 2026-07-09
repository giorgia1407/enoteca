import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { SearchView } from "@/components/enoteca/SearchView";

export const metadata: Metadata = {
  title: "Catalogo — Il Tempio di Vino",
  description: "Cerca tra oltre 500 etichette: vini, bollicine, distillati e liquori italiani.",
  alternates: { canonical: "/cerca" },
};

export default function SearchPage() {
  return (
    <SiteChrome>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-16 md:px-8" />}>
        <SearchView />
      </Suspense>
    </SiteChrome>
  );
}
