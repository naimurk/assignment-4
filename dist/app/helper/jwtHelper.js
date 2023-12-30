"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const createToken = (jwtPayload, secret, options) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, options);
};
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        // If the token verification fails, throw a custom error
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access', 'You do not have the necessary permissions to access this resource');
    }
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
