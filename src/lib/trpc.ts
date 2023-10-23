import {
  createTRPCProxyClient,
  httpBatchLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { AppRouter } from "@/server";
import { headers } from "next/headers";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: new URL("/api/trpc", process.env.NEXT_PUBLIC_API_URL).toString(),
    }),
  ],
});

export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [
    unstable_httpBatchStreamLink({
      url: new URL("/api/trpc", process.env.NEXT_PUBLIC_API_URL).toString(),
      headers() {
        const heads = new Map(headers());
        heads.set("x-trpc-source", "rsc");
        return Object.fromEntries(heads);
      },
    }),
  ],
});

export default trpc;
