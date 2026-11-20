import { ArrowRight, BadgeCheck } from "lucide-react";
import { ContentIcon } from "@/components/icons";
import { MediaFrame } from "@/components/media/media-frame";
import type { IconName, ImageAsset } from "@/data/types";
import { Link, type Href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const cardBase =
  "group relative flex h-full flex-col rounded-2xl border border-border bg-surface shadow-soft transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lift motion-reduce:hover:translate-y-0";

/** Whole card is clickable via a stretched link on the title (keeps a single tab stop). */
export function CategoryCard({
  href,
  icon,
  name,
  summary,
  meta,
  headingLevel = "h3",
}: {
  href: Href;
  icon: IconName;
  name: string;
  summary: string;
  meta?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className={cn(cardBase, "p-6")}>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand-text">
          <ContentIcon name={icon} className="size-5" />
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-text"
        />
      </div>
      <Heading className="mt-5 text-lg leading-snug">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {name}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      {meta ? <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{meta}</p> : null}
    </article>
  );
}

export function ProductCard({
  href,
  locale,
  name,
  summary,
  icon,
  image,
  badge,
  headingLevel = "h3",
}: {
  href: Href;
  locale: Locale;
  name: string;
  summary: string;
  icon: IconName;
  image?: ImageAsset;
  badge?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className={cn(cardBase, "overflow-hidden")}>
      <MediaFrame
        image={image}
        locale={locale}
        label={name}
        icon={icon}
        className="aspect-[4/3] rounded-none rounded-t-2xl"
      />
      <div className="flex flex-1 flex-col p-5">
        {badge ? (
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text">
            <BadgeCheck aria-hidden="true" className="size-4" />
            {badge}
          </p>
        ) : null}
        <Heading className="text-base leading-snug">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
            {name}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>
    </article>
  );
}

export function ServiceCard({
  href,
  icon,
  name,
  summary,
  cta,
  index,
}: {
  href: Href;
  icon: IconName;
  name: string;
  summary: string;
  cta: string;
  index?: number;
}) {
  return (
    <article className={cn(cardBase, "p-6")}>
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-ink text-accent dark:bg-surface-2">
          <ContentIcon name={icon} className="size-5" />
        </span>
        {index !== undefined ? (
          <span aria-hidden="true" className="text-sm font-bold tabular-nums text-muted-foreground/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg leading-snug">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      <p aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-text">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </article>
  );
}
