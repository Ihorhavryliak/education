import { z } from "zod";
import { GeneralProgramSchema } from "~/schema/general.schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedAdminProcedure,
} from "~/server/api/trpc";

export const generalProgramRouter = createTRPCRouter({
  create: protectedAdminProcedure
    .input(GeneralProgramSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.generalProgram.create({
        data: {
          name: input.name,
          descriptionGeneral: input.descriptionGeneral,
          title: input.title,
          description: input.description,
          shortName: input.shortName,
          sort: input.sort,
        },
      });
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.generalProgram.findMany({
      orderBy: {
        sort: "asc",
      },
    });
  }),
  update: protectedAdminProcedure
    .input(
      z.object({
        name: z.string(),
        descriptionGeneral: z.string(),
        title: z.string(),
        description: z.string(),
        shortName: z.string(),
        id: z.number(),
        sort: z.number(),
        //coursesPages: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.generalProgram.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          descriptionGeneral: input.descriptionGeneral,
          title: input.title,
          description: input.description,
          shortName: input.shortName,
          sort: input.sort,
        },
      });
    }),
  findById: protectedAdminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.generalProgram.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  delete: protectedAdminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.generalProgram.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
