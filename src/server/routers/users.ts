import db from "@/lib/db";
import { protectedProcedure, router } from "../trpc";

const index = protectedProcedure.query(async () => {
  return await db.user.findMany();
});

export const usersRouter = router({
  index,
});
