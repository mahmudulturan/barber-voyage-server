import mongoose from "mongoose";

export interface ICookieOptions {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none" | boolean;
    secure: boolean;
    maxAge?: number;
    expires?: Date;
}

export interface IShop {
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