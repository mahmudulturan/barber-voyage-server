import mongoose from "mongoose";
import { IReview } from "../types/types";

const reviewSchema = new mongoose.Schema({
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
    bookingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    barberReview: {
        type: {
            rating: Number,
            reviewMessage: String
        },
        required: true
    },
    shopReview: {
        type: {
            rating: Number,
            reviewMessage: String
        },
        required: true
    },
    image: {
        type: String
    }
})


const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;