import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "~/server/api/routers/course.router";
import { generalProgramRouter } from "./routers/general.router";
import { programRouter } from "./routers/program.router";
import { completeRouter } from "./routers/complete.route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  generalProgram: generalProgramRouter,
  program: programRouter,
  complete: completeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
