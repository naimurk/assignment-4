/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import { AppError } from "../errors/AppError";
import { handleValidationError } from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode:number = 500;
    let message:string = "something went wrong";
    let errorMessage:string = "type is required";
    let errorDetails:any = {
        
    }
  
    if (err instanceof ZodError) {
        const zodError =   handleZodError(err)
        message = zodError.message;
        errorMessage= zodError.errorMessage
        errorDetails = zodError.errorDetails;
        statusCode=zodError.statusCode
      }
      else if (err?.name === 'ValidationError') {
        const ValidationError = handleValidationError(err);
        statusCode=ValidationError.statusCode;
        message=ValidationError.message
        errorMessage=ValidationError.errorMessage;
        errorDetails=ValidationError.errorDetails
      
    
      }
      else if (err?.name === 'CastError') {
       const castError = handleCastError(err)

       message = castError.message;
       errorMessage= castError.errorMessage
       errorDetails = castError.errorDetails;
       statusCode=castError.statusCode
 
      }

      else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorMessage=err.errorMessage
        errorDetails=err || null
      
      } 

      else if (err?.code === 11000) {
        
        
        statusCode = 500;
        message = "duplicate entry";
        errorMessage = "duplicate entry" ;
        errorDetails=err
      }
    res.status(err.statusCode || statusCode).json({
    
        success: false,
        message,
        errorMessage,
        errorDetails: errorDetails || err,
        
        
       
        stack: err.stack || null

        
        
    })
};


export default globalErrorHandler