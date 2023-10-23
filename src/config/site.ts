import { LayoutPanelLeft, LucideIcon, Users } from "lucide-react";

export interface SidebarLink {
  icon: LucideIcon;
  title: string;
  href: string;
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
  },
];
