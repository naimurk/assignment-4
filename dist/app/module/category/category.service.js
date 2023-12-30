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
exports.categoryService = void 0;
const category_model_1 = require("./category.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = require("../../errors/AppError");
const CreateCategoryIntoDb = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(decodedToken);
    const findUser = yield user_model_1.default.findOne({ email: decodedToken.email });
    if (!findUser)
        throw new AppError_1.AppError(404, "User not found", "User not found");
    const result = yield category_model_1.Category.create(Object.assign(Object.assign({}, payload), { createdBy: (_a = findUser === null || findUser === void 0 ? void 0 : findUser._id) === null || _a === void 0 ? void 0 : _a.toString() }));
    return result;
});
const getAllCategoryIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find({}).populate("createdBy");
    return result;
});
exports.categoryService = {
    CreateCategoryIntoDb,
    getAllCategoryIntoDb
};
