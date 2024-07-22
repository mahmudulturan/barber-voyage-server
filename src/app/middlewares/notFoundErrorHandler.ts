import { NextFunction, Request, Response } from "express";


const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: "The specified route cannot be located or identified." })
}

export default notFoundErrorHandler;