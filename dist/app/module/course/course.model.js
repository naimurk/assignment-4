"use strict";
/* eslint-disable @typescript-eslint/no-this-alias */
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
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const category_model_1 = require("../category/category.model");
const AppError_1 = require("../../errors/AppError");
const tagSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
});
const detailsSchema = new mongoose_1.Schema({
    level: { type: String, required: true },
    description: { type: String, required: true },
});
const CourseSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
CourseSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = this;
        const existCategory = yield category_model_1.Category.findById({ _id: course === null || course === void 0 ? void 0 : course.categoryId });
        if (!existCategory) {
            throw new AppError_1.AppError(404, "not found", "categoryId is not exist");
        }
        next();
    });
});
CourseSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = this;
        const existTitlte = yield exports.Course.findOne({ title: course.title });
        if (existTitlte) {
            throw new AppError_1.AppError(500, "duplicate Entry", "title already exists");
        }
        next();
    });
});
CourseSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = this;
        const startDateTimestamp = new Date(course.startDate).getTime();
        const endDateTimestamp = new Date(course.endDate).getTime();
        const durationInMilliseconds = endDateTimestamp - startDateTimestamp;
        course.durationInWeeks = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24 * 7));
        next();
    });
});
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
