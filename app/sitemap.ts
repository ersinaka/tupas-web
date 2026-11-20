import type { MetadataRoute } from "next";
import type { Href } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { getCategories, getProducts, getServices } from "@/lib/content";
import { catalogRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

type Entry = { href: Href; priority: number; lastModified?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: Entry[] = [
    { href: "/", priority: 1 },
    { href: "/urunler", priority: 0.9 },
    { href: "/hizmetler", priority: 0.9 },
    { href: "/is-guvenligi", priority: 0.7 },
    { href: "/teklif-al", priority: 0.8 },
    { href: "/iletisim", priority: 0.8 },
    { href: "/hakkimizda", priority: 0.6 },
    { href: "/belgeler", priority: 0.6 },
    { href: "/blog", priority: 0.6 },
    { href: "/kvkk", priority: 0.2 },
    { href: "/gizlilik", priority: 0.2 },
    { href: "/cerez", priority: 0.2 },
  ];

  for (const s of await getServices()) {
    entries.push({ href: { pathname: "/hizmetler/[slug]", params: { slug: s.slug } }, priority: 0.8 });
  }
  for (const line of ["fire", "safety"] as const) {
    for (const c of await getCategories(line)) {
      entries.push({ href: catalogRoutes[line].category(c.slug), priority: line === "fire" ? 0.8 : 0.6 });
    }
    for (const p of await getProducts(line)) {
      entries.push({ href: catalogRoutes[line].product(p.category, p.slug), priority: line === "fire" ? 0.7 : 0.5 });
    }
  }
  // Posts exist per locale; only list slugs available in the default locale and pair them.
  for (const post of await getAllPosts(routing.defaultLocale)) {
    entries.push({
      href: { pathname: "/blog/[slug]", params: { slug: post.slug } },
      priority: 0.6,
      lastModified: post.updated ?? post.date,
    });
  }

  return entries.flatMap(({ href, priority, lastModified }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, href)])),
      },
    })),
  );
}
