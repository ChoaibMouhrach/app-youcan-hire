import { AuthOptions, getServerSession } from "next-auth";
import env from "./env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import mailer from "./mailer";
import { User } from "@prisma/client";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User;
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier: to, url }) => {
        await mailer.sendMail({
          to,
          from: env.SMTP_USER,
          subject: "Sign in",
          html: `<a href="${url}">Sign in</a>`,
        });
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const id = user?.id || (token?.id as string);

      const dbUser = await db.user.findUnique({
        where: {
          id,
        },
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      return dbUser;
    },
    session: ({ session, token }) => {
      session.user = token as User;
      return session;
    },
  },
};

export const getAuthUser = () => getServerSession(authOptions);

export default authOptions;
