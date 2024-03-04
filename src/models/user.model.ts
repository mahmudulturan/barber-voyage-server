import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
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
        required: [true, "Password is missing, It must be required!"],
    }
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;