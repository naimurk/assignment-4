import express, { Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.controller";
import checkAuth from "../../middleware/checkAuth";
import { USER_ROLE } from "../../constant/constant";


const router = express.Router();

router.post(
  "/reviews",
  checkAuth(USER_ROLE.admin),
  validateRequest(reviewValidationSchema.createReviewValidationSchema),
  reviewController.createReview
);

router.get(
  "/course/best",
  reviewController.bestCourse
);

export const ReviewRoutes = router;
