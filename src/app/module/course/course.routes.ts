import express, { Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";
import checkAuth from "../../middleware/checkAuth";
import { USER_ROLE } from "../../constant/constant";

const router = express.Router();

router.post(
  "/courses",
  checkAuth(USER_ROLE.admin),
  validateRequest(courseValidation.courseValidationSchema),
  courseController.createCourse
);

router.get("/courses", courseController.getAllCourse);

router.get("/courses/:courseId/reviews", courseController.getSpecificCourse);

router.put(
  "/courses/:courseId",
  checkAuth(USER_ROLE.admin),
  validateRequest(courseValidation.UpdateCourseValidationSchema),
  courseController.updateSpecificCourse
);

export const CourseRoutes = router;
