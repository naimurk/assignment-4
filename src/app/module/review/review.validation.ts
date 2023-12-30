import { z } from 'zod';

const createReviewValidationSchema = z.object({
    courseId: z.string(),
    rating: z.number().min(0).max(5),
    review: z.string()

})

export const reviewValidationSchema = {
    createReviewValidationSchema
}