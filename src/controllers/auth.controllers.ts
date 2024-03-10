interface ICookieOptions {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none" | boolean;
    secure: boolean;
    maxAge?: number;
    expires?: Date;
}

import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// controller for register a user
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

// controller for login a user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // find the user by email and if not found then return a message
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ success: false, error: "User not found!" })
        }

        // compare the hashing password
        bcrypt.compare(password, user.password, (err, result) => {
            // if password matched then successfully logged in otherwise send a message
            if (result) {

                // genarate a token
                const tokenSecret = process.env.JWT_TOKEN;
                if (!tokenSecret) throw new Error("JWT_TOKEN is missing in env file");
                const userData = { email: user.email, id: user._id };
                const token = jwt.sign(userData, tokenSecret, { expiresIn: "30d" })

                // cookie options
                const cookieOptions: ICookieOptions = {
                    // httpOnly: process.env.NODE_ENV === 'production',
                    // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                    // secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                };

                const { password, ...userInfo } = user.toObject();

                return res.status(200)
                    .cookie("token", token, cookieOptions)
                    .send({ success: true, message: "Login Successful!", user: userInfo });
            }
            else {
                return res.status(401).send({ success: false, message: "Wrong Password!" });
            }
        })
    } catch (error) {
        next(error);
    }
};


// controller for logout a user
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // cookie options
        const cookieOptions: ICookieOptions = {
            // httpOnly: process.env.NODE_ENV === 'production',
            // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            // secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 0
        };
        res
            .clearCookie("token", cookieOptions)
            .send({ success: true, message: "Logout Successfull" })
    } catch (error) {
        next(error);
    }
}