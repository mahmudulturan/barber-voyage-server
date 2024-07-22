import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from './app/middlewares/errorHandler';
import session from 'express-session';

// routes
import authRoutes from './app/modules/auth/auth.routes';
import userRoutes from './app/modules/user/user.routes';
import barberRoutes from './app/modules/barber/barber.routes';
import ownerRoutes from './app/modules/owner/owner.routes';
import bookingRoutes from './app/modules/booking/booking.routes';
import paymentRoutes from './app/modules/payment/payment.routes';
import reviewRoutes from './app/modules/review/review.routes';

// configs
import './app/configs/database';
import './app/configs/passport';


// create app
const app = express();


// middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000" || "", process.env.LIVE_CLIENT_URL || ""],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.GOOGLE_SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))
app.use(passport.initialize());
app.use(passport.session());


// all routes

// routes for authentication;
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/barber', barberRoutes);
app.use('/api/v1/owner', ownerRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/review', reviewRoutes);


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