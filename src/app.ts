import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

dotenv.config();

// create app
const app = express();


// middlewares
app.use(express.json());
app.use(cors());


// home route of this server
app.get('/', (req: Request, res: Response) => {
    res.send("Wellcome to Barber Voyage server")
})

// response for not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(42).send({ message: "The specified route cannot be located or identified." })
})

// response for server error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: "Something broke" })
})


export default app;