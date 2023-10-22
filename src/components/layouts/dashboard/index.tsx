import { Button } from "@/components/ui/button";
import { LayoutPanelLeft, Users } from "lucide-react";
import Link from "next/link";
import Nav from "./nav";

interface LayoutDashboardProps {
  children?: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Nav />
      <div className="flex-1 flex items-stretch">
        <div className="w-80 border-r p-4 flex flex-col gap-2">
          {[
            {
              name: "Dashboard",
              href: "/",
              icon: LayoutPanelLeft,
            },
            {
              name: "Condidats",
              href: "/",
              icon: Users,
            },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">{children}</div>
      </div>
    </main>
  );
};

export default LayoutDashboard;
