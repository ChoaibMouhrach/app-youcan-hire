import { getServerSession } from "next-auth";

export default async function Home() {
  const user = await getServerSession();
  console.log(user);

  return user?.user?.name;
}
