import { serverClient } from "@/lib/trpc";

const Users = async () => {
  const users = await serverClient.users.index.query();

  return <div>{JSON.stringify(users)}</div>;
};

export default Users;
