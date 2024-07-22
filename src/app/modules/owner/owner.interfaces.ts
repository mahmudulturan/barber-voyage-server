import { Document, Types } from "mongoose";

//interface for ownerSchema
export interface IOwner extends Document {
    user: Types.ObjectId;
    shop: Types.ObjectId;
    experience: string;
    specialties: string[];
    isVerified: string;
    reviews: Types.ObjectId[];
    bookings: Types.ObjectId[];
}
