"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = exports.courseValidationSchema = void 0;
const zod_1 = require("zod");
const tagValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean(),
});
const detailsValidationSchema = zod_1.z.object({
    level: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.courseValidationSchema = zod_1.z.object({
    categoryId: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    instructor: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    language: zod_1.z.string(),
    provider: zod_1.z.string(),
    durationInWeeks: zod_1.z.number().positive().int().optional(),
    tags: zod_1.z.array(tagValidationSchema),
    details: detailsValidationSchema,
});
const UpdatetagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const UpdatedetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
const UpdateCourseValidationSchema = zod_1.z.object({
    categoryId: zod_1.z.string().optional(),
    price: zod_1.z.number().positive().optional(),
    title: zod_1.z.string().min(1).optional(),
    instructor: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    provider: zod_1.z.string().optional(),
    durationInWeeks: zod_1.z.number().positive().int().optional(),
    tags: zod_1.z.array(UpdatetagValidationSchema).optional(),
    details: UpdatedetailsValidationSchema.optional(),
});
exports.courseValidation = {
    courseValidationSchema: exports.courseValidationSchema,
    UpdateCourseValidationSchema
};
