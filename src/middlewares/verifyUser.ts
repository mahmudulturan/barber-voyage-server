import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/user.model";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: IUser | false, info: any) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send({ message: "Unauthorized Access" });
        }

        req.user = user;
        next();
    })(req, res, next);
}

export default verifyUser;