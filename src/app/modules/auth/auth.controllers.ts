import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../user/user.model";
import { IUser } from "../user/user.interfaces";
import { ICookieOptions } from "../../interfaces/cookie";
import configs from "../../configs";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";

const saltRounds = 10;

// controller for register a user
const registerUser = catchAsync(async (req: Request & { body: IUser }, res: Response, next: NextFunction) => {
    const { name, email, password: passwordFromBody, ...rest } = req.body;

    // find the user if exist return a message
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
        throw new AppError(409, "This email already exist!")
    }

    // hashing the password before saving database 
    bcrypt.hash(passwordFromBody, saltRounds, async (err, password) => {
        try {
            const newUser = new User({
                name,
                email,
                password,
                ...rest
            })
            await newUser.save();
            sendResponse(res, 201, "User created successfully!", newUser);
        } catch (error) {
            next(error);
        }
    })
})

// controller for login a user
const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // find the user by email and if not found then return a message
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new AppError(404, "User not found!")
    }

    // compare the hashing password
    if (typeof password === 'undefined') {
        throw new AppError(400, "Password is required!");
    }

    // compare the hashing password
    bcrypt.compare(password, user.password || "", (err, result) => {
        // if password matched then successfully logged in otherwise send a message
        if (result) {

            // genarate a token
            const tokenSecret = configs.jwt_token as string;

            const userData = { email: user.email, id: user._id };
            const token = jwt.sign(userData, tokenSecret, { expiresIn: "30d" })

            // cookie options
            const cookieOptions: ICookieOptions = {
                httpOnly: configs.node_env === 'production',
                sameSite: configs.node_env === 'production' ? 'none' : 'lax',
                secure: configs.node_env === 'production',
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            };

            const { password, ...userInfo } = user.toObject();

            return res.status(200)
                .cookie("token", token, cookieOptions)
                .send({ success: true, message: "Login Successful!", data: userInfo });
        }
        else {
            throw new AppError(401, "Wrong Password!")
        }
    })

})


// controller for logout a user
const logoutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // cookie options
    const cookieOptions: ICookieOptions = {
        httpOnly: configs.node_env === 'production',
        sameSite: configs.node_env === 'production' ? 'none' : 'lax',
        secure: configs.node_env === 'production',
        maxAge: 0
    };
    res
        .clearCookie("token", cookieOptions)
        .send({ success: true, message: "Logout Successfull" })
}
)

// Controller function for handling Google authentication callback
const loginWithGoogle = (req: Request, res: Response) => {
    const tokenSecret = configs.jwt_token as string;

    const user: any = req.user;

    // Generate a JWT token
    const userData = { email: user.email, id: user._id };
    const token = jwt.sign(userData, tokenSecret, { expiresIn: "30d" });

    // Determine redirect URL based on environment
    const redirectURL = configs.node_env === "production" ? configs.live_client_url : configs.local_client_url;

    // Cookie options
    const cookieOptions: ICookieOptions = {
        httpOnly: configs.node_env === 'production',
        sameSite: configs.node_env === 'production' ? 'none' : 'lax',
        secure: configs.node_env === 'production',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };

    // Set the JWT token in a cookie and redirect
    res.cookie('token', token, cookieOptions).redirect(redirectURL || "/error");
}

export const authControllers = {
    registerUser,
    loginUser,
    logoutUser,
    loginWithGoogle
}