"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/toaster";

interface WrappersProps {
  children?: React.ReactNode;
}

const Wrappers: React.FC<WrappersProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default Wrappers;
