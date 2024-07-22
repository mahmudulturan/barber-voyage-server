import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from './app/middlewares/errorHandler';
import session from 'express-session';


// configs
import './app/configs/database';
import './app/configs/passport';
import configs from './app/configs';
import routes from './app/routes';


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



app.use("/api/v1", routes)

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