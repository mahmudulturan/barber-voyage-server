import { NextFunction, Request, Response } from "express";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send({ success: true, user: req.user });
    } catch (error) {
        next(error);
    }
}

export const userControllers = {
    currentUser
}