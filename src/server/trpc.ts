import authOptions from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";

export const createContext = async () => {
  const session = await getServerSession(authOptions);

  return {
    user: session?.user || null,
  };
};

const t = initTRPC.context<typeof createContext>().create();

const isAuth = t.middleware(({ ctx, next }) => {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do that",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);
