import mongoose from "mongoose";
import { IBarber } from "../types/types";

const barberSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Booking"
    },
    bookings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Booking"
    },
});

const Barber = mongoose.model<IBarber>("Barber", barberSchema);

export default Barber;