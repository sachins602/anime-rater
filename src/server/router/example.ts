import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
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
  .query("getAnimeById", {
    input: z
      .object({
        id: z.string().nullish(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      return ctx.prisma.animes.findFirst({
        where: {
          id: input?.id || "",
        },
      });
    },
  });
