import { NextFunction, Request, Response } from "express";
import Payment from "./payment.model";
import catchAsync from "../../utils/catchAsync";

// controller for create a new payment
const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { bookingId, userId, amount, transactionID } = req.body;
    const newPayment = new Payment({ booking: bookingId, user: userId, amount, transactionID })
    await newPayment.save();
    res.status(201).send({ success: true, message: "Payment Sucessfull" })
})

export const paymentControllers = {
    createPayment
}