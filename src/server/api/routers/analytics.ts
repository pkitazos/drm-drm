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
    interface CategoryDict {
      [key: string]: number[];
    }

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

      for (let i = 0; i < yearlyData.length; i++) {
        let year = yearlyData[i]?.DateCreated.getFullYear().toString()!;
        let category = yearlyData[i]?.Products[0]?.Category!;

        if (!Object.keys(categories).includes(category)) {
          categories[category] = [0, 0, 0, 0, 0];
        }

        if (year == "2019")
          categories[category]![0] += yearlyData[i]?.OrderTotal!;
        else if (year == "2020")
          categories[category]![1] += yearlyData[i]?.OrderTotal!;
        else if (year == "2021")
          categories[category]![2] += yearlyData[i]?.OrderTotal!;
        else if (year == "2022")
          categories[category]![3] += yearlyData[i]?.OrderTotal!;
        else if (year == "2023")
          categories[category]![4] += yearlyData[i]?.OrderTotal!;
      }

      return categories;
    };

    return await getDataForYears();
  }),
});
