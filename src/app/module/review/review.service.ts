import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import User from "../user/user.model";

const createReviewIntoDb = async (decodedToken:JwtPayload, payload: TReview) => {
 const findUser = await User.findOne({email: decodedToken.email},{passwordChangedAt: 0 })
//  console.log(findUser)
 
  const result = await Review.create(payload);
  return {
    ...result.toObject(),
    createdBy : findUser?.toObject()
  }
};

const bestCourseIntoDb = async () => {
 

  const findBestCourse = Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },

    {
      $unwind: "$course",
    },
    {
      $project: {
        course: "$course",
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);

  

  return findBestCourse;
};


export const reviewService = {
  createReviewIntoDb,
  bestCourseIntoDb,
};
