import { ProductModel } from "@prisma/schemas";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input: { page } }) => {
      if (page < 0) return await ctx.db.product.findMany();

      return await ctx.db.product.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.db.product.findFirstOrThrow({
        where: {
          sku_id: id,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ data: ProductModel }))
    .mutation(async ({ ctx, input: { data } }) => {
      return await ctx.db.product.create({
        data,
      });
    }),
});
