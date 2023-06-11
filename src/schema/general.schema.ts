import { z } from "zod";

export const GeneralProgramSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortName: z.string(),
  //coursesPages: z.string(),
});

export type GeneralProgramType = z.TypeOf<typeof GeneralProgramSchema>;
