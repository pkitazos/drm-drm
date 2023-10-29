import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
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
                            avatar: true
                        }
                    }
                }
            }
        }
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
                            LoyaltyLevel: true
                        }
                    }
                }
            }
        }
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
          role: true
        }
      });
    }),
});
