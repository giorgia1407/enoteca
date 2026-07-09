import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { CategoryView } from "@/components/enoteca/CategoryView";
import { CATEGORIES, getCategory, getWinesByCategory } from "@/data/productData";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
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
  searchParams: Promise<{ regione?: string; vitigno?: string }>;
}) {
  const { slug } = await params;
  const { regione, vitigno } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const wines = getWinesByCategory(category.id);

  return (
    <SiteChrome>
      <CategoryView
        category={category}
        wines={wines}
        initialRegion={regione}
        initialGrape={vitigno}
      />
    </SiteChrome>
  );
}
