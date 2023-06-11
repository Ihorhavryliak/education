import { GeneralProgramSchema } from "~/schema/general.schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const generalProgramRouter = createTRPCRouter({
  create: protectedProcedure
    .input(GeneralProgramSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.generalProgram.create({
        data: {
          name: input.name,
          description: input.description,
          shortName: input.shortName,
        },
      });
    }),
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.generalProgram.findMany();
  }),
});
