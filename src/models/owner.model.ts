import mongoose from "mongoose";
import { IOwner } from "../types/types";

const ownerSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shopInfo: {
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
    }
});

const Owner = mongoose.model<IOwner>("Owner", ownerSchema);

export default Owner;