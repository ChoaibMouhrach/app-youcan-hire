import { LayoutPanelLeft, LucideIcon } from "lucide-react";

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
];
