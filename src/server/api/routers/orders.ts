import { z } from "zod";
import { OrderModel } from "@prisma/schemas";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

export const orderRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input: { page } }) => {
      if (page < 0) return await ctx.db.order.findMany();

      return await ctx.db.order.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.order.findFirstOrThrow({
        where: {
          //where id = id
          Id,
        },
      });
    }),

  getByUserId: publicProcedure
    .input(z.object({ customerId: z.number() }))
    .query(async ({ ctx, input: { customerId } }) => {
      return await ctx.db.order.findFirstOrThrow({
        where: {
          //where customerId = customerId
          customerId,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ data: OrderModel }))
    .mutation(async ({ ctx, input: { data } }) => {
      return await ctx.db.order.create({
        data,
      });
    }),
});
