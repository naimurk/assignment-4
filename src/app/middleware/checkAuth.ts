import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../constant/constant";
import { jwtHelpers } from "../helper/jwtHelper";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import User from "../module/user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";

const checkAuth = (...roles: Array<keyof typeof USER_ROLE>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token)

    if (!token) {
      // throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', 'Unauthorized')
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
        errorMessage:
          "You do not have the necessary permissions to access this resource.",
        errorDetails: null,
        stack: null,
      });
    }

    const decodedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_access_secret as string
    );

    req.user = decodedToken as JwtPayload;
    // console.log(req.user)

    const { email } = decodedToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "user not found",
        "user not found"
      );
    }

    //Authorization
    if (!roles.includes(user?.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
        errorMessage:
          "You do not have the necessary permissions to access this resource.",
        errorDetails: null,
        stack: null,
      });
    }

    next();
  });
};

export default checkAuth;
