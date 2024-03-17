import mongoose from "mongoose";
import { IOwner } from "../types/types";

const ownerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    experience: {
        type: String,
        required: true
    },
    specialties: {
        type: [String],
        required: true
    },
    bookings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }],
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    }
});

const Owner = mongoose.model<IOwner>("Owner", ownerSchema);

export default Owner;