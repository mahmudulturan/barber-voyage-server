import { NextFunction, Request, Response } from "express";
import User from "../user/user.model";
import Barber from "./barber.model";
import catchAsync from "../../utils/catchAsync";


// controller for register a new barber
const getBarber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const barberDetails = await Barber.findById(id).populate("user").populate("bookings", "user");
    res.status(201).send({ success: true, data: barberDetails, message: "Successfully registered as a barber!" });
})


// controller for register a new barber
const barberRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user, experience, specialties, document } = req.body;
    const newBarber = new Barber({ user, experience, specialties, document });
    await newBarber.save();
    res.status(201).send({ success: true, message: "Successfully registered as a barber!" });
})


// controller for verify a requested barber
const verifyBarber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
})

export const barberControllers = {
    getBarber,
    barberRegister,
    verifyBarber
}