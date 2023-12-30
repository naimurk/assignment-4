import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.service";


const createCategory = catchAsync( async(req, res, next) => {
  const body = req.body ;
  const decodedToken = req.user
  // console.log(body)
  const result = await categoryService.CreateCategoryIntoDb(decodedToken,body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
})


const getAllCategory = catchAsync( async(req, res, next) => {

  const result = await categoryService.getAllCategoryIntoDb()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories created successfully',
    data: result,
  });
})



export const categoryController = {
  createCategory,
  getAllCategory
};
