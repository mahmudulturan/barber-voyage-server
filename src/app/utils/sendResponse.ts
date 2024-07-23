import { Response } from "express";

type TSendResponse = (res: Response, statusCode: number, message: string, data: any) => void;

const sendResponse: TSendResponse = (res: Response, statusCode, message, data) => {
    res.status(statusCode).send({
        success: true,
        message,
        data
    })
}

export default sendResponse;