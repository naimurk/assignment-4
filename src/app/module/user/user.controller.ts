import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { userService } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
    const body = req.body;
    // console.log(body)
    const result = await userService.createUserIntoDb(body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: result,
    });
  });


  export const  userController = {
    createUser
  }
