import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/sections/page-header";
import type { LegalDoc } from "@/data/legal";
import type { Locale } from "@/i18n/routing";
import { getLegalDoc, loc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const hrefs = { kvkk: "/kvkk", gizlilik: "/gizlilik", cerez: "/cerez" } as const;

export async function legalMetadata(key: LegalDoc["key"], locale: Locale): Promise<Metadata> {
  const doc = await getLegalDoc(key);
  return buildMetadata({
    locale,
    href: hrefs[key],
    title: loc(doc.title, locale),
    description: loc(doc.description, locale),
  });
}

export async function LegalPage({
  docKey,
  locale,
  children,
}: {
  docKey: LegalDoc["key"];
  locale: Locale;
  children?: ReactNode;
}) {
  const doc = await getLegalDoc(docKey);
  const t = await getTranslations("Legal");
  const format = await getFormatter();
  const title = loc(doc.title, locale);

  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title, href: hrefs[docKey] }]} title={title} lead={loc(doc.description, locale)} />
      <div className="container-page max-w-3xl py-12 sm:py-16">
        <p className="text-sm text-muted-foreground">
          {t("updated", { date: format.dateTime(new Date(doc.updated), { dateStyle: "long" }) })}
        </p>
        <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent-text">{t("draftNote")}</p>
        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h2>{loc(s.heading, locale)}</h2>
              {loc(s.body, locale).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </>
  );
}
