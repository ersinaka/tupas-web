import type { Metadata } from "next";
import { getPathname, type Href } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { truncate } from "@/lib/utils";

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export const ogLocale: Record<Locale, string> = { tr: "tr_TR", en: "en_US" };

export function pathFor(locale: Locale, href: Href) {
  return getPathname({ locale, href });
}

export function absoluteUrl(locale: Locale, href: Href) {
  return `${siteConfig.url}${pathFor(locale, href)}`;
}

/** Appends the brand when it fits in 60 characters; otherwise keeps the page title alone. */
export function formatTitle(title: string) {
  const branded = `${title} | ${siteConfig.shortName}`;
  if (branded.length <= TITLE_MAX) return branded;
  return truncate(title, TITLE_MAX);
}

type BuildMetadataInput = {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  /** Skip the " | Tüpaş" suffix (e.g. on the home page where the brand is already present). */
  rawTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Internal route of a segment-level opengraph-image (defaults to the locale-wide image). */
  ogImage?: string;
};

export function buildMetadata({
  locale,
  href,
  title,
  description,
  rawTitle,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  ogImage,
}: BuildMetadataInput): Metadata {
  const fullTitle = rawTitle ? truncate(title, TITLE_MAX) : formatTitle(title);
  const desc = truncate(description, DESCRIPTION_MAX);
  const url = absoluteUrl(locale, href);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, href);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, href);

  const image = {
    url: ogImage ?? `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: siteConfig.brandName,
  };

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.brandName,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      site: "@tupasyangin",
      images: [image.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
