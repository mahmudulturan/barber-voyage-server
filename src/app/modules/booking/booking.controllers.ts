import { NextFunction, Request, Response } from "express";
import Booking from "./booking.model";
import Barber from "../barber/barber.model";
import Shop from "../shop/shop.model";
import User from "../user/user.model";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import sendResponse from "../../utils/sendResponse";

// controller for create a new booking
const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { shopId, barberId, userId, service, price, transaction, bookingTime, estimatedAppoinmentTime, estimatedDuration } = req.body;

    // new booking
    const newBooking = new Booking({
        shop: shopId,
        barber: barberId,
        user: userId,
        service,
        price,
        transaction,
        bookingTime,
        estimatedAppoinmentTime,
        estimatedDuration
    });

    // find shop, barber, user
    const shop = await Shop.findById(shopId);
    const barber = await Barber.findById(barberId);
    const user = await User.findById(userId);

    // if shop or barber or user is not found then send a message
    if (!shop || !barber || !user) {
        const errMsg = !shop && "Shop not found!" || !barber && "Barber not found!" || !user && "User not found!";
        throw new AppError(404, errMsg as string);
    }

    // push the booking id on shop, barber and user's bookings property
    shop.bookings.push(newBooking._id);
    barber.bookings.push(newBooking._id);
    user.bookings?.push(newBooking._id);

    // save to db and send a success message
    await Promise.all([newBooking.save(), user.save(), shop.save(), barber.save()]);
    sendResponse(res, 201, "Booking successfull!", newBooking);
})


// controller for change status for an booking
const changeBookingStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    // if booking is not found then send a error message
    if (!booking) {
        throw new AppError(404, "Booking not found!");
    }

    // change booking status
    booking.bookingStatus = status;

    await booking.save();
    sendResponse(res, 201, `Booking ${status}`, booking)
})

export const bookingControllers = {
    createBooking,
    changeBookingStatus
}