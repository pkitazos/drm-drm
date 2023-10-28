import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  getOrdersAndAddress: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.order.findMany({
      include: {
        ShippingAddress: {
          select: {
            lat: true,
            lon: true,
          },
        },
      },
    });
  }),

  getAllOrders: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.order.findMany({
      orderBy: {
        DateCreated: "asc",
      },
    });
  }),

  getGroupedOrdersAndCategories: publicProcedure.query(async ({ ctx }) => {
    type CategoryDict = Record<string, number[]>;

    const getDataForYears = async () => {
      const yearlyData = await ctx.db.order.findMany({
        include: {
          Products: {
            select: {
              Category: true,
            },
          },
        },
      });

      const categories: CategoryDict = {};

      // {"CATE": [PRICE2019, PRICE2020, PRICE2021, PRICE2022, PRICE2023]}

      for (const data of yearlyData) {
        const year = data.DateCreated.getFullYear().toString()!;
        const category = data.Products[0]?.Category ?? "";

        if (!Object.keys(categories).includes(category)) {
          categories[category] = [0, 0, 0, 0, 0];
        }

        if (year == "2019") categories[category]![0] += data.OrderTotal;
        else if (year == "2020") categories[category]![1] += data.OrderTotal;
        else if (year == "2021") categories[category]![2] += data.OrderTotal;
        else if (year == "2022") categories[category]![3] += data.OrderTotal;
        else if (year == "2023") categories[category]![4] += data.OrderTotal;
      }

      return categories;
    };

    return await getDataForYears();
  }),
});
