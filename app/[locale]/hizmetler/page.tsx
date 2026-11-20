import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceCard } from "@/components/cards/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSection } from "@/components/sections/home-sections";
import { PageHeader } from "@/components/sections/page-header";
import type { Locale } from "@/i18n/routing";
import { getServices, loc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.services" });
  return buildMetadata({ locale, href: "/hizmetler", title: t("title"), description: t("description") });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");
  const tc = await getTranslations("Common");
  const services = await getServices();

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("title"), href: "/hizmetler" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="container-page py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard
                href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }}
                icon={s.icon}
                name={loc(s.name, locale)}
                summary={loc(s.summary, locale)}
                cta={tc("learnMore")}
                index={i}
              />
            </li>
          ))}
        </ul>
      </section>
      <ProcessSection />
      <CtaBand />
    </>
  );
}
