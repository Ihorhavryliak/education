import { z } from "zod";

export const GeneralProgramSchema = z.object({
  name: z.string(),
  descriptionGeneral: z.string(),
  title: z.string(),
  description: z.string(),
  shortName: z.string(),
  sort: z.number(),
  //coursesPages: z.string(),
});

export type GeneralProgramType = z.TypeOf<typeof GeneralProgramSchema>;
