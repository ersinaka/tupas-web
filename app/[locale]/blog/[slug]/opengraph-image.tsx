import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPost } from "@/lib/blog";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.brandName;

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const [post, t] = await Promise.all([getPost(locale, slug), getTranslations({ locale, namespace: "Blog" })]);
  return renderOgImage({
    locale,
    eyebrow: t("title"),
    title: post?.meta.title ?? siteConfig.brandName,
    footer: siteConfig.brandName,
  });
}
