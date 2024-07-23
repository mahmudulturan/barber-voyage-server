import { NextFunction, Request, Response } from "express";
import Payment from "./payment.model";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// controller for create a new payment
const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { bookingId, userId, amount, transactionID } = req.body;
    const newPayment = new Payment({ booking: bookingId, user: userId, amount, transactionID })
    await newPayment.save();
    sendResponse(res, 201, "Payment Sucessfull", newPayment);
})

export const paymentControllers = {
    createPayment
}