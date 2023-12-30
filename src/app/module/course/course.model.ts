/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from "mongoose";
import { TCourse, TDetails } from "./course.interface";
import { Category } from "../category/category.model";
import { Review } from "../review/review.model";
import { any } from "zod";
import { AppError } from "../../errors/AppError";

const tagSchema = new Schema({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});

const detailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const CourseSchema = new Schema<TCourse>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  price: { type: Number, required: true },
  title: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true, default: 1 },
  tags: { type: [tagSchema], required: true },
  details: { type: detailsSchema, required: true },
},{
  timestamps: true,
});

CourseSchema.pre("save", async function (next) {
  const course = this;
  const existCategory = await Category.findById({ _id: course?.categoryId });
  if (!existCategory) {
    throw new AppError(404,"not found","categoryId is not exist");
  }

  next();
});

CourseSchema.pre("save", async function (next) {
  const course = this;
  const existTitlte = await Course.findOne({ title: course.title });
  if (existTitlte) {
    throw new AppError(500, "duplicate Entry", "title already exists");
  }

  next();
});

CourseSchema.pre("save", async function (next) {
  const course = this;

  const startDateTimestamp = new Date(course.startDate).getTime();
  const endDateTimestamp = new Date(course.endDate).getTime();

  const durationInMilliseconds = endDateTimestamp - startDateTimestamp;

  course.durationInWeeks = Math.ceil(
    durationInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );

  next();
});



export const Course = model<TCourse>("Course", CourseSchema);
