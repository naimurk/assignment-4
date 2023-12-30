"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const constant_1 = require("../../constant/constant");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
router.get("/", category_controller_1.categoryController.getAllCategory);
exports.CategoryRoutes = router;
