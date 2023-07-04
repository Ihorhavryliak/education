import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "~/server/api/routers/course.router";
import { generalProgramRouter } from "./routers/general.router";
import { programRouter } from "./routers/program.router";
import { completeRouter } from "./routers/complete.route";
import { questionRouter } from "./routers/question.router";
import { taskRouter } from "./routers/task.router";

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
  question: questionRouter,
  task: taskRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
