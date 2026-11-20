import { FileCheck } from "lucide-react";
import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { quoteHref } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.certificates" });
  return buildMetadata({ locale, href: "/belgeler", title: t("title"), description: t("description") });
}

export default async function CertificatesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Certificates");
  const format = await getFormatter();

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("title"), href: "/belgeler" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="container-page py-16 sm:py-20">
        <ul className="grid gap-4 md:grid-cols-3">
          {siteConfig.certifications.map((cert) => (
            <li key={cert.id} className="flex flex-col rounded-2xl border border-border bg-surface shadow-soft">
              {/* TODO: belge taraması eklenince görsel/PDF bağlantısı burada gösterilecek. */}
              <div
                role="img"
                aria-label={t("documentPending")}
                className="bg-hatch grid aspect-[3/2] place-items-center rounded-t-2xl bg-surface-2 text-muted-foreground"
              >
                <FileCheck aria-hidden="true" className="size-10 opacity-60" strokeWidth={1.4} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl">
                  {cert.name}
                  {cert.standard && cert.standard !== cert.name ? (
                    <span className="ml-2 text-base font-semibold text-muted-foreground">{cert.standard}</span>
                  ) : null}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`items.${cert.id}`)}</p>
                <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cert.validUntil
                    ? t("validUntil", { date: format.dateTime(new Date(cert.validUntil), { dateStyle: "long" }) })
                    : t("validityPending")}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button asChild size="lg" variant="secondary">
            <Link href={quoteHref("other")}>{t("requestCopy")}</Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
