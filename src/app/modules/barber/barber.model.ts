import mongoose from "mongoose";
import { IBarber } from "./barber.interfaces";

const barberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },
    hiredAt: {
        type: {
            joinedDate: {
                type: Date
            },
            shop: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shop"
            }
        }
    },
    experience: {
        type: String,
        required: true
    },
    specialties: {
        type: [String],
        required: true
    },
    document: {
        type: String,
        required: true
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    },
    bookings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }],
    },
    isVerified: {
        type: String,
        enum: { values: ["verified", "pending", "rejected"], message: '{VALUE} is not acceptable' },
        default: "pending"
    }
});

const Barber = mongoose.model<IBarber>("Barber", barberSchema);

export default Barber;