import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";
import { Course } from "./course.model";

// create course
const createCourse = catchAsync(async (req, res, next) => {
  const body = req.body;
  // console.log(body)
  const decodedToken = req.user
  const result = await courseService.createCourseIntoDb(decodedToken,body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "course is retrieved succesfully",
    data: result,
  });
});

// get All Course with filter query
const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await courseService.getCoursesIntoDb(req.query);
  const totalCourse = await courseService.totalCourse();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "course retrieved successfully",
    meta: {
      page: req?.query?.page ? Number(req?.query?.page) : 1,
      limit: req?.query?.limit ? Number(req?.query?.limit) : 10,
      total: totalCourse.length > 0 ? totalCourse.length : 0,
    },

    data: result.length > 0 ? result : "data not found",
  });
});


// specific course with reviews
const getSpecificCourse = catchAsync(async (req, res, next) => {
  const id = req.params.courseId;
  const result = await courseService.getSpecificCourseIntoDb(id);

  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "course and review retrieved successfully",
    data: result,
  });
});


// update course 
const updateSpecificCourse = catchAsync(async (req, res, next) => {
  const id = req.params.courseId;
  const data = req.body;
  const decodedToken = req.user
  const result = await courseService.updateCourseIntoDb(decodedToken,id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "course is updated successfully",
    data: result,
  });
});

export const courseController = {
  createCourse,
  getSpecificCourse,
  updateSpecificCourse,
  getAllCourse,
};
