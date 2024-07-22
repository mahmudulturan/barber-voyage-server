import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces/types";

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is missing, It must be required!"],
    },
    email: {
        type: String,
        required: [true, "Email is missing, It must be required!"],
        unique: true,
    },
    image: {
        type: String,
    }
    ,
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "barber", "owner", "admin", "super-admin"]
    },
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    bookings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }]
    }
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;