import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedAdminProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  create: protectedAdminProcedure
    .input(
      z.object({
        name: z.string(),
        video: z.string(),
        descriptionCurse: z.string(),
        title: z.string(),
        description: z.string(),
        img: z.string(),
        sort: z.number(),
        theory: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.curse.create({
        data: {
          name: input.name,
          video: input.video,
          descriptionCurse: input.descriptionCurse,
          img: input.img,
          sort: input.sort,
          theory: input.theory,
          title: input.title,
          description: input.description,
        },
      });
    }),
  update: protectedAdminProcedure
    .input(
      z.object({
        name: z.string(),
        video: z.string(),
        descriptionCurse: z.string(),
        img: z.string(),
        id: z.number(),
        sort: z.number(),
        theory: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.curse.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          video: input.video,
          descriptionCurse: input.descriptionCurse,
          img: input.img,
          sort: input.sort,
          theory: input.theory,
          title: input.title,
          description: input.description,
        },
      });
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.curse.findMany();
  }),
  getById: publicProcedure //protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/lesson/{id}",
        tags: ["lessons"],
        summary: "Get lesson by id",
      },
    })
    .input(z.object({ id: z.string() }))
    .output(
      z
        .object({
          id: z.number(),
          name: z.string(),
          descriptionCurse: z.string(),
          img: z.string().nullable(),
          rating: z.number().nullable(),
          title: z.string().nullable(),
          description: z.string().nullable(),
          updatedAt: z.date(),
          createdAt: z.date(),
          programId: z.number().nullable(),
          theory: z.string().nullable(),
          video: z.string().nullable(),
          sort: z.number().nullable(),
          url: z.string().nullable(),
          task: z.array(
            z.object({
              id: z.number(),
              video: z.string().nullable(),
              videoSolution: z.string().nullable(),
              solution: z.string().nullable(),
              lessonSolution: z.string().nullable(),
              name: z.string(),
              description: z.string(),
              curseId: z.number(),
              sort: z.number().nullable(),
            })
          ),
          question: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              answer: z.string(),
              curseId: z.number(),
              sort: z.number().nullable(),
            })
          ),
        })
        .nullable()
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.curse.findFirst({
        where: {
          id: +input.id,
        },
        include: {
          task: {
            orderBy: {
              sort: "asc",
            },
          },
          question: {
            orderBy: {
              sort: "asc",
            },
          },
        },
      });
    }),
  getQuestion: protectedAdminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany();
  }),
  delete: protectedAdminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.curse.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
