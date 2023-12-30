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
exports.authService = void 0;
const passwordHelper_1 = require("../../helper/passwordHelper");
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const password_history_model_1 = require("../PasswordHistory/password.history.model");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUserExists = yield user_model_1.default.findOne({ email: payload.email, username: payload.username });
    if (checkUserExists) {
        throw new AppError_1.AppError(http_status_1.default.FOUND, "user already exists", "user already exists");
    }
    const password = payload.password;
    const hashedPassword = yield passwordHelper_1.passwordHelpers.hashPassword(password);
    const result = yield user_model_1.default.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, role: "user" }));
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ username: payload.username }).select('+password');
    if (!user) {
        throw new AppError_1.AppError(404, 'Invalid credentials', "invalid credentials");
    }
    const plainTextPassword = payload.password;
    const hashedPassword = user.password;
    const isCorrectPassword = yield passwordHelper_1.passwordHelpers.comparePassword(plainTextPassword, hashedPassword);
    if (!isCorrectPassword) {
        throw new AppError_1.AppError(404, 'Passwords do not match', "passwords do not match");
    }
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtHelper_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const result = yield user_model_1.default.findOne({ username: payload.username }, { passwordChangedAt: 0 });
    return {
        user: result,
        token: accessToken
    };
});
const changePassword = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, iat, _id } = decodedToken;
    // console.log(_id)
    // console.log(iat, 'iat')
    const user = yield user_model_1.default.findOne({ email }).select('+password');
    // validation 1
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "invalid credentials", 'Invalid credentials');
    }
    // validation 2
    if (!iat) {
        throw new AppError_1.AppError(400, "invalid toke", 'Invalid token');
    }
    // validation 3
    if (user.passwordChangedAt && iat < user.passwordChangedAt.getTime() / 1000) {
        throw new AppError_1.AppError(400, "unauthorized", "unauthorized");
    }
    // validation 4
    const isCorrectPassword = yield passwordHelper_1.passwordHelpers.comparePassword(payload.currentPassword, user.password);
    // validation 5
    if (!isCorrectPassword) {
        throw new AppError_1.AppError(400, 'Invalid credentials', 'Invalid credentials');
    }
    const isNewPasswordAndCurrentPasswordSame = yield passwordHelper_1.passwordHelpers.comparePassword(payload.newPassword, user.password);
    //  validation 6
    if (isNewPasswordAndCurrentPasswordSame) {
        throw new AppError_1.AppError(400, "New password and current password same", 'New password and current password same');
    }
    // validation 7
    // Check password history
    const passwordHistory = yield password_history_model_1.PasswordHistory.find({ userId: _id }).sort({ timestamp: -1 }).limit(2);
    const isPasswordInHistory = yield Promise.all(passwordHistory.map((history) => __awaiter(void 0, void 0, void 0, function* () {
        return yield passwordHelper_1.passwordHelpers.comparePassword(payload.newPassword, history.password);
    })));
    const isAnyPasswordInHistory = isPasswordInHistory.some((result) => result);
    // Validation 7
    if (isAnyPasswordInHistory) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Password change failed. Ensure the new password is unique and not among the last 2 used', 'Password change failed. Ensure the new password is unique and not among the last 2 used');
    }
    //  const isPasswordInHistory =  passwordHistory.some((history) => passwordHelpers.comparePassword(payload.newPassword, history.password));
    // //  validation 7
    //  if (isPasswordInHistory) {
    //    throw new AppError(httpStatus.FORBIDDEN,'Password change failed. Ensure the new password is unique and not among the last 2 used' ,'Password change failed. Ensure the new password is unique and not among the last 2 used');
    //  }
    const hashedPassword = yield passwordHelper_1.passwordHelpers.hashPassword(payload.newPassword);
    const createAPasswordHistoryIntoDb = yield password_history_model_1.PasswordHistory.create({ userId: _id, password: hashedPassword, timeStamp: Date.now() });
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        passwordChangedAt: new Date(),
    }, {
        new: true,
    });
    const result = yield user_model_1.default.findOne({ email }, { password: 0, passwordChangedAt: 0 });
    return result;
});
exports.authService = {
    register,
    login,
    changePassword,
};
