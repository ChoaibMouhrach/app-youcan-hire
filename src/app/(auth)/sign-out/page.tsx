"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
      toast.success("We'll miss you 😢");
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-md w-full flex flex-col gap-6">
      <Button variant="outline" onClick={handleSignOut} isLoading={isLoading}>
        {!isLoading && <DoorOpen className="w-4 h-4" />}
        Sign Out
      </Button>
      <div className="flex items-center gap-4">
        <Separator className="shrink" />
        <p className="text-sm text-muted-foreground">OR</p>
        <Separator className="shrink" />
      </div>
      <Button onClick={handleBack} isLoading={isLoading}>
        {!isLoading && <ArrowLeft className="w-4 h-4" />} Go Home
      </Button>
    </div>
  );
};

export default SignOut;
