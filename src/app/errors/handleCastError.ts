import mongoose from "mongoose";
import { TErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const match = /'(\w+)'/g.exec(err.stringValue);
  const extractedValue = match && match[1];

  return {
    statusCode: 400,
    message: "Invalid Id",
    errorMessage: `${extractedValue} is not a valid Id`,
    errorDetails: err,
  };
};

export default handleCastError;
