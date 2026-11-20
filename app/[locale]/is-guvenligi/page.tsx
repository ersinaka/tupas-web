import { setRequestLocale } from "next-intl/server";
import { CatalogIndex } from "@/components/catalog/catalog-views";
import type { Locale } from "@/i18n/routing";
import { catalogIndexMetadata } from "@/lib/catalog-pages";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return catalogIndexMetadata("safety", locale);
}

export default async function SafetyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CatalogIndex line="safety" locale={locale} />;
}
