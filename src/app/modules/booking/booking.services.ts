import AppError from "../../errors/AppError";
import Barber from "../barber/barber.model";
import Shop from "../shop/shop.model";
import User from "../user/user.model";
import { IBooking } from "./booking.interfaces";
import Booking from "./booking.model";

const createBookingIntoDB = async (data: IBooking & { shopId: string; barberId: string; userId: string }) => {
    const { shopId, barberId, userId, service, price, transaction, bookingTime, estimatedAppoinmentTime, estimatedDuration } = data;

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
}


const changeBookingStatusIntoDB = async(bookingId: string ,status:string)=>{
    const booking = await Booking.findById(bookingId);

    // if booking is not found then send a error message
    if (!booking) {
        throw new AppError(404, "Booking not found!");
    }

    // change booking status
    booking.bookingStatus = status;

    await booking.save();

    return booking;
}

export const bookingServices = {
    createBookingIntoDB,
    changeBookingStatusIntoDB
};