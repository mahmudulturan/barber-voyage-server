import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    shopInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    barberInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber"
    },
    userInfo: {
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
    transactionInfo: {
        type: mongoose.Schema.Types.ObjectId,
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

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;