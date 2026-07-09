import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/enoteca/SiteChrome";
import { ProductView } from "@/components/enoteca/ProductView";
import { WINES, getWineBySlug, getCategory, getRelated } from "@/data/productData";

export function generateStaticParams() {
  return WINES.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wine = getWineBySlug(slug);
  if (!wine) return { title: "Prodotto non trovato — Il Tempio di Vino" };
  return {
    title: `${wine.name} — ${wine.producer} | Il Tempio di Vino`,
    description: wine.tastingNotes,
    alternates: { canonical: `/prodotto/${wine.slug}` },
    openGraph: {
      title: `${wine.name} — ${wine.producer}`,
      description: wine.tastingNotes,
      images: [{ url: wine.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wine = getWineBySlug(slug);
  if (!wine) notFound();

  const category = getCategory(wine.category);
  if (!category) notFound();

  const related = getRelated(wine, 4);

  return (
    <SiteChrome>
      <ProductView wine={wine} category={category} related={related} />
    </SiteChrome>
  );
}
