import mongoose, { Schema } from "mongoose";
import { IShop } from "../types/types";

const shopSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    barbers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        required: true
    },
    shopImages: {
        type: [String],
        required: true
    },
    license: {
        type: String,
        required: true
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    },
    location: {
        type: Object,
        required: true
    },
    services: {
        type: [String],
        required: true
    },
    bookings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }],
    }
})

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;