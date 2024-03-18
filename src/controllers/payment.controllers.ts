import { NextFunction, Request, Response } from "express";
import Payment from "../models/payment.model";

// controller for create a new payment
export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookingId, userId, amount, transactionID } = req.body;
        const newPayment = new Payment({ booking: bookingId, user: userId, amount, transactionID })
        await newPayment.save();
        res.status(201).send({ success: true, message: "Payment Sucessfull" })
    } catch (error) {
        next(error);
    }
}