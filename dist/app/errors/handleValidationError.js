"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => (` ${val.path} is not valid`)).join(", ");
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errorSources,
        errorDetails: err
    };
};
exports.handleValidationError = handleValidationError;
