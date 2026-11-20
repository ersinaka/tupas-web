/**
 * Content access layer. Pages and components must use these functions instead of importing
 * from `/data` directly, so the source can later be swapped for a headless CMS by changing
 * only this file (the functions are async for that reason).
 */

import { fireCategories } from "@/data/fire-categories";
import { fireProducts } from "@/data/fire-products";
import { safetyCategories, safetyProducts } from "@/data/safety";
import { services } from "@/data/services";
import { homeFaqs, sectors } from "@/data/faqs";
import { legalDocs, type LegalDoc } from "@/data/legal";
import type { Category, Localized, Product, ProductLine, Service } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export const loc = <T>(value: Localized<T>, locale: Locale): T => value[locale];

const categoriesByLine: Record<ProductLine, Category[]> = {
  fire: fireCategories,
  safety: safetyCategories,
};
const productsByLine: Record<ProductLine, Product[]> = {
  fire: fireProducts,
  safety: safetyProducts,
};

export async function getCategories(line: ProductLine) {
  return categoriesByLine[line];
}

export async function getFeaturedCategories() {
  return fireCategories.filter((c) => c.featured);
}

export async function getCategory(line: ProductLine, slug: string) {
  return categoriesByLine[line].find((c) => c.slug === slug) ?? null;
}

export async function getProducts(line: ProductLine, categorySlug?: string) {
  const all = productsByLine[line];
  return categorySlug ? all.filter((p) => p.category === categorySlug) : all;
}

export async function getProduct(line: ProductLine, categorySlug: string, slug: string) {
  return productsByLine[line].find((p) => p.category === categorySlug && p.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 3) {
  const siblings = productsByLine[product.line].filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const sameSubtype = siblings.filter((p) => p.subtype && p.subtype === product.subtype);
  const rest = siblings.filter((p) => !sameSubtype.includes(p));
  return [...sameSubtype, ...rest].slice(0, limit);
}

export async function getProductCount(line: ProductLine, categorySlug: string) {
  return productsByLine[line].filter((p) => p.category === categorySlug).length;
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getHomeFaqs() {
  return homeFaqs;
}

export async function getSectors() {
  return sectors;
}

export async function getLegalDoc(key: LegalDoc["key"]) {
  return legalDocs[key];
}

/** Options for the "interested in" select of the quote form. */
export async function getQuoteInterestOptions(locale: Locale) {
  return {
    services: services.map((s) => ({ value: `service:${s.slug}`, label: loc(s.name, locale) })),
    fire: fireCategories.map((c) => ({ value: `fire:${c.slug}`, label: loc(c.name, locale) })),
    safety: safetyCategories.map((c) => ({ value: `safety:${c.slug}`, label: loc(c.name, locale) })),
  };
}

export type QuoteInterestOptions = Awaited<ReturnType<typeof getQuoteInterestOptions>>;
