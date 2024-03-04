import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;