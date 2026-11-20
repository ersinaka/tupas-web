import { getTranslations } from "next-intl/server";
import { WhatsappIcon } from "@/components/icons";
import { whatsappHref } from "@/lib/site-config";

/** Floating WhatsApp button. Hidden entirely while `siteConfig.whatsapp` is not set. */
export async function WhatsappButton() {
  const href = whatsappHref();
  if (!href) return null;
  const t = await getTranslations("Common");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#1f8a4c] px-4 text-sm font-semibold text-white shadow-lift transition-colors hover:bg-[#18733f]"
    >
      <WhatsappIcon className="size-5" />
      <span className="hidden sm:inline">{t("whatsapp")}</span>
      <span className="sr-only sm:hidden">{t("whatsapp")}</span>
      <span className="sr-only">{t("opensInNewTab")}</span>
    </a>
  );
}
