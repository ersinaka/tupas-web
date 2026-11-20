import { setRequestLocale } from "next-intl/server";
import { CategoryView } from "@/components/catalog/catalog-views";
import type { Locale } from "@/i18n/routing";
import { categoryMetadata, categoryStaticParams, loadCategory } from "@/lib/catalog-pages";

type Props = { params: Promise<{ locale: Locale; kategori: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams("safety");
}

export async function generateMetadata({ params }: Props) {
  const { locale, kategori } = await params;
  return categoryMetadata("safety", locale, kategori);
}

export default async function SafetyCategoryPage({ params }: Props) {
  const { locale, kategori } = await params;
  setRequestLocale(locale);
  const category = await loadCategory("safety", kategori);
  return <CategoryView line="safety" category={category} locale={locale} />;
}
