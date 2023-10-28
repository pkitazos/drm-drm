import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
    getOrdersAndAddress: publicProcedure
    .query(async ({ ctx}) => {
        return await ctx.db.order.findMany({
            include: {
                ShippingAddress: {
                    select: {
                        lat: true,
                        lon: true
                    }
                }
            }
        });
      }),

    getOrdersAndPrice: publicProcedure
    .query(async ({ ctx}) => {
        return await ctx.db.order.findMany({
            include: {
                Products: {
                    select: {
                        Category: true
                    }
                }
            },
            orderBy: {
                DateCreated:"asc"
            }
        });
      }),
});
