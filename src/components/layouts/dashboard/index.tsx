import { getAuthUser } from "@/lib/auth";
import Nav from "./nav";
import Sidebar from "./sidebar";

interface LayoutDashboardProps {
  children?: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = async ({
  children,
}) => {
  const { user } = (await getAuthUser())!;

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Nav user={user} />
      <div className="flex-1 flex items-stretch">
        <Sidebar user={user} />
        <div className="flex-1 p-4 flex flex-col gap-4">{children}</div>
      </div>
    </main>
  );
};

export default LayoutDashboard;
