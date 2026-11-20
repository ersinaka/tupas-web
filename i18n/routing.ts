import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  // Keys are the internal (file-system) routes, values are the public URLs per locale.
  pathnames: {
    "/": "/",
    "/urunler": { tr: "/urunler", en: "/products" },
    "/urunler/[kategori]": { tr: "/urunler/[kategori]", en: "/products/[kategori]" },
    "/urunler/[kategori]/[slug]": {
      tr: "/urunler/[kategori]/[slug]",
      en: "/products/[kategori]/[slug]",
    },
    "/hizmetler": { tr: "/hizmetler", en: "/services" },
    "/hizmetler/[slug]": { tr: "/hizmetler/[slug]", en: "/services/[slug]" },
    "/is-guvenligi": { tr: "/is-guvenligi", en: "/safety-equipment" },
    "/is-guvenligi/[kategori]": {
      tr: "/is-guvenligi/[kategori]",
      en: "/safety-equipment/[kategori]",
    },
    "/is-guvenligi/[kategori]/[slug]": {
      tr: "/is-guvenligi/[kategori]/[slug]",
      en: "/safety-equipment/[kategori]/[slug]",
    },
    "/hakkimizda": { tr: "/hakkimizda", en: "/about" },
    "/belgeler": { tr: "/belgeler", en: "/certificates" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/iletisim": { tr: "/iletisim", en: "/contact" },
    "/teklif-al": { tr: "/teklif-al", en: "/request-a-quote" },
    "/kvkk": { tr: "/kvkk-aydinlatma-metni", en: "/kvkk-notice" },
    "/gizlilik": { tr: "/gizlilik-politikasi", en: "/privacy-policy" },
    "/cerez": { tr: "/cerez-politikasi", en: "/cookie-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
