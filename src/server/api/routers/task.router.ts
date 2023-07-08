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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          sort: input.sort,
          video: input.video,
        },
      });
    }),
  updateSolution: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        solution: z.string(),
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
    .input(z.object({ curseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.curse.findFirst({
        where: {
          id: +input.curseId,
        },
        include: {
          task: true,
          question: true,
          program: true,
        },
      });
    }),
});
