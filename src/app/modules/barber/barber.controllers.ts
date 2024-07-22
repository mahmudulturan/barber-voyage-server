import { NextFunction, Request, Response } from "express";
import User from "../user/user.model";
import Barber from "./barber.model";


// controller for register a new barber
export const getBarber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const barberDetails = await Barber.findById(id).populate("user").populate("bookings", "user");
        res.status(201).send({ success: true, data: barberDetails, message: "Successfully registered as a barber!" });
    } catch (error) {
        next(error);
    }
}


// controller for register a new barber
export const barberRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, experience, specialties, document } = req.body;
        const newBarber = new Barber({ user, experience, specialties, document });
        await newBarber.save();
        res.status(201).send({ success: true, message: "Successfully registered as a barber!" });
    } catch (error) {
        next(error);
    }
}

// controller for verify a requested barber
export const verifyBarber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, status } = req.body;

        const barber = await Barber.findById(id);
        const user = await User.findById(barber?.user);

        // if barber or user dont exist then send a error message
        if (!barber || !user) {
            return res.status(404).send({ success: false, message: "Verification failed!" });
        }

        // change the verification status and change the user role
        barber.isVerified = status;
        user.role = status === "verified" ? "barber" : "user";

        await barber.save();
        await user.save();
        res.status(200).send({ success: true, message: `Successfully updated to ${status}` });
    } catch (error) {
        console.log((error as Error).message);
        next(error);
    }
}