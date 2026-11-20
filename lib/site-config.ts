/**
 * Single source of truth for company facts (NAP: name, address, phone).
 * Every page, the footer, JSON-LD and e-mails read from here — never hard-code these elsewhere.
 */

export const FOUNDING_YEAR = 1983;
export const PRODUCTION_SINCE = 1989;

export type SocialLinks = {
  facebook: string | null;
  x: string | null;
  blog: string | null;
  instagram: string | null;
  linkedin: string | null;
};

export const siteConfig = {
  legalName: "Tüpaş Yangın Güvenlik Sistemleri",
  brandName: "Tüpaş Yangın Söndürme Cihazları",
  shortName: "Tüpaş",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tupas.com.tr").replace(/\/$/, ""),

  foundingYear: FOUNDING_YEAR,
  productionSince: PRODUCTION_SINCE,

  phone: {
    display: "+90 212 551 71 71",
    e164: "+902125517171",
  },
  // TODO: müşteriden alınacak (ör. "info@tupas.com.tr"). null iken e-posta hiçbir yerde gösterilmez.
  email: null as string | null,
  // TODO: müşteriden alınacak, uluslararası formatta ve yalnızca rakam (ör. "905xxxxxxxxx"). null iken buton gizlenir.
  whatsapp: null as string | null,

  address: {
    street: "Doğu Sanayi Sitesi No:18, 14. Blok",
    neighborhood: "Yenibosna",
    district: "Bahçelievler",
    city: "İstanbul",
    // TODO: posta kodu doğrulanmalı
    postalCode: null as string | null,
    countryCode: "TR",
  },
  // TODO: tesisin gerçek koordinatları doğrulanmalı. null iken harita adres araması ile açılır.
  geo: null as { lat: number; lng: number } | null,

  // TODO: çalışma saatleri müşteriden alınacak. null iken "Çalışma saatleri için arayın" metni gösterilir.
  // Örnek: { schema: ["Mo-Fr 08:30-18:00", "Sa 09:00-14:00"],
  //          display: { tr: "Pzt–Cum 08:30–18:00 · Cmt 09:00–14:00", en: "Mon–Fri 08:30–18:00 · Sat 09:00–14:00" } }
  openingHours: null as { schema: string[]; display: { tr: string; en: string } } | null,

  social: {
    facebook: "https://www.facebook.com/tupasyangin",
    x: "https://twitter.com/tupasyangin",
    blog: "https://tupasyanginsondurme.blogspot.com",
    instagram: null,
    linkedin: null,
  } satisfies SocialLinks as SocialLinks,

  catalogUrl:
    "https://www.tupas.com.tr/images/uploads/a912d78543b64d6aa958c1c25510e2c8_katalog9_merged.pdf",

  /** Dark-text logo for light backgrounds; also used in Organization JSON-LD. */
  logo: "/brand/tupas-logo.png" as string | null,
  logoOnDark: "/brand/tupas-logo-dark.png",
  icon: "/brand/tupas-icon.png",

  /** Districts mentioned naturally in copy for local SEO. Do not generate per-district pages. */
  serviceAreas: ["Bahçelievler", "Bakırköy", "Esenyurt", "Küçükçekmece", "Başakşehir"],

  certifications: [
    // TODO: doğrulanmalı — belge numarası, güncel sürüm ve geçerlilik tarihi.
    { id: "tse", name: "TSE", standard: "TS 862 EN3", validUntil: null as string | null },
    { id: "ce", name: "CE", standard: null as string | null, validUntil: null as string | null },
    { id: "iso9001", name: "ISO 9001", standard: "ISO 9001", validUntil: null as string | null },
  ],
} as const;

export const fullAddress = () => {
  const a = siteConfig.address;
  return `${a.street}, ${a.neighborhood}, ${a.district} / ${a.city}`;
};

export const telHref = () => `tel:${siteConfig.phone.e164}`;

export const whatsappHref = () =>
  siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : null;

export const mapsQuery = () =>
  siteConfig.geo
    ? `${siteConfig.geo.lat},${siteConfig.geo.lng}`
    : `Tüpaş Yangın, ${fullAddress()}`;

/** Years in business, computed from the founding year (never hard-coded). */
export function yearsSince(year: number, now: Date = new Date()) {
  return now.getFullYear() - year;
}

export const experienceYears = (now?: Date) => yearsSince(FOUNDING_YEAR, now);
export const productionYears = (now?: Date) => yearsSince(PRODUCTION_SINCE, now);
