import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedAdminProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: protectedAdminProcedure
    .input(
      z.object({
        name: z.string(),
        sort: z.number(),
        description: z.string(),
        video: z.string(),
        curseId: z.number(),
        videoSolution: z.string(),
        lessonSolution: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          name: input.name,
          video: input.video,
          description: input.description,
          sort: input.sort,
          curseId: input.curseId,
          videoSolution: input.videoSolution,
          lessonSolution: input.lessonSolution,
        },
      });
    }),

  update: protectedAdminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        sort: z.number(),
        description: z.string(),
        video: z.string(),
        curseId: z.number(),
        videoSolution: z.string(),
        lessonSolution: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          video: input.video,
          description: input.description,
          sort: input.sort,
          curseId: input.curseId,
          videoSolution: input.videoSolution,
          lessonSolution: input.lessonSolution,
        },
      });
    }),
  updateSolution: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        solution: z.string().max(2000),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          solution: input.solution,
        },
      });
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findFirst({
        where: {
          id: +input.taskId,
        }
      });
    }),
    delete: protectedAdminProcedure
    .input(z.object({ taskId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: {
          id: +input.taskId,
        }
      });
    }),
});
