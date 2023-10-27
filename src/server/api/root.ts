import { createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/products";
import { analyticsRouter } from "./routers/analytics";
import { customerRouter } from "./routers/customers";
import { orderRouter } from "./routers/orders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  analytics: analyticsRouter,
  customers: customerRouter,
  orders: orderRouter,
  products: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
