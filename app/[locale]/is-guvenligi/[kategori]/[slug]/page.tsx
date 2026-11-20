import { setRequestLocale } from "next-intl/server";
import { ProductView } from "@/components/catalog/catalog-views";
import type { Locale } from "@/i18n/routing";
import { loadProduct, productMetadata, productStaticParams } from "@/lib/catalog-pages";

type Props = { params: Promise<{ locale: Locale; kategori: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return productStaticParams("safety");
}

export async function generateMetadata({ params }: Props) {
  const { locale, kategori, slug } = await params;
  return productMetadata("safety", locale, kategori, slug);
}

export default async function SafetyProductPage({ params }: Props) {
  const { locale, kategori, slug } = await params;
  setRequestLocale(locale);
  const { category, product } = await loadProduct("safety", kategori, slug);
  return <ProductView line="safety" category={category} product={product} locale={locale} />;
}
