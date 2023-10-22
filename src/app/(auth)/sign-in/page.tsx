"use client";

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type Payload = z.infer<typeof schema>;

interface SignInProps {
  searchParams: {
    from?: string;
  };
}

const SignIn: React.FC<SignInProps> = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const callbackUrl = useMemo(() => {
    return searchParams.from || "/";
  }, [searchParams.from]);

  const form = useForm<Payload>({
    resolver: zodResolver(schema),
    values: {
      email: "",
    },
  });

  const onGithub = async () => {
    setIsGithubLoading(true);
    try {
      await signIn("github", {
        redirect: false,
        callbackUrl,
      });
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setIsGithubLoading(false);
  };

  const onSubmit = async ({ email }: Payload) => {
    setIsLoading(true);
    try {
      await signIn("email", {
        redirect: false,
        callbackUrl,
        email,
      });
      toast.success("Check your email for the magic link!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 w-full max-w-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Link href="/" className="mx-auto">
          <Logo />
        </Link>

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-xl text-primary font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="example@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button isLoading={isLoading}>Sign In With Email</Button>
        </div>

        <div className="flex items-center gap-4">
          <Separator className="shrink" />
          <p className="whitespace-nowrap text-sm text-muted-foreground">
            OR SIGN IN WITH
          </p>
          <Separator className="shrink" />
        </div>

        <Button
          isLoading={isGithubLoading}
          type="button"
          onClick={onGithub}
          variant="outline"
        >
          {!isGithubLoading && <GithubIcon className="w-4 h-4" />}
          Github
        </Button>
      </form>
    </Form>
  );
};

export default SignIn;
