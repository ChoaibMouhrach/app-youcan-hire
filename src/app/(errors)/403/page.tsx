"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UnAuthorized: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex items-center justify-center container min-h-[100dvh]">
      <div className="max-w-sm w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-2xl font-bold">403</h1>
          <p className="text-muted-foreground">Action not allowed</p>
        </div>

        <Button onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
          Go back home
        </Button>
      </div>
    </main>
  );
};

export default UnAuthorized;
