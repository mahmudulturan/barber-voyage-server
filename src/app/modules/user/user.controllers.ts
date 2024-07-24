import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        sendResponse(res, 200, "User fetched successfully!", req.user);
    } catch (error) {
        next(error);
    }
}

export const userControllers = {
    currentUser
}