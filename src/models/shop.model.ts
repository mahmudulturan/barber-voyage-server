import mongoose, { Schema } from "mongoose";
import { IShop } from "../types/types";

const shopSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    barbers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    shopImages: [{
        type: String,
        required: true
    }],
    license: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
    }],
    location: {
        type: Object,
        required: true
    },
    services: [{
        type: String,
        required: true
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
    }]
})

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;