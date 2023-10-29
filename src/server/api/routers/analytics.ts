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

  getYoyRevenue: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      orderBy: {
        DateCreated: "asc",
      },
    });

    const yoyArr = new Array<number>(20).fill(0);

    const yoy = (order: { DateCreated: Date; OrderTotal: number }) => {
      switch (true) {
        case order.DateCreated < new Date("2019-03-31"):
          yoyArr[0] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2019-06-30"):
          yoyArr[1] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2019-09-30"):
          yoyArr[2] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2019-12-31"):
          yoyArr[3] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2020-03-31"):
          yoyArr[4] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2020-06-30"):
          yoyArr[5] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2020-09-30"):
          yoyArr[6] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2020-12-31"):
          yoyArr[7] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2021-03-31"):
          yoyArr[8] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2021-06-30"):
          yoyArr[9] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2021-09-30"):
          yoyArr[10] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2021-12-31"):
          yoyArr[11] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2022-03-31"):
          yoyArr[12] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2022-06-30"):
          yoyArr[13] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2022-09-30"):
          yoyArr[14] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2022-12-31"):
          yoyArr[15] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2023-03-31"):
          yoyArr[16] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2023-06-30"):
          yoyArr[17] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2023-09-30"):
          yoyArr[18] += order.OrderTotal;
          break;
        case order.DateCreated < new Date("2023-12-31"):
          yoyArr[19] += order.OrderTotal;
          break;
      }
    };

    orders.map((order) => yoy(order));

    const results = new Array<number>(16).fill(0);

    for (let i = 0; i < yoyArr.length - 4; i++) {
      results[i] = yoyArr[i + 4]! / yoyArr[i]! - 1;
    }

    return results;
  }),
  getLoyaltyRevenueByCategory: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      include: {
        Customer: {
          select: {
            LoyaltyLevel: true
          }
        },
        Products: {
          select: {
            Category: true
          }
        },
      },
    });

  type CategoryDict = Record<string, number[]>;

  const categoriesByLoyalty: CategoryDict = {}

  for (const order of orders) {
    const loyalty = order.Customer.LoyaltyLevel
    const category = order.Products[0]?.Category ?? "";

    if (!Object.keys(categoriesByLoyalty).includes(category)) {
      categoriesByLoyalty[category] = [0, 0, 0, 0];
    }
    categoriesByLoyalty[category]![loyalty] += order.OrderTotal;
  }
  return categoriesByLoyalty
  }),
});
