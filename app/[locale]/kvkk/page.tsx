import { setRequestLocale } from "next-intl/server";
import { LegalPage, legalMetadata } from "@/components/sections/legal-page";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return legalMetadata("kvkk", locale);
}

export default async function KvkkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="kvkk" locale={locale} />;
}
