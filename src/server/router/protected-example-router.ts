import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("getMany", {
    input: z.object({
      page: z.number().default(0),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.animes.findMany({
        skip: input.page,
        take: 8,
        orderBy: { popularity_rank: "desc" },
      });
    },
  });
