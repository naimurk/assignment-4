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
exports.courseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_service_1 = require("./course.service");
// create course
const createCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // console.log(body)
    const decodedToken = req.user;
    const result = yield course_service_1.courseService.createCourseIntoDb(decodedToken, body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "course is retrieved succesfully",
        data: result,
    });
}));
// get All Course with filter query
const getAllCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = yield course_service_1.courseService.getCoursesIntoDb(req.query);
    const totalCourse = yield course_service_1.courseService.totalCourse();
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "course retrieved successfully",
        meta: {
            page: ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) : 1,
            limit: ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) ? Number((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.limit) : 10,
            total: totalCourse.length > 0 ? totalCourse.length : 0,
        },
        data: result.length > 0 ? result : "data not found",
    });
}));
// specific course with reviews
const getSpecificCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.courseId;
    const result = yield course_service_1.courseService.getSpecificCourseIntoDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "course and review retrieved successfully",
        data: result,
    });
}));
// update course 
const updateSpecificCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.courseId;
    const data = req.body;
    const decodedToken = req.user;
    const result = yield course_service_1.courseService.updateCourseIntoDb(decodedToken, id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "course is updated successfully",
        data: result,
    });
}));
exports.courseController = {
    createCourse,
    getSpecificCourse,
    updateSpecificCourse,
    getAllCourse,
};
