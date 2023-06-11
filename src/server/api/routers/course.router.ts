import { z } from "zod";
import { CourseSchema } from "~/schema/course.schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  create: protectedProcedure.input(CourseSchema).mutation(({ ctx, input }) => {
    // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return ctx.prisma.curse.create({
      data: {
        name: input.name,
        video: input.video,
        descriptionCurse: input.descriptionCurse,
        img: input.img,
      },
    });
  }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.curse.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ curseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.curse.findFirst({
        where: {
          id: +input.curseId
        },
        include:{
          task: true,
          question: true,
        }
      });
    }),
});
