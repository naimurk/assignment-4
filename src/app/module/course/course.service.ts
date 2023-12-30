import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { getQuery } from "../../query/getQuery";
import { TQueryObj } from "../../interface/query";
import { AppError } from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";

const createCourseIntoDb = async (
  decodedToken: JwtPayload,
  payload: TCourse
) => {
  const findUser = await User.findOne(
    { email: decodedToken.email },
    { password: 0, passwordChangedAt: 0 }
  );

  if (!findUser) {
    throw new AppError(404, 'User not found', 'User not found');
  }

  const result = await Course.create({
    ...payload,
    createdBy: findUser?._id.toString()
  });

  // Attach full user data to the response

  return {
    ...result.toObject(),
    createdBy : findUser.toObject()
  };
};


const totalCourse = async () => {
  const result = await Course.find({});
  return result;
};

const getCoursesIntoDb = async (query: TQueryObj) => {
  const queryObj = { ...query };
  const result = await getQuery(Course.find(), queryObj);
  // console.log(result)
  return result;
};

const getSpecificCourseIntoDb = async (id: string) => {
  const result = await Course.findById({ _id: id });
  if (!result) {
    throw new AppError(500, "Course not found", "Course not found");
  }

  const reviews = await Review.find({ courseId: result._id });

  if (reviews) {
    const data = {
      course: { ...result.toObject() },
      reviews,
    };
    return data;
  }

  return result;
};

const updateCourseIntoDb = async (
  decodedToken: JwtPayload,
  id: string,
  payload: Partial<TCourse>
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const updatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      updatedData[`details.${key}`] = value;
    }
  }

  const result = await Course.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });
  // console.log(tags)
  if (tags && Array.isArray(tags) && tags.length > 0) {
    const deletedCourse = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);
    const deletedCourses =
      deletedCourse.length > 0 &&
      (await Course.findByIdAndUpdate(
        { _id: id },
        {
          $pull: { tags: { name: { $in: deletedCourse } } },
        },
        {
          new: true,
          runValidators: true,
        }
      ));

    const AddCourse = tags.filter((el) => el.name && !el.isDeleted);
    // console.log(AddCourse)
    const AddCourses =
      AddCourse.length > 0 &&
      (await Course.findByIdAndUpdate(
        { _id: id },
        {
          $addToSet: { tags: { $each: AddCourse } },
        }
      ));
  }
  const findUser = await User.findOne(
    { email: decodedToken.email },
    { passwordChangedAt: 0 }
  );
  // console.log(findUser)
  const updatedCourse = await Course.findById({ _id: id });
  return {
    ...updatedCourse?.toObject(),
    createdBy: findUser?.toObject(),
  };
  // return result;
};

export const courseService = {
  createCourseIntoDb,
  getSpecificCourseIntoDb,
  updateCourseIntoDb,
  getCoursesIntoDb,
  totalCourse,
};
