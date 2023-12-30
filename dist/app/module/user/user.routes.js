"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = __importDefault(require("./user.validation"));
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const constant_1 = require("../../constant/constant");
const router = express_1.default.Router();
router.post("/register", (0, checkAuth_1.default)(constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.default), user_controller_1.userController.createUser);
exports.UserRoutes = router;
