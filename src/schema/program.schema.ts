import { z } from "zod";

export const ProgramSchema = z.object({
  name: z.string(),
  description: z.string(),
  generalProgramId: z.number(),
  coursesPages: z.array(
    z.object({
      id: z.number(),
    })
  ),
});

export type ProgramType = z.TypeOf<typeof ProgramSchema>;
