"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
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
      <ProgressBar
        options={{ showSpinner: false }}
        color="#B83375"
        shallowRouting
        height="4px"
      />
    </SessionProvider>
  );
};

export default Wrappers;
