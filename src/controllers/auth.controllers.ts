import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from 'bcrypt'

const saltRounds = 10;

export const registerUser = async (req: Request & { body: IUser }, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body;

        // find the user if exist return a message
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return res.status(409).send({ success: false, error: "This email already exist!" })
        }

        // hashing the password before saving database 
        bcrypt.hash(req.body.password, saltRounds, async (err, password) => {
            try {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                await newUser.save();
                res.status(201).send({ success: true, message: "User created successfully!" });
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}