import type { ProductLine } from "@/data/types";
import type { Href } from "@/i18n/navigation";

/** Typed hrefs for the two catalog lines, so shared catalog components stay line-agnostic. */
export const catalogRoutes = {
  fire: {
    index: "/urunler",
    category: (kategori: string) => ({ pathname: "/urunler/[kategori]", params: { kategori } }),
    product: (kategori: string, slug: string) => ({
      pathname: "/urunler/[kategori]/[slug]",
      params: { kategori, slug },
    }),
  },
  safety: {
    index: "/is-guvenligi",
    category: (kategori: string) => ({ pathname: "/is-guvenligi/[kategori]", params: { kategori } }),
    product: (kategori: string, slug: string) => ({
      pathname: "/is-guvenligi/[kategori]/[slug]",
      params: { kategori, slug },
    }),
  },
} as const satisfies Record<
  ProductLine,
  { index: Href; category: (k: string) => Href; product: (k: string, s: string) => Href }
>;

export const quoteHref = (interest?: string): Href =>
  interest ? { pathname: "/teklif-al", query: { ilgi: interest } } : "/teklif-al";
