import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentServices } from "./payment.services";

// controller for create a new payment
const createPayment = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = paymentServices.createPaymentIntoDb(data);
    sendResponse(res, 201, "Payment Sucessfull", result);
})

export const paymentControllers = {
    createPayment
}