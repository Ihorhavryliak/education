import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserType = z.TypeOf<typeof UserSchema>;
