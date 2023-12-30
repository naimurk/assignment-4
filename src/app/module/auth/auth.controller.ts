import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"
import sendResponse from "../../utils/sendResponse"

const register = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
    const result = (await authService.register(req.body))
  
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result,
      });
  })

  const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body)
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "logged in successfully ",
      data: result,
    });
  })


  const changePassword = catchAsync(
    async (req: Request, res: Response) => {
     
      const decodedToken = req.user
      
      const result = await authService.changePassword(decodedToken, req.body)
  
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "password changed successfully ",
        data: result,
      });
    },
  )


  export const authController = {
    register,
    login,
    changePassword
  } 