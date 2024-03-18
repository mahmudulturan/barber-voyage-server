import mongoose from "mongoose";
import { IBooking } from "../types/types";

const bookingSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    },
    bookingStatus: {
        type: String,
        enum: { values: ["accepted", "running", "completed", "posponed"], message: '{VALUE} is not acceptable' },
        default: "accepted"
    }
})

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;