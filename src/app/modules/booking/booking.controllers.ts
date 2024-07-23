import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.services";

// controller for create a new booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await bookingServices.createBookingIntoDB(data);
    sendResponse(res, 201, "Booking successfull!", result);
})


// controller for change status for an booking
const changeBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const { bookingId, status } = req.body;
    const result = await bookingServices.changeBookingStatusIntoDB(bookingId, status);
    sendResponse(res, 201, `Booking ${status}`, result)
})

export const bookingControllers = {
    createBooking,
    changeBookingStatus
}