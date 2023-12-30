import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
):TErrorResponse => {


  const errorSources= Object.values(err.errors).map(
    (val) => (` ${val.path} is not valid`),
  ).join(", ");

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorSources,
    errorDetails: err

  };
};