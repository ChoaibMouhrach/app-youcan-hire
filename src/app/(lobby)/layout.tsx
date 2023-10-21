import LayoutDashboard from "@/components/layouts/dashboard";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutDashboard>{children}</LayoutDashboard>;
};

export default Layout;
