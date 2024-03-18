import { NextFunction, Request, Response } from "express";
import Booking from "../models/booking.model";


export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopId, barberId, userId, service, price, transaction, bookingTime, estimatedAppoinmentTime, estimatedDuration } = req.body;


        const newBooking = new Booking({
            shop: shopId,
            barberId: barberId,
            user: userId,
            service,
            price,
            transaction,
            bookingTime,
            estimatedAppoinmentTime,
            estimatedDuration
        });


        await newBooking.save();
        res.status(201).send({ success: true, message: "Booking successfull" });
    } catch (error) {
        next(error);
    }
}