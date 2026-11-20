import type { ComponentProps } from "react";
import Image from "next/image";
import {
  Archive,
  BriefcaseMedical,
  Cable,
  ChefHat,
  ClipboardCheck,
  Disc3,
  DoorOpen,
  Droplets,
  Eye,
  FileCheck,
  FireExtinguisher,
  FlaskConical,
  Flashlight,
  Flame,
  Footprints,
  Gauge,
  Hand,
  HardHat,
  Lightbulb,
  Link2,
  Package,
  RefreshCw,
  Search,
  ShowerHead,
  Shirt,
  Signpost,
  Siren,
  Users,
  Waves,
  Wind,
  Wrench,
  Ambulance,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/types";
import { cn } from "@/lib/utils";

const iconMap: Record<IconName, LucideIcon> = {
  extinguisher: FireExtinguisher,
  cabinet: Archive,
  reel: Disc3,
  hose: Cable,
  foam: Droplets,
  hydrant: Waves,
  tools: Wrench,
  detection: Siren,
  suppression: ShowerHead,
  lighting: Lightbulb,
  sign: Signpost,
  door: DoorOpen,
  accessory: Package,
  firstAid: BriefcaseMedical,
  garment: Shirt,
  helmet: HardHat,
  glove: Hand,
  boot: Footprints,
  respiratory: Wind,
  chemical: FlaskConical,
  eye: Eye,
  harness: Link2,
  blanket: Flame,
  flashlight: Flashlight,
  gauge: Gauge,
  rescue: Ambulance,
  survey: Search,
  refill: RefreshCw,
  permit: FileCheck,
  drill: Users,
  kitchen: ChefHat,
};

export function ContentIcon({ name, ...props }: { name: IconName } & ComponentProps<LucideIcon>) {
  const Icon = iconMap[name] ?? ClipboardCheck;
  return <Icon aria-hidden="true" {...props} />;
}

type SvgProps = ComponentProps<"svg">;

export function FacebookIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function XIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.75Z" />
    </svg>
  );
}

export function BlogIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" strokeLinecap="round" />
      <circle cx="5" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.3Z" />
    </svg>
  );
}

/**
 * Brand logo. `auto` follows the colour theme (dark text on light, white text on dark);
 * `onDark` always uses the white-text version for ink backgrounds such as the footer.
 * Decorative here: the wrapping link carries the accessible name.
 * TODO: SVG sürümü gelirse PNG'lerin yerine kullanılmalı (daha keskin ve küçük).
 */
export function Logo({
  variant = "auto",
  className,
  priority,
}: {
  variant?: "auto" | "onDark";
  className?: string;
  priority?: boolean;
}) {
  const size = { width: 300, height: 93 };
  const imgClass = "h-full w-auto";
  return (
    <span className={cn("inline-flex h-9", className)}>
      {variant === "auto" ? (
        <>
          <Image src="/brand/tupas-logo.png" alt="" {...size} priority={priority} className={cn(imgClass, "dark:hidden")} />
          <Image
            src="/brand/tupas-logo-dark.png"
            alt=""
            {...size}
            priority={priority}
            className={cn(imgClass, "hidden dark:block")}
          />
        </>
      ) : (
        <Image src="/brand/tupas-logo-dark.png" alt="" {...size} priority={priority} className={imgClass} />
      )}
    </span>
  );
}
