"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = require("../errors/AppError");
const handleValidationError_1 = require("../errors/handleValidationError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessage = "type is required";
    let errorDetails = {};
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(err);
        message = zodError.message;
        errorMessage = zodError.errorMessage;
        errorDetails = zodError.errorDetails;
        statusCode = zodError.statusCode;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const ValidationError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = ValidationError.statusCode;
        message = ValidationError.message;
        errorMessage = ValidationError.errorMessage;
        errorDetails = ValidationError.errorDetails;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const castError = (0, handleCastError_1.default)(err);
        message = castError.message;
        errorMessage = castError.errorMessage;
        errorDetails = castError.errorDetails;
        statusCode = castError.statusCode;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorMessage = err.errorMessage;
        errorDetails = err || null;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        statusCode = 500;
        message = "duplicate entry";
        errorMessage = "duplicate entry";
        errorDetails = err;
    }
    res.status(err.statusCode || statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: errorDetails || err,
        stack: err.stack || null
    });
};
exports.default = globalErrorHandler;
