import { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";

const errorHandler = (err: MongooseError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 0;
    let errorMessage = "";

    console.log(err);

    // set the code and error message with error name
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = err.message;
    } else {
        statusCode = 500;
        errorMessage = "Server Broke!!"
    }

    // send the error status and error message
    res.status(statusCode).send({ success: false, error: errorMessage });
}

export default errorHandler;