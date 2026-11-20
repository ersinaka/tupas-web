import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="container-page relative py-24 sm:py-32">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-muted">{t("text")}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">{t("home")}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <Link href="/urunler">
              {t("products")} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <Link href="/iletisim">{t("contact")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
