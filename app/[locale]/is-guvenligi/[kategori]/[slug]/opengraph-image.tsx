import type { Locale } from "@/i18n/routing";
import { productOgContent } from "@/lib/catalog-pages";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.brandName;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; kategori: string; slug: string }>;
}) {
  const { locale, kategori, slug } = await params;
  const content = await productOgContent("safety", locale, kategori, slug);
  return renderOgImage({ locale, ...content, footer: `${siteConfig.brandName} · ${siteConfig.phone.display}` });
}
