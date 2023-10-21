import { AuthOptions } from "next-auth";
import env from "./env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import mailer from "./mailer";

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
};

export default authOptions;
