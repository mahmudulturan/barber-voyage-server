import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from './errorHandlers/errorHandler';

// routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);



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