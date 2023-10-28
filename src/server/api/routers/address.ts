import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.address.findFirstOrThrow({
        where: {
          id: Id,
        },
      });
    }),
});
