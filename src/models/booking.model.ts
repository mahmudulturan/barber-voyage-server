import mongoose from "mongoose";
import { IBooking } from "../types/types";

const bookingSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    service: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    bookingTime: {
        type: Date,
        required: true
    },
    estimatedAppoinmentTime: {
        type: Date,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    }
})

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;