import { CourseSchema } from "~/schema/post.schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import formidable from "formidable";
import fs from "npm";

export const courseRouter = createTRPCRouter({
  create: protectedProcedure.input(CourseSchema).mutation(({ ctx, input }) => {
    // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return ctx.prisma.curse.create({
      data: {
        name: input.name,
        video: input.video,
        descriptionCurse: input.descriptionCurse,
      },
    });
  }),
});
