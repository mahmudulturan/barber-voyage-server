import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import configs from './app/configs';
import routes from './app/routes';


// configs
import './app/configs/database';
import './app/configs/passport';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';

// create app
const app = express();


// middlewares
app.use(express.json());
app.use(cors({
    origin: [configs.local_client_url as string, configs.live_client_url as string],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: configs.google_session_secret || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: configs.node_env === 'production' }
}))
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/api/v1", routes)

// home route of this server
app.get('/', (req: Request, res: Response) => {
    res.send("Wellcome to Barber Voyage server")
})

// handling not found route error
app.use(notFoundErrorHandler);

// handling all erorrs in one error handling middleware
app.use(globalErrorHandler);


export default app;