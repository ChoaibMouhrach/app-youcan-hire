import { Role } from "@prisma/client";
import { LayoutPanelLeft, LucideIcon, Users } from "lucide-react";

export const paginationLimit = 10;

export type SearchParams = Record<string, string | string[] | undefined>;

export interface SidebarLink {
  icon: LucideIcon;
  title: string;
  href: string;
  roles?: Role[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: LayoutPanelLeft,
    title: "Dashboard",
    href: "/",
  },
  {
    icon: Users,
    title: "Users",
    href: "/users",
    roles: [Role.ADMIN],
  },
];
