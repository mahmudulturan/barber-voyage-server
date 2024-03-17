import mongoose from "mongoose";
import { IBarber } from "../types/types";

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
            shopInfo: {
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
        enum: ["verified", "pending", "rejected"],
        default: "pending",
        validate: {
            validator: function (v: string) {
                return ["verified", "pending", "rejected"].includes(v);
            },
            message: '{VALUE} is not supported'
        }
    }
});

const Barber = mongoose.model<IBarber>("Barber", barberSchema);

export default Barber;