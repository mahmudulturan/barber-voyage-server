import { Document, Types } from "mongoose";

//interface for shopSchema
export interface IShop extends Document {
    name: string;
    owner: Types.ObjectId;
    barbers: Types.ObjectId[];
    shopImages: string[];
    license: string;
    reviews: Types.ObjectId[];
    location: object;
    services: string[];
    bookings: Types.ObjectId[];
    isVerified: string;
}