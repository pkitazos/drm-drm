import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 12;

export const analyticsRouter = createTRPCRouter({});
