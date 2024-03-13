import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password?: string;
    name: string;
    googleId?: string;
}

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
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
    }
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;