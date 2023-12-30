import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res, next) => {
  const body = req.body;
  const decodedToken = req.user
  const result = await reviewService.createReviewIntoDb(decodedToken,body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "review is created successfully",
    data: result,
  });
});

const bestCourse = catchAsync(async (req, res, next) => {
  const result = await reviewService.bestCourseIntoDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " best review course is retrieved successfully",
    data: result[0],
  });
});

export const reviewController = {
  createReview,
  bestCourse,
};
