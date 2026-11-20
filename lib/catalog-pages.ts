import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { ProductLine } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { getCategories, getCategory, getProduct, getProducts, loc } from "@/lib/content";
import { catalogRoutes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/** Shared data loading + metadata for the fire (`/urunler`) and safety (`/is-guvenligi`) catalogs. */

const routeBase: Record<ProductLine, string> = { fire: "urunler", safety: "is-guvenligi" };

export async function catalogIndexMetadata(line: ProductLine, locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: line === "fire" ? "Meta.products" : "Meta.safety" });
  return buildMetadata({ locale, href: catalogRoutes[line].index, title: t("title"), description: t("description") });
}

export async function categoryStaticParams(line: ProductLine) {
  return (await getCategories(line)).map((c) => ({ kategori: c.slug }));
}

export async function productStaticParams(line: ProductLine) {
  return (await getProducts(line)).map((p) => ({ kategori: p.category, slug: p.slug }));
}

export async function loadCategory(line: ProductLine, kategori: string) {
  const category = await getCategory(line, kategori);
  if (!category) notFound();
  return category;
}

export async function loadProduct(line: ProductLine, kategori: string, slug: string) {
  const [category, product] = await Promise.all([getCategory(line, kategori), getProduct(line, kategori, slug)]);
  if (!category || !product) notFound();
  return { category, product };
}

export async function categoryMetadata(line: ProductLine, locale: Locale, kategori: string): Promise<Metadata> {
  const category = await getCategory(line, kategori);
  if (!category) return {};
  return buildMetadata({
    locale,
    href: catalogRoutes[line].category(kategori),
    title: loc(category.seoTitle ?? category.name, locale),
    description: loc(category.summary, locale),
  });
}

export async function productMetadata(
  line: ProductLine,
  locale: Locale,
  kategori: string,
  slug: string,
): Promise<Metadata> {
  const product = await getProduct(line, kategori, slug);
  if (!product) return {};
  return buildMetadata({
    locale,
    href: catalogRoutes[line].product(kategori, slug),
    title: loc(product.name, locale),
    description: loc(product.summary, locale),
    ogImage: `/${locale}/${routeBase[line]}/${kategori}/${slug}/opengraph-image`,
  });
}

export async function productOgContent(line: ProductLine, locale: Locale, kategori: string, slug: string) {
  const [category, product] = await Promise.all([getCategory(line, kategori), getProduct(line, kategori, slug)]);
  return {
    eyebrow: category ? loc(category.name, locale) : "",
    title: product ? loc(product.name, locale) : "",
  };
}
