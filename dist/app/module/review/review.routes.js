"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const constant_1 = require("../../constant/constant");
const router = express_1.default.Router();
router.post("/reviews", (0, checkAuth_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(review_validation_1.reviewValidationSchema.createReviewValidationSchema), review_controller_1.reviewController.createReview);
router.get("/course/best", review_controller_1.reviewController.bestCourse);
exports.ReviewRoutes = router;
