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
  .query("getDefaultAnime", {
    resolve({ ctx }) {
      return ctx.prisma.animes.findMany({
        skip: 0,
        take: 8,
        orderBy: { popularity_rank: "asc" },
      });
    },
  })
  .mutation("getMany", {
    input: z.object({
      page: z.number().default(8),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.animes.findMany({
        skip: input.page,
        take: 8,
        orderBy: { popularity_rank: "asc" },
      });
    },
  })
  .mutation("likeAnime", {
    input: z.object({
      animeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.userAnime.create({
        data: {
          animeId: input.animeId,
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .query("getLikedAnime", {
    async resolve({ ctx }) {
      return await ctx.prisma.userAnime.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          anime: true,
        },
      });
    },
  });
