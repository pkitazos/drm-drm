import { z } from "zod";

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
        include: { Products: true },
      });
    }),

  getByUserId: publicProcedure
    .input(z.object({ CustomerId: z.number() }))
    .query(async ({ ctx, input: { CustomerId } }) => {
      return await ctx.db.order.findMany({
        where: {
          //where customerId = customerId
          CustomerId,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        CustomerId: z.number(),
        addressId: z.string(),
        OrderTotal: z.number(),
        products: z.array(z.object({ SKU_ID: z.string() })),
      }),
    )
    .mutation(
      async ({
        ctx,
        input: { CustomerId, addressId, products, OrderTotal },
      }) => {
        const max =
          (await ctx.db.order.aggregate({ _max: { Id: true } }))._max.Id ?? 1;

        return await ctx.db.order.create({
          data: {
            Id: max + 1,
            DateCreated: new Date(),
            OrderStatus: "Placed",
            CustomerId,
            addressId,
            OrderTotal,
            Products: {
              connect: products,
            },
          },
        });
      },
    ),
});
