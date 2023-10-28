import { Colour, Pickup, Shape } from "@prisma/client";
import { ProductModel } from "@prisma/schemas";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

export const ProductModelUpdate = z.object({
  SKU_ID: z.string(),
  ASN: z.string().optional(),
  Category: z.string().optional(),
  Online: z.boolean().optional(),
  ItemName: z.string().optional(),
  Title: z.string().optional(),
  BrandName: z.string().optional(),
  Description: z.string().nullish().optional(),
  ProductDetail: z.string().nullish().optional(),
  SalesPrice: z.number().optional(),
  PictureMain: z.string().optional(),
  QtyInStock: z.number().int().optional(),
  QtyOnOrder: z.number().int().optional(),
  Colour: z.nativeEnum(Colour).optional(),
  Pickup: z.nativeEnum(Pickup).optional(),
  BodyShape: z.nativeEnum(Shape).optional(),
  CreatedOn: z.coerce.date().optional(),
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
          SKU_ID: id,
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
          data: { SKU_ID, ...rest },
        },
      }) => {
        return await ctx.db.product.update({
          where: {
            SKU_ID,
          },
          data: rest,
        });
      },
    ),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      return await ctx.db.product.delete({
        where: { SKU_ID: id },
      });
    }),
});
