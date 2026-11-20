import { Check, Factory, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/media/media-frame";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PRODUCTION_SINCE, siteConfig, telHref } from "@/lib/site-config";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.hero");
  const tc = await getTranslations("Common");
  const points = [t("points.tse"), t("points.survey"), t("points.istanbul")];

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1 bg-brand" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
            <span className="mt-2 block text-accent">{t("titleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("lead")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={{ pathname: "/teklif-al", query: { ilgi: "service:ucretsiz-kesif" } }}>{tc("freeSurvey")}</Link>
            </Button>
            <Button asChild size="lg" variant="outlineInk">
              <Link href="/teklif-al">{tc("requestQuote")}</Link>
            </Button>
            <Button asChild size="lg" variant="outlineInk">
              <a href={telHref()}>
                <Phone aria-hidden="true" />
                <span className="tabular-nums">{siteConfig.phone.display}</span>
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:block">
          <MediaFrame
            locale={locale}
            label={t("imageAlt")}
            image={{
              src: "/images/hero-itfaiyeci-yangin-tupu.jpg",
              alt: { tr: t("imageAlt"), en: t("imageAlt") },
              width: 683,
              height: 1024,
            }}
            priority
            // The column is hidden below lg; a 1px slot keeps mobile from downloading a large variant.
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, 1px"
            className="aspect-[4/5] border border-white/10 bg-white"
          />
          <div className="absolute -bottom-5 -left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-2 px-5 py-4 shadow-lift">
            <span className="grid size-10 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Factory aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm leading-tight">
              <span className="block text-lg font-bold tabular-nums">{PRODUCTION_SINCE}</span>
              <span className="text-ink-muted">{tc("inHouse")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
