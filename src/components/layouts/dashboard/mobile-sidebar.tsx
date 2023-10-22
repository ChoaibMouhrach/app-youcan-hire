"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sidebarLinks } from "@/config/site";
import { SidebarItem } from "./sidebar";
import { Menu } from "lucide-react";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-start">Navigations</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col gap-2">
          {sidebarLinks.map((link, index) => (
            <SidebarItem link={link} key={index} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
