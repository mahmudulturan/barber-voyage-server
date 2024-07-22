import { NextFunction, Request, Response } from "express";
import Booking from "./booking.model";
import Barber from "../barber/barber.model";
import Shop from "../shop/shop.model";
import User from "../user/user.model";

// controller for create a new booking
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
            return res.status(404).send(
                {
                    success: false,
                    error: shop && "Shop not found!" || !barber && "Barber not found!" || !user && "User not found!"
                }
            );
        }

        // push the booking id on shop, barber and user's bookings property
        shop.bookings.push(newBooking._id);
        barber.bookings.push(newBooking._id);
        user.bookings?.push(newBooking._id);

        // save to db and send a success message
        await Promise.all([newBooking.save(), user.save(), shop.save(), barber.save()]);
        res.status(201).send({ success: true, message: "Booking successfull" });
    } catch (error) {
        next(error);
    }
}

// controller for change status for an booking
export const changeBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);

        // if booking is not found then send a error message
        if (!booking) {
            return res.status(404).send({ succes: false, error: "Booking not found!" });
        }

        // change booking status
        booking.bookingStatus = status;

        await booking.save();
        res.status(201).send({ success: true, message: `Booking ${status}` });
    } catch (error) {
        next(error);
    }
}