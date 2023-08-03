import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const completeRouter = createTRPCRouter({
  findComplete: protectedProcedure
    .input(z.object({ userId: z.number(), completeId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.complete.findFirst({
        where: {
          userId: input.userId,
          programId: input.completeId,
        },
      });
    }),
  findAllByUserId: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.complete.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  updateComplete: protectedProcedure
    .input(
      z.object({
        completeId: z.number(),
        theoryId: z.number().optional(),
        taskId: z.number().optional(),
        questionId: z.number().optional(),
        completeProgramId: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.theoryId) {
        return ctx.prisma.complete.update({
          where: {
            id: input.completeId,
          },
          data: {
            theoryId: input.theoryId,
          },
        });
      }
      if (input.taskId) {
        return ctx.prisma.complete.update({
          where: {
            id: input.completeId,
          },
          data: {
            taskId: input.taskId,
          },
        });
      }
      if (input.questionId) {
        return ctx.prisma.complete.update({
          where: {
            id: input.completeId,
          },
          data: {
            questionId: input.questionId,
          },
        });
      }
      if (input.completeProgramId) {
        return ctx.prisma.complete.update({
          where: {
            id: input.completeId,
          },
          data: {
            completeProgramId: input.completeProgramId,
          },
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
        programId: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.complete.create({
        data: {
          userId: input.userId,
          programId: input.programId,
        },
      });
    }),
});
