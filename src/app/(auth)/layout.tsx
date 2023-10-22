interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="container min-h-[100dvh] flex items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
