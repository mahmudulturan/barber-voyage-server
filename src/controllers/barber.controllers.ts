import { NextFunction, Request, Response } from "express";
import Barber from "../models/barber.model";

// controller for register a new barber
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

// controller for verify a requested barber
export const verifyBarber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, status } = req.body;

        const barber = await Barber.findById(id);
        // if barber dont exist then send a error message
        if (!barber) {
            return res.status(404).send({ success: false, message: "Barber not found" });
        }
        // change the verification status
        barber.isVerified = status;
        await barber.save();
        res.status(200).send({ success: true, message: `Successfully updated to ${status}` });
    } catch (error) {
        next(error);
    }
}