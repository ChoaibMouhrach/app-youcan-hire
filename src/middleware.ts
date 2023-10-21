import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async (req) => {
    const isAuth = await getToken({ req });
    const isAuthPage = req.nextUrl.pathname === "/sign-in";

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;

      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
