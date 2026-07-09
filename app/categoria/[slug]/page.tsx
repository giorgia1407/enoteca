import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { CategoryView } from "@/components/enoteca/CategoryView";
import { CATEGORIES, getCategory, getWinesByCategory } from "@/data/productData";

export function generateStaticParams() {
  // Only prerender categories that actually have products — empty categories
  // (vini-dolci, accessori) must never resolve to a live 0-result page.
  return CATEGORIES.filter((c) => getWinesByCategory(c.id).length > 0).map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Categoria non trovata — Il Tempio di Vino" };
  return {
    title: `${category.label} — Il Tempio di Vino`,
    description: category.description,
    alternates: { canonical: `/categoria/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    regione?: string;
    vitigno?: string;
    denominazione?: string;
    tipo?: string;
  }>;
}) {
  const { slug } = await params;
  const { regione, vitigno, denominazione, tipo } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const wines = getWinesByCategory(category.id);
  // An empty category has no live page — send visitors to a 404 rather than a
  // broken 0-result listing (these are also excluded from generateStaticParams).
  if (wines.length === 0) notFound();

  return (
    <SiteChrome>
      <CategoryView
        category={category}
        wines={wines}
        initialRegion={regione}
        initialGrape={vitigno}
        initialDenomination={denominazione}
        initialType={tipo}
      />
    </SiteChrome>
  );
}
