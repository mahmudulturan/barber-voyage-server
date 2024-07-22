import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";
import { TErrorSources } from "../interfaces/error";
import handleValidationError from "../errors/handleValidationError";
import configs from "../configs";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleCastError from "../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let status = 500;
    let message = 'Something Went Wrong';
    let errorMessages: TErrorSources = [
        {
            path: "",
            message: ""
        }
    ]

    if (err.name === 'ValidationError') {                 // handle mongoose validation error
        const simplifiedMongooseError = handleValidationError(err);
        errorMessages = simplifiedMongooseError.errorSources;
        status = simplifiedMongooseError.statusCode;
        message = simplifiedMongooseError.message;
    } else if (err.code === 11000) {                             // handle duplicate error with code 1000
        const simplifiedDuplicateError = handleDuplicateError(err);
        status = simplifiedDuplicateError?.statusCode;
        message = simplifiedDuplicateError?.message;
        errorMessages = simplifiedDuplicateError?.errorSources;
    } else if (err.name === "CastError") {                      // handle cast error
        const simplifiedCastError = handleCastError(err);
        status = simplifiedCastError?.statusCode;
        message = simplifiedCastError?.message;
        errorMessages = simplifiedCastError?.errorSources;
    }


    res.status(status).send({
        success: false,
        message,
        errorMessages,
        stack: configs.node_env === "development" ? err.stack : null
    })
}
export default globalErrorHandler;