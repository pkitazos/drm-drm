import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
    getOrdersAndAddress: publicProcedure
    .query(async ({ ctx}) => {
        return await ctx.db.order.findMany({
            include: {
                ShippingAddress: true
            }
        });
      }),
});
