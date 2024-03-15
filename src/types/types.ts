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
    _id: mongoose.Types.ObjectId;
    name: string;
    manager: string;
    barbers: mongoose.Types.ObjectId[];
    images: string[];
    license: string;
    ratings: mongoose.Types.ObjectId[];
    location: object;
    services: string[];
    bookings: mongoose.Types.ObjectId[];
}