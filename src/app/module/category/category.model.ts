/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";
import { AppError } from "../../errors/AppError";

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("save", async function (next) {
  const category = this;
  const existCategory = await Category.findOne({ name: category.name });
  if (existCategory) {
    throw new AppError(404, "Validation Error", "category already exists");
  }

  next();
});

export const Category = model<TCategory>("Category", CategorySchema);
