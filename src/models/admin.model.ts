import mongoose from "mongoose";
import { IAdmin } from "../types/types";

const adminSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    adminSince: {
        type: Date,
        default: Date.now()
    }
})

const Admin = mongoose.model<IAdmin>("Admin", adminSchema)

export default Admin;