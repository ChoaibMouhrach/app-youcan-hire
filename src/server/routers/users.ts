import db from "@/lib/db";
import { adminProcedure, router } from "../trpc";

const index = adminProcedure.query(async () => {
  return await db.user.findMany();
});

export const usersRouter = router({
  index,
});
