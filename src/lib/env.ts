import { z } from "zod";

const schema = z.object({
  // NEXTAUTH
  NEXTAUTH_SECRET: z.string().min(1),

  // PROVIDERS
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  // SMTP
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().min(1).regex(/^\d+$/gi).transform(Number),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
});

export default schema.parse(process.env);
