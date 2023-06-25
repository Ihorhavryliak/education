import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "~/server/api/routers/course.router";
import { generalProgramRouter } from "./routers/general.router";
import { programRouter } from "./routers/program.router";
import { userRouter } from "./routers/user.router";
import { exampleRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  generalProgram: generalProgramRouter,
  program: programRouter,
  user: userRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
