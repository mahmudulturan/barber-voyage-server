import { Document, Types } from "mongoose";

//interface for barberSchema
export interface IBarber extends Document {
    user: Types.ObjectId;
    hiredAt: {
        joinedDate: Date;
        shop: Types.ObjectId;
    };
    experience: string;
    specialties: string[];
    document: string;
    reviews: Types.ObjectId[];
    bookings: Types.ObjectId[];
    isVerified: string;
}

