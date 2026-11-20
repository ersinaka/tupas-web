import Image from "next/image";
import type { ImageAsset, IconName } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { ContentIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  image?: ImageAsset;
  locale: Locale;
  /** Accessible label used when no real image exists yet. */
  label: string;
  icon?: IconName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "ink";
};

/**
 * Renders a real product/category photo via next/image (AVIF/WebP, lazy by default),
 * or a neutral placeholder when the asset is missing.
 */
export function MediaFrame({
  image,
  locale,
  label,
  icon = "extinguisher",
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  tone = "light",
}: MediaFrameProps) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl bg-surface-2", className)}>
        <Image
          src={image.src}
          alt={image.alt[locale]}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // TODO: gerçek görsel eklenince `image` alanını doldurun (bkz. README › İçerik ekleme).
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-2xl",
        tone === "ink" ? "bg-ink-2 text-ink-muted" : "bg-surface-2 text-muted-foreground",
        className,
      )}
    >
      <div className={cn("absolute inset-0", tone === "ink" ? "bg-grid" : "bg-hatch")} aria-hidden="true" />
      <ContentIcon name={icon} className="relative size-10 opacity-60" strokeWidth={1.4} />
    </div>
  );
}
