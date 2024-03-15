import mongoose, { Document } from "mongoose";


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
    barberInfo?: mongoose.Types.ObjectId;
    ownerInfo?: mongoose.Types.ObjectId;
    adminInfo?: mongoose.Types.ObjectId;
}


//interface for barberSchema
export interface IBarber extends Document {
    userInfo: mongoose.Types.ObjectId;
    hiredAt: {
        joinedDate: Date;
        shopInfo: mongoose.Types.ObjectId;
    };
    experience: string;
    specialties: string[];
    document: string;
    reviews: mongoose.Types.ObjectId[];
    bookings: mongoose.Types.ObjectId[];
}


//interface for ownerSchema
export interface IOwner extends Document {
    userInfo: mongoose.Types.ObjectId;
    shopInfo: mongoose.Types.ObjectId;
    experience: string;
    specialties: string[];
}


//interface for adminSchema
export interface IAdmin extends Document {
    userInfo: mongoose.Types.ObjectId;
    adminSince: Date;
}


//interface for shopSchema
export interface IShop extends Document {
    name: string;
    ownerInfo: mongoose.Types.ObjectId;
    barbers: mongoose.Types.ObjectId[];
    shopImages: string[];
    license: string;
    reviews: mongoose.Types.ObjectId[];
    location: object;
    services: string[];
    bookings: mongoose.Types.ObjectId[];
}

//interface for bookingSchema
export interface IBooking extends Document {
    shopInfo: mongoose.Types.ObjectId;
    barberInfo: mongoose.Types.ObjectId;
    userInfo: mongoose.Types.ObjectId;
    service: string;
    price: number;
    transactionInfo: mongoose.Types.ObjectId;
    bookingTime: Date;
    estimatedAppoinmentTime: Date;
    estimatedDuration: string;
}

//interface for paymentSchema
export interface IPayment extends Document {
    bookingInfo: mongoose.Types.ObjectId;
    userInfo: mongoose.Types.ObjectId;
    amount: number;
    price: number;
    transactionID: number;
}