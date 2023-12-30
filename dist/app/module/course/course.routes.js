"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const constant_1 = require("../../constant/constant");
const router = express_1.default.Router();
router.post("/courses", (0, checkAuth_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.courseValidation.courseValidationSchema), course_controller_1.courseController.createCourse);
router.get("/courses", course_controller_1.courseController.getAllCourse);
router.get("/courses/:courseId/reviews", course_controller_1.courseController.getSpecificCourse);
router.put("/courses/:courseId", (0, checkAuth_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.courseValidation.UpdateCourseValidationSchema), course_controller_1.courseController.updateSpecificCourse);
exports.CourseRoutes = router;
