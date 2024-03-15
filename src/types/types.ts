import { Document, Types } from "mongoose";


//interface for cookie options
export interface ICookieOptions {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none" | boolean;
    secure: boolean;
    maxAge?: number;
    expires?: Date;
}


//interface for userSchema
export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    password?: string;
    googleId?: string;
    role: string;
    barberInfo?: Types.ObjectId;
    ownerInfo?: Types.ObjectId;
    adminInfo?: Types.ObjectId;
    bookings?: Types.ObjectId[];
}


//interface for barberSchema
export interface IBarber extends Document {
    userInfo: Types.ObjectId;
    hiredAt: {
        joinedDate: Date;
        shopInfo: Types.ObjectId;
    };
    experience: string;
    specialties: string[];
    document: string;
    reviews: Types.ObjectId[];
    bookings: Types.ObjectId[];
}


//interface for ownerSchema
export interface IOwner extends Document {
    userInfo: Types.ObjectId;
    shopInfo: Types.ObjectId;
    experience: string;
    specialties: string[];
}


//interface for adminSchema
export interface IAdmin extends Document {
    userInfo: Types.ObjectId;
    adminSince: Date;
}


//interface for shopSchema
export interface IShop extends Document {
    name: string;
    ownerInfo: Types.ObjectId;
    barbers: Types.ObjectId[];
    shopImages: string[];
    license: string;
    reviews: Types.ObjectId[];
    location: object;
    services: string[];
    bookings: Types.ObjectId[];
}

//interface for bookingSchema
export interface IBooking extends Document {
    shopInfo: Types.ObjectId;
    barberInfo: Types.ObjectId;
    userInfo: Types.ObjectId;
    service: string;
    price: number;
    transactionInfo: Types.ObjectId;
    bookingTime: Date;
    estimatedAppoinmentTime: Date;
    estimatedDuration: string;
}

//interface for paymentSchema
export interface IPayment extends Document {
    bookingInfo: Types.ObjectId;
    userInfo: Types.ObjectId;
    amount: number;
    price: number;
    transactionID: number;
}


export interface IReview extends Document {
    shopInfo: Types.ObjectId;
    barberInfo: Types.ObjectId;
    userInfo: Types.ObjectId;
    bookingInfo: Types.ObjectId;
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