import { getTranslations } from "next-intl/server";
import { CountUp } from "@/components/motion/count-up";
import { experienceYears, productionYears } from "@/lib/site-config";

export async function TrustStrip() {
  const t = await getTranslations("Home.trust");

  return (
    <section aria-label={t("label")} className="border-b border-border bg-surface">
      <dl className="container-page grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
        <Stat value={<CountUp value={experienceYears()} />} label={t("experience")} />
        <Stat value={<CountUp value={productionYears()} />} label={t("production")} />
        <Stat value={t("tseTitle")} label={t("tseText")} />
        <Stat value={t("certTitle")} label={t("certText")} />
      </dl>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col-reverse gap-1 px-2 py-7 sm:px-6 lg:py-9">
      <dt className="text-sm leading-snug text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{value}</dd>
    </div>
  );
}
