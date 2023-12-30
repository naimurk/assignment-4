import { z } from "zod";

const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

export const courseValidationSchema = z.object({
  categoryId: z.string(),
  price: z.number().positive(),
  title: z.string().min(1),
  instructor: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().positive().int().optional(),
  tags: z.array(tagValidationSchema),
  details: detailsValidationSchema,
});
const UpdatetagValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const UpdatedetailsValidationSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

const UpdateCourseValidationSchema = z.object({
  categoryId: z.string().optional(),
  price: z.number().positive().optional(),
  title: z.string().min(1).optional(),
  instructor: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().positive().int().optional(),
  tags: z.array(UpdatetagValidationSchema).optional(),
  details: UpdatedetailsValidationSchema.optional(),
});

export const courseValidation = {
  courseValidationSchema,
  UpdateCourseValidationSchema
};
