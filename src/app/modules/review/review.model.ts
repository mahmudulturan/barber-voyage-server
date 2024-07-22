import mongoose from "mongoose";
import { IReview } from "../../interfaces/types";

const reviewSchema = new mongoose.Schema({
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
    booking: {
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