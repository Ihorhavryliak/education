import { z } from "zod";
import { ProgramSchema } from "~/schema/program.schema";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const programRouter = createTRPCRouter({
  create: protectedAdminProcedure
    .input(ProgramSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.create({
        data: {
          name: input.name,
          description: input.description,
          generalProgramId: input.generalProgramId,
          coursesPages: {
            connect: input.coursesPages,
          },
        },
      });
    }),
  all: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const program = await ctx.prisma.program.findMany({
        where: {
          generalProgramId: +input.id,
        },
        include: {
          coursesPages: true,
        },
      });
      const mainProgram = await ctx.prisma.generalProgram.findFirst({
        where: {
          id: +input.id,
        },
      });
      return { program, mainProgram };
    }),

  markDone: protectedProcedure
    .input(ProgramSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
        },
      });
    }),
});
