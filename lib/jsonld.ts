import type {
  Article,
  BreadcrumbList,
  FAQPage,
  LocalBusiness,
  Organization,
  Product,
  Service,
  WithContext,
} from "schema-dts";
import type { Faq, Product as ProductData, Service as ServiceData } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { loc } from "@/lib/content";
import { fullAddress, siteConfig } from "@/lib/site-config";

const ORG_ID = `${siteConfig.url}/#organization`;
const BUSINESS_ID = `${siteConfig.url}/#localbusiness`;

const sameAs = () =>
  Object.values(siteConfig.social).filter((v): v is string => typeof v === "string" && v.length > 0);

const postalAddress = () => ({
  "@type": "PostalAddress" as const,
  streetAddress: `${siteConfig.address.street}, ${siteConfig.address.neighborhood}`,
  addressLocality: siteConfig.address.district,
  addressRegion: siteConfig.address.city,
  addressCountry: siteConfig.address.countryCode,
  ...(siteConfig.address.postalCode ? { postalCode: siteConfig.address.postalCode } : {}),
});

export function organizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.brandName,
    url: siteConfig.url,
    foundingDate: String(siteConfig.foundingYear),
    telephone: siteConfig.phone.e164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.logo ? { logo: `${siteConfig.url}${siteConfig.logo}` } : {}),
    address: postalAddress(),
    sameAs: sameAs(),
  };
}

export function localBusinessJsonLd(locale: Locale): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.legalName,
    url: `${siteConfig.url}/${locale}`,
    telephone: siteConfig.phone.e164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: postalAddress(),
    ...(siteConfig.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng } }
      : {}),
    ...(siteConfig.openingHours ? { openingHours: [...siteConfig.openingHours.schema] } : {}),
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      ...siteConfig.serviceAreas.map((d) => ({ "@type": "AdministrativeArea" as const, name: d })),
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
    parentOrganization: { "@id": ORG_ID },
    sameAs: sameAs(),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: Faq[], locale: Locale): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: loc(f.question, locale),
      acceptedAnswer: { "@type": "Answer", text: loc(f.answer, locale) },
    })),
  };
}

export function productJsonLd(
  product: ProductData,
  locale: Locale,
  { url, categoryName }: { url: string; categoryName: string },
): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: loc(product.name, locale),
    description: loc(product.summary, locale),
    url,
    category: categoryName,
    ...(product.image ? { image: `${siteConfig.url}${product.image.src}` } : {}),
    brand: { "@type": "Brand", name: siteConfig.shortName },
    ...(product.inHouse ? { manufacturer: { "@id": ORG_ID } } : {}),
    ...(product.specs?.length
      ? {
          additionalProperty: product.specs.map((s) => ({
            "@type": "PropertyValue" as const,
            propertyID: s.key,
            value: loc(s.value, locale),
          })),
        }
      : {}),
  };
}

export function serviceJsonLd(service: ServiceData, locale: Locale, url: string): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: loc(service.name, locale),
    description: loc(service.summary, locale),
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "İstanbul" },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  locale: Locale;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: input.locale,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: `${input.url}/opengraph-image`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
