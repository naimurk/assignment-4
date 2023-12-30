/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";
import { Course } from "../course/course.model";
import { AppError } from "../../errors/AppError";

const ReviewSchema = new Schema<TReview>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
},{
  timestamps: true
});
 
ReviewSchema.pre("save", async function (next) {
  const review = this;
  const existCourse = await Course.findById({ _id: review?.courseId });
  if (!existCourse) {
    throw new AppError(404, "validation Error" , "course is not exists");
  }

  next();
});

export const Review = model<TReview>("Review", ReviewSchema);
