import { getTranslations, setRequestLocale } from "next-intl/server";
import { CookiePreferencesButton } from "@/components/layout/cookie-consent";
import { LegalPage, legalMetadata } from "@/components/sections/legal-page";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return legalMetadata("cerez", locale);
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Footer");
  return (
    <LegalPage docKey="cerez" locale={locale}>
      <CookiePreferencesButton>{t("cookiePrefs")}</CookiePreferencesButton>
    </LegalPage>
  );
}
