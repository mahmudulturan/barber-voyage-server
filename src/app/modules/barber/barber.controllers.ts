import { NextFunction, Request, Response } from "express";
import User from "../user/user.model";
import Barber from "./barber.model";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";


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
    sendResponse(res, 201, "Successfully registered as a barber!", newBarber);
})


// controller for verify a requested barber
const verifyBarber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id, status } = req.body;

    const barber = await Barber.findById(id);
    const user = await User.findById(barber?.user);

    // if barber or user dont exist then send a error message
    if (!barber || !user) {
        throw new AppError(404, "Verification failed!")
    }

    // change the verification status and change the user role
    barber.isVerified = status;
    user.role = status === "verified" ? "barber" : "user";

    await barber.save();
    await user.save();
    sendResponse(res, 200, `Successfully updated to ${status}`, barber);
})

export const barberControllers = {
    getBarber,
    barberRegister,
    verifyBarber
}