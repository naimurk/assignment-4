"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    var _a;
    const errorDetails = err;
    const statusCode = 400;
    const errorMessage = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => `${issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]} ${issue.message}`).join(", ");
    return {
        statusCode,
        message: "Validation Error",
        errorMessage,
        errorDetails,
    };
};
exports.default = handleZodError;
