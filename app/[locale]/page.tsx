import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import {
  CategoriesSection,
  FaqSection,
  ProcessSection,
  QuoteSection,
  SectorsSection,
  ServicesSection,
  WhySection,
} from "@/components/sections/home-sections";
import { TrustStrip } from "@/components/sections/trust-strip";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import { getHomeFaqs } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.home" });
  return buildMetadata({ locale, href: "/", title: t("title"), description: t("description"), rawTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqs = await getHomeFaqs();

  return (
    <>
      <Hero locale={locale} />
      <TrustStrip />
      <ServicesSection locale={locale} />
      <CategoriesSection locale={locale} />
      <WhySection />
      <ProcessSection />
      <SectorsSection locale={locale} />
      <FaqSection locale={locale} faqs={faqs} />
      <QuoteSection locale={locale} />
      <JsonLd data={localBusinessJsonLd(locale)} />
    </>
  );
}
