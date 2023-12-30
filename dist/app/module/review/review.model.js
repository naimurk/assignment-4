"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const course_model_1 = require("../course/course.model");
const AppError_1 = require("../../errors/AppError");
const ReviewSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true
});
ReviewSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = this;
        const existCourse = yield course_model_1.Course.findById({ _id: review === null || review === void 0 ? void 0 : review.courseId });
        if (!existCourse) {
            throw new AppError_1.AppError(404, "validation Error", "course is not exists");
        }
        next();
    });
});
exports.Review = (0, mongoose_1.model)("Review", ReviewSchema);
