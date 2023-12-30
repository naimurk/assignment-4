import express, { Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import userValidation from "./user.validation";
import checkAuth from "../../middleware/checkAuth";
import { USER_ROLE } from "../../constant/constant";


const router = express.Router();

router.post(
  "/register",
  checkAuth(USER_ROLE.admin),
  validateRequest(userValidation),
  userController.createUser
);



export const UserRoutes = router;
