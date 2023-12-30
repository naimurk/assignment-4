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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = require("./review.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const createReviewIntoDb = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.default.findOne({ email: decodedToken.email }, { passwordChangedAt: 0 });
    //  console.log(findUser)
    const result = yield review_model_1.Review.create(payload);
    return Object.assign(Object.assign({}, result.toObject()), { createdBy: findUser === null || findUser === void 0 ? void 0 : findUser.toObject() });
});
const bestCourseIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const findBestCourse = review_model_1.Review.aggregate([
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
});
exports.reviewService = {
    createReviewIntoDb,
    bestCourseIntoDb,
};
