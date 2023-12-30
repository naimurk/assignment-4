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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = __importDefault(require("./user.model"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.default.findOne({ email: payload.email, username: payload.username });
    if (findUser) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, "user already exists", "user already exists");
    }
    const result = yield user_model_1.default.create(payload);
    return result;
});
exports.userService = {
    createUserIntoDb
};
