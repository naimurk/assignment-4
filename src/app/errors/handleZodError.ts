import { ZodError, ZodIssue } from "zod";
import { TErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorDetails = err;
  const statusCode = 400;
  const errorMessage = err?.issues
    ?.map(
      (issue: ZodIssue) =>
        `${issue?.path[issue.path.length - 1]} ${issue.message}`
    )
    .join(", ");

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails,
  };
};

export default handleZodError;
