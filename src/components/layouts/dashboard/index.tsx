import Nav from "./nav";
import Sidebar from "./sidebar";

interface LayoutDashboardProps {
  children?: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Nav />
      <div className="flex-1 flex items-stretch">
        <Sidebar />
        <div className="flex-1 p-4 flex flex-col gap-4">{children}</div>
      </div>
    </main>
  );
};

export default LayoutDashboard;
