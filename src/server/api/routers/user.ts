import { type Role } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getForId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      const data = await ctx.db.userLinking.findFirst({
        where: { userId: Id },
        include: { customer: true, user: true },
      });

      if (!data) {
        return {
          role: "Customer" as Role,
          LoyaltyLevel: 0,
        };
      }

      const { Id: customerId, addressId, avatar, LoyaltyLevel } = data.customer;

      return {
        Id: customerId,
        addressId,
        avatar,
        LoyaltyLevel,
        role: data.user.role,
      };
    }),

  getIcon: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.user.findFirstOrThrow({
        where: {
          id: Id,
        },
        include: {
          UserLinking: {
            select: {
              customer: {
                select: {
                  avatar: true,
                },
              },
            },
          },
        },
      });
    }),

  getLoyalty: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.user.findFirstOrThrow({
        where: {
          id: Id,
        },
        include: {
          UserLinking: {
            select: {
              customer: {
                select: {
                  LoyaltyLevel: true,
                  Id: true,
                  addressId: true,
                },
              },
            },
          },
        },
      });
    }),
  getRole: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: Id } }) => {
      return await ctx.db.user.findFirstOrThrow({
        where: {
          id: Id,
        },
        select: {
          role: true,
        },
      });
    }),
});
