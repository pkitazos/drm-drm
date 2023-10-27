import { Colour, Pickup, Shape } from "@prisma/client";
import { ProductModel } from "@prisma/schemas";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

const ProductModelUpdate = z.object({
  sku_id: z.string(),
  asn: z.string().optional(),
  category: z.string().optional(),
  online: z.boolean().optional(),
  item_name: z.string().optional(),
  title: z.string().optional(),
  brand_name: z.string().optional(),
  description: z.string().optional(),
  product_detail: z.string().optional(),
  sales_price: z.number().optional(),
  picture_main: z.string().optional(),
  qty_in_stock: z.number().int().optional(),
  qty_on_order: z.number().int().optional(),
  colour: z.nativeEnum(Colour).optional(),
  pickup: z.nativeEnum(Pickup).optional(),
  shape: z.nativeEnum(Shape).optional(),
  create_on: z.date().optional(),
  orderId: z.number().int().nullish().optional(),
});

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

  update: publicProcedure
    .input(
      z.object({
        data: ProductModelUpdate,
      }),
    )
    .mutation(
      async ({
        ctx,
        input: {
          data: { sku_id, ...rest },
        },
      }) => {
        return await ctx.db.product.update({
          where: {
            sku_id,
          },
          data: rest,
        });
      },
    ),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      return await ctx.db.product.delete({
        where: { sku_id: id },
      });
    }),
});
