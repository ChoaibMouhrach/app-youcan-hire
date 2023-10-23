import AppRouter from "next/dist/client/components/app-router";
import { usersRouter } from "./routers/users";
import { router } from "./trpc";

export const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
