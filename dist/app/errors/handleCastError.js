"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const match = /'(\w+)'/g.exec(err.stringValue);
    const extractedValue = match && match[1];
    return {
        statusCode: 400,
        message: "Invalid Id",
        errorMessage: `${extractedValue} is not a valid Id`,
        errorDetails: err,
    };
};
exports.default = handleCastError;
