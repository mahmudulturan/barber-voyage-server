import { Document, Types } from "mongoose";

//interface for userSchema
export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    password?: string;
    googleId?: string;
    role: string;
    barber?: Types.ObjectId;
    owner?: Types.ObjectId;
    admin?: Types.ObjectId;
    bookings?: Types.ObjectId[];
}



