import { getAuthUser } from "@/lib/auth";
import { serverClient } from "@/lib/trpc";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const Users: React.FC = async () => {
  const session = await getAuthUser();

  if (session?.user.role !== Role.ADMIN) {
    return redirect("/403");
  }

  const users = await serverClient.users.index.query();
  return <div>{JSON.stringify(users)}</div>;
};

export default Users;
