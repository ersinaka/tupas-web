import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

/** Dark header band used at the top of inner pages. Holds the page's only <h1>. */
export async function PageHeader({
  locale,
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" aria-hidden="true" />
      <div className="container-page relative py-10 sm:py-14">
        <Breadcrumbs locale={locale} items={crumbs} tone="ink" />
        <div className="mt-8 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl leading-tight sm:text-5xl">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{lead}</p> : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
