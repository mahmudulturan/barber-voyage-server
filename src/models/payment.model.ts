import mongoose from "mongoose";
import { IPayment } from "../types/types";

const paymentSchema = new mongoose.Schema({
    bookingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    transactionID: {
        type: Number,
        required: true,
    },
})

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;