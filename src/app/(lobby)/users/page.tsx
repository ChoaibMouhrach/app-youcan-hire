import DataTable from "@/components/ui/data-table";
import { SearchParams, paginationLimit } from "@/config/site";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/db";
import { Role, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface UsersProps {
  searchParams: SearchParams;
}

const Users: React.FC<UsersProps> = async ({ searchParams }) => {
  const session = await getAuthUser();

  if (session?.user.role !== Role.ADMIN) {
    return redirect("/403");
  }

  const { page } = searchParams;
  const pageIndex =
    typeof page === "string" && /^\d+$/gi.test(page) && parseInt(page) > 0
      ? parseInt(page) - 1
      : 0;

  const take = paginationLimit;
  const skip = pageIndex * take;

  const [users, count] = await Promise.all([
    db.user.findMany({
      skip,
      take,
    }),
    db.user.count(),
  ]);

  return (
    <>
      <DataTable<User>
        data={users}
        columns={[
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Email Address",
            accessorKey: "email",
          },
          {
            header: "Role",
            accessorKey: "role",
          },
        ]}
        pageCount={Math.ceil(count / paginationLimit)}
        pageIndex={pageIndex}
      />
    </>
  );
};

export default Users;
