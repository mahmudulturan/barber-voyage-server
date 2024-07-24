import { Document, Types } from "mongoose";

//interface for bookingSchema
export interface IBooking extends Document {
    shop: Types.ObjectId;
    barber: Types.ObjectId;
    user: Types.ObjectId;
    service: string;
    price: number;
    transaction: Types.ObjectId;
    bookingTime: Date;
    estimatedAppoinmentTime: Date;
    estimatedDuration: string;
    bookingStatus: string;
}
