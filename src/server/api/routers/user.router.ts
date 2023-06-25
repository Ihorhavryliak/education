
import { UserSchema } from "~/schema/user.schema";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
/*   create: publicProcedure
    .input(UserSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          //password: input.password
        },
      });
    }),
    login: publicProcedure
    .input(UserSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      })
    }) */

});
