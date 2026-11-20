import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapEmbed } from "@/components/contact/map-embed";
import { QuoteForm } from "@/components/forms/quote-form";
import { WhatsappIcon } from "@/components/icons";
import { PageHeader } from "@/components/sections/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import { getQuoteInterestOptions } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { fullAddress, mapsQuery, siteConfig, telHref, whatsappHref } from "@/lib/site-config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.contact" });
  return buildMetadata({ locale, href: "/iletisim", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const tc = await getTranslations("Common");
  const options = await getQuoteInterestOptions(locale);
  const whatsapp = whatsappHref();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery())}`;

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("eyebrow"), href: "/iletisim" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <section aria-labelledby="info-title">
          <h2 id="info-title" className="text-2xl">
            {t("infoTitle")}
          </h2>
          <address className="mt-6 grid gap-5 not-italic">
            <div className="flex gap-4">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-text" />
              <div>
                <p className="text-sm text-muted-foreground">{tc("phone")}</p>
                <a href={telHref()} className="text-xl font-bold tabular-nums hover:underline">
                  {siteConfig.phone.display}
                </a>
              </div>
            </div>
            {siteConfig.email ? (
              <div className="flex gap-4">
                <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-text" />
                <div>
                  <p className="text-sm text-muted-foreground">{tc("email")}</p>
                  <a href={`mailto:${siteConfig.email}`} className="font-semibold hover:underline">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            ) : null}
            {whatsapp ? (
              <div className="flex gap-4">
                <WhatsappIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-text" />
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                  {tc("whatsapp")}
                  <span className="sr-only"> {tc("opensInNewTab")}</span>
                </a>
              </div>
            ) : null}
            <div className="flex gap-4">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-text" />
              <div>
                <p className="text-sm text-muted-foreground">{tc("address")}</p>
                <p className="font-semibold">{siteConfig.legalName}</p>
                <p>{fullAddress()}</p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
                >
                  {t("openInMaps")} <ExternalLink aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">{tc("opensInNewTab")}</span>
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-text" />
              <div>
                <p className="text-sm text-muted-foreground">{tc("hours")}</p>
                <p>{siteConfig.openingHours ? siteConfig.openingHours.display[locale] : tc("hoursUnknown")}</p>
              </div>
            </div>
          </address>
          <p className="mt-8 rounded-2xl bg-surface-2/70 p-5 text-sm leading-relaxed text-muted-foreground">
            {t("serviceArea")}
          </p>
        </section>

        <section aria-labelledby="form-title" className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <h2 id="form-title" className="mb-6 text-2xl">
            {t("formTitle")}
          </h2>
          <QuoteForm options={options} />
        </section>
      </div>

      <section aria-labelledby="map-title" className="container-page pb-16 sm:pb-20">
        <h2 id="map-title" className="sr-only">
          {t("mapTitle")}
        </h2>
        <div className="h-96">
          <MapEmbed query={mapsQuery()} title={t("mapTitle")} loadLabel={t("mapLoad")} note={t("mapNote")} />
        </div>
      </section>

      <JsonLd data={localBusinessJsonLd(locale)} />
    </>
  );
}
