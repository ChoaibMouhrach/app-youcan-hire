import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, LayoutPanelLeft } from "lucide-react";
import Logo from "@/components/shared/logo";
import MobileSideBar from "./mobile-sidebar";
import { getAuthUser } from "@/lib/auth";

const Nav: React.FC = async () => {
  const { user } = (await getAuthUser())!;

  return (
    <nav className="h-16 border-b shrink-0 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <MobileSideBar />
        </div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="select-none">
            <Avatar>
              {user?.image && <AvatarImage src={user.image} />}
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase() ?? "UK"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.role}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-muted-foreground font-normal">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LayoutPanelLeft className="w-4 h-4 mr-2" /> Dashboatd
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-out">
                <DoorOpen className="w-4 h-4 mr-2" /> Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
