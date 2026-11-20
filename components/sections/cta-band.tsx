import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig, telHref } from "@/lib/site-config";

export async function CtaBand({ title, text }: { title?: string; text?: string }) {
  const t = await getTranslations("CtaBand");
  const tc = await getTranslations("Common");

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl">{title ?? t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{text ?? t("text")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={{ pathname: "/teklif-al", query: { ilgi: "service:ucretsiz-kesif" } }}>{tc("freeSurvey")}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={telHref()}>
              <Phone aria-hidden="true" />
              <span className="tabular-nums">{siteConfig.phone.display}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
