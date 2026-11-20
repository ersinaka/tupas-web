import { setRequestLocale } from "next-intl/server";
import { CategoryView } from "@/components/catalog/catalog-views";
import type { Locale } from "@/i18n/routing";
import { categoryMetadata, categoryStaticParams, loadCategory } from "@/lib/catalog-pages";

type Props = { params: Promise<{ locale: Locale; kategori: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams("fire");
}

export async function generateMetadata({ params }: Props) {
  const { locale, kategori } = await params;
  return categoryMetadata("fire", locale, kategori);
}

export default async function FireCategoryPage({ params }: Props) {
  const { locale, kategori } = await params;
  setRequestLocale(locale);
  const category = await loadCategory("fire", kategori);
  return <CategoryView line="fire" category={category} locale={locale} />;
}
