"use client";

import { Button } from "@/components/ui/button";
import { SidebarLink, sidebarLinks } from "@/config/site";
import { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface SidebarItemProps {
  link: SidebarLink;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  link: { title, href, icon: Icon },
}) => {
  const pathname = usePathname();

  let isActive = useMemo(() => {
    let isActive = false;

    if (pathname.startsWith(href)) {
      isActive = true;

      if (href === "/" && pathname !== "/") {
        isActive = false;
      }
    }

    return isActive;
  }, [pathname, href]);

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className="justify-start"
      asChild
    >
      <Link href={href}>
        <Icon className="w-4 h-4" />
        {title}
      </Link>
    </Button>
  );
};

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="w-72 border-r p-4 flex-col gap-2 hidden lg:flex ">
      {sidebarLinks.map((link, index) =>
        link.roles && !link.roles.includes(user.role) ? null : (
          <SidebarItem key={index} link={link} />
        ),
      )}
    </div>
  );
};

export default Sidebar;
