import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input: { page } }) => {
      if (page < 0) return await ctx.db.customer.findMany();

      return await ctx.db.customer.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.customer.findFirstOrThrow({
        where: {
          //where id = id
          Id,
        },
      });
    }),
});
