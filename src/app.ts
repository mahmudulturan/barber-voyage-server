import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from './errorHandlers/errorHandler';
// routes
import authRoutes from './routes/auth.route';

dotenv.config();

// configs
import './configs/database';
import './configs/passport';



// create app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());


// all routes

// routes for authentication;
app.use('/api/auth', authRoutes);



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