import mongoose from "mongoose";
import { IPayment } from "../types/types";

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionID: {
        type: String,
        required: true,
    },
})

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;