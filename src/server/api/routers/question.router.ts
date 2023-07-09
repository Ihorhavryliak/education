import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedAdminProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  create: protectedAdminProcedure
    .input(
      z.object({
        curseId: z.number(),
        name: z.string(),
        answer: z.string(),
        sort: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          name: input.name,
          answer: input.answer,
          sort: input.sort,
          curseId: input.curseId,
        },
      });
    }),

  update: protectedAdminProcedure
    .input(
      z.object({
        id: z.string(),
        curseId: z.number(),
        name: z.string(),
        answer: z.string(),
        sort: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.question.update({
        where: {
          id: +input.id,
        },
        data: {
          name: input.name,
          answer: input.answer,
          sort: input.sort,
          curseId: input.curseId,
        },
      });
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.question.findFirst({
        where: {
          id: +input.questionId,
        },
      });
    }),
    delete: protectedAdminProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.question.delete({
        where: {
          id: +input.questionId,
        }
      });
    }),
});
