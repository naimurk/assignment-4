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
const jwtHelper_1 = require("../helper/jwtHelper");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../module/user/user.model"));
const AppError_1 = require("../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const checkAuth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // console.log(token)
        if (!token) {
            // throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', 'Unauthorized')
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null,
            });
        }
        const decodedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt_access_secret);
        req.user = decodedToken;
        // console.log(req.user)
        const { email } = decodedToken;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "user not found", "user not found");
        }
        //Authorization
        if (!roles.includes(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null,
            });
        }
        next();
    }));
};
exports.default = checkAuth;
