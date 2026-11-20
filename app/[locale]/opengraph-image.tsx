import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.brandName;

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home.hero" });
  return renderOgImage({
    locale,
    eyebrow: `${siteConfig.shortName} · ${t("titleAccent")}`,
    title: t("title"),
    footer: `${siteConfig.phone.display} · ${new URL(siteConfig.url).host}`,
  });
}
