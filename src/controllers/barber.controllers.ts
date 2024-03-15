import { NextFunction, Request, Response } from "express";
import Barber from "../models/barber.model";

export const barberRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, experience, specialties, document } = req.body;
        const newBarber = new Barber({ user, experience, specialties, document })
        await newBarber.save();
        res.status(201).send({ success: true, message: "Successfully registered as a barber!" })
    } catch (error) {
        next(error)
    }
}