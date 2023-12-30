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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const getQuery_1 = require("../../query/getQuery");
const AppError_1 = require("../../errors/AppError");
const user_model_1 = __importDefault(require("../user/user.model"));
const createCourseIntoDb = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.default.findOne({ email: decodedToken.email }, { password: 0, passwordChangedAt: 0 });
    if (!findUser) {
        throw new AppError_1.AppError(404, 'User not found', 'User not found');
    }
    const result = yield course_model_1.Course.create(Object.assign(Object.assign({}, payload), { createdBy: findUser === null || findUser === void 0 ? void 0 : findUser._id.toString() }));
    // Attach full user data to the response
    return Object.assign(Object.assign({}, result.toObject()), { createdBy: findUser.toObject() });
});
const totalCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.find({});
    return result;
});
const getCoursesIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const result = yield (0, getQuery_1.getQuery)(course_model_1.Course.find(), queryObj);
    // console.log(result)
    return result;
});
const getSpecificCourseIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById({ _id: id });
    if (!result) {
        throw new AppError_1.AppError(500, "Course not found", "Course not found");
    }
    const reviews = yield review_model_1.Review.find({ courseId: result._id });
    if (reviews) {
        const data = {
            course: Object.assign({}, result.toObject()),
            reviews,
        };
        return data;
    }
    return result;
});
const updateCourseIntoDb = (decodedToken, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload, remainingCourseData = __rest(payload, ["tags", "details"]);
    const updatedData = Object.assign({}, remainingCourseData);
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            updatedData[`details.${key}`] = value;
        }
    }
    const result = yield course_model_1.Course.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        runValidators: true,
    });
    // console.log(tags)
    if (tags && Array.isArray(tags) && tags.length > 0) {
        const deletedCourse = tags
            .filter((el) => el.name && el.isDeleted)
            .map((el) => el.name);
        const deletedCourses = deletedCourse.length > 0 &&
            (yield course_model_1.Course.findByIdAndUpdate({ _id: id }, {
                $pull: { tags: { name: { $in: deletedCourse } } },
            }, {
                new: true,
                runValidators: true,
            }));
        const AddCourse = tags.filter((el) => el.name && !el.isDeleted);
        // console.log(AddCourse)
        const AddCourses = AddCourse.length > 0 &&
            (yield course_model_1.Course.findByIdAndUpdate({ _id: id }, {
                $addToSet: { tags: { $each: AddCourse } },
            }));
    }
    const findUser = yield user_model_1.default.findOne({ email: decodedToken.email }, { passwordChangedAt: 0 });
    // console.log(findUser)
    const updatedCourse = yield course_model_1.Course.findById({ _id: id });
    return Object.assign(Object.assign({}, updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.toObject()), { createdBy: findUser === null || findUser === void 0 ? void 0 : findUser.toObject() });
    // return result;
});
exports.courseService = {
    createCourseIntoDb,
    getSpecificCourseIntoDb,
    updateCourseIntoDb,
    getCoursesIntoDb,
    totalCourse,
};
