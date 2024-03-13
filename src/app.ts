import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from './errorHandlers/errorHandler';
import session from 'express-session';
import jwt from 'jsonwebtoken';


// routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// configs
import './configs/database';
import './configs/passport';
import { ICookieOptions } from './types/types';
import { IUser } from './models/user.model';



// create app
const app = express();

app.use(session({
    secret: process.env.GOOGLE_SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// middlewares
app.use(express.json());
app.use(cors({
    origin: [process.env.LOCAL_CLIENT_URL || "", process.env.LIVE_CLIENT_URL || "", "http://localhost:5000"],
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());



// all routes

// routes for authentication;
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

const tokenSecret = process.env.JWT_TOKEN;
if (!tokenSecret) throw new Error("JWT_TOKEN is missing in env file");


//google 
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        const user: any = req.user;
        // if(!user) return;
        // Generate a JWT token
        const userData = { email: user?.email, id: user._id };
        const token = jwt.sign(userData, tokenSecret, { expiresIn: "30d" })
        console.log(token);

        // cookie options
        const cookieOptions: ICookieOptions = {
            httpOnly: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        };

        // Set the JWT token in a cookie directly within the strategy callback
        res.cookie('token', token, cookieOptions)
        .redirect('/')
    });



// home route of this server
app.get('/', (req: Request, res: Response) => {
    res.send("Wellcome to Barber Voyage server")
})

// response for not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: "The specified route cannot be located or identified." })
})

// Use the error handler middleware
app.use(errorHandler);


export default app;