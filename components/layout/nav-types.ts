import type { IconName } from "@/data/types";

export type NavCategory = { slug: string; name: string; icon: IconName };
export type NavService = { slug: string; name: string; icon: IconName };

export type NavData = {
  fire: NavCategory[];
  services: NavService[];
  catalogUrl: string;
  phone: { display: string; href: string };
};
