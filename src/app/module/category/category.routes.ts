import express, { Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { categoryController } from "./category.controller";
import { categoryValidationSchema } from "./category.validation";
import checkAuth from "../../middleware/checkAuth";
import { USER_ROLE } from "../../constant/constant";

const router = express.Router();

router.post(
  "/",
  checkAuth(USER_ROLE.admin),
  validateRequest(categoryValidationSchema.createCategoryValidationSchema),
  categoryController.createCategory
);

router.get(
  "/",
  categoryController.getAllCategory
);

export const CategoryRoutes = router;
