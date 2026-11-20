import { Gauge, Repeat, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaFrame } from "@/components/media/media-frame";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { TrustStrip } from "@/components/sections/trust-strip";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { FOUNDING_YEAR, PRODUCTION_SINCE } from "@/lib/site-config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.about" });
  return buildMetadata({ locale, href: "/hakkimizda", title: t("title"), description: t("description") });
}

const tests = [
  { key: "pressure", Icon: Gauge },
  { key: "fatigue", Icon: Repeat },
  { key: "collapse", Icon: ShieldCheck },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const timeline = [
    { year: String(FOUNDING_YEAR), key: "founded" },
    { year: String(PRODUCTION_SINCE), key: "production" },
    { year: String(new Date().getFullYear()), key: "today" },
  ] as const;

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("eyebrow"), href: "/hakkimizda" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <TrustStrip />

      <section aria-labelledby="story-title" className="container-page py-16 sm:py-20">
        <SectionHeading id="story-title" title={t("storyTitle")} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {timeline.map((item) => (
            <li key={item.key} className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <p className="text-3xl font-extrabold tabular-nums text-brand-text">{item.year}</p>
              <h3 className="mt-3 text-lg">{t(`timeline.${item.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`timeline.${item.key}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="facility-title" className="border-y border-border bg-surface-2/60">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          {/* TODO: tesis fotoğrafı eklenecek (public/images/tesis.jpg) ve `image` prop'u ile verilecek. */}
          <MediaFrame locale={locale} label={t("facilityImageAlt")} icon="extinguisher" className="aspect-[4/3]" />
          <div>
            <SectionHeading id="facility-title" title={t("facilityTitle")} />
            <p className="mt-5 leading-relaxed text-muted-foreground">{t("facilityText")}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="quality-title" className="container-page py-16 sm:py-20">
        <SectionHeading id="quality-title" title={t("qualityTitle")} lead={t("qualityLead")} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {tests.map(({ key, Icon }) => (
            <li key={key} className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <Icon aria-hidden="true" className="size-6 text-brand-text" />
              <h3 className="mt-4 text-lg">{t(`tests.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`tests.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="values-title" className="bg-ink text-ink-foreground">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading id="values-title" title={t("valuesTitle")} tone="ink" />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {(["honest", "reachable", "standards"] as const).map((key) => (
              <li key={key} className="border-t border-white/15 pt-5">
                <h3 className="text-lg">{t(`values.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`values.${key}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
