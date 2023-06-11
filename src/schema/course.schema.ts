import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string(),
  video: z.string(),
  descriptionCurse: z.string(),
  img: z.string(),
});

export type CourseType = z.TypeOf<typeof CourseSchema>;
