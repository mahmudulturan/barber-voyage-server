import { Document, Types } from "mongoose";


export interface IReview extends Document {
    shop: Types.ObjectId;
    barber: Types.ObjectId;
    user: Types.ObjectId;
    booking: Types.ObjectId;
    barberReview: {
        rating: number;
        reviewMessage: string;
    };
    shopReview: {
        rating: number;
        reviewMessage: string;
    };
    image?: string;
}