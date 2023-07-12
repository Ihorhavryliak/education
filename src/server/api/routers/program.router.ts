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
  update: protectedAdminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        generalProgramId: z.number(),
        order: z.number(),
        coursesPages: z.array(
          z.object({
            id: z.number(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          generalProgramId: input.generalProgramId,
          order: input.order,
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
          coursesPages: {
            orderBy: {
              sort: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });
      const mainProgram = await ctx.prisma.generalProgram.findFirst({
        where: {
          id: +input.id,
        },
      });
      return { program, mainProgram };
    }),
  allProgram: protectedAdminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.program.findMany();
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

  findById: protectedAdminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.program.findFirst({
        where: {
          id: input.id,
        },
        include: {
          coursesPages: true,
        },
      });
    }),
  delete: protectedAdminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteConnectLesson: protectedAdminProcedure
    .input(
      z.object({
        id: z.number(),
        lessonId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.update({
        where: {
          id: input.id,
        },
        data: {
          coursesPages: {
            disconnect: { id: input.lessonId },
          },
        },
      });
    }),
});
