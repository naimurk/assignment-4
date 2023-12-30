"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const constant_1 = require("../../constant/constant");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const AuthValidation_1 = require("./AuthValidation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(AuthValidation_1.authValidation.registerValidation), auth_controller_1.authController.register);
router.post('/login', (0, validateRequest_1.default)(AuthValidation_1.authValidation.loginValidation), auth_controller_1.authController.login);
router.post('/change-password', (0, validateRequest_1.default)(AuthValidation_1.authValidation.changePasswordValidation), (0, checkAuth_1.default)(constant_1.USER_ROLE.admin, constant_1.USER_ROLE.user), auth_controller_1.authController.changePassword);
// router.post('/refresh-token', authController.refreshToken)
exports.authRoutes = router;
